import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppbarDefaultComponent from "@/components/appbar/appbar.default.component";
import {
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_ONBOARDING_SCREEN,
} from "@/constants/navigation.constant";
import React from "react";
import LoginScreen from "@/screens/login/login.screen";
import { OnboardingScreen } from "@/screens/onboarding/onboarding.screen";
import { useSystemStore } from "@/store/system.store";
import { AuthStackParamList } from "@/models/navigation.model";

const StackNavigator = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  // For onboarding screen
  const isFirstOpen = useSystemStore.getState().isFirstOpen;

  return (
    <StackNavigator.Navigator
      screenOptions={{
        header: (props) => <AppbarDefaultComponent {...props} />,
      }}
      initialRouteName={
        isFirstOpen ? NAVIGATION_ONBOARDING_SCREEN : NAVIGATION_LOGIN_SCREEN
      }
    >
      <StackNavigator.Screen
        name={NAVIGATION_LOGIN_SCREEN}
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_ONBOARDING_SCREEN}
        options={{ headerShown: false }}
        component={OnboardingScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;
