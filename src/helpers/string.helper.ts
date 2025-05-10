import { NAVIGATION_DETAIL_PRODUCT_SCREEN } from "constants/navigation.constant";
import crypto from "react-native-quick-crypto";
import { CONFIG } from "constants/config.constant";
import { setRefCodeHelper, setTargetScreenHelper } from "./storage.helper";

/**
 * This function normalizes a Vietnamese string by removing accents and special characters.
 * It replaces Vietnamese characters with their closest English equivalents, removes combining accents,
 * eliminates extra spaces, and removes punctuation and special characters.
 *
 * @param {string} input - The Vietnamese string to be normalized.
 * @returns {string} - The normalized string with Vietnamese tones and special characters removed.
 *
 * Example:
 * normalizeVietnameseString('Tiếng Việt có dấu')
 * // Returns: 'Tieng Viet co dau'
 */
export const normalizeVietnameseStringHelper = (input: string): string => {
  if (!input) {
    return "";
  }

  const vietnameseToEnglishMap: { [key: string]: string } = {
    àáạảãâầấậẩẫăằắặẳẵ: "a",
    èéẹẻẽêềếệểễ: "e",
    ìíịỉĩ: "i",
    òóọỏõôồốộổỗơờớợởỡ: "o",
    ùúụủũưừứựửữ: "u",
    ỳýỵỷỹ: "y",
    đ: "d",
    ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ: "A",
    ÈÉẸẺẼÊỀẾỆỂỄ: "E",
    ÌÍỊỈĨ: "I",
    ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ: "O",
    ÙÚỤỦŨƯỪỨỰỬỮ: "U",
    ỲÝỴỶỸ: "Y",
    Đ: "D",
  };

  // Replace Vietnamese characters with corresponding English characters
  for (const [vietChars, engChar] of Object.entries(vietnameseToEnglishMap)) {
    const regex = new RegExp(`[${vietChars}]`, "g");
    input = input.replace(regex, engChar);
  }

  // Remove Vietnamese combining accents
  input = input.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣
  input = input.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛

  // Replace multiple spaces with a single space
  input = input.replace(/ +/g, " ").trim();

  // Remove punctuation and special characters
  input = input.replace(/[!@%^*()+=<>?/,.:;"&#[\]~$_`{}|\\\-]/g, " ");

  return input;
};

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
 * Converts a given number of bytes into a human-readable string with the appropriate unit.
 * It handles conversion from bytes to larger units (KB, MB, GB, etc.) and formats the result
 * with a specified number of decimal places.
 *
 * @param {number} bytes - The number of bytes to be converted.
 * @param {number} decimals - The number of decimal places to include in the formatted result (default is 2).
 * @returns {string} - A formatted string representing the size in a larger unit (e.g., "1.23 KB").
 *
 * Example:
 * formatBytes(1024)
 * // Returns: '1 KB'
 * formatBytes(1234, 3)
 * // Returns: '1.205 KB'
 */
export function formatByteSizeHelper(bytes: number, decimals = 2): string {
  // Check if bytes is not a number or is equal to 0
  if (isNaN(bytes) || bytes === 0) return "0 Bytes";

  // Constants for the conversion factor and number of decimal places
  const KILOBYTE = 1024;
  const decimalPlaces = decimals < 0 ? 0 : decimals;
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  // Calculate the unit index
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));

  // Convert and format the result
  const convertedValue = (bytes / Math.pow(KILOBYTE, unitIndex)).toFixed(
    decimalPlaces
  );

  // Return the formatted result
  return `${parseFloat(convertedValue)} ${units[unitIndex]}`;
}

/**
 * Checks if a string is not a valid number string.
 *
 * @param {string} value - The string to be checked.
 * @returns {boolean} - True if the string is not a valid number string, false otherwise.
 *
 * Example:
 * isNotNumberString('123') // Returns: false
 * isNotNumberString('abc') // Returns: true
 */
export const isInvalidNumberStringHelper = (value: string): boolean => {
  // Check if the trimmed value is not a number or if it does not match the original value
  return (
    isNaN(parseInt(value.trim())) ||
    value.trim() !== `${parseInt(value.trim())}`
  );
};

/**
 * Replaces the last occurrences of a target character in a string with a replacement character.
 *
 * @param {string} inputString - The input string where replacements will occur.
 * @param {string} targetChar - The character to be replaced.
 * @param {string} replacementChar - The character to replace the target character.
 * @returns {string} - The modified string with the last occurrences of the target character replaced.
 *
 * Example:
 * replaceLastOccurrences('abcdeabcde', 'd', 'X')
 * // Returns: 'abcdeabcXe'
 */
