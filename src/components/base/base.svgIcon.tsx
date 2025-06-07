import { ResponsiveValue, useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";
import { ViewStyle } from "react-native";
import { FontSize } from "@/constants/sizes.constant";
import { SvgXml } from "react-native-svg";
import { replaceSvgColorsHelper } from "@/helpers/string.helper";
import { JSX } from "react";

/**
 * BSVGIcon Component
 *
 * A reusable component for rendering SVG icons with support for theming,
 * customizable size, color, and additional styles.
 *
 * Props:
 * @property {number} [size=FontSize.md] - The size of the SVG icon (width and height).
 * @property {string | ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>} [color="reverse"] -
 *   The color to apply to the SVG. Can be a theme key or a custom color string.
 * @property {ViewStyle} [style] - Additional styles for the SVG container.
 * @property {string} xml - The raw SVG string to render.
 * @property {boolean} [ignoreOverrideColor=false] - If true, the SVG colors will not be overridden.
 *
 * @param {BSVGIconProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SVG icon.
 */
export type BSVGIconProps = {
  size?: number;
  color?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]> | string;
  style?: ViewStyle;
  xml: string;
  ignoreOverrideColor?: boolean;
};

const BSVGIcon = ({
  size = FontSize.md,
  color = "reverse",
  xml,
  ignoreOverrideColor = false,
  ...props
}: BSVGIconProps): JSX.Element => {
  const theme = useTheme();

  // Replace SVG colors unless ignoreOverrideColor is true
  const processedXml = ignoreOverrideColor
    ? xml
    : replaceSvgColorsHelper(xml, theme.colors[color] || color);

  return <SvgXml xml={processedXml} width={size} height={size} {...props} />;
};

export default BSVGIcon;
