"use client";

import { useEffect } from "react";

// Sets document.documentElement.lang to the current locale on the client.
// This is needed because the root layout (which owns <html>) doesn't have
// access to the [locale] segment params in Next.js 16.
export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