export function replaceLastOccurrencesHelper(
  inputString: string,
  targetChar: string,
  replacementChar: string
): string {
  // If the input string is short (less than or equal to 7 characters), simply append the replacementChar and return
  if (inputString?.length <= 7) {
    return `${inputString}${replacementChar}`;
  }

  // Reverse the input string, targetChar, and replacementChar
  const reversedInput = inputString?.split("").reverse().join("");
  const reversedTargetChar = targetChar?.split("").reverse().join("");
  const reversedReplacementChar = replacementChar?.split("").reverse().join("");

  // Replace the last occurrence of reversedTargetChar with reversedReplacementChar in the reversedInput
  const reversedResult = reversedInput?.replace(
    reversedTargetChar,
    reversedReplacementChar
  );

  // Reverse the result again to get the final modified string
  return reversedResult?.split("").reverse().join("");
}

/**
 * Generates a random alphanumeric string of specified length.
 *
 * @param {number} length - The length of the random string to be generated.
 * @returns {string} - The randomly generated alphanumeric string.
 *
 * Example:
 * generateRandomString(8)
 * // Returns: '3sdf8G2h'
 */
export const generateRandomStringHelper = (length: number): string => {
  return Math.random().toString(36).substr(2, length);
};

/**
 * Removes all special characters from a given string.
 * Special characters include anything that is not a letter (a-z, A-Z) or number (0-9).
 *
 * @param {string} str - The input string from which special characters will be removed.
 * @returns {string} - The cleaned string with all special characters removed.
 */
export const removeSpecialCharactersHelper = (str: string) => {
  // Define a regular expression pattern that matches any character that is not
  // a letter (a-z, A-Z) or a number (0-9). The pattern uses the ^ symbol inside
  // the brackets [] to negate the character set, meaning it will match anything
  // that is not specified within the brackets.
  const regex = /[^a-zA-Z0-9]/g;

  // Use the string's replace method with the regular expression to replace all
  // occurrences of special characters with an empty string, effectively removing them.
  // Return the cleaned string.
  return str.replace(regex, "");
};

/**
 * Masks the input if it's a phone number or an email address.
 * For phone numbers, it replaces all characters with '*' except the last three digits.
 * For emails, it shows the first three characters and the domain part including '@'.
 * @param input - The input string to be masked, which can be a phone number or an email.
 * @returns A masked version of the input or 'Invalid input' if the input is not a valid phone number or email.
 */
export function maskInputHelper(input: string): string {
  // Regex to validate a Vietnamese phone number
  const phoneRegex: RegExp = /^((\+84|0|84)(3|5|7|8|9)[0-9]{8})$/;
  // Regex to validate an email address
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phoneRegex.test(input)) {
    // If the input is a valid phone number
    // Replace all digits except the last three with '*'
    return input.slice(0, -3).replace(/\d/g, "*") + input.slice(-3);
  } else if (emailRegex.test(input)) {
    // If the input is a valid email address
    // Split the email into local part and domain part
    const [localPart, domain] = input.split("@");
    // Mask the local part except for the first three characters
    const maskedLocalPart =
      localPart.slice(0, 3) + "*".repeat(localPart.length - 3);
    // Reconstruct the masked email
    return maskedLocalPart + "@" + domain;
  } else {
    // If the input is neither a valid phone number nor a valid email
    return "Invalid input";
  }
}

/**
 * slugify
 * @returns
 * @param value
 */
export function slugifyHelper(value: string) {
  let slug = String(value || " ").replace(
    /\\u[\dA-F]{4}/gi,
    function (match: string) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    }
  );

  if (slug === void 0) return "";
  try {
    slug = decodeURIComponent(String(slug || " "));
    slug = normalizeVietnameseStringHelper(slug)
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, " ");
    slug = String(slug).trim().replace(/\s/g, "-").toLowerCase();
    slug = String(slug).replace(/\-+/g, "-").toLowerCase();
    return slug;
  } catch (_) {
    return value;
  }
}

export async function getSha1FromStringHelper(string: string): Promise<string> {
  let encode = crypto.createHash("sha1").update(string).digest("hex");
  return encode;
}

