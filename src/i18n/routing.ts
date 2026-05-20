import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localeDetection: false, // URL is the single source of truth; ignores Accept-Language header
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
