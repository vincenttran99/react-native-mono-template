import React, { forwardRef, useMemo, useCallback, Children } from "react";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ScrollView, ScrollViewProps } from "react-native";
import { DEVICE } from "constants/system.constant";
import {
  backgroundColor,
  BackgroundColorProps,
  composeRestyleFunctions,
  spacing,
  SpacingProps,
  useRestyle,
} from "@shopify/restyle";
import { Theme } from "constants/theme.constant";

type RestyleProps = SpacingProps<Theme> & BackgroundColorProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  backgroundColor,
]);
export type BScrollviewProps = Omit<
  FlashListProps<any>,
  "data" | "renderItem"
> &
  RestyleProps;

const RenderScrollComponent = React.forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => <KeyboardAwareScrollView {...props} ref={ref} />
);

// BContainer implementation with optimizations and new features
const BScrollview = forwardRef(
  (
    {
      children,
      estimatedItemSize,
      drawDistance = DEVICE.height * 2,
      estimatedListSize = {
        width: DEVICE.width,
        height: DEVICE.height - DEVICE.heightAppBar,
      },
      contentContainerStyle,
      ...rest
    }: BScrollviewProps,
    ref: React.Ref<FlashList<any>>
  ) => {
    const props = useRestyle(restyleFunctions, rest);
    const contentContainerStyleProps = useMemo(() => {
      //@ts-ignore
      return { ...(props.style?.[0] || {}), ...contentContainerStyle };
    }, [contentContainerStyle, props.style]);

    // Convert children to array or use function to create virtual data
    const data = useMemo(() => {
      return Array.isArray(children) ? children : Children.toArray(children);
    }, [children]);

    const renderItem = useCallback(({ item }: { item: any }) => item, []);

    const getItemType = useCallback((_: any, index: number) => {
      // Disable recycling by assigning unique type to each item
      return index;
    }, []);

    if (estimatedItemSize === undefined) {
      console.warn(
        "BScrollview: 'estimatedItemSize' is missing, check FlashList warnings for suggested value."
      );
    }

    return (
      <FlashList
        ref={ref}
        showsVerticalScrollIndicator={false}
        bounces={false}
        {...rest}
        contentContainerStyle={contentContainerStyleProps}
        data={data}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
        estimatedListSize={estimatedListSize}
        getItemType={getItemType}
        drawDistance={drawDistance}
        renderScrollComponent={RenderScrollComponent}
      />
    );
  }
);

export default BScrollview;
