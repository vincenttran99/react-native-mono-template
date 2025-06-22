import { Dimensions, Platform } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { FontSize } from "./sizes.constant";

const { width, height } = Dimensions.get("window");
const { height: heightScreen } = Dimensions.get("screen");

export const DEVICE = {
  width,
  heightScreen,
  height,
  insets: initialWindowMetrics?.insets,
  isWeb: Platform.OS === "web",
  isIos: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
  heightAppBar: FontSize._48,
};

export enum EDevicePerfomance {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export const DRAW_DISTANCE_VERTICAL = {
  [EDevicePerfomance.Low]: height * 0.7,
  [EDevicePerfomance.Medium]: height * 1.5,
  [EDevicePerfomance.High]: height * 2.5,
};

export const DRAW_DISTANCE_HORIZONTAL = {
  [EDevicePerfomance.Low]: height,
  [EDevicePerfomance.Medium]: height * 2,
  [EDevicePerfomance.High]: height * 3,
};
