/**
 * useMenuDismiss
 * Closes a floating menu (mobile nav, dropdown, etc.) when the user:
 *   - clicks/taps outside the ref element  (pointerdown)
 *   - presses Escape
 *   - resizes the viewport above a breakpoint (default 1024 px)
 *
 * Pass `open` and `setOpen` from the parent's useState so this hook
 * stays a pure behaviour layer with no internal state.
 */
import { type RefObject, useEffect } from "react";

export function useMenuDismiss(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  setOpen: (v: boolean) => void,
  breakpoint = 1024,
): void {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= breakpoint) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, setOpen, ref, breakpoint]);
}

