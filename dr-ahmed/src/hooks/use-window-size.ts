/**
 * useWindowSize
 * Returns the current viewport width and height, updated on resize.
 * Useful for responsive logic that can't be done with CSS alone.
 *
 * Returns `{ width: 0, height: 0 }` on the server (SSR-safe).
 */
import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

