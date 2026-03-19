import styled from 'styled-components';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import db from '../../db/client';

type Props = {
  valid: boolean;
  eventTitle?: string;
  eventDate?: string | null;
  eventLocation?: string | null;
  ticketStatus?: string;
};

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  background: linear-gradient(165deg, #e76f3c 0%, #8c1d18 55%, #f4c95d 100%);
  color: #111;
`;

const Card = styled.div`
  max-width: 28rem;
  width: 100%;
  background: #f5ede3;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0 0 1rem;
`;

const Muted = styled.p`
  color: #444;
  margin: 0.5rem 0;
  line-height: 1.5;
`;

export default function TicketVerifyPage({
  valid,
  eventTitle,
  eventDate,
  eventLocation,
  ticketStatus,
}: Props) {
  return (
    <>
      <Head>
        <title>
          {valid ? `Ticket · ${eventTitle ?? 'Event'}` : 'Ticket not found'} | Art Night Detroit
        </title>
      </Head>
      <Page>
        <Card>
          {valid ? (
            <>
              <Title>Valid ticket</Title>
              <Muted style={{ fontWeight: 600, color: '#166534' }}>✓ Confirmed</Muted>
              <Muted>{eventTitle}</Muted>
              {eventDate && <Muted>Date: {eventDate}</Muted>}
              {eventLocation && <Muted>{eventLocation}</Muted>}
              {ticketStatus && (
                <Muted style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
                  Status: {ticketStatus}
                </Muted>
              )}
            </>
          ) : (
            <>
              <Title>Ticket not found</Title>
              <Muted>
                This link doesn&apos;t match a ticket in our system. Check the QR or contact support.
              </Muted>
            </>
          )}
        </Card>
      </Page>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = ctx.params?.token;
  if (!token || typeof token !== 'string') {
    return { props: { valid: false } };
  }

  try {
    const hasQr = await db.schema.hasColumn('purchased_tickets', 'qr_token');
    if (!hasQr) {
      return { props: { valid: false } };
    }

    const row = await db('purchased_tickets')
      .join('events', 'events.id', 'purchased_tickets.event_id')
      .select(
        'events.title as event_title',
        'events.date as event_date',
        'events.location as event_location',
        'purchased_tickets.status as ticket_status'
      )
      .where('purchased_tickets.qr_token', token)
      .first();

    if (!row) {
      return { props: { valid: false } };
    }

    const r = row as {
      event_title: string;
      event_date: string | null;
      event_location: string | null;
      ticket_status: string;
    };

    return {
      props: {
        valid: true,
        eventTitle: r.event_title,
        eventDate: r.event_date,
        eventLocation: r.event_location,
        ticketStatus: r.ticket_status,
      },
    };
  } catch (e) {
    console.error('ticket verify:', e);
    return { props: { valid: false } };
  }
};
