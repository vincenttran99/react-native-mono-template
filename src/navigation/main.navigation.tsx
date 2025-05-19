import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppbarDefaultComponent from "components/appbar/appbar.default.component";
import {
  NAVIGATION_SETTINGS_SCREEN,
  NAVIGATION_SETTINGS_LANGUAGE_SCREEN,
  NAVIGATION_TAB_NAVIGATION,
  NAVIGATION_INTRODUCTION_BASE_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_OPTIMIZE_SCREEN,
} from "constants/navigation.constant";
import React from "react";
import SettingsScreen from "screens/settings/settings.screen";
import SettingsLanguageScreen from "screens/settings/settings.language.screen";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { useMyProfileQuery } from "api/profile/profile.queries";
import TabNavigation from "./tab.navigation";
import IntroductionFlashlistScreen from "screens/Introduction/introduction.flashlist.screen";
import IntroductionFlashlistOptimizeScreen from "screens/Introduction/introduction.flashlist.optimize.screen";
import IntroductionBaseScreen from "screens/Introduction/introduction.base.screen";

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
        name={NAVIGATION_INTRODUCTION_FLASHLIST_OPTIMIZE_SCREEN}
        options={{
          title: _(msg`Flash list optimize`),
        }}
        component={IntroductionFlashlistOptimizeScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_SETTINGS_SCREEN}
        options={{
          title: _(msg`Setting`),
        }}
        component={SettingsScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_SETTINGS_LANGUAGE_SCREEN}
        options={{ title: _(msg`Language`) }}
        component={SettingsLanguageScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default MainNavigator;
