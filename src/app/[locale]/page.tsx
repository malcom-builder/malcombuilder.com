import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Method } from "@/components/sections/Method";
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";

import { setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Method />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
