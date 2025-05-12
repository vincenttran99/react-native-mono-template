import React, { forwardRef, useMemo, useCallback, Children } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ScrollView, ScrollViewProps } from "react-native";
import { Device } from "constants/device.constant";
import {
  LegendList,
  LegendListProps,
  LegendListRenderItemProps,
} from "@legendapp/list";
import {
  backgroundColor,
  BackgroundColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
} from "@shopify/restyle";
import { Theme } from "constants/theme.constant";

export type BScrollviewProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  Omit<LegendListProps<any>, "data" | "renderItem">;

const RenderScrollComponent = (props: ScrollViewProps) => (
  <KeyboardAwareScrollView {...props} />
);

const LegendListRestyle = createRestyleComponent<
  BScrollviewProps & {
    data: ReadonlyArray<any>;
    renderItem: (props: LegendListRenderItemProps<any>) => React.ReactNode;
  },
  Theme
>([spacing, backgroundColor, layout], LegendList);

// BContainer implementation with optimizations
const BScrollview = forwardRef(
  (
    {
      children,
      estimatedItemSize,
      drawDistance = Device.height / 4,
      ...rest
    }: Omit<BScrollviewProps, "data" | "renderItem">,
    ref: any
  ) => {
    // Convert children to array or use function to create virtual data
    const data = Array.isArray(children)
      ? children
      : Children.toArray(children);

    const renderItem = useCallback(({ item }: { item: any }) => item, []);

    const keyExtractor = useCallback((_: any, index: number) => {
      return index.toString();
    }, []);

    if (estimatedItemSize === undefined) {
      console.warn("BScrollview: 'estimatedItemSize' is missing");
    }

    return (
      <LegendListRestyle
        ref={ref}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyExtractor={keyExtractor}
        {...rest}
        data={data}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
        drawDistance={drawDistance}
        renderScrollComponent={RenderScrollComponent}
      />
    );
  }
);

export default BScrollview;
