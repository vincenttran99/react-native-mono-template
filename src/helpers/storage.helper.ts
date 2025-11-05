import { EDevicePerfomance } from "@/constants/system.constant";
import { createMMKV } from "react-native-mmkv";

export const MMKVStorage = createMMKV();

export function setTokenHelper(token: string) {
  MMKVStorage.set("token", token);
}

export function getTokenHelper() {
  return MMKVStorage.getString("token");
}

export function setFcmTokenHelper(token: string) {
  MMKVStorage.set("fcm_token", token);
}

export function getFcmTokenFromStorageHelper() {
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
