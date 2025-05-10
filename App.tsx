import React, { useEffect } from "react";

import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Device } from "constants/device.constant";
import { enableFreeze } from "react-native-screens";
import I18nProvider from "locale/i18n";
import { enableBatchedStateUpdates } from "helpers/hooks/state.hook";
import {
  bootstrapHelper,
  createDefaultChannelsHelper,
  requestUserPermissionHepler,
  setupNotificationHelper,
} from "helpers/firebase.helper";
import AppNavigation from "navigation";

//enable state batched update for performance optimization
enableBatchedStateUpdates();

// ignore firebase warnings
// @ts-ignore
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

enableFreeze(true);

const App = () => {
  useEffect(() => {
    requestUserPermissionHepler();
    createDefaultChannelsHelper();
    setupNotificationHelper();

    if (Device.isAndroid) {
      bootstrapHelper().catch(console.error);
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <I18nProvider>
          <AppNavigation />
        </I18nProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// export default withIAPContext(App);
export default App;
