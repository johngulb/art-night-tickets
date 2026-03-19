import { Resend } from 'resend';

export type QrTicketForEmail = {
  /** CID reference for inline image, e.g. qr-ticket-1 */
  cid: string;
  /** Shown above the QR (e.g. "General Admission — Ticket 1") */
  label: string;
  /** PNG bytes as base64 */
  base64Png: string;
};

export type TicketEmailPayload = {
  to: string;
  eventTitle: string;
  eventDate: string | null;
  eventLocation: string | null;
  eventDescription?: string | null;
  lineItems: Array<{ name: string; quantity: number; unitPrice: number }>;
  total: number;
  /** One QR per individual ticket */
  qrTickets?: QrTicketForEmail[];
};

function formatDate(isoDate: string | null): string {
  if (!isoDate) return 'TBD';
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

export async function sendTicketEmail(payload: TicketEmailPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set; skipping ticket email');
    return { ok: false, error: 'RESEND_API_KEY not set' };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? 'Art Night Detroit <onboarding@resend.dev>';
  const { to, eventTitle, eventDate, eventLocation, lineItems, total, qrTickets = [] } = payload;

  const linesHtml = lineItems
    .map(
      (item) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${item.name}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">$${(item.unitPrice * item.quantity).toFixed(2)}</td></tr>`
    )
    .join('');

  const qrSection =
    qrTickets.length > 0
      ? `
  <h2 style="font-size:1.1rem;margin:32px 0 16px">Your ticket QR codes</h2>
  <p style="color:#444;margin-bottom:16px;font-size:0.95rem">Show one QR per person at entry. Each code is unique.</p>
  ${qrTickets
    .map(
      (t) => `
  <div style="text-align:center;margin-bottom:28px;padding:16px;border:1px solid #eee;border-radius:8px">
    <p style="margin:0 0 12px;font-weight:600">${t.label}</p>
    <img src="cid:${t.cid}" alt="Ticket QR" width="220" height="220" style="display:inline-block;max-width:100%;height:auto" />
  </div>`
    )
    .join('')}
`
      : '';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#111;max-width:560px;margin:0 auto;padding:24px">
  <h1 style="font-size:1.5rem;margin-bottom:8px">Your tickets are confirmed</h1>
  <p style="color:#444;margin-bottom:24px">Thanks for your purchase. Here are the details.</p>
  <div style="background:#f8f8f8;border-radius:8px;padding:20px;margin-bottom:24px">
    <h2 style="font-size:1.2rem;margin:0 0 12px">${eventTitle}</h2>
    <p style="margin:4px 0"><strong>Date:</strong> ${formatDate(eventDate)}</p>
    ${eventLocation ? `<p style="margin:4px 0"><strong>Location:</strong> ${eventLocation}</p>` : ''}
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
    <thead><tr style="background:#eee"><th style="padding:8px 12px;text-align:left">Ticket</th><th style="padding:8px 12px;text-align:center">Qty</th><th style="padding:8px 12px;text-align:right">Amount</th></tr></thead>
    <tbody>${linesHtml}</tbody>
  </table>
  <p style="text-align:right;font-weight:700;font-size:1.1rem">Total: $${total.toFixed(2)}</p>
  ${qrSection}
  <p style="margin-top:24px;color:#666;font-size:0.9rem">Save this email as your confirmation. See you there!</p>
</body>
</html>
`.trim();

  const attachments =
    qrTickets.length > 0
      ? qrTickets.map((t, i) => ({
          filename: `ticket-${i + 1}-qr.png`,
          content: Buffer.from(t.base64Png, 'base64'),
          contentId: t.cid,
        }))
      : undefined;

  try {
    console.log('Sending ticket email via Resend:', {
      to,
      from,
      subject: `Your tickets: ${eventTitle}`,
      qrCount: qrTickets.length,
    });
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Your tickets: ${eventTitle}`,
      html,
      attachments,
    });
    if (error) {
      console.error('Resend API error:', JSON.stringify(error, null, 2));
      return { ok: false, error: error.message || JSON.stringify(error) };
    }
    console.log('Resend email sent successfully:', { emailId: data?.id, to });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('sendTicketEmail exception:', err);
    return { ok: false, error: message };
  }
}
