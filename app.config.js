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
      /**
       * Application version from package.json
       * This is displayed to users and used for updates
       */
      version: VERSION,

      /**
       * Display name of the application
       * Shown on the device home screen
       */
      name: "Mono template",

      /**
       * Unique identifier for the app on Expo's servers
       * Used for publishing and OTA updates
       */
      slug: "mono-template",

      /**
       * URL scheme for deep linking
       * Allows other apps to open this app with links like: mono.template://
       */
      scheme: "mono.template",

      /**
       * Enables the new React Native architecture
       * Provides better performance and smaller bundle size
       */
      newArchEnabled: true,

      /**
       * Locks the app to portrait orientation
       * Prevents rotation on devices
       */
      orientation: "portrait",

      /**
       * Specifies the JavaScript engine to use
       * Hermes provides better performance and smaller bundle size
       */
      jsEngine: "hermes",

      /**
       * Configuration for Expo Updates
       * Uses app version to determine update eligibility
       */
      runtimeVersion: {
        policy: "appVersion",
      },

      /**
       * Path to the app icon image
       * Used for home screen, app stores, etc.
       */
      icon: "./src/assets/images/icon.png",

      /**
       * Controls light/dark mode behavior
       * "automatic" follows the device settings
       */
      userInterfaceStyle: "automatic",

      /**
       * Primary theme color for the app
       * Used in various UI elements and branding
       */
      primaryColor: configVars.PRIMARY_COLOR,

      /**
       * iOS-specific configuration
       * Settings that only apply to iOS builds
       */
      ios: {
        /**
         * iOS build number
         * Must be incremented for each App Store submission
         */
        buildNumber: BUILD_CODE,

        /**
         * Whether the app supports iPad
         * Enables iPad-specific layouts and features
         */
        supportsTablet: true,

        /**
         * Path to Firebase configuration file for iOS
         * Required for Firebase services
         */
        googleServicesFile: "./GoogleService-Info.plist",

        /**
         * Unique identifier for the app in the App Store
         * Should match your Apple Developer account
         */
        bundleIdentifier: "com.reactnative.mono.template",

        /**
         * Additional iOS configuration options
         */
        config: {
          /**
           * Declares that the app doesn't use encryption
           * Simplifies export compliance
           */
          usesNonExemptEncryption: false,
        },

        /**
         * Info.plist entries
         * Configures permissions and app metadata
         */
        infoPlist: {
          /**
           * Permission description for camera access
           * Required for camera functionality
           */
          NSCameraUsageDescription:
            "Used for profile pictures, posts, and other kinds of content.",

          /**
           * Permission description for location access
           * Required for location features
           */
          NSLocationWhenInUseUsageDescription:
            "Used for distance and mileage calculation.",

          /**
           * Background modes enabled for the app
           * Allows receiving push notifications when app is in background
           */
          UIBackgroundModes: ["remote-notification"],

          /**
           * Permission description for saving photos
           * Required for saving images to photo library
           */
          NSPhotoLibraryAddUsageDescription:
            "Used to save images to your library.",

          /**
           * Permission description for accessing photos
           * Required for selecting images from photo library
           */
          NSPhotoLibraryUsageDescription:
            "Used for profile pictures and other kinds of content",

          /**
           * Name used by voice assistants to refer to the app
           */
          CFBundleSpokenName: "React Native Mono Template",

          /**
           * Supported languages for the app
           * Determines which localizations are included
           */
          CFBundleLocalizations: ["en", "vi"],

          /**
           * Environment variables
           * Passed from .env file to the app
           */
          ...configVars,
        },

        /**
         * App entitlements
         * Special capabilities and permissions
         */
        entitlements: {
          /**
           * Push notification environment
           * "development" for testing, "production" for App Store
           */
          "aps-environment": "production",
        },
      },

      /**
       * Android-specific configuration
       * Settings that only apply to Android builds
       */
      android: {
        /**
         * Android version code
         * Must be incremented for each Play Store submission
         */
        versionCode: BUILD_CODE,

        /**
         * Configuration for adaptive icons on Android
         * Provides better icon display across different devices
         */
        adaptiveIcon: {
          foregroundImage: "./src/assets/images/adaptive-icon.png",
        },

        /**
         * Path to Firebase configuration file for Android
         * Required for Firebase services
         */
        googleServicesFile: "./google-services.json",

        /**
         * Unique identifier for the app in the Play Store
         * Should follow reverse domain name notation
         */
        package: "com.reactnative.mono.template",

        /**
         * Android permissions required by the app
         * Must be declared to access certain device features
         */
        permissions: [
          "android.permission.DOWNLOAD_WITHOUT_NOTIFICATION",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_MEDIA_VIDEO",
          "android.permission.READ_MEDIA_IMAGES",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.CAMERA",
          "android.permission.RECEIVE_BOOT_COMPLETED",
        ],

        /**
         * Background modes for Android
         * Enables receiving push notifications when app is in background
         */
        intentFilters: [
          {
            action: "android.intent.action.MAIN",
            category: ["android.intent.category.LAUNCHER"],
          },
          {
            action: "android.intent.action.BOOT_COMPLETED",
            category: ["android.intent.category.DEFAULT"],
          },
        ],
      },

      /**
       * Web-specific configuration
       * Settings for web builds using Expo for Web
       */
      web: {
        /**
         * Path to favicon for web builds
         * Displayed in browser tabs
         */
        favicon: "./src/assets/images/favicon.png",
      },

      /**
       * Expo plugins
       * Extend functionality and configure native code
       */
      plugins: [
        /**
         * Firebase core functionality
         */
        "@react-native-firebase/app",

        /**
         * Firebase Cloud Messaging for push notifications
         */
        "@react-native-firebase/messaging",

        /**
         * Localization support for multiple languages
         */
        "expo-localization",

        /**
         * Custom font support
         */
        [
          "expo-font",
          {
            fonts: ["./src/assets/fonts/SpaceMono-Regular.ttf"],
          },
        ],

        /**
         * Configure build properties
         * Adjusts native build settings
         */
        [
          "expo-build-properties",
          {
            ios: {
              /**
               * Use static frameworks for iOS
               * Improves compatibility with certain libraries
               */
              useFrameworks: "static",
            },
            android: {
              extraMavenRepos: [
                "../../node_modules/@notifee/react-native/android/libs",
              ],
            },
          },
        ],

        /**
         * Splash screen configuration
         * Shown during app startup
         */
        [
          "expo-splash-screen",
          {
            /**
             * Background color for light mode splash screen
             */
            backgroundColor: "#F3F3F3",

            /**
             * Image shown on light mode splash screen
             */
            image: "./src/assets/images/splash-icon-light.png",

            /**
             * Dark mode splash screen configuration
             */
            dark: {
              image: "./src/assets/images/splash-icon-dark.png",
              backgroundColor: "#131313",
            },

            /**
             * Width of the splash image in pixels
             */
            imageWidth: 280,
          },
        ],

        /**
         * Custom plugin to modify Android build.gradle
         */
        "./plugins/withAppBuildGradlePlugin.js",

        /**
         * Custom plugin to modify AndroidManifest.xml
         */
        "./plugins/withAndroidManifestPlugin.js",
      ],

      /**
       * Additional variables passed to the app
       * Available at runtime through Constants.expoConfig.extra
       */
      extra: {
        ...configVars,
      },

      /**
       * Experimental features
       * New capabilities that may not be fully stable
       */
      experiments: {
        /**
         * Enable typed routes for navigation
         * Provides TypeScript type checking for navigation
         */
        typedRoutes: true,
      },
    },
  };
};
