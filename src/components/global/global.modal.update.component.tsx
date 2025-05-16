import React, { memo, useEffect, useMemo, useState } from "react";
import { Platform, StyleSheet } from "react-native";

import { Device } from "constants/device.constant";
import { MHS } from "constants/sizes.constant";
import BText from "components/base/base.text";

import BImage from "components/base/base.image";
import BButton from "components/base/base.button";
import SpInAppUpdates, { IAUUpdateKind } from "sp-react-native-in-app-updates";
import { StartUpdateOptions } from "sp-react-native-in-app-updates/lib/typescript/types";
import { s_absolute100 } from "constants/styles.constant";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/base.view";
import { useSystemStore } from "store/system.store";
import { useGetSystemSettingsQuery } from "api/system/system.queries";
import { checkHasNewVersionHelper } from "helpers/system.helper";

const GlobalModalUpdateComponent = memo(() => {
  const { data: settings } = useGetSystemSettingsQuery();
  const maintenanceMode = useSystemStore((state) => state.maintenanceMode);
  const [isHaveNewVersion, setIsHaveNewVersion] = useState<boolean>(false);
  const inAppUpdates = useMemo(() => new SpInAppUpdates(__DEV__), []);
  const { _ } = useLingui();
  const updateOptions: StartUpdateOptions = useMemo(
    () =>
      Platform.select({
        ios: {
          title: _(msg`Phiên bản cập nhật quan trọng`),
          message: _(
            msg`Vui lòng cập nhật phiên bản mới nhất của ứng dụng để có trải nghiệm tốt nhất.`
          ),
          buttonUpgradeText: _(msg`Cập nhật ngay`),
          buttonCancelText: _(msg`Huỷ`),
        },
        default: {
          updateType: IAUUpdateKind.IMMEDIATE,
        },
      }),
    []
  );

  useEffect(() => {
    if (checkHasNewVersionHelper(settings?.mobile_app_min_build_version)) {
      inAppUpdates.checkNeedsUpdate().then((result) => {
        setIsHaveNewVersion(result.shouldUpdate);
        if (
          Device.isIos &&
          settings?.maintenance_mode != "1" &&
          result.shouldUpdate
        ) {
          setTimeout(() => {
            inAppUpdates.startUpdate(updateOptions);
          }, 1000);
        }
      });
    }
  }, [settings]);

  if (maintenanceMode) {
    return (
      <BView style={styles.container}>
        <BImage
          source={require("assets/images/maintain.png")}
          style={styles.img}
        />
        <BText
          variant={"md"}
          fontWeight={"bold"}
          // color={theme.colors.secondary}
        >
          {_(msg`Đang bảo trì hệ thống`)}
        </BText>
        <BText variant={"md"}>{_(msg`Truy cập lại sau`)}</BText>
      </BView>
    );
  }

  if (isHaveNewVersion) {
    return (
      <BView style={styles.container}>
        <BImage
          source={require("assets/images/update.png")}
          style={styles.img}
        />
        <BText
          variant={"md"}
          fontWeight={"bold"}
          // color={theme.colors.secondary}
        >
          {_(msg`Phiên bản cập nhật quan trọng`)}
        </BText>
        <BText variant={"md"}>
          {_(
            msg`Vui lòng cập nhật phiên bản mới nhất của ứng dụng để có trải nghiệm tốt nhất.`
          )}
        </BText>
        <BButton
          onPress={() => inAppUpdates.startUpdate(updateOptions)}
          size={"md"}
          label={_(msg`Cập nhật ngay`)}
        />
      </BView>
    );
  }

  return null;
});

const styles = StyleSheet.create({
  container: {
    ...s_absolute100,

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: MHS._12,
  },
  img: {
    width: Device.width * 0.4,
    height: Device.width * 0.4,
  },
});

export default GlobalModalUpdateComponent;
