import React from "react";
import { Insets, StyleProp, ViewStyle } from "react-native";
import { MHS } from "constants/sizes.constant";
import BView from "./base.view";
import { BPressable } from "./base.pressable";
import { useTheme } from "@shopify/restyle";

export type BRadioButtonProps = {
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
  size?: "tiny" | "small" | "medium" | "big" | "large";
  isSelected: boolean;
  onPress?: () => void;
  disabled?: boolean;
  hitSlop?: number | Insets | null;
};

const SIZE_RADIO = {
  tiny: MHS._18,
  small: MHS._20,
  medium: MHS._22,
  big: MHS._24,
  large: MHS._28,
};

const BRadioButton = ({
  activeColor,
  inactiveColor,
  size = "medium",
  isSelected,
  onPress,
  style,
  hitSlop,
  disabled = false,
}: BRadioButtonProps): React.JSX.Element => {
  const theme = useTheme();
  return (
    <BPressable
      hitSlop={hitSlop}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          borderWidth: MHS._2,
          borderRadius: 1000,
          opacity: disabled ? 0.5 : 1,
          width: SIZE_RADIO[size],
          height: SIZE_RADIO[size],
          borderColor: isSelected
            ? activeColor || theme.colors.primary
            : inactiveColor || theme.colors.outline,
        },
        style,
      ]}
    >
      <BView
        style={{
          backgroundColor: isSelected
            ? activeColor || theme.colors.primary
            : "transparent",
          width: "70%",
          height: "70%",
          borderRadius: 1000,
        }}
      />
    </BPressable>
  );
};

export default BRadioButton;
