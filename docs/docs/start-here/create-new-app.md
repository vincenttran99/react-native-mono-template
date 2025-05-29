---
sidebar_position: 1
---

# Create New App

Guide on how to create a new application with React Native Mono Template.

## Requirements

First make sure you have the following tools installed on your machine:

- [React Native dev environment](https://reactnative.dev/docs/environment-setup)
- [Node.js LTS release](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall), required only for macOS or Linux users
- [Yarn](https://yarnpkg.com/getting-started/install)

## Initializing a new project

Start your project using create-react-native-mono-template command:

```bash
npx create-react-native-mono-template@latest MyApp
```

The command will create an expo app named MyApp and install all the dependencies added by the starter.

## Running the app

Add **_google-services.json_** (for Android) and **_GoogleService-Info.plist_** (for iOS) to the root folder and run the command::

```bash
yarn prebuild
```

Next, make sure the image file `src/assets/images/notification-icon.png` exists and run the following command to generate notification icons for Android (This is necessary after you first run `prebuild` to create the `android` directory or after running `prebuild --clean`)

```bash
# Create notification icons for android
yarn generate-images
```

If everything is fine, android and ios folders will be created. The created app should be ready to use. You may launch the app on your simulator or device:

```bash
# Run the app on iOS simulator
yarn ios

# Run the app on Android simulator
yarn android
```
