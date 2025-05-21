import React, { useEffect, useMemo } from "react";
import { Insets, StyleProp, ViewStyle } from "react-native";
import { FontSize, MHS, Space } from "constants/sizes.constant";
import BIcon from "./base.icon";
import { BPressable, BPressableProps } from "./base.pressable";
import { ResponsiveValue, useTheme } from "@shopify/restyle";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Theme } from "constants/theme.constant";

type BCheckBoxProps = BPressableProps & {
  activeColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  style?: StyleProp<ViewStyle>;
  size?: keyof typeof Space;
  isChecked: boolean;
  iconColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
  onPress?: () => void;
  disabled?: boolean;
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
  size = "md",
  isChecked,
  disabled = false,
  iconColor = "background",
  ...props
}: BCheckBoxProps): React.JSX.Element => {
  const theme = useTheme();
  const activeColorValue = useMemo(
    () => theme.colors[activeColor],
    [activeColor]
  );

  // Use shared value to track state
  const checked = useSharedValue(isChecked ? 1 : 0);

  // Update value when props change
  useEffect(() => {
    checked.value = disabled ? 0.5 : isChecked ? 1 : 0;
  }, [isChecked, disabled]);

  // Animated style for icon
  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: checked.value,
      backgroundColor: activeColorValue,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    };
  }, []);

  return (
    <AnimatedBPressable
      disabled={disabled}
      width={SIZE_CHECKBOX[size]}
      height={SIZE_CHECKBOX[size]}
      borderRadius={"xxxs"}
      borderWidth={1}
      overflow={"hidden"}
      borderColor={activeColor}
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
