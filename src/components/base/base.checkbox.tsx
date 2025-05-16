import React from "react";
import { Insets, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FontSize, MHS } from "constants/sizes.constant";
import BIcon from "./base.icon";
import { BPressable } from "./base.pressable";
import { useTheme } from "@shopify/restyle";

type BCheckBoxProps = {
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
  size?: "tiny" | "small" | "medium" | "big" | "large";
  isChecked: boolean;
  onPress?: () => void;
  disabled?: boolean;
  hitSlop?: number | Insets | null;
};

const SIZE_CHECKBOX = {
  tiny: MHS._18,
  small: MHS._20,
  medium: MHS._22,
  big: MHS._24,
  large: MHS._28,
};

const SIZE_CHECKBOX_ICON = {
  tiny: FontSize._16,
  small: FontSize._17,
  medium: FontSize._18,
  big: FontSize._19,
  large: FontSize._20,
};

const BCheckBox = ({
  activeColor,
  inactiveColor,
  size = "medium",
  isChecked,
  onPress,
  style,
  hitSlop,
  disabled = false,
}: BCheckBoxProps): React.JSX.Element => {
  const theme = useTheme();
  return (
    <BPressable
      hitSlop={hitSlop}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        {
          opacity: disabled ? 0.5 : 1,
          width: SIZE_CHECKBOX[size],
          height: SIZE_CHECKBOX[size],
          borderColor: isChecked
            ? activeColor || theme.colors.primary
            : inactiveColor || theme.colors.primary,
          backgroundColor: isChecked
            ? activeColor || theme.colors.primary
            : "transparent",
        },
        style,
      ]}
    >
      <BIcon
        size={SIZE_CHECKBOX_ICON[size]}
        name={"check"}
        color={isChecked ? "reverse" : "transparent"}
      />
    </BPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: MHS._4,
    borderWidth: 1,
  },
});

export default BCheckBox;
