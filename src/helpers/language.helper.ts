import { getLocales as defaultGetLocales, Locale } from "expo-localization";
import {
  AppLanguage,
  type Language,
  LANGUAGES_MAP_CODE2,
  LANGUAGES_MAP_CODE3,
} from "../constants/languages.constant";
import { dedupArrayHelper } from "./array.helper";

export function code2ToCode3(lang: string): string {
  if (lang.length === 2) {
    return LANGUAGES_MAP_CODE2[lang]?.code3 || lang;
  }
  return lang;
}

export function code3ToCode2(lang: string): string {
  if (lang.length === 3) {
    return LANGUAGES_MAP_CODE3[lang]?.code2 || lang;
  }
  return lang;
}

export function code3ToCode2Strict(lang: string): string | undefined {
  if (lang.length === 3) {
    return LANGUAGES_MAP_CODE3[lang]?.code2;
  }

  return undefined;
}

function getLocalizedLanguage(
  langCode: string,
  appLang: string
): string | undefined {
  try {
    const allNames = new Intl.DisplayNames([appLang], {
      type: "language",
      fallback: "none",
      languageDisplay: "standard",
    });
    const translatedName = allNames.of(langCode);

    if (translatedName) {
      // force simple title case (as languages do not always start with an uppercase in Unicode data)
      return translatedName[0].toLocaleUpperCase() + translatedName.slice(1);
    }
  } catch (e) {
    // ignore RangeError from Intl.DisplayNames APIs
    if (!(e instanceof RangeError)) {
      throw e;
    }
  }
}

export function languageName(language: Language, appLang: string): string {
  // if Intl.DisplayNames is unavailable on the target, display the English name
  if (!(Intl as any).DisplayNames) {
    return language.name;
  }

  return getLocalizedLanguage(language.code2, appLang) || language.name;
}

export function codeToLanguageName(lang2or3: string, appLang: string): string {
  const code2 = code3ToCode2(lang2or3);
  const knownLanguage = LANGUAGES_MAP_CODE2[code2];

  return knownLanguage ? languageName(knownLanguage, appLang) : code2;
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
 */
export function sanitizeAppLanguageSetting(appLanguage: string): AppLanguage {
  const langs = appLanguage.split(",").filter(Boolean);

  for (const lang of langs) {
    switch (fixLegacyLanguageCode(lang)) {
      case "en":
        return AppLanguage.en;
      case "vi":
        return AppLanguage.vi;
      default:
        continue;
    }
  }
  return AppLanguage.en;
}

/**
 * Handles legacy migration for Java devices.
 */
export function fixLegacyLanguageCode(code: string | null): string | null {
  if (code === "in") {
    // indonesian
    return "id";
  }
  if (code === "iw") {
    // hebrew
    return "he";
  }
  if (code === "ji") {
    // yiddish
    return "yi";
  }
  return code;
}

/**
 * Find the first language supported by our translation infra. Values should be
 * in order of preference, and match the values of {@link AppLanguage}.
 *
 * If no match, returns `en`.
 */
export function findSupportedAppLanguage(languageTags: (string | undefined)[]) {
  const supported = new Set(Object.values(AppLanguage));
  for (const tag of languageTags) {
    if (!tag) continue;
    if (supported.has(tag as AppLanguage)) {
      return tag;
    }
  }
  return AppLanguage.en;
}

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
 */
export function getLocales() {
  const locales = defaultGetLocales?.() ?? [];
  const output: LocalWithLanguageCode[] = [];

  for (const locale of locales) {
    if (typeof locale.languageCode === "string") {
      if (locale.languageCode === "in") {
        // indonesian
        locale.languageCode = "id";
      }
      if (locale.languageCode === "iw") {
        // hebrew
        locale.languageCode = "he";
      }
      if (locale.languageCode === "ji") {
        // yiddish
        locale.languageCode = "yi";
      }
    }

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

    // @ts-ignore checked above
    output.push(locale);
  }

  return output;
}

export const deviceLocales = getLocales();

/**
 * BCP-47 language tag without region e.g. array of 2-char lang codes
 *
 * {@link https://docs.expo.dev/versions/latest/sdk/localization/#locale}
 */
export const deviceLanguageCodes = dedupArrayHelper(
  deviceLocales.map((l) => l.languageCode)
);
