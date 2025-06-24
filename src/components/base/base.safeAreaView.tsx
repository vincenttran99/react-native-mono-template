import { BoxProps, createBox } from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
const BSafeAreaView = createBox<Theme, SafeAreaViewProps>(SafeAreaView);
export type BSafeAreaViewProps = BoxProps<Theme> & SafeAreaViewProps;

export default BSafeAreaView;
