import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultAppbarComponent from "components/appbar/default.appbar.component";
import {
  NAVIGATION_SETTINGS_SCREEN,
  NAVIGATION_LANGUAGE_SETTINGS_SCREEN,
  NAVIGATION_TAB_NAVIGATION,
} from "constants/navigation.constant";
import React from "react";
import SettingsScreen from "screens/settings/settings.screen";
import LanguageSettingsScreen from "screens/settings/language.settings.screen";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { useMyProfileQuery } from "api/profile/profile.queries";
import TabNavigation from "./tab.navigation";

const StackNavigator = createNativeStackNavigator();

const MainNavigator = () => {
  useMyProfileQuery();
  const { _ } = useLingui();
  return (
    <StackNavigator.Navigator
      screenOptions={{
        header: (props) => <DefaultAppbarComponent {...props} />,
      }}
      initialRouteName={NAVIGATION_TAB_NAVIGATION}
    >
      <StackNavigator.Screen
        name={NAVIGATION_TAB_NAVIGATION}
        options={{ headerShown: false }}
        component={TabNavigation}
      />

      <StackNavigator.Screen
        name={NAVIGATION_SETTINGS_SCREEN}
        options={{
          title: _(msg`Cài đặt`),
        }}
        component={SettingsScreen}
      />
      <StackNavigator.Screen
        name={NAVIGATION_LANGUAGE_SETTINGS_SCREEN}
        options={{ title: _(msg`Ngôn ngữ`) }}
        component={LanguageSettingsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default MainNavigator;
