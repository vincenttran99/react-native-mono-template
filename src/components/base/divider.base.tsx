import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { MHS } from "constants/sizes.constant";
import BView, { BViewProps } from "./view.base";
import { useTheme } from "@shopify/restyle";

type BDividerProps = BViewProps & {
  type?: "solid" | "dotted" | "dashed";
  vertical?: boolean;
  bold?: boolean;
};

const BDivider = ({
  type = "solid",
  style,
  bold,
  vertical = false,
  ...props
}: BDividerProps): React.JSX.Element => {
  const theme = useTheme();
  const styleBase = useMemo(
    () => ({
      height: !vertical
        ? Number(
            StyleSheet.flatten(style || {})?.height ||
              (bold ? MHS._1 : StyleSheet.hairlineWidth)
          )
        : undefined,
      // flexGrow: 1,
      width: vertical
        ? Number(
            StyleSheet.flatten(style || {})?.width ||
              (bold ? MHS._1 : StyleSheet.hairlineWidth)
          )
        : undefined,
      backgroundColor:
        StyleSheet.flatten(style || {})?.backgroundColor ||
        theme.colors.outline,
    }),
    [style, type, bold, vertical]
  );

  const styleDashOrDot = useMemo(
    () => ({
      borderStyle: type,
      borderColor:
        StyleSheet.flatten(style || {})?.backgroundColor ||
        theme.colors.outline,
      ...(vertical
        ? {
            borderWidth: Number(
              StyleSheet.flatten(style || {})?.width ||
                (bold ? MHS._1 : StyleSheet.hairlineWidth)
            ),
            marginHorizontal: -Number(
              StyleSheet.flatten(style || {})?.width ||
                (bold ? MHS._1 : StyleSheet.hairlineWidth)
            ),
            marginLeft: 0,
            // flexGrow: 1,
            width: 0,
            backgroundColor: "#00000000",
          }
        : {
            borderWidth: Number(
              StyleSheet.flatten(style || {})?.height ||
                (bold ? MHS._1 : StyleSheet.hairlineWidth)
            ),
            marginVertical: -Number(
              StyleSheet.flatten(style || {})?.height ||
                (bold ? MHS._1 : StyleSheet.hairlineWidth)
            ),
            marginTop: 0,
            height: 0,
            backgroundColor: "#00000000",
          }),
    }),
    [style, type, bold, vertical]
  );

  return (
    <BView style={styles.container}>
      <BView
        {...props}
        style={[style, type === "solid" ? styleBase : styleDashOrDot]}
      />
    </BView>
  );
};

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
});

export default BDivider;
