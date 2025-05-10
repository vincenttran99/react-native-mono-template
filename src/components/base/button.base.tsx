import React, { memo } from "react";
import { FontSize, MHS, Space } from "constants/sizes.constant";
import BPressable, { BPressableProps } from "./pressable.base";
import BText, { BTextProps } from "./text.base";
import BIcon, { BIconProps } from "./icon.base";
import { StyleSheet } from "react-native";
import { ResponsiveValue } from "@shopify/restyle";
import { Theme } from "constants/theme.constant";

type TButtonStyle = {
  [key in keyof typeof Space]: {
    paddingHorizontal: keyof typeof Space;
    paddingVertical: keyof typeof Space;
    borderRadius: keyof typeof Space;
    borderWidth: number;
  };
};

const BUTTON_STYLE: TButtonStyle = {
  xxxxl: {
    paddingHorizontal: "xxxxl",
    paddingVertical: "lg",
    borderRadius: "xl",
    borderWidth: MHS._3,
  },
  xxxl: {
    paddingHorizontal: "xxxxl",
    paddingVertical: "lg",
    borderRadius: "lg",
    borderWidth: MHS._3,
  },
  xxl: {
    paddingHorizontal: "xxxl",
    paddingVertical: "md",
    borderRadius: "md",
    borderWidth: MHS._3,
  },
  xl: {
    paddingHorizontal: "xxl",
    paddingVertical: "sm",
    borderRadius: "sm",
    borderWidth: MHS._2,
  },
  lg: {
    paddingHorizontal: "xl",
    paddingVertical: "xs",
    borderRadius: "xs",
    borderWidth: MHS._2,
  },
  md: {
    paddingHorizontal: "lg",
    paddingVertical: "xxs",
    borderRadius: "xs",
    borderWidth: MHS._2,
  },
  sm: {
    paddingHorizontal: "md",
    paddingVertical: "xxs",
    borderRadius: "xs",
    borderWidth: MHS._2,
  },
  xs: {
    paddingHorizontal: "sm",
    paddingVertical: "xxxs",
    borderRadius: "xxs",
    borderWidth: MHS._1,
  },
  xxs: {
    paddingHorizontal: "xs",
    paddingVertical: "xxxs",
    borderRadius: "xxs",
    borderWidth: MHS._1,
  },
  xxxs: {
    paddingHorizontal: "xxs",
    paddingVertical: "xxxxs",
    borderRadius: "xxxs",
    borderWidth: StyleSheet.hairlineWidth,
  },
  xxxxs: {
    paddingHorizontal: "xxxs",
    paddingVertical: "xxxxs",
    borderRadius: "xxxxs",
    borderWidth: StyleSheet.hairlineWidth,
  },
};

export interface IBButtonProps extends BPressableProps {
  size?: keyof typeof Space;
  round?: boolean;
  label?: string;
  labelColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  labelProps?: BTextProps;
  outline?: boolean;
  leftIcon?: string;
  leftIconProps?: Omit<BIconProps, "name">;
  rightIcon?: string;
  rightIconProps?: Omit<BIconProps, "name">;
}

const BButtonComponent = ({
  size = "md",
  label,
  round,
  labelProps,
  backgroundColor,
  outline,
  leftIcon,
  rightIcon,
  leftIconProps,
  rightIconProps,
  labelColor,
  ...props
}: IBButtonProps): React.JSX.Element => {
  return (
    <BPressable
      backgroundColor={
        backgroundColor ? backgroundColor : outline ? "transparent" : "primary"
      }
      paddingHorizontal={BUTTON_STYLE[size].paddingHorizontal}
      paddingVertical={BUTTON_STYLE[size].paddingVertical}
      borderRadius={round ? "full" : BUTTON_STYLE[size].borderRadius}
      borderWidth={BUTTON_STYLE[size].borderWidth}
      borderColor={backgroundColor || "primary"}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap="xxxs"
      {...props}
    >
      {leftIcon && (
        <BIcon name={leftIcon} size={FontSize[size]} {...leftIconProps} />
      )}
      <BText
        fontWeight={"600"}
        variant={size}
        color={labelColor}
        {...labelProps}
      >
        {label || ""}
      </BText>
      {rightIcon && (
        <BIcon name={rightIcon} size={FontSize[size]} {...rightIconProps} />
      )}
    </BPressable>
  );
};

const BButton = memo(BButtonComponent);
export default BButton;
