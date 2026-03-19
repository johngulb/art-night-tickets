import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db/client';

/**
 * POST { token: string } — marks the ticket as redeemed (no auth; link is the secret).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as { token?: string };
  const { token } = body || {};

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Missing token' });
  }

  try {
    const hasQr = await db.schema.hasColumn('purchased_tickets', 'qr_token');
    if (!hasQr) {
      return res.status(503).json({ error: 'Database not ready' });
    }

    const updated = await db('purchased_tickets')
      .where({ qr_token: token, status: 'valid' })
      .update({ status: 'redeemed' });

    if (updated === 0) {
      const exists = await db('purchased_tickets').where({ qr_token: token }).first();
      if (!exists) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      return res.status(409).json({ error: 'Ticket already redeemed or not valid' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('redeem error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
