import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import BIcon from "components/base/icon.base";
import BPressable from "components/base/pressable.base";
import BSurface from "components/base/surface.base";
import BText from "components/base/text.base";
import BView from "components/base/view.base";
import {
  NAVIGATION_HOME_SCREEN,
  NAVIGATION_DOG_SCREEN,
} from "constants/navigation.constant";
import { MHS } from "constants/sizes.constant";
import React, { useCallback, useMemo } from "react";
import HomeScreen from "screens/home/home.screen";
import DogScreen from "screens/dog/dog.screen";

const Tab = createBottomTabNavigator();

function Tabbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { _ } = useLingui();

  const IconAndlabelScreen: any = useMemo(() => {
    return {
      [NAVIGATION_HOME_SCREEN]: {
        icon: "menu",
        label: _(msg`Introduce`),
      },
      [NAVIGATION_DOG_SCREEN]: {
        icon: "dog",
        label: _(msg`Dogs`),
      },
    };
  }, []);

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
    [state.routes]
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
  // const TabbarIcon = useCa;

  const renderTabbar = useCallback((props: BottomTabBarProps) => {
    return <Tabbar {...props} />;
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_HOME_SCREEN}
      tabBar={renderTabbar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={NAVIGATION_HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={NAVIGATION_DOG_SCREEN} component={DogScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
