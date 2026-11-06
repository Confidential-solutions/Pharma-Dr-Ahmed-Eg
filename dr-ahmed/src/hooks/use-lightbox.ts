/**
 * useLightbox
 * Manages the active-image index for a photo lightbox.
 * Also locks body scroll while the lightbox is open and handles
 * keyboard navigation (Escape to close, ArrowLeft / ArrowRight).
 */
import { useCallback, useEffect, useState } from "react";

interface UseLightboxReturn {
  active: number | null;
  open: (index: number) => void;
  close: () => void;
  prev: () => void;
  next: () => void;
}

export function useLightbox(total: number): UseLightboxReturn {
  const [active, setActive] = useState<number | null>(null);

  const open = useCallback((index: number) => setActive(index), []);
  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + total) % total)),
    [total],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % total)),
    [total],
  );

  // Keyboard navigation
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  // Prevent background scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return { active, open, close, prev, next };
}

