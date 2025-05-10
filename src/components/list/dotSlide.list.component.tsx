import React, { memo, useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { MHS } from "constants/sizes.constant";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import isEqual from "react-fast-compare";
import BView from "components/base/view.base";
import { useTheme } from "@shopify/restyle";

interface IDotSlideListComponentProps {
  translationValue: SharedValue<number>;
  numOfDots: number;
  containerStyle?: StyleProp<ViewStyle>;
  activeColor?: string;
  inactiveColor?: string;
  infinity?: boolean;
  size: number;
}

const DotSlideListComponent = ({
  translationValue,
  numOfDots,
  infinity = true,
  size,
  containerStyle,
  inactiveColor = "black",
  activeColor,
}: IDotSlideListComponentProps) => {
  const theme = useTheme();
  const DATA = useMemo(() => [...Array(numOfDots)], [numOfDots]);

  const Pagination = useCallback(
    ({ index }: { index: number }) => {
      if (infinity && (index === 0 || index === numOfDots - 1)) {
        return null;
      }

      const stylePagination = useAnimatedStyle(() => {
        return {
          backgroundColor: interpolateColor(
            translationValue.value,
            [size * (index - 1), size * index, size * (index + 1)],
            [inactiveColor, activeColor || theme.colors.reverse, inactiveColor]
          ),
        };
      });

      return (
        <Animated.View style={[styles.containerPagination, stylePagination]} />
      );
    },
    [activeColor, inactiveColor, size, infinity]
  );

  return (
    <BView style={[styles.container, containerStyle]}>
      {DATA.map((_, index) => (
        <Pagination key={index.toString()} index={index} />
      ))}
    </BView>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: MHS._6,
    flexDirection: "row",
  },
  containerPagination: {
    width: MHS._10,
    aspectRatio: 1,
    borderRadius: MHS._16,
  },
});

export default memo(DotSlideListComponent, isEqual);
