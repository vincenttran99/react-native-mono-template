import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppbarDefaultComponent from "@/components/appbar/appbar.default.component";
import {
  NAVIGATION_SETTINGS_SCREEN,
  NAVIGATION_SETTINGS_LANGUAGE_SCREEN,
  NAVIGATION_TAB_NAVIGATION,
  NAVIGATION_INTRODUCTION_BASE_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
  NAVIGATION_DOG_SCREEN,
  NAVIGATION_STYLE_NATIVE_SCREEN,
  NAVIGATION_STYLE_RESTYLE_SCREEN,
} from "@/constants/navigation.constant";
import React from "react";
import SettingsScreen from "@/screens/settings/settings.screen";
import SettingsLanguageScreen from "@/screens/settings/settings.language.screen";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { useMyProfileQuery } from "@/api/profile/profile.queries";
import TabNavigation from "./tab.navigation";
import IntroductionFlashlistScreen from "@/screens/Introduction/introduction.flashlist.screen";
import IntroductionBaseScreen from "@/screens/Introduction/introduction.base.screen";
import DogScreen from "@/screens/dog/dog.screen";
import StyleNativeScreen from "@/screens/style/style.native";
import StyleRestyleScreen from "@/screens/style/style.restyle";

const StackNavigator = createNativeStackNavigator();

const MainNavigator = () => {
  useMyProfileQuery();
  const { _ } = useLingui();
  return (
    <StackNavigator.Navigator
      screenOptions={{
        header: (props) => <AppbarDefaultComponent {...props} />,
      }}
      initialRouteName={NAVIGATION_TAB_NAVIGATION}
    >
      <StackNavigator.Screen
        name={NAVIGATION_TAB_NAVIGATION}
        options={{ headerShown: false }}
        component={TabNavigation}
      />

      <StackNavigator.Screen
        name={NAVIGATION_INTRODUCTION_BASE_SCREEN}
        options={{
          title: _(msg`Base components`),
        }}
        component={IntroductionBaseScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN}
        options={{
          title: _(msg`Flash list`),
        }}
        component={IntroductionFlashlistScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_SETTINGS_SCREEN}
        options={{
          title: _(msg`Settings`),
        }}
        component={SettingsScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_SETTINGS_LANGUAGE_SCREEN}
        options={{ title: _(msg`Language`) }}
        component={SettingsLanguageScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_DOG_SCREEN}
        options={{ title: _(msg`Demo list query`) }}
        component={DogScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_STYLE_NATIVE_SCREEN}
        options={{ title: _(msg`Style native`) }}
        component={StyleNativeScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_STYLE_RESTYLE_SCREEN}
        options={{ title: _(msg`Style restyle`) }}
        component={StyleRestyleScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default MainNavigator;
