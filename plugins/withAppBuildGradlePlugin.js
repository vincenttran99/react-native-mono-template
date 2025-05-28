const { withAppBuildGradle } = require("expo/config-plugins");
const {
  mergeContents,
} = require("@expo/config-plugins/build/utils/generateCode");
const getEnvVars = require("../scripts/env-object").default;

/**
 * Custom Expo config plugin to inject environment variables into Android build.gradle
 *
 * This plugin automatically exposes environment variables from .env files to the
 * Android app as BuildConfig fields, making them accessible in native Android code.
 *
 * The plugin works by modifying the app/build.gradle file during the build process
 * to add buildConfigField declarations for each environment variable.
 *
 * @param {object} config - The Expo config object
 * @returns {object} Modified config with updated build.gradle contents
 */
function withAppBuildGradlePlugin(config) {
  return withAppBuildGradle(config, (mod) => {
    /**
     * Get the current contents of the build.gradle file
     */
    const contents = mod.modResults.contents;

    /**
     * Load environment variables from the appropriate .env file
     * Uses the getEnvVars helper from scripts/env-object.js
     */
    const envVars = getEnvVars();

    /**
     * Tag used to identify the section in build.gradle where
     * environment variables should be inserted or replaced
     */
    const tag = "build-config-fields";

    /**
     * Generate buildConfigField declarations for each environment variable
     *
     * This maps each environment variable to the appropriate Android BuildConfig field:
     * - Boolean values (true/false) are converted to boolean type
     * - All other values are treated as strings with proper escaping
     *
     * The resulting string will be inserted into the build.gradle file
     */
    let newLines = Object.entries(envVars)
      .map(([key, value]) => {
        // If value is "true" or "false", use boolean
        if (value === "true" || value === "false") {
          return `buildConfigField "boolean", "${key}", "${value}"`;
        }
        // Otherwise, keep it as String with escaped quotes
        return `buildConfigField "String", "${key}", "\\"${value}\\""`;
      })
      .join("\n        ");

    /**
     * Add resValue for notification color using PRIMARY_COLOR
     * This will be used by the notification icon in the Android manifest
     */
    // Get PRIMARY_COLOR from environment variables or use a default value
    const primaryColor = envVars.PRIMARY_COLOR || "#000000";

    // Create the resValue line for notification color
    const resValueLine = `resValue "color", "notification_color", "${primaryColor}"`;

    newLines = newLines.concat("\n        ", resValueLine);

    /**
     * Insert or replace the buildConfigField declarations in the build.gradle file
     *
     * Uses the mergeContents utility from Expo config plugins to:
     * 1. Find the defaultConfig section in build.gradle
     * 2. Insert the generated buildConfigField declarations
     * 3. Wrap them with appropriate comment markers for future updates
     *
     * If the section already exists (identified by the tag), it will be replaced
     * If it doesn't exist, it will be inserted at the specified location
     */
    const result = mergeContents({
      src: contents, // Source content (build.gradle file)
      tag, // Tag to identify the section
      anchor: /defaultConfig\s*{/, // Regex to find insertion point
      offset: 1, // Lines to skip after the anchor
      newSrc: `        ${newLines}`, // Content to insert
      comment: "//", // Comment style for markers
    });

    /**
     * Update the build.gradle contents with the modified version
     */
    mod.modResults.contents = result.contents;
    return mod;
  });
}

module.exports = withAppBuildGradlePlugin;
