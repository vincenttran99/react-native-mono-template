import React, { use, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigateNavHelper } from "helpers/navigation.helper";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { useSystemStore } from "store/system.store";
import BView from "components/base/view.base";
import { NAVIGATION_LOGIN_SCREEN } from "constants/navigation.constant";
import { MHS } from "constants/sizes.constant";
import BSafeAreaView from "components/base/safeAreaView.base";
import BImage from "components/base/image.base";
import { Device } from "constants/device.constant";
import BText from "components/base/text.base";
import BButton from "components/base/button.base";

export function WelcomeScreen() {
  const setIsFirtOpen = useSystemStore.getState().setIsFirstOpen;
  const { _ } = useLingui();
  const handleNextPress = () => {
    navigateNavHelper(NAVIGATION_LOGIN_SCREEN);
  };

  useEffect(() => {
    setIsFirtOpen(false);
  }, []);

  return (
    <BSafeAreaView
      flex={1}
      backgroundColor="background"
      justifyContent="flex-end"
    >
      <BImage
        hasBlur={false}
        width={Device.width * 2}
        source={require("assets/images/splash-icon-light.png")}
        // inline style because it short and not re-rendered
        style={{
          position: "absolute",
          top: -MHS._48,
        }}
      />
      <BView paddingHorizontal="lg" paddingBottom="xxl" gap="xxxl">
        <BView gap="sm">
          <BText variant="xxxxl">{_(msg`Welcome to`)}</BText>
          <BText variant="xxxl" color="primaryDark" fontWeight={"bold"}>
            {"Mono Template"}
          </BText>
          <BText variant="lg">{_(msg`Fast and simple template`)}</BText>
        </BView>

        <BButton size="lg" onPress={handleNextPress} label={_(msg`Continue`)} />
      </BView>
    </BSafeAreaView>
  );
}
