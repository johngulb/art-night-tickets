'use client';

import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect } from 'react';

const theme = {
  burntOrange: '#E76F3C',
  deepRed: '#8C1D18',
  warmYellow: '#F4C95D',
  black: '#111111',
  offWhite: '#F5EDE3',
  fontHeadline: "'Abril Fatface', Georgia, serif",
  fontTagline: "'Permanent Marker', cursive",
  fontBody: "'Space Grotesk', -apple-system, sans-serif",
  fontAccent: "'Libre Baskerville', Georgia, serif",
};

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CancelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, #E76F3C 0%, #C45A2E 25%, #8C1D18 55%, #B85C1A 75%, #F4C95D 100%);
  font-family: ${theme.fontBody};
  color: ${theme.black};
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${noiseSvg};
    opacity: 0.1;
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const CancelInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 28rem;
`;

const CancelTitle = styled.h1`
  font-family: ${theme.fontHeadline};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: ${theme.black};
  margin: 0 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const CancelMessage = styled.p`
  font-family: ${theme.fontBody};
  font-size: 1rem;
  line-height: 1.6;
  color: ${theme.black};
  margin: 0 0 1.5rem;
  opacity: 0.9;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const EventDetails = styled.p`
  font-family: ${theme.fontAccent};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.black};
  margin: 0 0 2rem;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ReturnButton = styled(Link)`
  display: inline-block;
  padding: 0.875rem 1.75rem;
  background: ${theme.deepRed};
  color: ${theme.offWhite};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(140, 29, 24, 0.5);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(140, 29, 24, 0.6);
  }
`;

export const getServerSideProps = async () => {
  return {
    props: {
      metadata: {
        title: 'Checkout cancelled | Portraits @ The Godfrey',
        description: 'Your checkout was cancelled. Get your ticket for Portraits at The Godfrey — April 13, 7–11pm.',
      },
    },
  };
};

export default function CheckoutCancel() {
  const router = useRouter();

  useEffect(() => {
    const cancelCheckout = async () => {
      try {
        const { session_id } = router.query;
        if (session_id) {
          await fetch(`/api/checkout/cancel?session_id=${session_id}`);
        }
      } catch (error) {
        console.error('Error cancelling checkout:', error);
      }
    };

    cancelCheckout();
  }, [router.query]);

  return (
    <CancelContainer>
      <CancelInner>
        <CancelTitle>Checkout cancelled</CancelTitle>
        <CancelMessage>
          No worries — you can grab your ticket anytime. We&apos;ll be here.
        </CancelMessage>
        <EventDetails>
          Portraits @ The Godfrey<br />
          April 13 · 7PM – 11PM<br />
          1401 Michigan Ave, Detroit
        </EventDetails>
        <ReturnButton href="/">Get Tickets</ReturnButton>
      </CancelInner>
    </CancelContainer>
  );
}
