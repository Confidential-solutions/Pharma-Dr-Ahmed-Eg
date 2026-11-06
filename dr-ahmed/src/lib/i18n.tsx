/**
 * Re-exporting i18n modules from the modular @/i18n directory.
 * Preserves backwards compatibility for any imports from @/lib/i18n.
 */
export * from "@/i18n";
export type Dict = import("@/i18n").LocaleDictionary;
