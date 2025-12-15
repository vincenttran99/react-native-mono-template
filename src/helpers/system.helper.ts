import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Children, cloneElement, isValidElement } from "react";
import DeviceInfo from "react-native-device-info";
import { getDevicePerformance } from "./storage.helper";
import {
  DRAW_DISTANCE_HORIZONTAL,
  DRAW_DISTANCE_VERTICAL,
  EDevicePerformance,
} from "@/constants/system.constant";

dayjs.extend(isBetween);

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

/**
 * Evaluates device performance based on hardware specifications
 * @returns {Promise<string>} 'low', 'medium', or 'high'
 */
export async function evaluateDevicePerformanceHelper(): Promise<EDevicePerformance> {
  try {
    // Collect device information
    const systemVersion = DeviceInfo.getSystemVersion();
    const totalDiskCapacityBytes = await DeviceInfo.getTotalDiskCapacity();
    const totalMemoryBytes = await DeviceInfo.getTotalMemory();
    const supportedAbis = await DeviceInfo.supportedAbis();

    // Convert capacity to GB for easier evaluation
    const totalDiskCapacityGB = totalDiskCapacityBytes / (1024 * 1024 * 1024);
    const totalMemoryGB = totalMemoryBytes / (1024 * 1024 * 1024);

    // Operating system
    const isIOS = DeviceInfo.getSystemName() === "iOS";

    // Scores for each specification
    let scoreSystem = 0;
    let scoreDisk = 0;
    let scoreMemory = 0;
    let scoreProcessor = 0;

    // 1. Evaluate operating system version
    if (isIOS) {
      // Evaluate iOS version
      const iosVersion = parseFloat(systemVersion);
      if (iosVersion >= 16) {
        scoreSystem = 3; // New version
      } else if (iosVersion >= 14) {
        scoreSystem = 2; // Medium version
      } else {
        scoreSystem = 1; // Old version
      }
    } else {
      // Evaluate Android version
      const androidVersion = parseFloat(systemVersion);
      if (androidVersion >= 12) {
        scoreSystem = 3; // New version
      } else if (androidVersion >= 10) {
        scoreSystem = 2; // Medium version
      } else {
        scoreSystem = 1; // Old version
      }
    }

    // 2. Evaluate storage capacity
    if (totalDiskCapacityGB >= 128) {
      scoreDisk = 3; // Large capacity
    } else if (totalDiskCapacityGB >= 64) {
      scoreDisk = 2; // Medium capacity
    } else {
      scoreDisk = 1; // Low capacity
    }

    // 3. Evaluate RAM
    if (totalMemoryGB >= 6) {
      scoreMemory = 3; // Large RAM
    } else if (totalMemoryGB >= 4) {
      scoreMemory = 2; // Medium RAM
    } else {
      scoreMemory = 1; // Low RAM
    }

    // 4. Evaluate CPU architecture based on supportedAbis
    const hasArm64 = supportedAbis.some(
      (abi) => abi.includes("arm64") || abi.includes("aarch64")
    );
    const hasModernArm = supportedAbis.some(
      (abi) => abi.includes("v8") || abi.includes("v8a")
    );
    const hasX86_64 = supportedAbis.some((abi) => abi.includes("x86_64"));

    if (hasArm64 || hasX86_64) {
      scoreProcessor = 3; // 64-bit, high performance
    } else if (hasModernArm) {
      scoreProcessor = 2; // Modern ARM, medium performance
    } else {
      scoreProcessor = 1; // Old architecture, low performance
    }

    // Calculate total score (weights can be adjusted as needed)
    const totalScore =
      (scoreSystem * 1 + // Weight 1 for OS
        scoreDisk * 0.5 + // Weight 0.5 for storage capacity
        scoreMemory * 1.5 + // Weight 1.5 for RAM (more important)
        scoreProcessor * 2) / // Weight 2 for CPU (most important)
      (1 + 0.5 + 1.5 + 2); // Sum of weights

    // Classify device
    if (totalScore >= 2.5) {
      return EDevicePerformance.High;
    } else if (totalScore >= 1.7) {
      return EDevicePerformance.Medium;
    } else {
      return EDevicePerformance.Low;
    }
  } catch (error) {
    console.error("Error evaluating device:", error);
    return EDevicePerformance.Medium; // Return default value if there's an error
  }
}

export function getDrawDistance(direction: "vertical" | "horizontal") {
  if (direction === "vertical") {
    return DRAW_DISTANCE_VERTICAL[getDevicePerformance()];
  } else {
    return DRAW_DISTANCE_HORIZONTAL[getDevicePerformance()];
  }
}
