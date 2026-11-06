/**
 * useLocalStorage
 * Type-safe localStorage hook with SSR guard and cross-tab sync.
 *
 * @param key     localStorage key
 * @param initial Value to use when the key is absent or unreadable
 *
 * @example
 *   const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
 */
import { useCallback, useEffect, useState } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initial: T): [T, SetValue<T>] {
  const read = (): T => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  };

  const [stored, setStored] = useState<T>(read);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStored((prev) => {
        const next = typeof value === "function" ? (value as (p: T) => T)(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // quota exceeded or private mode — silently ignore
        }
        return next;
      });
    },
    [key],
  );

  // Sync across browser tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStored(JSON.parse(e.newValue) as T);
        } catch {
          // malformed value — ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [stored, setValue];
}

