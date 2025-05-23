import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";

import App from "./App";

LogBox.ignoreLogs(["Open debugger to view warnings."]);

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  // NavigationHelper.handleNavigation(remoteMessage?.data)
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
