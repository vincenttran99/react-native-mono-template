import { getLocales as defaultGetLocales, Locale } from "expo-localization";
import {
  AppLanguage,
  type Language,
  LANGUAGES_MAP_CODE2,
  LANGUAGES_MAP_CODE3,
} from "../constants/languages.constant";
import { removeDuplicatesHelper } from "./array.helper";

/**
 * Converts a 2-character ISO language code to its 3-character equivalent
 * Uses the LANGUAGES_MAP_CODE2 mapping to find the corresponding 3-character code
 * 
 * @param lang - The 2-character language code to convert
 * @returns The 3-character language code or the original string if no mapping exists
 * 
 * @example
 * code2ToCode3Helper("en") // Returns "eng"
 * code2ToCode3Helper("fr") // Returns "fra"
 */
export function code2ToCode3Helper(lang: string): string {
  if (lang.length === 2) {
    return LANGUAGES_MAP_CODE2[lang]?.code3 || lang;
  }
  return lang;
}

/**
 * Converts a 3-character ISO language code to its 2-character equivalent
 * Uses the LANGUAGES_MAP_CODE3 mapping to find the corresponding 2-character code
 * 
 * @param lang - The 3-character language code to convert
 * @returns The 2-character language code or the original string if no mapping exists
 * 
 * @example
 * code3ToCode2Helper("eng") // Returns "en"
 * code3ToCode2Helper("fra") // Returns "fr"
 */
export function code3ToCode2Helper(lang: string): string {
  if (lang.length === 3) {
    return LANGUAGES_MAP_CODE3[lang]?.code2 || lang;
  }
  return lang;
}

/**
 * Strictly converts a 3-character ISO language code to its 2-character equivalent
 * Unlike code3ToCode2Helper, this returns undefined if no mapping exists
 * 
 * @param lang - The 3-character language code to convert
 * @returns The 2-character language code or undefined if no mapping exists
 * 
 * @example
 * code3ToCode2StrictHelper("eng") // Returns "en"
 * code3ToCode2StrictHelper("xyz") // Returns undefined
 */
export function code3ToCode2StrictHelper(lang: string): string | undefined {
  if (lang.length === 3) {
    return LANGUAGES_MAP_CODE3[lang]?.code2;
  }

  return undefined;
}

/**
 * Gets the localized name of a language in the specified application language
 * Uses the Intl.DisplayNames API to get the translated language name
 * 
 * @param langCode - The language code to get the name for
 * @param appLang - The language code to use for translation
 * @returns The localized language name or undefined if translation fails
 * 
 * @private
 */
function getLocalizedLanguageHelper(
  langCode: string,
  appLang: string
): string | undefined {
  try {
    // Create a DisplayNames instance for the specified application language
    const allNames = new Intl.DisplayNames([appLang], {
      type: "language",
      fallback: "none",
      languageDisplay: "standard",
    });
    
    // Get the translated name of the language
    const translatedName = allNames.of(langCode);

    if (translatedName) {
      // Force simple title case (as languages do not always start with an uppercase in Unicode data)
      return translatedName[0].toLocaleUpperCase() + translatedName.slice(1);
    }
  } catch (e) {
    // Ignore RangeError from Intl.DisplayNames APIs
    if (!(e instanceof RangeError)) {
      throw e;
    }
  }
}

/**
 * Gets the localized name of a language object in the specified application language
 * Falls back to the English name if Intl.DisplayNames is unavailable
 * 
 * @param language - The language object containing code2 and name properties
 * @param appLang - The language code to use for translation
 * @returns The localized language name
 * 
 * @example
 * languageNameHelper({ code2: "fr", name: "French" }, "es") // Returns "Francés"
 */
export function languageNameHelper(language: Language, appLang: string): string {
  // If Intl.DisplayNames is unavailable on the target, display the English name
  if (!(Intl as any).DisplayNames) {
    return language.name;
  }

  return getLocalizedLanguageHelper(language.code2, appLang) || language.name;
}

/**
 * Converts a language code (2 or 3 characters) to its localized name
 * 
 * @param lang2or3 - The language code (2 or 3 characters)
 * @param appLang - The language code to use for translation
 * @returns The localized language name or the original code if no mapping exists
 * 
 * @example
 * codeToLanguageNameHelper("fr", "es") // Returns "Francés"
 * codeToLanguageNameHelper("fra", "es") // Returns "Francés"
 */
export function codeToLanguageNameHelper(lang2or3: string, appLang: string): string {
  // Convert to 2-character code if it's a 3-character code
  const code2 = code3ToCode2Helper(lang2or3);
  // Look up the language object
  const knownLanguage = LANGUAGES_MAP_CODE2[code2];

  // Return the localized name if the language is known, otherwise return the code
  return knownLanguage ? languageNameHelper(knownLanguage, appLang) : code2;
}

/**
 * Returns a valid `appLanguage` value from an arbitrary string.
 *
 * Context: post-refactor, we populated some user's `appLanguage` setting with
 * `postLanguage`, which can be a comma-separated list of values. This breaks
 * `appLanguage` handling in the app, so we introduced this util to parse out a
 * valid `appLanguage` from the pre-populated `postLanguage` values.
 *
 * The `appLanguage` will continue to be incorrect until the user returns to
 * language settings and selects a new option, at which point we'll re-save
 * their choice, which should then be a valid option. Since we don't know when
 * this will happen, we should leave this here until we feel it's safe to
 * remove, or we re-migrate their storage.
 * 
 * @param appLanguage - The potentially invalid app language string
 * @returns A valid AppLanguage enum value
 */
