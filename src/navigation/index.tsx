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

/**
 * Prevent the splash screen from auto-hiding
 * This allows us to control when to hide the splash screen
 * after all resources and initial rendering are complete
 */
SplashScreen.preventAutoHideAsync();

/**
 * Create a native stack navigator for the main navigation structure
 * This provides a stack-based navigation with native transitions
 */
const NativeStack = createNativeStackNavigator();

/**
 * Deep linking configuration for the application
 * Enables opening the app from external links and handling specific routes
 *
 * Structure:
 * - prefixes: URLs that can open the app
 * - config: Mapping between URL paths and app screens
 */
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

/**
 * Default screen options applied to all screens in the navigator
 * Configures transition animations and header visibility
 */
const SCREEN_OPTIONS = {
  animation: "slide_from_right" as "slide_from_right",
  headerBackTitleVisible: false,
  headerShown: false,
};

/**
 * Main navigation component that sets up the entire navigation structure
 *
 * This component:
 * 1. Provides keyboard handling through KeyboardProvider
 * 2. Sets up theming with ThemeProvider
 * 3. Configures API data fetching with QueryProvider
 * 4. Handles bottom sheet modals with BottomSheetModalProvider
 * 5. Manages navigation with NavigationContainer
 * 6. Renders either authenticated or unauthenticated navigation stack
 * 7. Includes global UI components like loading indicators and dialogs
 *
 * @returns The root navigation component with all providers and UI components
 */
export default function AppNavigation() {
  /**
   * Get the current theme from system store
   * Used to determine which theme (light/dark) to apply
   */
  const theme = useSystemStore((state) => state.theme);

  /**
   * Memoized theme value to prevent unnecessary re-renders
   * Converts theme string to the actual theme object
   */
  const themeValue = useMemo(
    () => (theme !== "light" ? LIGHT_THEME : DARK_THEME),
    [theme]
  );

  /**
   * Get authentication status from auth store
   * Used to determine which navigation stack to show
   */
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  /**
   * Callback executed when navigation container is ready
   * Hides the splash screen once navigation is initialized
   */
  const onReady = useCallback(() => {
    SplashScreen.hide();
  }, []);

  return (
    <KeyboardProvider>
      {/* Theme provider for consistent styling across the app */}
      <ThemeProvider theme={themeValue}>
        {/* Provider for React Query data fetching */}
        <QueryProvider>
          {/* Provider for bottom sheet modals */}
          <BottomSheetModalProvider>
            {/* Main navigation container that manages navigation state */}
            <NavigationContainer
              ref={navigationRef}
              linking={LINKING}
              onReady={onReady}
            >
              {/* Status bar configuration */}
              <StatusBar
                barStyle={theme === "light" ? "light-content" : "dark-content"}
                translucent={true}
                backgroundColor={"transparent"}
              />
              {/* Error boundary to catch and handle navigation errors */}
              <ErrorBoundary>
                {/* Main navigation stack */}
                <NativeStack.Navigator screenOptions={SCREEN_OPTIONS}>
                  {/* Conditional rendering based on authentication status */}
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

            {/* Lazy-loaded global UI components */}
            <BLazy timeRender={1500} haveIndicator={false}>
              <GlobalBottomSheetDialogComponent ref={BottomSheetDialogRef} />
              <GlobalLoadingComponent ref={LoadingRef} />
              <GlobalDialogComponent ref={DialogRef} />
            </BLazy>
            {/* Flash message component for toast notifications */}
            <FlashMessage position={"top"} />
            {/* Modal for network status notifications */}
            <GlobalModalNetworkComponent />
          </BottomSheetModalProvider>
        </QueryProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
