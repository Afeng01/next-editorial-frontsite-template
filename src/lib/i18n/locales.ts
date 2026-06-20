export const SUPPORTED_LOCALES = ["en", "zh"] as const;
const SUPPORTED_LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  return value != null && SUPPORTED_LOCALE_SET.has(value);
}
