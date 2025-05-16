import React, { useCallback, useMemo } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Constants from "expo-constants";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import BLazy from "components/base/base.lazy";
import GlobalLoadingComponent from "components/global/global.loading.component";
import GlobalModalNetworkComponent from "components/global/global.modal.network.component";
import {
  NAVIGATION_AUTH_NAVIGATION,
  NAVIGATION_MAIN_NAVIGATION,
  NAVIGATION_TAB_NAVIGATION,
} from "constants/navigation.constant";
import { DARK_THEME, LIGHT_THEME } from "constants/theme.constant";

import MainNavigator from "navigation/main.navigation";
import AuthNavigation from "navigation/auth.navigation";
import GlobalBottomSheetDialogComponent from "components/global/global.bottomSheetDialog.component";
import { useSystemStore } from "store/system.store";
import { ThemeProvider } from "@shopify/restyle";
import { QueryProvider } from "api/reactQuery";
import { useAuthStore } from "store/auth.store";
import GlobalDialogComponent from "components/global/global.dialog.component";
import FlashMessage from "react-native-flash-message";
import {
  BottomSheetDialogRef,
  DialogRef,
  LoadingRef,
} from "helpers/global.helper";
import { navigationRef } from "helpers/navigation.helper";

import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const NativeStack = createNativeStackNavigator();

const LINKING = {
  prefixes: [
    `${Constants.expoConfig?.extra?.deeplink}://`,
    Constants.expoConfig?.extra?.universalUrl,
  ],
  config: {
    initialRouteName: NAVIGATION_MAIN_NAVIGATION,
    screens: {
      NAVIGATION_MAIN_NAVIGATION: {
        path: "",
        initialRouteName: NAVIGATION_TAB_NAVIGATION,
        screens: {
          NAVIGATION_DETAIL_PRODUCT_SCREEN: {
            path: "product/:product",
          },
          NAVIGATION_TAB_NAVIGATION: "*/:ref?",
        },
      },
    },
  },
};

const SCREEN_OPTIONS = {
  animation: "slide_from_right" as "slide_from_right",
  headerBackTitleVisible: false,
  headerShown: false,
};

export default function AppNavigation() {
  const theme = useSystemStore((state) => state.theme);
  const themeValue = useMemo(
    () => (theme !== "light" ? LIGHT_THEME : DARK_THEME),
    [theme]
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const onReady = useCallback(() => {
    SplashScreen.hide();
  }, []);

  return (
    <KeyboardProvider>
      <ThemeProvider theme={themeValue}>
        <QueryProvider>
          <BottomSheetModalProvider>
            <NavigationContainer
              ref={navigationRef}
              linking={LINKING}
              onReady={onReady}
            >
              <StatusBar
                barStyle={theme === "light" ? "light-content" : "dark-content"}
                translucent={true}
                backgroundColor={"transparent"}
              />
              <ErrorBoundary>
                <NativeStack.Navigator screenOptions={SCREEN_OPTIONS}>
                  {isAuthenticated ? (
                    <NativeStack.Screen
                      name={NAVIGATION_MAIN_NAVIGATION}
                      component={MainNavigator}
                    />
                  ) : (
                    <NativeStack.Screen
                      name={NAVIGATION_AUTH_NAVIGATION}
                      component={AuthNavigation}
                    />
                  )}
                </NativeStack.Navigator>
              </ErrorBoundary>
            </NavigationContainer>

            <BLazy timeRender={1500} haveIndicator={false}>
              <GlobalBottomSheetDialogComponent ref={BottomSheetDialogRef} />
              <GlobalLoadingComponent ref={LoadingRef} />
              <GlobalDialogComponent ref={DialogRef} />
            </BLazy>
            <FlashMessage position={"top"} />
            <GlobalModalNetworkComponent />
          </BottomSheetModalProvider>
        </QueryProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
