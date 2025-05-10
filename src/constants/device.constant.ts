import { Dimensions, Platform } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { FontSize } from "./sizes.constant";

const { width, height } = Dimensions.get("window");

export const Device = {
  width,
  height,
  insets: initialWindowMetrics?.insets,
  isWeb: Platform.OS === "web",
  isIos: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
  heightAppBar: FontSize._48,
};
