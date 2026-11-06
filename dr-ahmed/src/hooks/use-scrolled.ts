/**
 * useScrolled
 * Returns `true` once the page has scrolled past `threshold` pixels.
 * Used by SiteHeader to switch from transparent → glass style.
 */
import { useEffect, useState } from "react";

export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update(); // set initial value synchronously
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}

