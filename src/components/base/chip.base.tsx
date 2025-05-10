import React, { memo } from "react";
import { PressableProps } from "react-native";
import BText, { BTextProps } from "./text.base";
import BPressable from "./pressable.base";
import { FontSize, MHS } from "constants/sizes.constant";
import BIcon, { BIconProps } from "./icon.base";

export type BChipProps = PressableProps & {
  isSelected?: boolean;
  labelProps?: BTextProps;
  label?: string;
  icon?: string;
  iconProps?: BIconProps;
};

const BChip = ({
  label,
  isSelected,
  labelProps,
  icon,
  iconProps,
  ...props
}: BChipProps): React.JSX.Element => {
  return (
    <BPressable
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      paddingHorizontal="sm"
      paddingVertical="xxs"
      borderRadius="full"
      borderColor={isSelected ? "primary" : "primaryDark"}
      borderWidth={MHS._1}
      backgroundColor={isSelected ? "primary" : "transparent"}
      {...props}
    >
      {icon ? (
        <BIcon name={icon} size={FontSize.md} color="reverse" {...iconProps} />
      ) : null}
      {label ? (
        <BText
          fontWeight={"700"}
          color={isSelected ? "reverse" : "secondary"}
          fontSize={FontSize.md}
          {...labelProps}
        >
          {label}
        </BText>
      ) : null}
    </BPressable>
  );
};

export default memo(BChip);
