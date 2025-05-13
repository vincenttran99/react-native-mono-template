const pkg = require("./package.json");
import getEnvVars from "./scripts/env-object";
import dotenv from "dotenv";
import path from "path";

module.exports = function () {
  /**
   * App version number. Should be incremented as part of a release cycle.
   */
  const VERSION = pkg.version;
  const BUILD_CODE = pkg.buildNumber;

  /**
   * Environment variables
   */
  const ENV = process.env.APP_ENV || "development";
  const envPath = path.resolve(`./.env.${ENV}`);
  dotenv.config({ path: envPath, override: true });
  const configVars = getEnvVars();

  return {
    expo: {
      version: VERSION,
      name: "Mono template",
      slug: "mono-template",
      scheme: "mono-template",
      newArchEnabled: true,
      orientation: "portrait",
      jsEngine: "hermes",
      runtimeVersion: {
        policy: "appVersion",
      },
      icon: "./src/assets/images/icon.png",
      userInterfaceStyle: "automatic",
      primaryColor: configVars.PRIMARY_COLOR,
      ios: {
        buildNumber: BUILD_CODE,
        supportsTablet: true,
        googleServicesFile: "./GoogleService-Info.plist",
        bundleIdentifier: "com.reactnative.mono.template",
        config: {
          usesNonExemptEncryption: false,
        },
        infoPlist: {
          LSApplicationQueriesSchemes: ["itms-apps"],
          NSCameraUsageDescription:
            "Used for profile pictures, posts, and other kinds of content.",
          NSLocationWhenInUseUsageDescription:
            "Used for distance and mileage calculation.",
          UIBackgroundModes: ["remote-notification"],
          NSPhotoLibraryAddUsageDescription:
            "Used to save images to your library.",
          NSPhotoLibraryUsageDescription:
            "Used for profile pictures and other kinds of content",
          CFBundleSpokenName: "React Native Mono Template",
          CFBundleLocalizations: ["en", "vi"],

          //Environment variables
          ...configVars,
        },
        entitlements: {
          "aps-environment": "development",
        },
      },
      android: {
        versionCode: BUILD_CODE,
        // edgeToEdgeEnabled: true,
        adaptiveIcon: {
          foregroundImage: "./src/assets/images/adaptive-icon.png",
        },
        googleServicesFile: "./google-services.json",
        package: "com.reactnative.mono.template",
        permissions: [
          "android.permission.DOWNLOAD_WITHOUT_NOTIFICATION",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_MEDIA_VIDEO",
          "android.permission.READ_MEDIA_IMAGES",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.CAMERA",
        ],
      },
      web: {
        // bundler: "metro",
        // output: "static",
        favicon: "./src/assets/images/favicon.png",
      },
      plugins: [
        "@react-native-firebase/app",
        "@react-native-firebase/messaging",
        "expo-localization",
        "expo-font",
        [
          "expo-build-properties",
          {
            ios: {
              useFrameworks: "static",
            },
          },
        ],
        [
          "react-native-vision-camera",
          {
            cameraPermissionText:
              "$(PRODUCT_NAME) needs access to your Camera.",
          },
        ],
        [
          "expo-notifications",
          {
            icon: "./src/assets/images/notification-icon.png",
            color: configVars.PRIMARY_COLOR,
            enableBackgroundRemoteNotifications: true,
          },
        ],
        [
          "expo-splash-screen",
          {
            backgroundColor: "#F3F3F3",
            image: "./src/assets/images/splash-icon-light.png",
            dark: {
              image: "./src/assets/images/splash-icon-dark.png",
              backgroundColor: "#131313",
            },
            imageWidth: 280,
          },
        ],
        [
          "react-native-permissions",
          {
            iosPermissions: ["Camera", "Microphone"],
          },
        ],
        "./plugins/withAppBuildGradlePlugin.js",
        "./plugins/withAndroidManifestPlugin.js",
      ],
      extra: {
        ...configVars,
      },
      experiments: {
        typedRoutes: true,
      },
    },
  };
};
