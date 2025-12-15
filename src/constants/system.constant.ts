import { Dimensions, Platform } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { FontSize } from "./sizes.constant";
import * as Device from "expo-device";

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
  isTablet: Device.deviceType === Device.DeviceType.TABLET,
};

export enum EDevicePerformance {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export const DRAW_DISTANCE_VERTICAL = {
  [EDevicePerformance.Low]: height * 0.7,
  [EDevicePerformance.Medium]: height * 1.5,
  [EDevicePerformance.High]: height * 2.5,
};

export const DRAW_DISTANCE_HORIZONTAL = {
  [EDevicePerformance.Low]: height,
  [EDevicePerformance.Medium]: height * 2,
  [EDevicePerformance.High]: height * 3,
};
