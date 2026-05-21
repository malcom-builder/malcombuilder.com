import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { HtmlLang } from "@/components/ui/HtmlLang";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
// globals.css is imported in the root layout

type Locale = "es" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://malcom.builder";
  const url = `${baseUrl}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: { es: `${baseUrl}/es`, en: `${baseUrl}/en` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "malcom.builder",
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Explicitly set the locale for next-intl server components
  const { setRequestLocale } = await import("next-intl/server");
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <NextIntlClientProvider messages={messages}>
        {/* Sets document.documentElement.lang on the client */}
        <HtmlLang locale={locale} />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
