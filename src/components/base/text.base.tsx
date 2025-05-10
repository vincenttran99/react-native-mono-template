import { createText, TextProps } from "@shopify/restyle";
import { Theme } from "constants/theme.constant";

const BText = createText<Theme>();
export type BTextProps = TextProps<Theme>;

export default BText;
