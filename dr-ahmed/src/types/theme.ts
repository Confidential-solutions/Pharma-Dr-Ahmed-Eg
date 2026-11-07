export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggle: (e?: { clientX: number; clientY: number }) => void;
}

