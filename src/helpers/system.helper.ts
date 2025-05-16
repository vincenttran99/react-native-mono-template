import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Children, cloneElement, isValidElement } from "react";
import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

dayjs.extend(isBetween);
const { width, height } = Dimensions.get("window");

/**
 * Thanks to
 * https://github.com/nirsky/react-native-size-matters
 */
const [shortDimension, longDimension] =
  width > height ? [height, width] : [width, height];
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

/**
 * horizontalScale
 * @param size
 * Scale by screen horizontal ratio for size compensation
 */
export function horizontalScale(size: number) {
  return (size * shortDimension) / guidelineBaseWidth;
}

/**
 * verticalScale
 * @param size
 * Scale by screen vertical ratio for size compensation
 */
export function verticalScale(size: number) {
  return (size * longDimension) / guidelineBaseHeight;
}

/**
 * moderateHorizontalScale
 * @param size
 * @param factor
 * Scale by screen horizontal ratio with factor for size compensation. Default factor is 0.5.
 */
export function moderateHorizontalScale(size: number, factor = 0.5) {
  return size + (horizontalScale(size) - size) * factor;
}

/**
 * moderateVerticalScale
 * @param size
 * @param factor
 * Scale by screen vertical ratio with factor for size compensation. Default factor is 0.5.
 */
export function moderateVerticalScale(size: number, factor = 0.5) {
  return size + (verticalScale(size) - size) * factor;
}

/**
 * Short name
 */
export const hs = horizontalScale;
export const vs = verticalScale;
export const mhs = moderateHorizontalScale;
export const mvs = moderateVerticalScale;

export const checkHasNewVersionHelper = (version?: string) => {
  if (!version) {
    return false;
  }

  return Number(version) > Number(DeviceInfo.getBuildNumber());
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Recursively processes and renders special elements based on given filters and properties.
 *
 * @param {React.ReactNode} children - The children elements to be rendered.
 * @param {Object} props - Additional properties to pass to the children elements.
 * @returns {React.ReactNode[]} - The filtered and modified children elements.
 */
export function renderSpecialElementHelper({
  children,
  props = {},
}: {
  children: React.ReactNode;
  props?: { [key: string]: { [key: string]: any } };
}): React.ReactNode[] {
  const renderOnly = Object.keys(props);

  // Recursive function to process each child
  const processChild = (child: React.ReactNode): React.ReactNode => {
    // If child is a valid element with children, recursively process them
    if (
      isValidElement(child) &&
      Children.toArray(child.props.children).length > 0
    ) {
      return cloneElement(
        child,
        child.props,
        Children.toArray((child as React.ReactElement).props.children).map(
          processChild
        )
      );
    }

    // If child is a valid React element
    if (isValidElement(child)) {
      // Redundant check - can be removed
      if (!isValidElement(child)) {
        return child;
      }

      // Get the display name of the child element type
      const displayName = (child.type as any).displayName;

      // Check if the element should be included
      if (renderOnly && !renderOnly.includes(displayName)) {
        return null;
      }

      // Apply props to the child element
      return cloneElement(child, props?.[displayName]);
    }

    // Return the original child if it is not a valid React element
    return child;
  };

  // Convert children to an array and process each child
  return Children.toArray(children).map(processChild);
}
