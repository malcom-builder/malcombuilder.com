import type { Metadata } from "next";
import { Sora, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const baseUrl = "https://malcombuilder.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "malcom.builder — Software Studio",
  description: "Sistemas digitales de alto rendimiento. Scope cerrado, precio fijo y ejecución in-house de ingeniería.",
  openGraph: {
    title: "malcom.builder — Software Studio",
    description: "Sistemas digitales de alto rendimiento. Scope cerrado, precio fijo y ejecución in-house de ingeniería.",
    url: baseUrl,
    siteName: "malcom.builder",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "malcom.builder — Software Studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "malcom.builder — Software Studio",
    description: "Sistemas digitales de alto rendimiento. Scope cerrado, precio fijo y ejecución in-house de ingeniería.",
    images: [`${baseUrl}/og-image.png`],
  },
};

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
  display: "swap",
});

// Root layout — owns <html> and <body> (required by Next.js 16).
// The locale-specific lang attribute is set client-side by LocaleLayout.
// suppressHydrationWarning silences the expected mismatch.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${sora.variable} ${syne.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
