import {
  createRestyleComponent,
  VariantProps,
  createVariant,
  backgroundColor,
  border,
  layout,
  opacity,
  spacing,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  OpacityProps,
  LayoutProps,
  BoxProps,
} from "@shopify/restyle";
import { Theme } from "constants/theme.constant";
import { Pressable, PressableProps, ViewProps } from "react-native";

const BSurface = createRestyleComponent<
  SpacingProps<Theme> &
    BorderProps<Theme> &
    BackgroundColorProps<Theme> &
    OpacityProps<Theme> &
    LayoutProps<Theme> &
    BoxProps<Theme> &
    PressableProps &
    ViewProps &
    VariantProps<Theme, "shadowVariants">,
  Theme
>(
  [
    spacing,
    backgroundColor,
    opacity,
    layout,
    border,
    createVariant({ themeKey: "shadowVariants" }),
  ],
  Pressable
);
export default BSurface;
