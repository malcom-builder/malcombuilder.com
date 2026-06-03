import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const BriefForm = dynamic(() => import("@/components/sections/BriefForm").then((mod) => mod.BriefForm), {
  loading: () => (
    <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-muted)" }}>
      Loading...
    </div>
  ),
});
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const title =
    locale === "en"
      ? "Tell us about your project — malcom.builder"
      : "Contame sobre tu proyecto — malcom.builder";
      
  const description =
    locale === "en"
      ? "Complete this form and get a proposal in less than 24 hours. No commitments."
      : "Completá este formulario y te respondo con una propuesta en menos de 24 horas. Sin compromisos.";

  const baseUrl = "https://malcombuilder.com";
  const url = `${baseUrl}/${locale}/brief`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${baseUrl}/es/brief`,
        en: `${baseUrl}/en/brief`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "malcom.builder",
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BriefPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0E0E14]">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center pt-12 pb-16">
        <BriefForm />
      </main>
      <Footer />
    </div>
  );
}
