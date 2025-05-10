import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Constants from "expo-constants";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import BLazy from "components/base/lazy.base";
import LoadingGlobalComponent from "components/global/loading.global.component";
import ModalNetworkGlobalComponent from "components/global/modal.network.global.component";
import ModalMediaGlobalComponent from "components/global/modalMedia.global.component";
import UpdateSystemGlobalComponent from "components/global/update.system.global.component";
import {
  NAVIGATION_AUTH_NAVIGATION,
  NAVIGATION_MAIN_NAVIGATION,
  NAVIGATION_TAB_NAVIGATION,
} from "constants/navigation.constant";
import { DARK_THEME, LIGHT_THEME } from "constants/theme.constant";

import MainNavigator from "navigation/main.navigation";
import AuthNavigation from "navigation/auth.navigation";
import BottomSheetDialogGlobalComponent from "components/global/bottomSheetDialog.global.component";
import { useSystemStore } from "store/system.store";
import { ThemeProvider } from "@shopify/restyle";
import { QueryProvider } from "api/reactQuery";
import { useAuthStore } from "store/auth.store";
import DialogGlobalComponent from "components/global/dialog.global.component";
import FlashMessage from "react-native-flash-message";
import {
  BottomSheetDialogRef,
  DialogRef,
  LoadingRef,
  ModalMediaGlobalComponentRef,
} from "helpers/globalHelper";
import {
  getRouteNameNavHelper,
  navigationRef,
  updateTimestampLastScreenOpeningNavHepler,
} from "helpers/navigation.helper";
import {
  clearBugLogHelper,
  setBugDeviceHelper,
  setBugLogHelper,
} from "helpers/storage.helper";
import { extractRefLinkFromStringHelper } from "helpers/string.helper";
import {
  createLogBugHelper,
  logScreenViewHelper,
} from "helpers/firebase.helper";
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
            parse: {
              product: (product: string) => {
                let value = extractRefLinkFromStringHelper(product);
                return {
                  product_id: value?.targetValue || "",
                  ref: value?.ref || "",
                };
              },
            },
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
  const routeNameRef = useRef("");
  const netInfo = useNetInfo();

  useLayoutEffect(() => {
    if (!netInfo.isConnected) return;
    clearBugLogHelper();
    setBugDeviceHelper();
  }, [netInfo.isConnected]);

  const onErrorCrashApp = useCallback((error: any, stackTrace: string) => {
    if (!__DEV__) {
      createLogBugHelper(
        String(error),
        stackTrace,
        "crash",
        getRouteNameNavHelper() || ""
      );
    }
  }, []);

  const onReady = useCallback(() => {
    SplashScreen.hide();
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name || "";
    setBugLogHelper(routeNameRef.current);
    updateTimestampLastScreenOpeningNavHepler();
    logScreenViewHelper(routeNameRef.current);
  }, []);

  const onStateChange = useCallback(async () => {
    updateTimestampLastScreenOpeningNavHepler();
    const previousRouteName = routeNameRef.current;
    const currentRouteName =
      navigationRef.current?.getCurrentRoute()?.name || "";

    if (previousRouteName !== currentRouteName) {
      setBugLogHelper("|_|" + currentRouteName);
      logScreenViewHelper(currentRouteName);
    }
    routeNameRef.current = currentRouteName;
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
              onStateChange={onStateChange}
            >
              <StatusBar
                barStyle={theme === "light" ? "light-content" : "dark-content"}
                translucent={true}
                backgroundColor={"transparent"}
              />
              <ErrorBoundary onError={onErrorCrashApp}>
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
              <BottomSheetDialogGlobalComponent ref={BottomSheetDialogRef} />
              <LoadingGlobalComponent ref={LoadingRef} />
              <ModalMediaGlobalComponent ref={ModalMediaGlobalComponentRef} />
              <DialogGlobalComponent ref={DialogRef} />
            </BLazy>
            <FlashMessage position={"top"} />
            <ModalNetworkGlobalComponent />
          </BottomSheetModalProvider>
          <UpdateSystemGlobalComponent />
        </QueryProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
