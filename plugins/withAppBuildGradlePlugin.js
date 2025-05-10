const { withAppBuildGradle } = require("expo/config-plugins");
const {
  mergeContents,
} = require("@expo/config-plugins/build/utils/generateCode");
const getEnvVars = require("../scripts/env-object").default;

function withAppBuildGradlePlugin(config) {
  return withAppBuildGradle(config, (mod) => {
    const contents = mod.modResults.contents;
    const envVars = getEnvVars();
    const tag = "build-config-fields";

    // Create buildConfigField string for each environment variable
    const newLines = Object.entries(envVars)
      .map(([key, value]) => {
        // If value is "true" or "false", use boolean
        if (value === "true" || value === "false") {
          return `buildConfigField "boolean", "${key}", "${value}"`;
        }
        // Otherwise, keep it as String with escaped quotes
        return `buildConfigField "String", "${key}", "\\"${value}\\""`;
      })
      .join("\n        ");

    // Insert or replace between two markers identified by tag
    const result = mergeContents({
      src: contents,
      tag,
      anchor: /defaultConfig\s*{/,
      offset: 1,
      newSrc: `        ${newLines}`,
      comment: "//",
    });

    mod.modResults.contents = result.contents;
    return mod;
  });
}

module.exports = withAppBuildGradlePlugin;
