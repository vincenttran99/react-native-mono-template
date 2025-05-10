import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

import { Device } from "constants/device.constant";
import { MHS } from "constants/sizes.constant";
import { useNetInfo } from "@react-native-community/netinfo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BText from "components/base/text.base";
import LottieView from "lottie-react-native";

import { showSuccessMessage } from "helpers/globalHelper";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";

const SNAP_POINT = ["100%"];

export default function ModalNetworkGlobalComponent() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const netInfo = useNetInfo();
  const refPreState = useRef<boolean | null>(null);
  const { _ } = useLingui();

  useEffect(() => {
    if (netInfo.isConnected === true && refPreState.current === false) {
      showSuccessMessage(_(msg`Đã khôi phục kết nối mạng`));
      bottomSheetRef.current?.close();
    }

    if (netInfo.isConnected === false) {
      bottomSheetRef.current?.present();
    }
    refPreState.current = netInfo.isConnected;
  }, [netInfo.isConnected]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={SNAP_POINT}
      animateOnMount
      enableDynamicSizing={false}
      enablePanDownToClose
    >
      <BView style={styles.containerModalBlock}>
        <LottieView
          source={require("assets/lotties/disconnected.json")}
          autoPlay
          loop
          style={styles.img}
        />
        <BText
          variant={"md"}
          fontWeight={"bold"}
          // color={theme.colors.secondary}
        >
          {_(msg`Mất kết nối mạng`)}
        </BText>
        <BText variant={"md"}>{_(msg`Vui lòng thử kết nối lại`)}</BText>
      </BView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  img: {
    width: Device.width * 0.4,
    height: Device.width * 0.4,
  },
  containerModalBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: MHS._12,
  },
});
