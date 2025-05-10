import { MMKV } from "react-native-mmkv";
import DeviceInfo from "react-native-device-info";
import { CONFIG } from "constants/config.constant";

export const MMKVStorage = new MMKV();

export function truncateStringForLogBugsHelper(
  inputString: string,
  maxLength: number
): string {
  // Check if the input string length is less than or equal to the maximum length
  if (inputString.length <= maxLength) {
    return inputString; // Return the input string if its length is within the limit
  }

  // Split the string into an array of values, delimited by '|', and remove empty values
  const values: string[] = inputString.split("|").filter(Boolean);

  // Remove values from the beginning of the array until the length is within the limit
  while (inputString.length > maxLength) {
    values.shift(); // Remove the first value from the array
    inputString = values.join("|"); // Reconstruct the string
  }

  return inputString; // Return the truncated string
}

export function setTargetScreenHelper(data: string) {
  MMKVStorage.set("targetScreen", data);
}

export function getTargetScreenHepler() {
  return MMKVStorage.getString("targetScreen") || "";
}

export function setRefCodeHelper(data: string) {
  MMKVStorage.set("refCode", data);
}

export function getRefCodeHelper() {
  return MMKVStorage.getString("refCode") || "";
}

export function setBugOwnerIdHelper(data: string) {
  MMKVStorage.set("bug.ownerid", data);
}

export function getBugOwnerIdHelper() {
  return MMKVStorage.getString("bug.ownerid") || "";
}

export async function setBugDeviceHelper() {
  if (
    __DEV__ ||
    !(CONFIG.ENABLE_LOG_USER_BUGS_TO_FIREBASE?.toLowerCase() === "true")
  )
    return;

  let realtimeData = {
    getBuildNumber: DeviceInfo.getBuildNumber(),
    getCarrier: await DeviceInfo.getCarrier(),
    getFontScale: await DeviceInfo.getFontScale(),
    getFreeDiskStorage:
      Math.floor((await DeviceInfo.getFreeDiskStorage()) / 1000000) + " MB",
    getPowerState: await DeviceInfo.getPowerState(),
    getVersion: DeviceInfo.getVersion(),
    getSystemVersion: DeviceInfo.getSystemVersion(),
    getUserAgent: await DeviceInfo.getUserAgent(),
    isLandscape: await DeviceInfo.isLandscape(),
    isLocationEnabled: await DeviceInfo.isLocationEnabled(),
  };
  if (MMKVStorage.contains("bug.device")) {
    MMKVStorage.set(
      "bug.device",
      JSON.stringify({
        ...JSON.parse(MMKVStorage.getString("bug.device") || "{}"),
        ...realtimeData,
      })
    );
  } else {
    MMKVStorage.set(
      "bug.device",
      JSON.stringify({
        getApplicationName: DeviceInfo.getApplicationName(),
        getBuildId: await DeviceInfo.getBuildId(),
        getBrand: DeviceInfo.getBrand(),
        getDeviceType: DeviceInfo.getDeviceType(),
        getBundleId: DeviceInfo.getBundleId(),
        getDeviceName: await DeviceInfo.getDeviceName(),
        getFirstInstallTime: new Date(
          await DeviceInfo.getFirstInstallTime()
        ).toLocaleString(),
        getInstallerPackageName: await DeviceInfo.getInstallerPackageName(),
        getDeviceId: DeviceInfo.getDeviceId(),
        getSystemName: DeviceInfo.getSystemName(),
        hasNotch: DeviceInfo.hasNotch(),
        hasDynamicIsland: DeviceInfo.hasDynamicIsland(),
        //   isTablet: DeviceInfo.isTablet(),
        getTotalDiskCapacity:
          Math.floor((await DeviceInfo.getTotalDiskCapacity()) / 1000000) +
          " MB",
        getTotalDiskCapacityOld:
          Math.floor((await DeviceInfo.getTotalDiskCapacityOld()) / 1000000) +
          " MB",
        getTotalMemory:
          Math.floor((await DeviceInfo.getTotalMemory()) / 1000000) + " MB",
        supportedAbis: await DeviceInfo.supportedAbis(),
        ...realtimeData,
      })
    );
  }
}

export function getBugDeviceHelper() {
  return MMKVStorage.getString("bug.device") || "";
}

export function setBugLogHelper(data: string) {
  if (
    __DEV__ ||
    !(CONFIG.ENABLE_LOG_USER_BUGS_TO_FIREBASE?.toLowerCase() === "true")
  )
    return;
  MMKVStorage.set(
    "bug.logs",
    truncateStringForLogBugsHelper(
      (MMKVStorage.getString("bug.logs") || "") + data,
      20000
    )
  );
}

export function clearBugLogHelper() {
  MMKVStorage.set("bug.logs", "");
}

export function getBugLogHelper() {
  return MMKVStorage.getString("bug.logs") || "";
}
