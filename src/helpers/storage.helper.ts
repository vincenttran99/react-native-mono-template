import { EDevicePerfomance } from "@/constants/system.constant";
import { MMKV } from "react-native-mmkv";

export const MMKVStorage = new MMKV();

export function setTokenHelper(token: string) {
  MMKVStorage.set("token", token);
}

export function getTokenHelper() {
  return MMKVStorage.getString("token");
}

export function setFcmTokenHelper(token: string) {
  MMKVStorage.set("fcm_token", token);
}

export function getFcmTokenHelper() {
  return MMKVStorage.getString("fcm_token");
}

export function setDevicePerformance(value: EDevicePerfomance) {
  MMKVStorage.set("device_performance", value);
}

export function getDevicePerformance(): EDevicePerfomance {
  return (
    (MMKVStorage.getString("device_performance") as EDevicePerfomance) ||
    EDevicePerfomance.Medium
  );
}
