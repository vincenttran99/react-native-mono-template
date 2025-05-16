#!/usr/bin/env node

/**
 * Color Theme Generator Script
 * 
 * This script automatically generates a color palette for light and dark themes
 * based on primary colors defined in environment variables.
 * 
 * It uses Adobe's Leonardo Color library to create accessible color scales
 * with proper contrast ratios for both light and dark modes.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

/**
 * The temporary package to install for color generation
 * Adobe Leonardo provides tools for creating accessible color systems
 * with proper contrast ratios
 */
const tempPackage = "@adobe/leonardo-contrast-colors";

/**
 * Read primary colors from the development environment file
 * These colors will be used as the base for generating the entire color palette
 */
const envPath = path.resolve(`./.env.development`);

/**
 * Parse the environment file into a key-value object
 * This extracts all variables defined in the .env.development file
 */
const fileBuffer = fs.readFileSync(envPath);
const parsedEnv = dotenv.parse(fileBuffer); // dotenv.parse from the dotenv package

/**
 * Default fallback colors in case the environment variables are not defined
 * These ensure the script doesn't fail if color values are missing
 */
let primaryLightColorHex = "#222222"; // Default if file cannot be read
let primaryDarkColorHex = "#222222"; // Default if file cannot be read

try {
  /**
   * Extract primary colors from environment variables if they exist
   * PRIMARY_COLOR_LIGHT: Base color for light theme
   * PRIMARY_COLOR_DARK: Base color for dark theme
   */
  if (parsedEnv.PRIMARY_COLOR_LIGHT && parsedEnv.PRIMARY_COLOR_DARK) {
    primaryLightColorHex = parsedEnv.PRIMARY_COLOR_LIGHT;
    primaryDarkColorHex = parsedEnv.PRIMARY_COLOR_DARK;
    console.log(`📌 Primary color retrieved from .env.development`);
  }
} catch (error) {
  console.log(`⚠️ Cannot read .env.development file: ${error.message}`);
  console.log(`⚠️ Using default color`);
}

/**
 * Check if the Leonardo Color library is already installed
 * This prevents unnecessary installations if the package is already available
 */
let isInstalled = false;
try {
  require.resolve(tempPackage);
  isInstalled = true;
} catch (e) {
  isInstalled = false;
}

/**
 * Install the Leonardo Color library if not already available
 * Uses --no-save flag to avoid modifying package.json
 */
if (!isInstalled) {
  console.log(`📦 Temporarily installing ${tempPackage}...`);
  execSync(`npm install ${tempPackage} --no-save`, { stdio: "inherit" });
}

/**
 * Import the Leonardo Color library components after ensuring installation
 * Theme: Creates a theme with background and foreground colors
 * Color: Defines a color with various contrast ratios
 * BackgroundColor: Defines the background color for contrast calculations
 */
const { Theme, Color, BackgroundColor } = require(tempPackage);

/**
 * Define the background color for both themes
 * This is used as the base for calculating contrast ratios
 */
const Background = new BackgroundColor({
  name: "Background",
  colorKeys: ["#ffffff"],
});

/**
 * Define the primary color for light theme with various contrast ratios
 * Each ratio creates a different shade of the primary color:
 * - primaryLightest: Very subtle shade (lowest contrast)
 * - primaryLight: Light shade
 * - primary: Base color
 * - primaryDark: Dark shade
 * - primaryDarkest: Very dark shade
 * - reverse: High contrast version for text on colored backgrounds
 */
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

/**
 * Define the primary color for dark theme with various contrast ratios
 * The ratios are different from light theme to ensure proper visibility
 * in dark mode environments
 */
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

/**
 * Create the light theme with high lightness value (97%)
 * This generates a bright background with appropriate contrast colors
 */
const lightTheme = new Theme({
  colors: [primaryLightColor],
  backgroundColor: Background,
  lightness: 97,
});

/**
 * Create the dark theme with low lightness value (10%)
 * This generates a dark background with higher contrast (3)
 * to ensure visibility of elements
 */
const darkTheme = new Theme({
  colors: [primaryDarkColor],
  backgroundColor: Background,
  lightness: 10,
  contrast: 3,
});

/**
 * Transform the Leonardo theme output into a flat object structure
 * This makes it easier to use in the application's theme system
 * 
 * @param {Array} themeColors - The array of colors from Leonardo Theme
 * @returns {Object} A flat object with color name/value pairs
 */
const transformToFlatObject = (themeColors) => {
  const result = {};

  /**
   * Extract background color from the first element of the array
   * This is typically the base background color
   */
  if (themeColors[0] && themeColors[0].background) {
    result.background = themeColors[0].background;
  }

  /**
   * Extract all color variations from the second element
   * These are the different shades of the primary color
   */
  if (themeColors[1] && themeColors[1].values) {
    themeColors[1].values.forEach((color) => {
      result[color.name] = color.value;
    });
  }

  return result;
};

/**
 * Create the final color object with both light and dark themes
 * This will be used to update the theme constants file
 */
const result = {
  light: transformToFlatObject(lightTheme.contrastColors),
  dark: transformToFlatObject(darkTheme.contrastColors),
};

/**
 * Update the COLORS constant in the theme.constant.ts file
 * This makes the generated colors available to the application
 */
const themeConstantPath = path.resolve(
  process.cwd(),
  "src/constants/theme.constant.ts"
);
try {
  /**
   * Read the current theme constants file
   */
  let themeContent = fs.readFileSync(themeConstantPath, "utf-8");

  /**
   * Regular expression to find the existing COLORS declaration
   * This matches the entire export statement including nested objects
   */
  const colorsRegex = /export\s+const\s+COLORS\s*=\s*\{[\s\S]*?\};/;

  if (colorsRegex.test(themeContent)) {
    /**
     * If COLORS declaration is found, replace it with the new values
     * This preserves the rest of the file while updating only the colors
     */
    themeContent = themeContent.replace(
      colorsRegex,
      `export const COLORS = ${JSON.stringify(result, null, 2)};`
    );
    fs.writeFileSync(themeConstantPath, themeContent, "utf-8");
    console.log(`✅ COLORS updated in theme.constant.ts`);
  } else {
    /**
     * If COLORS declaration is not found, add it to the end of the file
     * This handles the case where the file exists but doesn't have COLORS yet
     */
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
