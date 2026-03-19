import './global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo, NextSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";

// Default metadata for the application
const defaultMetadata = {
  title: "Portraits @ The Godfrey | Art Night Detroit",
  description:
    "A night of live expression, music, and creative experimentation. Live art, full DJ lineup, portrait workshop, caricature booth. April 13, 7–11pm at The Godfrey.",
  openGraph: {
    title: "Portraits @ The Godfrey | Art Night Detroit",
    description:
      "Live art, DJs, portrait workshop, caricature booth. April 13, 7–11pm. Art supplies provided. Food & cash bar.",
    images: [
      { url: "/arts-for-the-earth-banner.jpg", width: 1200, height: 630, alt: "Portraits @ The Godfrey" },
    ],
    type: "website",
    locale: "en_US",
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const pageMetadata = pageProps.metadata || defaultMetadata;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo {...pageMetadata} />
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_US",
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
