import Constants from "expo-constants";

export const CONFIG = {
  REQUEST_TIMEOUT: 15000,
  API_URL: Constants.expoConfig?.extra?.API_URL,
  POLICY_URL: Constants.expoConfig?.extra?.POLICY_URL,
  DEEP_LINK: Constants.expoConfig?.extra?.DEEP_LINK,
  WEBSITE_URL: Constants.expoConfig?.extra?.WEBSITE_URL,
  UNIVERSAL_URL: Constants.expoConfig?.extra?.UNIVERSAL_URL,
  PRIMARY_COLOR: Constants.expoConfig?.extra?.PRIMARY_COLOR,
};
