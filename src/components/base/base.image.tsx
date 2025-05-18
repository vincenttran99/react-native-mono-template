import React, { memo, useMemo } from "react";
import { Image, ImageProps } from "expo-image";
import { StyleSheet } from "react-native";

// blurhash for background image
// You can generate in https://blurha.sh/
const BLUR_HASH = { blurhash: "L9B~;g008w$_.TM_r=xuvKHqg%.m" };

export type BImageProps = ImageProps & {
  width?: number;
  height?: number;
  round?: boolean;
  hasBlur?: boolean;
};

const BImage = memo(
  ({
    width,
    hasBlur = true,
    height,
    round,
    style,
    transition,
    ...props
  }: BImageProps): React.JSX.Element => {
    console.log("render image ", props.source);

    const styleImage = useMemo(() => {
      let currentWidth = width || StyleSheet.flatten(style || {})?.width;
      let currentHeight =
        height ||
        StyleSheet.flatten(style || {})?.height ||
        (typeof currentWidth === "number" ? currentWidth : undefined);
      return {
        width: currentWidth,
        height: currentHeight,
        borderRadius: round
          ? Math.max(Number(currentWidth) || 0, Number(currentHeight) || 0)
          : StyleSheet.flatten(style || {})?.borderRadius,
      };
    }, [style, width, height, round]);

    return (
      <Image
        {...props}
        transition={transition || 300}
        placeholder={hasBlur ? BLUR_HASH : undefined}
        style={[style, styleImage]}
      />
    );
  }
);

export default BImage;
