---
sidebar_position: 2
---

# Customize your App

The starter kit provides a simple Expo application. To personalize your app, you'll need to update the `app.config.js` file with your specific configuration settings.

## Basic Configuration

Pay special attention to the following values in your `app.config.js` file:

```js
{
  expo: {
    // name: The display name of your app that appears on the device
    // slug: A unique identifier for your app in the Expo ecosystem
    // scheme: The URL scheme to handle deep links to your app
    name: "Mono template",
    slug: "mono-template",
    scheme: "mono-template",

    ios: {
      // bundleIdentifier: The unique identifier for your app on iOS
      bundleIdentifier: "com.reactnative.mono.template",
      // ...other iOS-specific settings
    },

    android: {
      // package: The unique identifier for your app on Android
      package: "com.reactnative.mono.template",
      // ...other Android-specific settings
    },

    // ...other configuration options
  },
}
```

## Firebase Configuration Files

Ensure you have a Firebase project set up and have downloaded the required configuration files:

1. `google-services.json` (for Android)
2. `GoogleService-Info.plist` (for iOS)

If you haven't created these files yet, visit the [Firebase Console](https://console.firebase.google.com/) and follow the instructions in the [Firebase documentation](http://firebase.google.com/docs).

Place both files in the root directory of your project.

## Customizing App Assets

### Splash Screen, App Icon, and Notification Icon

Thanks to Expo, updating visual assets is straightforward. Replace the default images in the `src/assets/images` folder with your own, then run `expo prebuild` (or `yarn prebuild`) to update the assets.

Required asset files:

| File                                      | Purpose                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `src/assets/images/icon.png`              | Main app icon                                                             |
| `src/assets/images/splash-icon-light.png` | Splash screen (light mode)                                                |
| `src/assets/images/splash-icon-dark.png`  | Splash screen (dark mode)                                                 |
| `src/assets/images/adaptive-icon.png`     | Android adaptive icon                                                     |
| `src/assets/images/notification-icon.png` | Android notification icon (must be all white with transparent background) |

For guidance on creating these assets with the correct specifications, refer to the [Expo documentation on splash screens and app icons](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/).
