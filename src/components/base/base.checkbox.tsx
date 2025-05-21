import React, { useEffect, useMemo } from "react";
import { Insets, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FontSize, MHS, Space } from "constants/sizes.constant";
import BIcon from "./base.icon";
import { BPressable, BPressableProps } from "./base.pressable";
import { ResponsiveValue, useTheme } from "@shopify/restyle";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  Easing,
} from "react-native-reanimated";
import { Theme } from "constants/theme.constant";

type BCheckBoxProps = BPressableProps & {
  activeColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  inactiveColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  iconColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  style?: StyleProp<ViewStyle>;
  size?: keyof typeof Space;
  isChecked: boolean;
  disabled?: boolean;
  outline?: boolean;
  hitSlop?: number | Insets | null;
};

const SIZE_CHECKBOX = {
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

const SIZE_CHECKBOX_ICON = {
  none: FontSize._8,
  xxxxs: FontSize._10,
  xxxs: FontSize._12,
  xxs: FontSize._14,
  xs: FontSize._16,
  sm: FontSize._18,
  md: FontSize._20,
  lg: FontSize._22,
  xl: FontSize._26,
  xxl: FontSize._30,
  xxxl: FontSize._34,
  xxxxl: FontSize._38,
};

const AnimatedBPressable = Animated.createAnimatedComponent(BPressable);

const BCheckBox = ({
  activeColor = "primary",
  inactiveColor = "secondary",
  size = "md",
  isChecked,
  onPress,
  style,
  outline,
  iconColor = "background",
  disabled = false,
  ...props
}: BCheckBoxProps): React.JSX.Element => {
  const theme = useTheme();
  const activeColorValue = useMemo(
    () => theme.colors[activeColor],
    [activeColor, theme]
  );
  const inactiveColorValue = useMemo(
    () => theme.colors[inactiveColor],
    [inactiveColor, theme]
  );

  // Use shared value to track state
  const checked = useSharedValue(isChecked ? 1 : 0);
  const opacity = useSharedValue(disabled ? 0.5 : 1);

  // Update value when props change
  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, {
      duration: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isChecked, checked]);

  useEffect(() => {
    opacity.value = withTiming(disabled ? 0.5 : 1, {
      duration: 100,
    });
  }, [disabled, opacity]);

  // Tạo animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", outline ? "transparent" : activeColorValue]
      ),
      borderColor: interpolateColor(
        checked.value,
        [0, 1],
        [inactiveColorValue, activeColorValue]
      ),
      transform: [
        {
          scale: withTiming(checked.value === 1 ? 1 : 0.95, { duration: 80 }),
        },
      ],
    };
  }, [outline, activeColorValue, inactiveColorValue]);

  // Animated style for icon
  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: checked.value,
      transform: [{ scale: withTiming(checked.value, { duration: 100 }) }],
    };
  }, []);

  return (
    <AnimatedBPressable
      disabled={disabled}
      onPress={onPress}
      width={SIZE_CHECKBOX[size]}
      height={SIZE_CHECKBOX[size]}
      borderRadius={"xxxs"}
      borderWidth={1}
      justifyContent="center"
      alignItems="center"
      style={[animatedStyle, style]}
      {...props}
    >
      <Animated.View style={iconAnimatedStyle}>
        <BIcon
          size={SIZE_CHECKBOX_ICON[size]}
          name={"check"}
          color={iconColor}
        />
      </Animated.View>
    </AnimatedBPressable>
  );
};

export default BCheckBox;
