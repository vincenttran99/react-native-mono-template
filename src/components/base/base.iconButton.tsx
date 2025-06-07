import React from "react";
import BPressable, { BPressableProps } from "./base.pressable";

import BIcon from "./base.icon";
import { ColorKey, Theme } from "@/constants/theme.constant";
import { Space } from "@/constants/sizes.constant";
import { ResponsiveValue } from "@shopify/restyle";

export type BIconButtonProps = BPressableProps & {
  size?: ResponsiveValue<keyof Theme["spacing"], Theme["breakpoints"]>;
  iconColor?: ColorKey;
  icon: string | React.ReactNode;
};

const BIconButton = ({
  icon,
  iconColor,
  size = "sm",
  ...props
}: BIconButtonProps) => {
  return (
    <BPressable padding={size} borderRadius={size} {...props}>
      {typeof icon === "string" ? (
        <BIcon
          name={icon}
          color={iconColor || "reverse"}
          size={Space[size] * 2}
        />
      ) : (
        icon
      )}
    </BPressable>
  );
};

export default BIconButton;
