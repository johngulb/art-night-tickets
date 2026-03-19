import QRCode from 'qrcode';
import { randomUUID } from 'crypto';

/**
 * Public URL shown in the QR code (opens ticket verification page).
 */
export function getTicketVerifyUrl(qrToken: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  return `${base}/ticket/${encodeURIComponent(qrToken)}`;
}

export function generateQrToken(): string {
  return randomUUID();
}

export async function qrPngBase64(url: string): Promise<string> {
  const png = await QRCode.toBuffer(url, {
    type: 'png',
    width: 220,
    margin: 1,
    errorCorrectionLevel: 'M',
  });
  return png.toString('base64');
}