export function splitStringForWheelHelper(
  input: string,
  maxLength: number = 12
) {
  let currentLength = maxLength;
  let result = [];
  let currentIndex = 0;

  while (currentIndex < input.length) {
    // Nếu phần còn lại ngắn hơn currentLength, lấy tất cả phần còn lại
    if (currentIndex + currentLength >= input.length) {
      result.push(input.slice(currentIndex));
      break;
    }

    // Lấy một phần của chuỗi với độ dài currentLength
    let part = input.slice(currentIndex, currentIndex + currentLength);

    // Nếu phần tiếp theo không phải là dấu cách, cần cắt bớt để tránh cắt ngang từ
    if (input[currentIndex + currentLength] !== " ") {
      let lastSpaceIndex = part.lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        part = part.slice(0, lastSpaceIndex);
      }
    }

    // Nếu không có dấu cách nào để cắt, tiến đến tiếp vị trí tiếp theo của chuỗi
    if (part.length === 0) {
      currentIndex++;
      continue;
    }

    result.push(part.trim()); // Thêm chuỗi cắt vào mảng và loại bỏ khoảng trắng thừa
    currentIndex += part.length;

    // Chuỗi tiếp theo phải ngắn hơn chuỗi trước tối thiểu 2 ký tự
    currentLength = Math.max(currentLength - 2, 1); // Đảm bảo độ dài tối thiểu là 1
  }

  return result;
}

/**
 * Hàm tạo link
 */
export function generateRefLinkHelper({
  targetValue,
  ref,
  domain,
}: {
  targetValue: string;
  ref: string;
  domain: string;
}) {
  // Hợp nhất hai chuỗi giá trị với "zip" ở giữa
  const hiddenString = targetValue + "zip" + ref;
  let longString = "";

  // Bộ ký tự bao gồm chữ thường, chữ hoa và số
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charLength = characters.length;

  // Tạo chuỗi dài dựa trên độ dài và ký tự của chuỗi giá trị
  for (let i = 0; i < hiddenString.length * 2; i++) {
    if (i % 2 === 0) {
      longString += hiddenString[Math.floor(i / 2)]; // Chèn ký tự từ chuỗi giá trị thực vào vị trí chẵn
    } else {
      // Tạo ký tự phụ dựa trên độ dài và ký tự của hiddenString
      const charCode = hiddenString[i % hiddenString.length].charCodeAt(0);
      longString += characters[(charCode + i) % charLength]; // Ký tự ngẫu nhiên từ bộ ký tự
    }
  }

  return `${domain}/${longString}`;
}

export function extractRefLinkFromStringHelper(value: string): {
  targetValue: string;
  ref: string;
} {
  let hiddenString = "";

  // Lấy các ký tự tại vị trí chẵn trong longString để ghép lại thành hiddenString
  for (let i = 0; i < value.length; i += 2) {
    hiddenString += value[i];
  }

  // Tách chuỗi ẩn bằng "zip"
  const values = hiddenString.split("zip");

  // Trả về object chứa hai chuỗi giá trị
  return {
    targetValue: values[0],
    ref: values?.[1] || "",
  };
}

export function processUniversalLinkHelper(url: string) {
  console.log(url, "urlurlurl");
  const patterns = [
    {
      regex: new RegExp(`^${CONFIG.UNIVERSAL_URL}/product/(.+)`),
      type: "product",
    },
    {
      regex: new RegExp(`^${CONFIG.UNIVERSAL_URL}/(.+)`),
      type: "global",
    },
  ];

  for (const { regex, type } of patterns) {
    const match = url.match(regex);
    if (match) {
      const extractedValue = match[1];
      console.log(extractedValue, "extractedValue");
      switch (type) {
        case "product":
          let product = extractedValue?.split("/")?.[0];
          let valueFromProduct = extractRefLinkFromStringHelper(product);
          console.log(valueFromProduct, "valueFromProduct");
          if (valueFromProduct?.ref) {
            setRefCodeHelper(valueFromProduct?.ref);
          }
          if (valueFromProduct?.targetValue) {
            setTargetScreenHelper(
              JSON.stringify({
                route: NAVIGATION_DETAIL_PRODUCT_SCREEN,
                params: {
                  product: { product_id: valueFromProduct?.targetValue },
                },
                createdAt: new Date().getTime(),
              })
            );
          }
          break;
        case "global":
          let refCode = extractedValue?.split("/")?.[0];
          console.log(refCode, "refCode");
          if (refCode) {
            setRefCodeHelper(refCode);
          }
          break;
      }

      return;
    }
  }

  console.log("Universal link not match");
}
