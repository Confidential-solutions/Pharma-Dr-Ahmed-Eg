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

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push a custom event into the GTM dataLayer (client-side only).
 * Mirrors the official gtag shim: `dataLayer.push(arguments)`.
 */
export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

/**
 * Track a page view into the GTM dataLayer (client-side only).
 * Required for SPAs: the browser does not reload on client-side navigation,
 * so GTM/GA4 never sees route changes unless we push the events ourselves.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path, page_title: title });
}
