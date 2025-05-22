import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import BIcon from "@/components/base/base.icon";
import BPressable from "@/components/base/base.pressable";
import BSurface from "@/components/base/base.surface";
import BText from "@/components/base/base.text";
import {
  NAVIGATION_INTRODUCTION_SCREEN,
  NAVIGATION_ABOUT_US_SCREEN,
} from "@/constants/navigation.constant";
import { MHS } from "@/constants/sizes.constant";
import React, { useCallback, useMemo } from "react";
import AboutUsScreen from "@/screens/about-us/aboutUs.screen";
import IntroductionScreen from "@/screens/Introduction/introduction.screen";

const Tab = createBottomTabNavigator();

function Tabbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { _ } = useLingui();

  const IconAndlabelScreen: any = useMemo(() => {
    return {
      [NAVIGATION_INTRODUCTION_SCREEN]: {
        icon: "menu",
        label: _(msg`Introduce`),
      },
      [NAVIGATION_ABOUT_US_SCREEN]: {
        icon: "account",
        label: _(msg`About us`),
      },
    };
  }, [_]);

  const renderButton = useCallback(
    (route: NavigationRoute<ParamListBase, string>, index: number) => {
      const { options } = descriptors[route.key];
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: "tabLongPress",
          target: route.key,
        });
      };

      return (
        <BPressable
          key={route.key}
          accessibilityRole="button"
          justifyContent="center"
          alignItems="center"
          flex={1}
          testID={options.tabBarButtonTestID}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <BIcon
            size={MHS._24}
            name={IconAndlabelScreen[route.name].icon}
            color={isFocused ? "primary" : "secondary"}
          />
          <BText
            fontWeight={"600"}
            variant="md"
            color={isFocused ? "primary" : "secondary"}
          >
            {IconAndlabelScreen[route.name].label}
          </BText>
        </BPressable>
      );
    },
    [state.routes, _]
  );

  return (
    <BSurface
      variant="xl"
      backgroundColor="background"
      paddingVertical="lg"
      flexDirection="row"
      borderTopWidth={1}
      borderTopColor={"ground"}
    >
      {state.routes.map(renderButton)}
    </BSurface>
  );
}

const TabNavigation = () => {
  const renderTabbar = useCallback((props: BottomTabBarProps) => {
    return <Tabbar {...props} />;
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_INTRODUCTION_SCREEN}
      tabBar={renderTabbar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={NAVIGATION_INTRODUCTION_SCREEN}
        component={IntroductionScreen}
      />
      <Tab.Screen name={NAVIGATION_ABOUT_US_SCREEN} component={AboutUsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
