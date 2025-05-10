import React from "react";
import BPressable, { BPressableProps } from "./pressable.base";

import BIcon from "./icon.base";
import { ColorKey } from "constants/theme.constant";
import { Space } from "constants/sizes.constant";

type BIconButtonProps = BPressableProps & {
  size?: keyof typeof Space;
  iconColor?: ColorKey;
  icon: string;
};

const BIconButton = ({
  icon,
  iconColor,
  size = "sm",
  ...props
}: BIconButtonProps) => {
  return (
    <BPressable padding={size} borderRadius={size} {...props}>
      <BIcon
        name={icon}
        color={iconColor || "reverse"}
        size={Space[size] * 2}
      />
    </BPressable>
  );
};

export default BIconButton;
