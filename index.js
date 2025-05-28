import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";
import Constants from "expo-constants";

import App from "./App";

LogBox.ignoreLogs(["Open debugger to view warnings."]);

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  // TODO: Implement navigation or action based on notification detail
  // Example: if (remoteMessage?.data?.screen) { navigate(remoteMessage.data.screen); }
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck() {
  if (Constants.isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

registerRootComponent(HeadlessCheck);
