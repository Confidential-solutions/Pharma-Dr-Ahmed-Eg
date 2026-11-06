/**
 * @/hooks — barrel export
 *
 * All custom React hooks for the Dr. Ahmed Pharmacy frontend.
 * Import from this barrel for clean, predictable paths:
 *
 *   import { useScrolled, useLightbox } from "@/hooks";
 */

export { useIsMobile }         from "./use-mobile";
export { useScrolled }         from "./use-scrolled";
export { useMenuDismiss }      from "./use-menu-dismiss";
export { useLightbox }         from "./use-lightbox";
export { useContactForm }      from "./use-contact-form";
export { useSupabaseTodos }    from "./use-supabase-todos";
export type { Todo }           from "./use-supabase-todos";
export { useWindowSize }       from "./use-window-size";
export { useLocalStorage }     from "./use-local-storage";
export { useAuthDialog }       from "./use-auth-dialog";

