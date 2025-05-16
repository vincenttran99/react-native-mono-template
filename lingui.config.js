import { defineConfig } from "@lingui/cli";
const fs = require("fs");
const path = require("path");

/**
 * Read environment variables from .env.development file
 * This allows the configuration to adapt based on environment settings
 * without hardcoding values directly in this file
 */
const envFile = fs.readFileSync(
  path.join(__dirname, ".env.development"),
  "utf8"
);

/**
 * Parse environment variables from the .env file
 * Creates an object with key-value pairs from each line in the .env file
 */
const envVars = {};

envFile.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

/**
 * Lingui configuration for internationalization
 * This exports the configuration used by the Lingui CLI for extracting,
 * compiling, and managing translation messages
 */
export default defineConfig({
  /**
   * Source locale is the language used in source code
   * All other translations will be derived from this language
   * Value is taken from environment variable DEFAULT_LANGUAGE_CODE
   */
  sourceLocale: envVars.DEFAULT_LANGUAGE_CODE,
  
  /**
   * List of supported locales for the application
   * Currently supporting the default language and Vietnamese
   * Can be expanded to include more languages as needed
   * Example: ["en", "vi", "ja", "fr", "es", ...]
   */
  // locales: [envVars.DEFAULT_LANGUAGE_CODE, "en", "vi", "ja", etc....],
  locales: [envVars.DEFAULT_LANGUAGE_CODE, "vi"],
  
  /**
   * Catalogs configuration defines where translation files are stored
   * and which source files should be scanned for messages
   */
  catalogs: [
    {
      /**
       * Path pattern for message catalogs
       * {locale} will be replaced with each locale from the locales array
       * <rootDir> refers to the project root directory
       */
      path: "<rootDir>/src/locale/locales/{locale}/messages",
      
      /**
       * Directories to scan for translatable messages
       * Only files in these directories will be processed
       */
      include: ["src"],
    },
  ],
  
  /**
   * Format of the translation files
   * "po" is the Gettext PO format, a widely used translation file format
   * Other options include "json", "minimal", "po-gettext", etc.
   */
  format: "po",
});
