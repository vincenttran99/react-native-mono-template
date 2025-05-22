import { TextProps as TextPropsRN } from "react-native";
import { createText, TextProps } from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";

const BText = createText<Theme>();
export type BTextProps = TextProps<Theme> & TextPropsRN;

export default BText;
