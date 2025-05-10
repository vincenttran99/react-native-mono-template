import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import {
  FlatList,
  ImageStyle,
  Pressable,
  StyleProp,
  ViewStyle,
  ViewToken,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import isEqual from "react-fast-compare";
import DotSlideListComponent from "components/list/dotSlide.list.component";
import BImage from "components/base/image.base";
import { ImageContentFit } from "expo-image";
import { Device } from "constants/device.constant";
import BView from "components/base/view.base";

interface IIHorizontalSlideItem {
  image: string | number;

  [key: string]: any;
}

interface IHorizontalSlideListComponentProps {
  images: IIHorizontalSlideItem[];
  onPressItem?: (item: IIHorizontalSlideItem, index: number) => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  width: number;
  height: number;
  imageStyle?: StyleProp<ImageStyle>;
  infinity?: boolean;
  containerDotStyle?: StyleProp<ViewStyle>;
  activeDotColor?: string;
  inactiveDotColor?: string;
  autoPlay?: boolean;
  duration?: number;
  havePagination?: boolean;
  translationXParent?: SharedValue<number>;
  contentFit?: ImageContentFit;
  onViewableItemsChanged?: ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => void;
}

const HorizontalSlideListComponent = (
  {
    images,
    containerDotStyle,
    activeDotColor,
    inactiveDotColor,
    style,
    onViewableItemsChanged,
    width,
    translationXParent = useSharedValue(0),
    autoPlay = false,
    infinity = true,
    height,
    contentFit = "cover",
    havePagination = true,
    imageStyle,
    duration = 3000,
    onPressItem,
    contentContainerStyle,
  }: IHorizontalSlideListComponentProps,
  ref: any
) => {
  const translationX = useSharedValue(0);
  const listRef = useRef<FlatList>(null);
  const DATA = useMemo(
    () =>
      infinity && images.length > 1
        ? [images[images.length - 1], ...images, images[0]]
        : images,
    [images, infinity]
  );
  const intervalPlayRef = useRef<number>(null);
  const viewAbilityConfig = useRef({
    itemVisiblePercentThreshold: 100,
    waitForInteraction: true,
    minimumViewTime: 5,
  });
  const dataLengthRef = useRef(DATA.length);

  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex,
    }),
    []
  );

  const scrollToIndex = useCallback(
    (params: {
      animated?: boolean | null | undefined;
      index: number;
      viewOffset?: number | undefined;
      viewPosition?: number | undefined;
    }) => {
      listRef.current?.scrollToIndex(params);
    },
    []
  );

  useEffect(() => {
    dataLengthRef.current = DATA.length;

    if (autoPlay && dataLengthRef.current > 1) {
      intervalPlayRef.current = setInterval(() => {
        if (
          !infinity &&
          translationX.value >= width * (dataLengthRef.current - 2) &&
          intervalPlayRef.current
        ) {
          clearInterval(intervalPlayRef.current);
        }

        listRef.current?.scrollToOffset({
          offset: infinity
            ? translationX.value + width
            : Math.min(
                translationX.value + width,
                width * (dataLengthRef.current - 1)
              ),
          animated: true,
        });
      }, duration);
    }

    return () => {
      if (intervalPlayRef.current) {
        clearInterval(intervalPlayRef.current);
      }
    };
  }, [autoPlay, duration, infinity, DATA.length, width]);

  const renderPage = useCallback(
    ({ item, index }: { item: IIHorizontalSlideItem; index: number }) => {
      return (
        <Pressable onPress={() => onPressItem?.(item, index)}>
          <BImage
            source={item.image}
            priority={"high"}
            style={[imageStyle, { width, height }]}
            contentFit={contentFit}
          />
        </Pressable>
      );
    },
    [width, contentFit, imageStyle, onPressItem]
  );

  const scrollHandlerAnimation = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
    translationXParent.value = event.contentOffset.x;
  });

  const onMomentumScrollEnd = useCallback(() => {
    if (!infinity || dataLengthRef.current <= 1) {
      return;
    }

    if (Math.round(translationX.value / width) === 0) {
      listRef.current?.scrollToIndex({
        index: dataLengthRef.current - 2,
        animated: false,
      });
    }

    if (Math.round(translationX.value / width) === dataLengthRef.current - 1) {
      listRef.current?.scrollToIndex({ index: 1, animated: false });
    }
  }, [width]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width]
  );

  const onViewableItemsChangedItem = (event: {
    viewableItems: ViewToken[];
  }) => {
    if (Device.isAndroid && infinity && dataLengthRef.current > 1) {
      if (event.viewableItems[0]?.index === dataLengthRef.current - 1) {
        listRef.current?.scrollToIndex({ index: 1, animated: false });
      }
    }
    onViewableItemsChanged?.(event);
  };

  const viewAbilityConfigCallbackPairs = useRef([
    {
      viewAbilityConfig: viewAbilityConfig.current,
      onViewableItemsChanged: onViewableItemsChangedItem,
    },
  ]);

  return (
    <BView>
      <Animated.FlatList
        style={[style, { width, height }]}
        onScroll={scrollHandlerAnimation}
        initialScrollIndex={infinity && DATA.length > 1 ? 1 : 0}
        ref={listRef}
        horizontal
        // onViewableItemsChanged={onViewableItemsChangedItem}
        viewabilityConfigCallbackPairs={viewAbilityConfigCallbackPairs.current}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={contentContainerStyle}
        renderItem={renderPage}
        data={DATA}
        bounces={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />

      {havePagination && DATA.length > 1 ? (
        <DotSlideListComponent
          containerStyle={containerDotStyle}
          numOfDots={DATA.length}
          activeColor={activeDotColor}
          infinity={infinity}
          inactiveColor={inactiveDotColor}
          size={width}
          translationValue={translationX}
        />
      ) : null}
    </BView>
  );
};

export default memo(forwardRef(HorizontalSlideListComponent), isEqual);
