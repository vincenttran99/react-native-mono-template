import React, { useEffect } from "react";

import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { DEVICE } from "@/constants/system.constant";
import { enableFreeze } from "react-native-screens";
import I18nProvider from "@/locale/i18n";
import { enableBatchedStateUpdates } from "@/helpers/hooks/state.hook";
import {
  bootstrapHelper,
  createDefaultChannelsHelper,
  getFCMTokenHelper,
  requestUserPermissionHepler,
  setupNotificationHelper,
} from "@/helpers/firebase.helper";
import AppNavigation from "@/navigation";

/**
 * Enable batched state updates for performance optimization
 * This reduces the number of renders by batching multiple state updates together
 * Similar to how React works in the web environment
 */
enableBatchedStateUpdates();

/**
 * Silence Firebase modular API deprecation warnings
 * This prevents console logs from being cluttered with warnings
 * about using the modular Firebase API
 */
// @ts-ignore
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

/**
 * Enable screen freezing for better performance
 * This optimizes memory usage by "freezing" screens that are not visible
 * Screens in the background will not consume resources for rendering
 */
enableFreeze(true);

/**
 * Main application component
 * Serves as the entry point for the entire application
 * Sets up providers, initializes services, and renders the root navigation
 */
const App = () => {
  /**
   * Initialize Firebase and notification services on app startup
   * This effect runs once when the component mounts
   */
  useEffect(() => {
    // Request notification permissions from the user
    requestUserPermissionHepler();

    // Create default notification channels (required for Android)
    createDefaultChannelsHelper();

    // Set up notification handlers for foreground/background messages
    setupNotificationHelper();

    getFCMTokenHelper();

    // Android-specific Firebase bootstrap process
    if (DEVICE.isAndroid) {
      bootstrapHelper().catch(console.error);
    }
  }, []);

  return (
    /**
     * GestureHandlerRootView
     * Required wrapper for react-native-gesture-handler to work properly
     * Enables gesture recognition throughout the app
     */
    <GestureHandlerRootView style={styles.container}>
      {/**
       * SafeAreaProvider
       * Provides safe area insets information to avoid notches and system UI
       * initialMetrics prevents layout jumps during app startup
       */}
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {/**
         * I18nProvider
         * Sets up internationalization for the app
         * Manages translations and locale-specific formatting
         */}
        <I18nProvider>
          {/**
           * AppNavigation
           * Main navigation component that handles all app screens
           * Includes authentication flow, main screens, and modals
           */}
          <AppNavigation />
        </I18nProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

/**
 * Global styles for the app container
 * Simple flex layout to ensure the app fills the entire screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Uncomment to wrap the app with in-app purchase context if needed
 * export default withIAPContext(App);
 */
export default App;
