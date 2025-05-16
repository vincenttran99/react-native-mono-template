import React, { memo, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

import { Device } from "constants/device.constant";
import { MHS } from "constants/sizes.constant";
import { useNetInfo } from "@react-native-community/netinfo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BText from "components/base/base.text";

import { showSuccessMessage } from "helpers/global.helper";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/base.view";
import BIcon from "components/base/base.icon";

const SNAP_POINT = ["100%"];

const GlobalModalNetworkComponent = memo(() => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const netInfo = useNetInfo();
  const refPreState = useRef<boolean | null>(null);
  const { _ } = useLingui();

  useEffect(() => {
    if (netInfo.isConnected === true && refPreState.current === false) {
      showSuccessMessage(_(msg`Network connection restored`));
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
        <BIcon name="wifi-alert" size={Device.width * 0.4} />
        <BText
          variant={"md"}
          fontWeight={"bold"}
          // color={theme.colors.secondary}
        >
          {_(msg`Lost network connection`)}
        </BText>
        <BText variant={"md"}>{_(msg`Please try reconnecting`)}</BText>
      </BView>
    </BottomSheetModal>
  );
});

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

export default GlobalModalNetworkComponent;
