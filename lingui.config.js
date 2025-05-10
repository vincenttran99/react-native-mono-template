import { defineConfig } from "@lingui/cli";
const fs = require("fs");
const path = require("path");

// read .env.development
const envFile = fs.readFileSync(
  path.join(__dirname, ".env.development"),
  "utf8"
);
const envVars = {};

envFile.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

export default defineConfig({
  sourceLocale: envVars.DEFAULT_LANGUAGE_CODE,
  // locales: [envVars.DEFAULT_LANGUAGE_CODE, "en", "vi", "ja", etc....],
  locales: [envVars.DEFAULT_LANGUAGE_CODE, "vi"],
  catalogs: [
    {
      path: "<rootDir>/src/locale/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
});
