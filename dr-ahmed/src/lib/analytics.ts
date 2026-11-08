/**
 * analytics.ts
 * ------------
 * Google Analytics 4 (GA4) & Google Tag Manager (GTM) integration for Dr. Ahmed Pharmacy app.
 *
 * Both the GA4 measurement tag (G-TV0ZV5NW05) and GTM container (GTM-PC5977NB)
 * are mounted in the SSR <head> of the root route (`src/routes/__root.tsx`).
 * These helpers push additional events into the dataLayer from client-side code
 * (SPA route changes, pharmacy actions, etc.).
 */

/** Google Analytics 4 Measurement ID for Dr. Ahmed Pharmacy. */
export const GA_MEASUREMENT_ID = "G-TV0ZV5NW05";

/** Google Tag Manager container ID for Dr. Ahmed Pharmacy. */
export const GTM_CONTAINER_ID = "GTM-PC5977NB";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function getAnalyticsWindow(): AnalyticsWindow | undefined {
  if (typeof window === "undefined") return undefined;
  return window as unknown as AnalyticsWindow;
}

/**
 * Push a custom event into the GTM / GA4 dataLayer (client-side only).
 * Mirrors the official gtag shim: `dataLayer.push(arguments)`.
 */
export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  try {
    const win = getAnalyticsWindow();
    if (!win?.gtag) return;
    win.gtag("event", event, params);
  } catch {
    // Non-blocking: analytics failures should never disrupt UI rendering
  }
}

/**
 * Track a page view into GA4 and GTM (client-side only).
 * Required for SPAs: the browser does not reload on client-side navigation,
 * so GA4/GTM never sees route changes unless we push the events ourselves.
 */
export function trackPageView(path: string, title?: string): void {
  try {
    const win = getAnalyticsWindow();
    if (!win?.gtag) return;
    const safePath = typeof path === "string" ? path : String(path || "/");
    win.gtag("event", "page_view", {
      page_path: safePath,
      page_title: title,
      send_to: GA_MEASUREMENT_ID,
    });
  } catch {
    // Non-blocking: analytics failures should never disrupt UI rendering
  }
}
