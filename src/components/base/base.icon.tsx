import { createRestyleComponent, color, ColorProps } from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";
//Well, I like MaterialCommunityIcons :D
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export type BIconProps = ColorProps<Theme> & {
  name: string;
  size?: number;
};

const BIcon = createRestyleComponent<BIconProps, Theme>([color], Icon);

export default BIcon;
