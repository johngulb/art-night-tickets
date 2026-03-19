import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import {
  getCheckoutSession,
  updateCheckoutSession,
  getTicketType,
  createPurchasedTicket,
  updateTicketInventory,
  getEvent,
} from 'buidl-ticketing';
import { sendTicketEmail, type QrTicketForEmail } from '../../../lib/sendTicketEmail';
import db from '../../../db/client';
import { generateQrToken, getTicketVerifyUrl, qrPngBase64 } from '../../../lib/ticketQr';

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];
  
  console.log('Webhook received:', {
    method: req.method,
    hasSignature: !!sig,
    hasWebhookSecret: !!webhookSecret,
    webhookSecretPrefix: webhookSecret?.substring(0, 10),
    headers: Object.keys(req.headers),
  });

  if (!sig || !webhookSecret) {
    console.error('Missing webhook credentials:', { sig: !!sig, secret: !!webhookSecret });
    return res.status(400).json({ error: 'Missing signature or webhook secret' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-03-31.basil',
  });

  let event: Stripe.Event;
  try {
    const body = await getRawBody(req);
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return res.status(400).send(`Webhook Error: ${message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const checkoutSession = await getCheckoutSession(session.id);
      if (!checkoutSession) {
        return res.status(404).json({ error: 'Checkout session not found' });
      }

      await updateCheckoutSession(session.id, 'completed');
      const customerEmail =
        (session.customer_details?.email as string) || (session.customer_email as string) || '';

      console.log('Processing checkout.session.completed:', {
        sessionId: session.id,
        customerEmail,
        hasEmail: !!customerEmail,
      });

      if (!checkoutSession.items || !Array.isArray(checkoutSession.items)) {
        console.error('Invalid checkout session items:', checkoutSession.items);
        return res.status(500).json({ error: 'Invalid checkout session items' });
      }

      const eventId = parseInt(
        String((checkoutSession as { event_id?: string }).event_id ?? checkoutSession.eventId)
      );
      const eventRecord = await getEvent(eventId);
      
      console.log('Event details:', {
        eventId,
        hasEvent: !!eventRecord,
        eventTitle: eventRecord?.title,
      });

      const qrTickets: QrTicketForEmail[] = [];
      let ticketNumber = 1;

      for (const item of checkoutSession.items) {
        const ticketType = await getTicketType(item.ticketTypeId);
        if (!ticketType) {
          console.error('Ticket type not found:', item.ticketTypeId);
          continue;
        }
        for (let i = 0; i < item.quantity; i++) {
          const created = await createPurchasedTicket({
            eventId,
            ticketTypeId: item.ticketTypeId,
            userId: customerEmail,
            checkoutSessionId: session.id,
            purchaseDate: new Date(),
            status: 'valid',
          });
          const row = created as { id?: number | string };
          const ticketId = row?.id;
          if (ticketId != null) {
            const qrToken = generateQrToken();
            try {
              await db('purchased_tickets').where({ id: ticketId }).update({ qr_token: qrToken });
            } catch (e) {
              console.error('Failed to set qr_token (run migration add_qr_token?):', e);
            }
            const verifyUrl = getTicketVerifyUrl(qrToken);
            const base64Png = await qrPngBase64(verifyUrl);
            qrTickets.push({
              cid: `qr-ticket-${ticketNumber}`,
              label: `${ticketType.name} — Ticket ${ticketNumber}`,
              base64Png,
            });
            ticketNumber++;
          }
        }
        await updateTicketInventory(eventId, item.ticketTypeId, {
          reserved: ticketType.reserved - item.quantity,
          sold: ticketType.sold + item.quantity,
          remaining: ticketType.remaining - item.quantity,
        });
      }

      // Send ticket confirmation email via Resend (totals are in dollars from DB)
      const totalDollars = Number(checkoutSession.total ?? 0);
      if (customerEmail && eventRecord) {
        try {
          const lineItems = await Promise.all(
            checkoutSession.items.map(async (item) => {
              const tt = await getTicketType(item.ticketTypeId);
              return {
                name: tt?.name ?? item.ticketTypeId,
                quantity: item.quantity,
                unitPrice: tt?.price ?? 0,
              };
            })
          );
          const emailResult = await sendTicketEmail({
            to: customerEmail,
            eventTitle: eventRecord.title ?? 'Event',
            eventDate: eventRecord.date ?? null,
            eventLocation: eventRecord.location ?? null,
            eventDescription: eventRecord.description ?? null,
            lineItems,
            total: totalDollars,
            qrTickets,
          });
          if (!emailResult.ok) {
            console.error('Failed to send ticket email:', emailResult.error);
          } else {
            console.log('Ticket email sent successfully to:', customerEmail);
          }
        } catch (emailError) {
          console.error('Error sending ticket email:', emailError);
          // Don't fail the webhook if email fails
        }
      } else {
        console.warn('Skipping email send - missing email or event:', {
          hasEmail: !!customerEmail,
          hasEvent: !!eventRecord,
        });
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const checkoutSession = await getCheckoutSession(session.id);
      if (checkoutSession?.items && Array.isArray(checkoutSession.items)) {
        await updateCheckoutSession(session.id, 'failed');
        const eventId = parseInt(
          String((checkoutSession as { event_id?: string }).event_id ?? checkoutSession.eventId)
        );
        for (const item of checkoutSession.items) {
          const ticketType = await getTicketType(item.ticketTypeId);
          if (ticketType) {
            await updateTicketInventory(eventId, item.ticketTypeId, {
              reserved: ticketType.reserved - item.quantity,
            });
          }
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
