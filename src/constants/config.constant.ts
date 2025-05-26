import Constants from "expo-constants";

export const CONFIG = {
  REQUEST_TIMEOUT: 15000,
  API_URL: Constants.expoConfig?.extra?.API_URL,
  DEEP_LINK: Constants.expoConfig?.extra?.DEEP_LINK,
  UNIVERSAL_URL: Constants.expoConfig?.extra?.UNIVERSAL_URL,
  PRIMARY_COLOR: Constants.expoConfig?.extra?.PRIMARY_COLOR,
};
