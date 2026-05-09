"use client";

import Script from "next/script";

type AnalyticsProps = {
  measurementId: string;
};

export function Analytics({ measurementId }: AnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
