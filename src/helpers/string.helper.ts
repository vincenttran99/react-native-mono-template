import { SHORT_CHARACTERS } from "constants/string.constant";

/**
 * addOpacityToColor
 *
 * This function takes a color string and an opacity value as inputs,
 * and returns the color with the specified opacity applied.
 * The function supports HEX (both 3-digit and 6-digit) and RGB/RGBA color formats.
 *
 * @param {string} color - The color string in HEX or RGB/RGBA format.
 * @param {number} opacity - The opacity value (between 0 and 1).
 * @return {string} The color with the specified opacity in RGBA format, or null if the color format is unrecognized.
 */
export const addOpacityToColorHelper = (color: string, opacity: number) => {
  // Check if the color is in HEX format
  if (color.startsWith("#")) {
    // Handle 6-digit HEX color (#RRGGBB)
    if (color.length === 7) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // Handle 3-digit HEX color (#RGB)
    else if (color.length === 4) {
      const r = parseInt(color[1] + color[1], 16);
      const g = parseInt(color[2] + color[2], 16);
      const b = parseInt(color[3] + color[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
  // Check if the color is in RGB or RGBA format
  else if (color.startsWith("rgb")) {
    // Extract the RGB(A) values
    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(",");
    const r = parseInt(rgba[0], 10);
    const g = parseInt(rgba[1], 10);
    const b = parseInt(rgba[2], 10);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  // If the color format is not recognized, return #ffffff
  return "#ffffff";
};

/**
 * Counts the number of "short" characters in a given string.
 * @param input - The string to analyze.
 * @returns The count of short characters.
 */
export function countShortCharactersHelper(input: string): number {
  let count = 0;
  for (const char of input) {
    if (SHORT_CHARACTERS.has(char)) {
      count++;
    }
  }
  return count;
}
