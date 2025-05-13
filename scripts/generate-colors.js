#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Temporary library needed
const tempPackage = "@adobe/leonardo-contrast-colors";

// Read primary color from env.development file
const envPath = path.resolve(`./.env.development`);

// 2. read file and parse into object { KEY: 'value', … }
const fileBuffer = fs.readFileSync(envPath);
const parsedEnv = dotenv.parse(fileBuffer); // dotenv.parse từ package dotenv
let primaryLightColorHex = "#222222"; // Default if file cannot be read
let primaryDarkColorHex = "#222222"; // Default if file cannot be read

try {
  if (parsedEnv.PRIMARY_COLOR_LIGHT && parsedEnv.PRIMARY_COLOR_DARK) {
    primaryLightColorHex = parsedEnv.PRIMARY_COLOR_LIGHT;
    primaryDarkColorHex = parsedEnv.PRIMARY_COLOR_DARK;
    console.log(`📌 Primary color retrieved from .env.development`);
  }
} catch (error) {
  console.log(`⚠️ Cannot read .env.development file: ${error.message}`);
  console.log(`⚠️ Using default color`);
}

// Check if the library is already installed
let isInstalled = false;
try {
  require.resolve(tempPackage);
  isInstalled = true;
} catch (e) {
  isInstalled = false;
}

// Install the library if not available
if (!isInstalled) {
  console.log(`📦 Temporarily installing ${tempPackage}...`);
  execSync(`npm install ${tempPackage} --no-save`, { stdio: "inherit" });
}

// Import the library after installation
const { Theme, Color, BackgroundColor } = require(tempPackage);

// Perform tasks with the library
const Background = new BackgroundColor({
  name: "Background",
  colorKeys: ["#ffffff"],
});

const primaryLightColor = new Color({
  name: "primary",
  colorKeys: [primaryLightColorHex],
  ratios: {
    primaryLightest: 1,
    primaryLight: 1.3,
    primary: 2,
    primaryDark: 3,
    primaryDarkest: 5,
    reverse: 17,
  },
});

const primaryDarkColor = new Color({
  name: "primary",
  colorKeys: [primaryDarkColorHex],
  ratios: {
    primaryDarkest: 1,
    primaryDark: 1.3,
    primary: 2.5,
    primaryLight: 4,
    primaryLightest: 5.5,
    reverse: 6.7,
  },
});

const lightTheme = new Theme({
  colors: [primaryLightColor],
  backgroundColor: Background,
  lightness: 97,
});

const darkTheme = new Theme({
  colors: [primaryDarkColor],
  backgroundColor: Background,
  lightness: 10,
  contrast: 3,
});

// Convert results from array to flat object
const transformToFlatObject = (themeColors) => {
  const result = {};

  // Get background color from the first element
  if (themeColors[0] && themeColors[0].background) {
    result.background = themeColors[0].background;
  }

  // Get colors from the second element (if available)
  if (themeColors[1] && themeColors[1].values) {
    themeColors[1].values.forEach((color) => {
      result[color.name] = color.value;
    });
  }

  return result;
};

const result = {
  light: transformToFlatObject(lightTheme.contrastColors),
  dark: transformToFlatObject(darkTheme.contrastColors),
};

// Update COLORS in theme.constant.ts
const themeConstantPath = path.resolve(
  process.cwd(),
  "src/constants/theme.constant.ts"
);
try {
  let themeContent = fs.readFileSync(themeConstantPath, "utf-8");

  // Use stronger regex to find and replace the entire COLORS declaration
  const colorsRegex = /export\s+const\s+COLORS\s*=\s*\{[\s\S]*?\};/;

  if (colorsRegex.test(themeContent)) {
    // If COLORS declaration is found, replace it
    themeContent = themeContent.replace(
      colorsRegex,
      `export const COLORS = ${JSON.stringify(result, null, 2)};`
    );
    fs.writeFileSync(themeConstantPath, themeContent, "utf-8");
    console.log(`✅ COLORS updated in theme.constant.ts`);
  } else {
    // If not found, add to the end of file
    console.log(`⚠️ COLORS declaration not found in theme.constant.ts`);
    console.log(`⚠️ Adding COLORS to the end of file`);
    themeContent += `\n\nexport const COLORS = ${JSON.stringify(
      result,
      null,
      2
    )};`;
    fs.writeFileSync(themeConstantPath, themeContent, "utf-8");
    console.log(`✅ COLORS added to theme.constant.ts`);
  }
} catch (error) {
  console.log(`❌ Cannot update COLORS: ${error.message}`);
}
