import React, { memo } from "react";
import BText, { BTextProps } from "./base.text";
import BPressable, { BPressableProps } from "./base.pressable";
import { FontSize, MHS } from "constants/sizes.constant";
import BIcon, { BIconProps } from "./base.icon";
import isEqual from "react-fast-compare";

export type BChipProps = BPressableProps & {
  isSelected?: boolean;
  labelProps?: BTextProps;
  label?: string;
  icon?: string;
  iconProps?: Omit<BIconProps, "name">;
};

const BChip = memo(
  ({
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
        gap="xxxxs"
        borderColor={isSelected ? "primary" : "primaryDark"}
        borderWidth={MHS._1}
        backgroundColor={isSelected ? "primary" : "transparent"}
        {...props}
      >
        {icon ? (
          <BIcon
            name={icon}
            size={FontSize.md}
            color="reverse"
            {...iconProps}
          />
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
  },
  isEqual
);

export default BChip;
