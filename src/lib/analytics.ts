"use client";

const IS_PROD = process.env.NODE_ENV === "production";

// Helper to check if gtag is loaded on the client side
const isGtagLoaded = (): boolean => {
  return typeof window !== "undefined" && typeof (window as any).gtag === "function";
};

/**
 * Tracks a custom event in Google Analytics
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  // If in development mode, log to console for debugging
  if (!IS_PROD) {
    console.log(
      `[Analytics Dev] 📊 Event -> Action: "${action}" | Category: "${category}" | Label: "${label || ""}" | Value: ${value !== undefined ? value : ""}`
    );
  }

  if (isGtagLoaded()) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Tracks CTA clicks (e.g. Navbar CTA, Hero button, CTA section heading)
 */
export function trackCTA(buttonName: string, location: string) {
  trackEvent("click_cta", "Engagement", `${buttonName} (${location})`);
}

/**
 * Tracks clicks on projects (external live link, github repository, or details page)
 */
export function trackProjectClick(projectTitle: string, linkType: "live" | "github" | "details") {
  trackEvent("view_project", "Portfolio", `${projectTitle} - ${linkType}`);
}

/**
 * Tracks clicks on social links (footer / about)
 */
export function trackSocialClick(platform: string) {
  trackEvent("click_social", "Engagement", platform);
}

/**
 * Tracks brief form step completions
 */
export function trackBriefStep(stepNumber: number, stepName: string) {
  trackEvent("brief_step_complete", "Brief Funnel", `Step ${stepNumber}: ${stepName}`, stepNumber);
}

/**
 * Tracks brief form submissions
 */
export function trackBriefSubmit(status: "success" | "error") {
  trackEvent("brief_submit", "Brief Funnel", status);
}

/**
 * Tracks language switches
 */
export function trackLanguageToggle(locale: string) {
  trackEvent("toggle_language", "Preferences", locale);
}
