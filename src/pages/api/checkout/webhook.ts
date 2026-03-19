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
import { sendTicketEmail } from '../../../lib/sendTicketEmail';

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
  if (!sig || !webhookSecret) {
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

      if (!checkoutSession.items || !Array.isArray(checkoutSession.items)) {
        console.error('Invalid checkout session items:', checkoutSession.items);
        return res.status(500).json({ error: 'Invalid checkout session items' });
      }

      const eventId = parseInt(
        String((checkoutSession as { event_id?: string }).event_id ?? checkoutSession.eventId)
      );
      const eventRecord = await getEvent(eventId);

      for (const item of checkoutSession.items) {
        const ticketType = await getTicketType(item.ticketTypeId);
        if (!ticketType) {
          console.error('Ticket type not found:', item.ticketTypeId);
          continue;
        }
        for (let i = 0; i < item.quantity; i++) {
          await createPurchasedTicket({
            eventId,
            ticketTypeId: item.ticketTypeId,
            userId: customerEmail,
            checkoutSessionId: session.id,
            purchaseDate: new Date(),
            status: 'valid',
          });
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
        await sendTicketEmail({
          to: customerEmail,
          eventTitle: eventRecord.title ?? 'Event',
          eventDate: eventRecord.date ?? null,
          eventLocation: eventRecord.location ?? null,
          eventDescription: eventRecord.description ?? null,
          lineItems,
          total: totalDollars,
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
