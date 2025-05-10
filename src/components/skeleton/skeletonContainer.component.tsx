import { Children, useCallback, useEffect, useMemo, useState } from "react";

import {
  Animated,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MaskedView from "@react-native-masked-view/masked-view";
import { Device } from "constants/device.constant";
import BView from "components/base/view.base";

interface ISkeletonContainerComponentProps {
  /**
   * Determines component's children.
   */
  children: React.ReactElement | React.ReactElement[];
  /**
   * Determines the color of placeholder.
   * @default #E1E9EE
   */
  backgroundColor?: string;
  /**
   * Determines the highlight color of placeholder.
   * @default #F2F8FC
   */
  highlightColor?: string;
  /**
   * Determines the animation speed in milliseconds. Use 0 to disable animation
   * @default 800
   */
  speed?: number;
  /**
   * Determines the animation direction, left or right
   * @default right
   */
  direction?: "left" | "right";
}

/**
 * Child luôn chỉ là BView
 * @param children
 * @param backgroundColor
 * @param speed
 * @param highlightColor
 * @param direction
 * @constructor
 */
export default function SkeletonContainerComponent({
  children,
  backgroundColor = "#E1E9EE",
  speed = 800,
  highlightColor = "#F2F8FC",
  direction = "right",
}: ISkeletonContainerComponentProps): JSX.Element {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const animatedValue = useMemo(() => new Animated.Value(0), []);
  const translateX = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange:
          direction === "right"
            ? [-Device.width, Device.width]
            : [Device.width, -Device.width],
      }),
    [animatedValue]
  );

  useEffect(() => {
    if (speed > 0) {
      const loop = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: speed,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      );
      if (layout?.width && layout?.height) {
        loop.start();
      }
      return () => loop.stop();
    }
    return;
  }, [animatedValue, speed, layout?.width, layout?.height]);

  const absoluteTranslateStyle = useMemo(
    () => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }),
    [translateX]
  );
  const viewStyle = useMemo<ViewStyle>(
    () => ({ backgroundColor, overflow: "hidden" }),
    [backgroundColor]
  );

  const getChildren = useCallback(
    (element: JSX.Element | JSX.Element[]) => {
      return Children.map(element, (child: JSX.Element, index: number) => {
        let style: ViewStyle;
        if (child.type.displayName === "SkeletonPlaceholderItem") {
          const { children, ...styles } = child.props;
          style = styles;
        } else {
          style = child.props.style;
        }
        if (child.props.children) {
          return (
            <BView key={index} style={style}>
              {getChildren(child.props.children)}
            </BView>
          );
        } else {
          return (
            <BView key={index} style={styles.childContainer}>
              <BView style={[style, viewStyle]} />
            </BView>
          );
        }
      });
    },
    [viewStyle]
  );

  return layout?.width && layout?.height ? (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={
        <BView
          style={{
            backgroundColor: "transparent",
          }}
        >
          {getChildren(children)}
        </BView>
      }
    >
      <BView style={{ flexGrow: 1, backgroundColor }} />
      {speed > 0 ? (
        <Animated.View
          style={[
            {
              flexDirection: "row",
            },
            absoluteTranslateStyle,
          ]}
        >
          <MaskedView
            style={StyleSheet.absoluteFill}
            maskElement={
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill]}
                colors={["transparent", "black", "transparent"]}
              />
            }
          >
            <BView
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: highlightColor },
              ]}
            ></BView>
          </MaskedView>
        </Animated.View>
      ) : null}
    </MaskedView>
  ) : (
    <BView
      onLayout={(event: LayoutChangeEvent) => {
        setLayout(event.nativeEvent.layout);
      }}
    >
      {getChildren(children)}
    </BView>
  );
}

interface SkeletonPlaceholderItem extends ViewStyle {
  children?: JSX.Element | JSX.Element[];
}

SkeletonContainerComponent.Item = ({
  children,
  ...style
}: SkeletonPlaceholderItem): JSX.Element => (
  <BView style={style}>{children}</BView>
);

const styles = StyleSheet.create({
  childContainer: {
    position: "relative",
  },
  gradient: {
    flex: 1,
  },
});
