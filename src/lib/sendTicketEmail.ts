import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type TicketEmailPayload = {
  to: string;
  eventTitle: string;
  eventDate: string | null;
  eventLocation: string | null;
  eventDescription?: string | null;
  lineItems: Array<{ name: string; quantity: number; unitPrice: number }>;
  total: number;
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
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set; skipping ticket email');
    return { ok: false, error: 'RESEND_API_KEY not set' };
  }

  const from = process.env.RESEND_FROM ?? 'Art Night Detroit <onboarding@resend.dev>';
  const { to, eventTitle, eventDate, eventLocation, lineItems, total } = payload;

  const linesHtml = lineItems
    .map(
      (item) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${item.name}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">$${(item.unitPrice * item.quantity).toFixed(2)}</td></tr>`
    )
    .join('');

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
  <p style="margin-top:24px;color:#666;font-size:0.9rem">Save this email as your confirmation. See you there!</p>
</body>
</html>
`.trim();

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Your tickets: ${eventTitle}`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('sendTicketEmail failed:', message);
    return { ok: false, error: message };
  }
}
