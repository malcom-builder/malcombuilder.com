"use client";

import Script from "next/script";
import { useReportWebVitals } from "next/web-vitals";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Report Core Web Vitals to Google Analytics
  useReportWebVitals((metric) => {
    if (
      GA_ID &&
      typeof window !== "undefined" &&
      typeof (window as any).gtag === "function"
    ) {
      (window as any).gtag("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return (
    <>
      {/* Vercel Web Analytics */}
      <Analytics />

      {/* Vercel Speed Insights */}
      <SpeedInsights />

      {/* Google Analytics 4 Script Injection */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {children}
    </>
  );
}
