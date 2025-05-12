import React, { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { MHS } from "constants/sizes.constant";
import BView, { BViewProps } from "./view.base";
import {
  backgroundColor,
  border,
  composeRestyleFunctions,
  layout,
  opacity,
  shadow,
  spacing,
  useRestyle,
  useTheme,
} from "@shopify/restyle";
import { Theme } from "constants/theme.constant";
import isEqual from "react-fast-compare";

const restyleFunctions = composeRestyleFunctions<Theme, BViewProps>([
  spacing,
  backgroundColor,
  opacity,
  layout,
  border,
  shadow,
]);

type BDividerProps = BViewProps & {
  type?: "solid" | "dotted" | "dashed";
  vertical?: boolean;
  bold?: boolean;
};

const BDivider = memo(
  ({
    type = "solid",
    bold,
    vertical = false,
    ...rest
  }: BDividerProps): React.JSX.Element => {
    const theme = useTheme();
    const props = useRestyle(restyleFunctions, rest);

    const styleBase = useMemo(() => {
      let propsStyle = StyleSheet.flatten(props.style || {});
      let height =
        propsStyle?.height || (bold ? MHS._1 : StyleSheet.hairlineWidth);
      let width =
        propsStyle?.width || (bold ? MHS._1 : StyleSheet.hairlineWidth);
      return {
        height: !vertical ? height : undefined,
        // flexGrow: 1,
        width: vertical ? width : undefined,
      };
    }, [props.style, type, bold, vertical]);

    const styleDashOrDot = useMemo(() => {
      let propsStyle = StyleSheet.flatten(props.style || {});
      let backgroundColor = propsStyle?.backgroundColor || theme.colors.ground;
      let width =
        (typeof propsStyle?.width === "number"
          ? propsStyle?.width
          : bold
          ? MHS._1
          : StyleSheet.hairlineWidth) * 2.04;
      let height =
        (typeof propsStyle?.height === "number"
          ? propsStyle?.height
          : bold
          ? MHS._1
          : StyleSheet.hairlineWidth) * 2.04;
      return {
        borderStyle: type,
        borderColor: backgroundColor,
        ...(vertical
          ? {
              borderWidth: width,
              marginHorizontal: -width * 1.51,
              marginLeft: 0,
              // flexGrow: 1,
              width: 0,
              backgroundColor: "#00000000",
            }
          : {
              borderWidth: height,
              marginVertical: -height * 1.51,
              marginTop: 0,
              height: 0,
              backgroundColor: "#00000000",
            }),
      };
    }, [props.style, type, bold, vertical]);

    return (
      <BView style={styles.container}>
        <BView
          {...rest}
          style={[props.style, type === "solid" ? styleBase : styleDashOrDot]}
        />
      </BView>
    );
  },
  isEqual
);

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
});

export default BDivider;
