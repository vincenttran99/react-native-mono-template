import React, { forwardRef, MemoExoticComponent, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ScrollView, ScrollViewProps } from "react-native";
import {
  ERROR_ITEM,
  LOAD_MORE_ERROR_ITEM,
  LOADING_ITEM,
} from "helpers/hooks/list.hook";
import { Device } from "constants/device.constant";
import DefaultLoadingListComponent from "components/list/defaultLoading.list.component";
import DefaultErrorListComponent from "components/list/defaultError.list.component";
import DefaultEmptyListComponent from "components/list/defaultEmpty.list.component";
import DefaultErrorItemListComponent from "components/list/defaultErrorItem.list.component";
import { LegendList } from "@legendapp/list";

type BListProps = React.ComponentProps<typeof LegendList> & {
  /**
   * Rendered when the list is loading. Can be a React Component Class, a render function, or
   * a rendered element.
   */
  LoadingComponent?: JSX.ElementType | MemoExoticComponent<() => JSX.Element>;
  ErrorComponent?: JSX.ElementType | MemoExoticComponent<() => JSX.Element>;
  LoadMoreErrorComponent?:
    | JSX.ElementType
    | MemoExoticComponent<() => JSX.Element>;
  keyAttribute: string;
};

const RenderScrollComponent = React.forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => <KeyboardAwareScrollView {...props} ref={ref} />
);
const getItemTypeDefault = (item: any) => {
  return item?.type;
};

const BList2Component = (
  {
    onEndReached,
    LoadingComponent,
    ErrorComponent,
    LoadMoreErrorComponent,
    keyAttribute,
    refreshing,
    renderItem,
    horizontal,
    // estimatedListSize = {
    //   width: Device.width,
    //   height: Device.height - Device.heightAppBar,
    // },
    drawDistance = Device.height * 1.3,
    // getItemType = getItemTypeDefault,
    ...props
  }: BListProps,
  ref: any
) => {
  const keyExtractor = useCallback(
    (item: any, index: number) => item?.[keyAttribute] + String(index),
    []
  );

  const onEndReachedHandle = useCallback(
    (info: { distanceFromEnd: number }) => {
      onEndReached?.(info);
    },
    [onEndReached]
  );

  const renderItemHandle = useCallback(
    (info: any) => {
      switch (info.item?.[keyAttribute]) {
        case LOADING_ITEM:
          return LoadingComponent ? (
            <LoadingComponent />
          ) : (
            <DefaultLoadingListComponent horizontal={horizontal} />
          );
        case ERROR_ITEM:
          return ErrorComponent ? (
            <ErrorComponent />
          ) : (
            <DefaultErrorListComponent horizontal={horizontal} />
          );
        case LOAD_MORE_ERROR_ITEM:
          return LoadMoreErrorComponent ? (
            <LoadMoreErrorComponent />
          ) : (
            <DefaultErrorItemListComponent horizontal={horizontal} />
          );
        default:
          return renderItem(info);
      }
    },
    [
      renderItem,
      LoadingComponent,
      ErrorComponent,
      LoadMoreErrorComponent,
      horizontal,
    ]
  );

  return (
    <LegendList
      ref={ref}
      // renderScrollComponent={RenderScrollComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItemHandle}
      ListEmptyComponent={DefaultEmptyListComponent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReachedHandle}
      // refreshing={refreshing}
      // getItemType={getItemType}
      // estimatedListSize={estimatedListSize}
      drawDistance={drawDistance}
      horizontal={horizontal}
      recycleItems
      {...props}
    />
  );
};

const BList2 = BList2Component;
export default BList2;
