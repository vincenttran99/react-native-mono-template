import React, { forwardRef } from "react";
import { GestureResponderEvent, TextInput, TextInputProps } from "react-native";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  BoxProps,
  color,
  ColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  ResponsiveValue,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  textShadow,
  TextShadowProps,
  typography,
  TypographyProps,
  useTheme,
} from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";
import { FontSize } from "@/constants/sizes.constant";
import { StyleSheet } from "react-native";
import BView, { BViewProps } from "./base.view";
import BIconButton, { BIconButtonProps } from "./base.iconButton";

export type BTextInputProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  ShadowProps<Theme> &
  BoxProps<Theme> &
  TextShadowProps<Theme> &
  TypographyProps<Theme> &
  TextInputProps & {
    error?: boolean;
    leftIcon?: string;
    onLeftIconPress?: (event: GestureResponderEvent) => void;
    leftIconProps?: Omit<BIconButtonProps, "icon">;
    rightIcon?: string;
    onRightIconPress?: (event: GestureResponderEvent) => void;
    rightIconProps?: Omit<BIconButtonProps, "icon">;
    containerProps?: BViewProps;
    containerBackgroundColor?: ResponsiveValue<
      keyof Theme["colors"],
      Theme["breakpoints"]
    >;
    containerPaddingVertical?: ResponsiveValue<
      keyof Theme["spacing"],
      Theme["breakpoints"]
    >;
    containerPaddingHorizontal?: ResponsiveValue<
      keyof Theme["spacing"],
      Theme["breakpoints"]
    >;
    containerGap?: ResponsiveValue<
      keyof Theme["spacing"],
      Theme["breakpoints"]
    >;
    containerBorderRadius?: ResponsiveValue<
      keyof Theme["borderRadii"],
      Theme["breakpoints"]
    >;
  };

const TextInputRestyle = createRestyleComponent<BTextInputProps, Theme>(
  [
    spacing,
    color,
    backgroundColor,
    opacity,
    layout,
    border,
    shadow,
    textShadow,
    typography,
  ],
  TextInput
);

const BTextInput = forwardRef(
  (
    {
      style,
      error,
      leftIcon,
      onLeftIconPress,
      leftIconProps,
      rightIcon,
      onRightIconPress,
      rightIconProps,
      containerProps,
      containerBackgroundColor,
      containerPaddingVertical,
      containerPaddingHorizontal,
      containerGap,
      containerBorderRadius,
      ...props
    }: BTextInputProps,
    ref: any
  ) => {
    const theme = useTheme();

    return (
      <BView
        flexDirection="row"
        alignItems="center"
        paddingVertical={containerPaddingVertical || "md"}
        paddingHorizontal={containerPaddingHorizontal || "md"}
        borderColor={error ? "error" : "transparent"}
        borderWidth={StyleSheet.hairlineWidth}
        backgroundColor={containerBackgroundColor || "ground"}
        borderRadius={containerBorderRadius || "md"}
        gap={containerGap || "sm"}
        overflow="hidden"
        {...containerProps}
      >
        {leftIcon && (
          <BIconButton
            icon={leftIcon}
            padding="none"
            iconColor={error ? "error" : props?.color || "reverse"}
            onPress={onLeftIconPress}
            {...leftIconProps}
          />
        )}
        <TextInputRestyle
          ref={ref}
          allowFontScaling={false}
          fontSize={FontSize.md}
          color={"reverse"}
          flex={1}
          paddingVertical="none"
          placeholderTextColor={theme.colors.secondary}
          {...props}
        />
        {rightIcon && (
          <BIconButton
            icon={rightIcon}
            padding="none"
            onPress={onRightIconPress}
            {...rightIconProps}
          />
        )}
      </BView>
    );
  }
);

export default BTextInput;
