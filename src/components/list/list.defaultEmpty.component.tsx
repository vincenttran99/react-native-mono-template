import React, { memo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { MHS } from "constants/sizes.constant";
import isEqual from "react-fast-compare";
import { SVGIconEmpty } from "assets/svgIcon";
import BText from "components/base/base.text";
import { Device } from "constants/device.constant";

import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/base.view";

export type ListDefaultEmptyComponentProps = {
  sizeIcon?: number;
  bigTextStyle?: React.ComponentProps<typeof BText>;
  bigText?: string;
  smallTextStyle?: React.ComponentProps<typeof BText>;
  smallText?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const ListDefaultEmptyComponent = memo(
  ({
    sizeIcon = MHS._100,
    bigText = "Opps",
    smallText,
    bigTextStyle,
    smallTextStyle,
    containerStyle,
  }: ListDefaultEmptyComponentProps) => {
    const { _ } = useLingui();
    return (
      <BView style={[styles.container, containerStyle]}>
        <SVGIconEmpty size={sizeIcon} />
        <BText variant={"md"} fontWeight={"bold"} {...bigTextStyle}>
          {bigText}
        </BText>
        <BText variant={"md"} {...smallTextStyle}>
          {smallText || _(msg`Danh sách trống`)}
        </BText>
      </BView>
    );
  },
  isEqual
);
const styles = StyleSheet.create({
  container: {
    gap: MHS._12,
    height: Device.height * 0.88,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListDefaultEmptyComponent;
