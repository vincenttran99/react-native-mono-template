import React, { useEffect, useMemo } from "react";
import { Insets, StyleProp, ViewStyle } from "react-native";
import { MHS, Space } from "constants/sizes.constant";
import BView from "./base.view";
import { BPressable, BPressableProps } from "./base.pressable";
import { ResponsiveValue, useTheme } from "@shopify/restyle";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Theme } from "constants/theme.constant";

export type BRadioButtonProps = BPressableProps & {
  activeColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  inactiveColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  style?: StyleProp<ViewStyle>;
  size?: keyof typeof Space;
  isSelected: boolean;
  onPress?: () => void;
  disabled?: boolean;
  hitSlop?: number | Insets | null;
};

const SIZE_RADIO = {
  none: MHS._10,
  xxxxs: MHS._12,
  xxxs: MHS._14,
  xxs: MHS._16,
  xs: MHS._18,
  sm: MHS._20,
  md: MHS._24,
  lg: MHS._28,
  xl: MHS._32,
  xxl: MHS._36,
  xxxl: MHS._40,
  xxxxl: MHS._44,
};

const AnimatedBPressable = Animated.createAnimatedComponent(BPressable);
const AnimatedBView = Animated.createAnimatedComponent(BView);

const BRadioButton = ({
  activeColor = "primary",
  inactiveColor = "secondary",
  size = "md",
  isSelected,
  style,
  disabled = false,
  ...props
}: BRadioButtonProps): React.JSX.Element => {
  const theme = useTheme();
  const activeColorValue = useMemo(
    () => theme.colors[activeColor],
    [activeColor, theme.colors]
  );
  const inactiveColorValue = useMemo(
    () => theme.colors[inactiveColor],
    [inactiveColor, theme.colors]
  );

  // Use shared value to track state
  const selected = useSharedValue(isSelected ? 1 : 0);
  const opacity = useSharedValue(disabled ? 0.5 : 1);

  // Update values when props change
  useEffect(() => {
    selected.value = withTiming(isSelected ? 1 : 0, {
      duration: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isSelected, selected]);

  useEffect(() => {
    opacity.value = withTiming(disabled ? 0.5 : 1, {
      duration: 100,
    });
  }, [disabled, opacity]);

  // Animated style for border
  const borderAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      borderColor: selected.value === 1 ? activeColorValue : inactiveColorValue,
      transform: [
        { scale: withTiming(1 + selected.value * 0.05, { duration: 80 }) },
      ],
    };
  }, [activeColorValue, inactiveColorValue]);

  // Animated style for inner circle
  const innerCircleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: selected.value,
      transform: [{ scale: selected.value }],
      backgroundColor: activeColorValue,
    };
  }, [activeColorValue]);

  return (
    <AnimatedBPressable
      disabled={disabled}
      justifyContent="center"
      alignItems="center"
      borderWidth={MHS._2}
      borderRadius={"full"}
      width={SIZE_RADIO[size]}
      height={SIZE_RADIO[size]}
      style={[borderAnimatedStyle, style]}
      {...props}
    >
      <AnimatedBView
        borderRadius={"full"}
        width={"70%"}
        height={"70%"}
        style={innerCircleAnimatedStyle}
      />
    </AnimatedBPressable>
  );
};

export default BRadioButton;
