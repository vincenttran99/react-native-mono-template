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
} from "@shopify/restyle";
import { Theme } from "constants/theme.constant";
import { Pressable, PressableProps } from "react-native";

export type BSurfaceProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  PressableProps &
  VariantProps<Theme, "shadowVariants">;

const BSurface = createRestyleComponent<BSurfaceProps, Theme>(
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
