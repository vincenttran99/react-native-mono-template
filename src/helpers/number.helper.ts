import dayjs from "dayjs";

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

/**
 * Formats a given number or numeric string to a currency format with thousand separators.
 *
 * @param value - The input value to be formatted, either as a number or a numeric string.
 * @param hasUnit
 * @returns A string representing the formatted currency.
 * @throws Will throw an error if the input is not a valid number.
 */
export function formatCurrencyHelper(
  value: any,
  hasUnit: boolean = true
): string {
  // Convert the input to a number
  const num = typeof value === "string" ? parseFloat(value) : value;

  // Check if the converted value is a valid number
  if (typeof num !== "number" || isNaN(num)) {
    return "";
  }

  // Format the number to a string with thousand separators
  return num.toLocaleString("vi-VN") + (hasUnit ? "₫" : "");
}

export function calculateDiscountPercentageHelper(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= 0 || currentPrice < 0) {
    throw new Error("price invalid");
  }

  const discountPercentage =
    ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discountPercentage);
}

export function fakeAmountBuyHelper(
  createTime: string = "",
  amount: number = 0,
  id: any = 60
) {
  let index = Number(id || 60);
  let idIndex =
    index < 73 ||
    (index < 117 && index > 106) ||
    index === 155 ||
    index === 154 ||
    index === 129 ||
    index === 128 ||
    index === 116
      ? 9
      : 2;
  idIndex = index === 1 ? 20 : idIndex;
  let date = dayjs(Number(createTime || 0));
  let dateValue = (date.second() || 30) / 3;
  let dayValue = Math.max((dayjs().diff(date, "day") || 1) - 40, 5);
  return (
    (dayValue * (dateValue < 5 ? dateValue + 5 : dateValue) + amount) *
      idIndex +
    idIndex
  );
}

export function normalizeAndDrawIndexHelper(rates: number[]) {
  // Bước 1: Chuẩn hóa tỷ lệ
  const totalRate = rates.reduce((sum, rate) => sum + rate, 0);
  const adjustmentFactor = 100 / totalRate;
  const normalizedRates = rates.map((rate) => rate * adjustmentFactor);

  // Bước 2: Tính xác suất tích lũy
  let cumulativeRate = 0;
  const cumulativeRates = normalizedRates.map((rate) => {
    cumulativeRate += rate;
    return cumulativeRate;
  });

  console.log(cumulativeRates, "cumulativeRates");

  // Bước 3: Quay số ngẫu nhiên và xác định index trúng thưởng
  const randomNumber = Math.random() * 100;
  return cumulativeRates.findIndex(
    (cumulativeRate) => randomNumber <= cumulativeRate
  );
}
