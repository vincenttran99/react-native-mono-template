/**
 * Formats a number with optional suffixes for Billion, Million, and Thousand.
 *
 * @param {number | string} value - The number to format.
 * @param {number} fractionDigits - The number of digits after the decimal point (default is 1).
 * @param {"Billion" | "Million" | "Thousand" | undefined} suffix - Optional suffix for Billion, Million, or Thousand.
 * @returns {string} - The formatted number with suffix.
 *
 * Example:
 * formatNumberWithSuffix(1500000, 2, "Million")
 * // Returns: '1.50M'
 */
export const formatNumberWithSuffixHelper = (
  value: number | string,
  fractionDigits: number = 1,
  suffix?: "Billion" | "Million" | "Thousand" | undefined
): string => {
  const numberValue = isNaN(Number(value)) ? 0 : Number(value);

  // Determine the appropriate suffix and format the number accordingly
  if (
    (suffix === "Billion" || suffix === undefined) &&
    numberValue >= 1_000_000_000
  ) {
    return numberValue % 1_000_000_000 === 0
      ? `${numberValue / 1_000_000_000}B`
      : `${(numberValue / 1_000_000_000).toFixed(fractionDigits)}B`;
  }

  if (
    (suffix === "Million" || suffix === undefined) &&
    numberValue >= 1_000_000
  ) {
    return numberValue % 1_000_000 === 0
      ? `${numberValue / 1_000_000}M`
      : `${(numberValue / 1_000_000).toFixed(fractionDigits)}M`;
  }

  if ((suffix === "Thousand" || suffix === undefined) && numberValue >= 1_000) {
    return numberValue % 1_000 === 0
      ? `${numberValue / 1_000}k`
      : `${(numberValue / 1_000).toFixed(fractionDigits)}k`;
  }

  // If no suffix is applicable, return the number as is
  return `${Math.max(numberValue, 0).toFixed(fractionDigits)}`;
};
