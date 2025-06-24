import { BoxProps, createBox } from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from "react-native-keyboard-controller";
const BKeyboardAvoidingView = createBox<Theme, KeyboardAvoidingViewProps>(
  KeyboardAvoidingView
);
export type BKeyboardAvoidingViewProps = BoxProps<Theme> &
  KeyboardAvoidingViewProps;

export default BKeyboardAvoidingView;
