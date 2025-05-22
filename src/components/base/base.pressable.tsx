import React, { useCallback } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  ViewProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  BoxProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
} from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";
export const PressableAni = Animated.createAnimatedComponent(Pressable);

export type BPressableProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  ShadowProps<Theme> &
  BoxProps<Theme> &
  PressableProps & {
    disableOpacityEffect?: boolean;
  } & ViewProps;

const PressableRestyle = createRestyleComponent<BPressableProps, Theme>(
  [spacing, backgroundColor, opacity, layout, border, shadow],
  PressableAni
);

export const BPressable: React.FC<BPressableProps> = ({
  style,
  onPressIn,
  onPressOut,
  disableOpacityEffect,
  ...rest
}) => {
  const pressed = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: disableOpacityEffect ? undefined : pressed.value,
      //@ts-ignore
      ...style,
    };
  }, [style, disableOpacityEffect]);

  const onPressInHandle = useCallback(
    (event: GestureResponderEvent) => {
      pressed.value = 0.8;
      onPressIn?.(event);
    },
    [onPressIn]
  );

  const onPressOutHandle = useCallback(
    (event: GestureResponderEvent) => {
      pressed.value = 1;
      onPressOut?.(event);
    },
    [onPressOut]
  );

  return (
    <PressableRestyle
      {...rest}
      onPressIn={onPressInHandle}
      onPressOut={onPressOutHandle}
      style={animatedStyle}
    />
  );
};

export default BPressable;
