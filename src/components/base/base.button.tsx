import React, { memo } from "react";
import { FontSize, MHS, Space } from "@/constants/sizes.constant";
import BPressable, { BPressableProps } from "./base.pressable";
import BText, { BTextProps } from "./base.text";
import BIcon, { BIconProps } from "./base.icon";
import { StyleSheet } from "react-native";
import { ResponsiveValue } from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";

type ButtonStyle = {
  [key in ResponsiveValue<keyof Theme["spacing"], Theme["breakpoints"]>]: {
    paddingHorizontal: ResponsiveValue<
      keyof Theme["spacing"],
      Theme["breakpoints"]
    >;
    paddingVertical: ResponsiveValue<
      keyof Theme["spacing"],
      Theme["breakpoints"]
    >;
    borderRadius: ResponsiveValue<
      keyof Theme["borderRadii"],
      Theme["breakpoints"]
    >;
    borderWidth: number;
  };
};

const BUTTON_STYLE: ButtonStyle = {
  none: {
    paddingHorizontal: "none",
    paddingVertical: "none",
    borderRadius: "none",
    borderWidth: 0,
  },
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

export type BButtonProps = BPressableProps & {
  size?: ResponsiveValue<keyof Theme["spacing"], Theme["breakpoints"]>;
  round?: boolean;
  label?: string;
  labelColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  labelProps?: BTextProps;
  outline?: boolean;
  leftIcon?: string;
  leftIconColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  leftIconSize?: number;
  rightIcon?: string;
  rightIconColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  rightIconSize?: number;
};

const BButtonComponent = ({
  size = "md",
  label,
  round,
  labelProps,
  backgroundColor,
  outline,
  leftIcon,
  rightIcon,
  leftIconSize,
  rightIconSize,
  labelColor = "reverse",
  leftIconColor = "reverse",
  rightIconColor = "reverse",
  ...props
}: BButtonProps): React.JSX.Element => {
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
        <BIcon
          name={leftIcon}
          size={leftIconSize || FontSize[size]}
          color={leftIconColor}
        />
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
        <BIcon
          name={rightIcon}
          size={rightIconSize || FontSize[size]}
          color={rightIconColor}
        />
      )}
    </BPressable>
  );
};

const BButton = memo(BButtonComponent);
export default BButton;
