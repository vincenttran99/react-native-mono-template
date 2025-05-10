import { BoxProps, createBox } from "@shopify/restyle";
import { Theme } from "constants/theme.constant";
import { View, ViewProps } from "react-native";
const BView = createBox<Theme>(View);
export type BViewProps = BoxProps<Theme> & ViewProps;

export default BView;
