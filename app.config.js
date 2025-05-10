const pkg = require("./package.json");
import getEnvVars from "./scripts/env-object";
import dotenv from "dotenv";
import path from "path";

const DARK_SPLASH_ANDROID_BACKGROUND = "#0f141b";

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

  const IS_TESTFLIGHT = process.env.EXPO_PUBLIC_ENV === "testflight";
  const IS_PRODUCTION = process.env.EXPO_PUBLIC_ENV === "production";
  const IS_DEV = !IS_TESTFLIGHT || !IS_PRODUCTION;

  // const ASSOCIATED_DOMAINS = [
  //   'applinks:bsky.app',
  //   'applinks:staging.bsky.app',
  //   'appclips:bsky.app',
  //   'appclips:go.bsky.app', // Allows App Clip to work when scanning QR codes
  //   // When testing local services, enter an ngrok (et al) domain here. It must use a standard HTTP/HTTPS port.
  //   ...(IS_DEV || IS_TESTFLIGHT ? [] : []),
  // ]

  const USE_SENTRY = Boolean(process.env.SENTRY_AUTH_TOKEN);

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
          // NSMicrophoneUsageDescription:
          //   "Used for posts and other kinds of content.",
          UIBackgroundModes: ["remote-notification"],
          // NSMicrophoneUsageDescription:
          //   'Used for posts and other kinds of content.',
          NSPhotoLibraryAddUsageDescription:
            "Used to save images to your library.",
          NSPhotoLibraryUsageDescription:
            "Used for profile pictures and other kinds of content",
          // CFBundleSpokenName: 'Blue Sky',
          // CFBundleLocalizations: ['en', 'vi'],

          //Environment variables
          ...configVars,
        },
        // associatedDomains: ASSOCIATED_DOMAINS,
        entitlements: {
          "aps-environment": "development",
          // 'com.apple.developer.kernel.increased-memory-limit': true,
          // 'com.apple.developer.kernel.extended-virtual-addressing': true,
          // 'com.apple.security.application-groups': 'group.app.bsky',
        },
        // privacyManifests: {
        //   NSPrivacyAccessedAPITypes: [
        //     {
        //       NSPrivacyAccessedAPIType:
        //         'NSPrivacyAccessedAPICategoryFileTimestamp',
        //       NSPrivacyAccessedAPITypeReasons: ['C617.1', '3B52.1', '0A2A.1'],
        //     },
        //     {
        //       NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryDiskSpace',
        //       NSPrivacyAccessedAPITypeReasons: ['E174.1', '85F4.1'],
        //     },
        //     {
        //       NSPrivacyAccessedAPIType:
        //         'NSPrivacyAccessedAPICategorySystemBootTime',
        //       NSPrivacyAccessedAPITypeReasons: ['35F9.1'],
        //     },
        //     {
        //       NSPrivacyAccessedAPIType:
        //         'NSPrivacyAccessedAPICategoryUserDefaults',
        //       NSPrivacyAccessedAPITypeReasons: ['CA92.1', '1C8F.1'],
        //     },
        //   ],
        // },
      },
      androidStatusBar: {
        barStyle: "light-content",
        backgroundColor: "#00000000",
      },
      // Dark nav bar in light mode is better than light nav bar in dark mode
      androidNavigationBar: {
        barStyle: "light-content",
        backgroundColor: DARK_SPLASH_ANDROID_BACKGROUND,
      },
      android: {
        versionCode: BUILD_CODE,
        // icon: './src/assets/app-icons/android_icon_default_light.png',
        // edgeToEdgeEnabled: true,
        adaptiveIcon: {
          // foregroundImage: './src/assets/icon-android-foreground.png',
          foregroundImage: "./src/assets/images/adaptive-icon.png",
          // monochromeImage: './src/assets/icon-android-foreground.png',
          // backgroundImage: './src/assets/icon-android-background.png',
          backgroundColor: "#000000",
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
        bundler: "metro",
        output: "static",
        favicon: "./src/assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        "@react-native-firebase/app",
        "@react-native-firebase/messaging",
        "expo-localization",
        "expo-font",
        "expo-web-browser",
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

            // optionally, if you want to record audio:
            // "enableMicrophonePermission": true,
            // "microphonePermissionText": "$(PRODUCT_NAME) needs access to your Microphone."
          },
        ],
        [
          "expo-notifications",
          {
            icon: "./src/assets/images/notification-icon.png",
            color: configVars.PRIMARY_COLOR,
            // defaultChannel: "default",
            // sounds: [
            //   "./local/assets/notification_sound.wav",
            //   "./local/assets/notification_sound_other.wav",
            // ],
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
        //   eas: {
        //     build: {
        //       experimental: {
        //         ios: {
        //           appExtensions: [
        //             {
        //               targetName: "Share-with-Whiteber",
        //               bundleIdentifier: "com.whiteber.Share-with-Whiteber",
        //               entitlements: {
        //                 "com.apple.security.application-groups": [
        //                   "group.app.bsky",
        //                 ],
        //               },
        //             },
        //             {
        //               targetName: "WhiteberNSE",
        //               bundleIdentifier: "com.whiteber.WhiteberNSE",
        //               entitlements: {
        //                 "com.apple.security.application-groups": [
        //                   "group.app.bsky",
        //                 ],
        //               },
        //             },
        //             {
        //               targetName: "WhiteberClip",
        //               bundleIdentifier: "com.whiteber.AppClip",
        //             },
        //           ],
        //         },
        //       },
        //     },
        //     projectId: "55bd077a-d905-4184-9c7f-94789ba0f302",
        //   },
      },
      experiments: {
        typedRoutes: true,
      },
    },
  };
};
