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

If the installation was successful, the created app should be ready to use, and because we are using the expo custom dev client, you may launch the app on your simulator or device by running the following command:

```bash
# Run the app on iOS simulator
yarn ios

# Run the app on Android simulator
yarn android
```
