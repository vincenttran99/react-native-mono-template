import React, {
  forwardRef,
  MemoExoticComponent,
  useCallback,
  useMemo,
} from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { ScrollView, ScrollViewProps } from "react-native";
import {
  ERROR_ITEM,
  LOAD_MORE_ERROR_ITEM,
  LOADING_ITEM,
} from "helpers/hooks/list.hook";
import { DEVICE } from "constants/system.constant";
import DefaultLoadingListComponent from "components/list/list.defaultLoading.component";
import DefaultErrorListComponent from "components/list/list.defaultError.component";
import DefaultEmptyListComponent from "components/list/list.defaultEmpty.component";
import DefaultErrorItemListComponent from "components/list/list.defaultErrorItem.component";
import {
  backgroundColor,
  BackgroundColorProps,
  composeRestyleFunctions,
  spacing,
  SpacingProps,
  useRestyle,
} from "@shopify/restyle";
import { Theme } from "constants/theme.constant";
import { getDrawDistance } from "helpers/system.helper";

type RestyleProps = SpacingProps<Theme> & BackgroundColorProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  backgroundColor,
]);
export type BFlashListProps<TItem> = FlashListProps<TItem> &
  RestyleProps & {
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
    keyTypeAttribute?: string;
  };

const RenderScrollComponent = React.forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => <KeyboardAwareScrollView {...props} ref={ref} />
);

const BFlashListComponent = (
  {
    onEndReached,
    LoadingComponent,
    ErrorComponent,
    LoadMoreErrorComponent,
    keyAttribute,
    keyTypeAttribute = "type",
    refreshing,
    renderItem,
    horizontal,
    contentContainerStyle,
    data,
    estimatedListSize = {
      width: DEVICE.width,
      height: DEVICE.height - DEVICE.heightAppBar,
    },
    ...rest
  }: BFlashListProps<any>,
  ref: React.Ref<FlashList<any>>
) => {
  const props = useRestyle(restyleFunctions, rest);
  const contentContainerStyleProps = useMemo(() => {
    //@ts-ignore
    return { ...(props.style?.[0] || {}), ...contentContainerStyle };
  }, [contentContainerStyle, props.style]);

  const defaultDrawDistance = useMemo(() => {
    return getDrawDistance(horizontal ? "horizontal" : "vertical");
  }, [horizontal]);

  const keyExtractor = useCallback((item: any) => item?.[keyAttribute], []);

  const onEndReachedHandle = useCallback(() => {
    onEndReached?.();
  }, [onEndReached]);

  const renderItemHandle = useCallback(
    (info: any) => {
      switch (info.item?.[keyTypeAttribute]) {
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

  const getItemTypeDefault = useCallback(
    (item: any) => {
      return item?.[keyTypeAttribute];
    },
    [keyTypeAttribute]
  );

  return (
    <FlashList
      ref={ref}
      data={data}
      renderScrollComponent={RenderScrollComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItemHandle}
      ListEmptyComponent={DefaultEmptyListComponent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReachedHandle}
      refreshing={refreshing}
      getItemType={getItemTypeDefault}
      estimatedListSize={estimatedListSize}
      drawDistance={defaultDrawDistance}
      horizontal={horizontal}
      contentContainerStyle={contentContainerStyleProps}
      {...rest}
    />
  );
};

const BFlashList = forwardRef(BFlashListComponent);
export default BFlashList;
