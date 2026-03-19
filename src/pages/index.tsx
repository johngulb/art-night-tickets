'use client';

import Image from 'next/image';
import styled, { createGlobalStyle } from 'styled-components';
import BuyButton from '../components/BuyButton';

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

const GlobalPortraitsStyles = createGlobalStyle`
  :root {
    --portraits-burnt: ${theme.burntOrange};
    --portraits-red: ${theme.deepRed};
    --portraits-yellow: ${theme.warmYellow};
    --portraits-black: ${theme.black};
    --portraits-offwhite: ${theme.offWhite};
    --font-headline: ${theme.fontHeadline};
    --font-tagline: ${theme.fontTagline};
    --font-body: ${theme.fontBody};
    --font-accent: ${theme.fontAccent};
  }
`;

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const PageWrapper = styled.div`
  font-family: ${theme.fontBody};
  color: ${theme.black};
  background: ${theme.offWhite};
`;

const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, #E76F3C 0%, #C45A2E 25%, #8C1D18 55%, #B85C1A 75%, #F4C95D 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${noiseSvg};
    opacity: 0.12;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.15) 100%);
    pointer-events: none;
  }
`;

const FloatingSketch = styled.div<{ $left: string; $top: string; $delay: number }>`
  position: absolute;
  left: ${(p) => p.$left};
  top: ${(p) => p.$top};
  width: 48px;
  height: 48px;
  opacity: 0.35;
  pointer-events: none;
  animation: floatSketch 12s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay}s;
  @keyframes floatSketch {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(8px, -12px) rotate(5deg); }
    66% { transform: translate(-6px, -6px) rotate(-3deg); }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 42rem;
`;

const PosterWrap = styled.div`
  position: relative;
  width: min(100%, 22rem);
  margin: 0 auto 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.28);
  animation: posterGlow 4s ease-in-out infinite alternate;
  @keyframes posterGlow {
    from {
      filter: drop-shadow(0 0 20px rgba(244, 201, 93, 0.35));
    }
    to {
      filter: drop-shadow(0 0 36px rgba(244, 201, 93, 0.65));
    }
  }
`;

const HeroHeadline = styled.h1`
  font-family: ${theme.fontHeadline};
  font-size: clamp(3rem, 11vw, 6.5rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  color: ${theme.black};
  text-transform: uppercase;
  line-height: 0.95;
  margin: 0 0 0.5rem;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
`;

const HeroSubhead = styled.p`
  font-family: ${theme.fontTagline};
  font-size: 1rem;
  color: ${theme.black};
  opacity: 0.9;
  margin: 0 0 0.25rem;
  letter-spacing: 0.04em;
  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
`;

const HeroVenue = styled.p`
  font-family: ${theme.fontAccent};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.black};
  margin: 0 0 0.75rem;
  letter-spacing: 0.02em;
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const HeroDateTime = styled.p`
  font-family: ${theme.fontAccent};
  font-size: 1.35rem;
  font-weight: 700;
  color: ${theme.black};
  margin: 0 0 1rem;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 24px rgba(245, 237, 227, 0.5);
  @media (min-width: 640px) {
    font-size: 1.6rem;
  }
`;

const HeroSupporting = styled.p`
  font-family: ${theme.fontBody};
  font-size: 0.95rem;
  color: ${theme.black};
  opacity: 0.85;
  margin: 0 0 1.5rem;
  max-width: 28ch;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  @media (min-width: 640px) {
    font-size: 1.05rem;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const CTAPrimary = styled.div`
  display: inline-block;
`;


export default function Home() {
  return (
    <PageWrapper>
      <GlobalPortraitsStyles />
      <Hero>
        <FloatingSketch $left="12%" $top="18%" $delay={0}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>
        </FloatingSketch>
        <FloatingSketch $left="78%" $top="22%" $delay={2}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M12 4l2 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" /></svg>
        </FloatingSketch>
        <FloatingSketch $left="8%" $top="72%" $delay={1}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M4 20l4-12 4 4 4-8 4 16" /></svg>
        </FloatingSketch>
        <FloatingSketch $left="82%" $top="68%" $delay={3}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><ellipse cx="12" cy="12" rx="6" ry="8" /></svg>
        </FloatingSketch>
        <HeroContent>
          <PosterWrap>
            <Image
              src="/portraits-godfrey-poster.png"
              alt="Art Night Detroit presents Portraits at The Godfrey — April 13, 7pm–11pm"
              width={1224}
              height={1584}
              priority
              sizes="(max-width: 480px) 100vw, 352px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </PosterWrap>
          <HeroSubhead>Art Night Detroit Presents</HeroSubhead>
          <HeroHeadline>Portraits</HeroHeadline>
          <HeroVenue>At The Godfrey</HeroVenue>
          <HeroDateTime>April 13 · 7PM – 11PM</HeroDateTime>
          {/* <HeroSupporting>
            A night of live expression, music, and creative experimentation.
          </HeroSupporting> */}
          <CTAGroup>
            <CTAPrimary>
              <BuyButton label="Get Tickets" variant="portraits" />
            </CTAPrimary>
          </CTAGroup>
        </HeroContent>
      </Hero>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: "Portraits @ The Godfrey | Art Night Detroit",
        description:
          "A night of live expression, music, and creative experimentation. April 13, 7–11pm at The Godfrey.",
        openGraph: {
          title: "Portraits @ The Godfrey | Art Night Detroit",
          description:
            "April 13, 7–11pm at The Godfrey. Live art, DJs, portrait workshop, caricature booth.",
          images: [
            {
              url: "/portraits-godfrey-poster.png",
              width: 1224,
              height: 1584,
              alt: "Art Night Detroit presents Portraits at The Godfrey",
            },
          ],
          type: "website",
          locale: "en_US",
        },
      },
    },
  };
}
