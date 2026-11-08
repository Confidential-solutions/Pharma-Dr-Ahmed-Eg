/**
 * analytics.ts
 * ------------
 * Google Tag Manager (GTM) integration for Dr. Ahmed Pharmacy app.
 *
 * The GTM container snippet (GTM-WWF6MTLW) is mounted in the SSR <head> of the
 * root route (`src/routes/__root.tsx`) and initializes the `dataLayer` there.
 * These helpers push additional events into the same dataLayer from
 * client-side code (SPA route changes, pharmacy actions, etc.).
 */

/** Google Tag Manager container ID for Dr. Ahmed Pharmacy. */
export const GTM_CONTAINER_ID = "GTM-WWF6MTLW";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function getAnalyticsWindow(): AnalyticsWindow | undefined {
  if (typeof window === "undefined") return undefined;
  return window as unknown as AnalyticsWindow;
}

/**
 * Push a custom event into the GTM dataLayer (client-side only).
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
 * Track a page view into the GTM dataLayer (client-side only).
 * Required for SPAs: the browser does not reload on client-side navigation,
 * so GTM/GA4 never sees route changes unless we push the events ourselves.
 */
export function trackPageView(path: string, title?: string): void {
  try {
    const win = getAnalyticsWindow();
    if (!win?.gtag) return;
    const safePath = typeof path === "string" ? path : String(path || "/");
    win.gtag("event", "page_view", { page_path: safePath, page_title: title });
  } catch {
    // Non-blocking: analytics failures should never disrupt UI rendering
  }
}