export function sanitizeAppLanguageSettingHelper(appLanguage: string): AppLanguage {
  // Split by comma and filter out empty strings
  const languageCodes = appLanguage.split(",").filter(Boolean);

  // Check each language code against supported languages
  for (const langCode of languageCodes) {
    switch (fixLegacyLanguageCodeHelper(langCode)) {
      case "en":
        return AppLanguage.en;
      case "vi":
        return AppLanguage.vi;
      default:
        continue;
    }
  }
  
  // Default to English if no supported language is found
  return AppLanguage.en;
}

/**
 * Handles legacy migration for Java devices.
 * Converts deprecated ISO 639-1 language codes to their modern equivalents
 * 
 * @param code - The language code to fix
 * @returns The corrected language code or the original if no correction is needed
 * 
 * @example
 * fixLegacyLanguageCodeHelper("in") // Returns "id" (Indonesian)
 * fixLegacyLanguageCodeHelper("iw") // Returns "he" (Hebrew)
 */
export function fixLegacyLanguageCodeHelper(code: string | null): string | null {
  if (code === "in") {
    // Indonesian
    return "id";
  }
  if (code === "iw") {
    // Hebrew
    return "he";
  }
  if (code === "ji") {
    // Yiddish
    return "yi";
  }
  return code;
}

/**
 * Find the first language supported by our translation infrastructure
 * Values should be in order of preference, and match the values of AppLanguage
 * 
 * @param languageTags - Array of language tags to check for support
 * @returns The first supported language or "en" if none are supported
 * 
 * @example
 * findSupportedAppLanguageHelper(["fr", "en", "es"]) // Returns "en" if only English is supported
 */
export function findSupportedAppLanguageHelper(languageTags: (string | undefined)[]): string {
  // Create a set of all supported languages from AppLanguage enum
  const supportedLanguages = new Set(Object.values(AppLanguage));
  
  // Check each language tag against supported languages
  for (const tag of languageTags) {
    if (!tag) continue;
    if (supportedLanguages.has(tag as AppLanguage)) {
      return tag;
    }
  }
  
  // Default to English if no supported language is found
  return AppLanguage.en;
}

/**
 * Extended Locale type that ensures languageCode is present
 * This is needed because the original Locale type has optional languageCode
 */
type LocalWithLanguageCode = Locale & {
  languageCode: string;
};

/**
 * Normalized locales
 *
 * Handles legacy migration for Java devices.
 *
 * {@link https://github.com/bluesky-social/social-app/pull/4461}
 * {@link https://xml.coverpages.org/iso639a.html}
 *
 * Convert Chinese language tags for Native.
 *
 * {@link https://datatracker.ietf.org/doc/html/rfc5646#appendix-A}
 * {@link https://developer.apple.com/documentation/packagedescription/languagetag}
 * {@link https://gist.github.com/amake/0ac7724681ac1c178c6f95a5b09f03ce#new-locales-vs-old-locales-chinese}
 * 
 * @returns Array of normalized locale objects
 */
export function getLocalesHelper(): LocalWithLanguageCode[] {
  // Get locales from expo-localization or empty array if not available
  const locales = defaultGetLocales?.() ?? [];
  const normalizedLocales: LocalWithLanguageCode[] = [];

  // Process each locale to normalize language codes
  for (const locale of locales) {
    // Fix legacy language codes
    if (typeof locale.languageCode === "string") {
      if (locale.languageCode === "in") {
        // Indonesian
        locale.languageCode = "id";
      }
      if (locale.languageCode === "iw") {
        // Hebrew
        locale.languageCode = "he";
      }
      if (locale.languageCode === "ji") {
        // Yiddish
        locale.languageCode = "yi";
      }
    }

    // Normalize Chinese language tags
    if (typeof locale.languageTag === "string") {
      if (
        locale.languageTag.startsWith("zh-Hans") ||
        locale.languageTag === "zh-CN"
      ) {
        // Simplified Chinese to zh-Hans-CN
        locale.languageTag = "zh-Hans-CN";
      }
      if (
        locale.languageTag.startsWith("zh-Hant") ||
        locale.languageTag === "zh-TW"
      ) {
        // Traditional Chinese to zh-Hant-TW
        locale.languageTag = "zh-Hant-TW";
      }
    }

    // Add to normalized locales
    // @ts-ignore checked above
    normalizedLocales.push(locale);
  }

  return normalizedLocales;
}

/**
 * Cached result of getLocalesHelper to avoid repeated processing
 * Contains normalized locale information for the device
 */
export const deviceLocales = getLocalesHelper();

/**
 * BCP-47 language tag without region e.g. array of 2-char lang codes
 * Extracted from device locales and deduplicated
 *
 * {@link https://docs.expo.dev/versions/latest/sdk/localization/#locale}
 */
export const deviceLanguageCodes = removeDuplicatesHelper(
  deviceLocales.map((locale) => locale.languageCode)
);
