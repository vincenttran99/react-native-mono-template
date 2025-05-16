import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppbarDefaultComponent from "components/appbar/appbar.default.component";
import {
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_WELCOME_SCREEN,
} from "constants/navigation.constant";
import React from "react";
import LoginScreen from "screens/login/login.screen";
import { WelcomeScreen } from "screens/welcome/welcome.screen";
import { useSystemStore } from "store/system.store";

const StackNavigator = createNativeStackNavigator();

const AuthNavigator = () => {
  // For welcome screen
  const isFirstOpen = useSystemStore.getState().isFirstOpen;

  return (
    <StackNavigator.Navigator
      screenOptions={{
        header: (props) => <AppbarDefaultComponent {...props} />,
      }}
      initialRouteName={
        isFirstOpen ? NAVIGATION_WELCOME_SCREEN : NAVIGATION_LOGIN_SCREEN
      }
    >
      <StackNavigator.Screen
        name={NAVIGATION_LOGIN_SCREEN}
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_WELCOME_SCREEN}
        options={{ headerShown: false }}
        component={WelcomeScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;
