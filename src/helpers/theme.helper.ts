import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Dimensions } from "react-native";

dayjs.extend(isBetween);
const { width, height } = Dimensions.get("window");

/**
 * Thanks to
 * https://github.com/nirsky/react-native-size-matters
 */
const [shortDimension, longDimension] =
  width > height ? [height, width] : [width, height];
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

/**
 * horizontalScale
 * @param size
 * Scale by screen horizontal ratio for size compensation
 */
export function horizontalScale(size: number) {
  return (size * shortDimension) / guidelineBaseWidth;
}

/**
 * verticalScale
 * @param size
 * Scale by screen vertical ratio for size compensation
 */
export function verticalScale(size: number) {
  return (size * longDimension) / guidelineBaseHeight;
}

/**
 * moderateHorizontalScale
 * @param size
 * @param factor
 * Scale by screen horizontal ratio with factor for size compensation. Default factor is 0.5.
 */
export function moderateHorizontalScale(size: number, factor = 0.5) {
  return size + (horizontalScale(size) - size) * factor;
}

/**
 * moderateVerticalScale
 * @param size
 * @param factor
 * Scale by screen vertical ratio with factor for size compensation. Default factor is 0.5.
 */
export function moderateVerticalScale(size: number, factor = 0.5) {
  return size + (verticalScale(size) - size) * factor;
}

/**
 * Short name
 */
export const hs = horizontalScale;
export const vs = verticalScale;
export const mhs = moderateHorizontalScale;
export const mvs = moderateVerticalScale;
