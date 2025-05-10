import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Theme } from "constants/theme.constant";
import BText from "components/base/text.base";
import { MHS } from "constants/sizes.constant";

import BDivider from "components/base/divider.base";
import BImage from "components/base/image.base";
import { ENotificationCategory } from "models/system.model";
import { NAVIGATION_LIST_NOTIFICATIONS_SCREEN } from "constants/navigation.constant";

import { useLingui } from "@lingui/react";
import {
  s_flex1,
  s_row_justifyBetween_itemsCenter,
} from "constants/styles.constant";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";
import BIcon from "components/base/icon.base";
import { ResponsiveValue, useTheme } from "@shopify/restyle";
import { navigateNavHelper } from "helpers/navigation.helper";
import { addOpacityToColorHelper } from "helpers/string.helper";

export default function HeaderListNotifications() {
  const theme = useTheme();
  const [countGeneralNoti, setCountGeneralNoti] = useState(0);
  const [countPromoNoti, setCountPromoNoti] = useState(0);
  const [countEventNoti, setCountEventNoti] = useState(0);
  const { _ } = useLingui();

  const CategoryNotification = useCallback(
    ({
      backgroundIconColor,
      category,
      iconColor,
      icon,
      title,
      description,
      amount,
    }: {
      backgroundIconColor: string;
      iconColor: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>;
      icon: string | number;
      title: string;
      description: string;
      category: string;
      amount: number;
    }) => {
      return (
        <Pressable
          style={styles.viewCategory}
          onPress={() =>
            navigateNavHelper(NAVIGATION_LIST_NOTIFICATIONS_SCREEN, {
              title,
              category,
            })
          }
        >
          <BView
            style={[
              styles.viewImageCategory,
              { backgroundColor: backgroundIconColor },
            ]}
          >
            {typeof icon === "string" ? (
              <BIcon color={iconColor} size={MHS._36} source={icon} />
            ) : (
              <BImage source={icon} style={{ width: "100%", height: "100%" }} />
            )}
          </BView>
          <BView style={s_flex1}>
            <BText variant={"md"}>{title}</BText>
            <BText
              variant={"md"}
              // color={MD3Colors.neutral30}
            >
              {description}
            </BText>
          </BView>
          {amount > 0 ? <Badge style={styles.badge}>{amount}</Badge> : null}
        </Pressable>
      );
    },
    []
  );

  useEffect(() => {
    // callService<INotification[]>({
    //     requestFunction: SystemService.getNotificationsByCategory,
    //     params: {limit: 1, page: 1, notification_category: `${ENotificationCategory.GENERAL},${ENotificationCategory.NEWS}`},
    //     showLoading: false,
    //     actionSuccess: (response) => setCountGeneralNoti(response?.headers?.["x-total-count"] || 0)
    // })
    // callService<INotification[]>({
    //     requestFunction: SystemService.getNotificationsByCategory,
    //     params: {limit: 1, page: 1, notification_category: `${ENotificationCategory.PROMOTION}`},
    //     showLoading: false,
    //     actionSuccess: (response) => setCountPromoNoti(response?.headers?.["x-total-count"] || 0)
    // })
    // callService<INotification[]>({
    //     requestFunction: SystemService.getNotificationsByCategory,
    //     params: {limit: 1, page: 1, notification_category: `${ENotificationCategory.EVENT}`},
    //     showLoading: false,
    //     actionSuccess: (response) => setCountEventNoti(response?.headers?.["x-total-count"] || 0)
    // })
  }, []);

  return (
    <BView backgroundColor="background">
      <CategoryNotification
        backgroundIconColor={addOpacityToColorHelper(theme.colors.primary, 0.2)}
        amount={countGeneralNoti}
        iconColor={"primary"}
        icon={require("assets/images/logo.png")}
        title={_(msg`Thông báo chung`)}
        category={`${ENotificationCategory.GENERAL},${ENotificationCategory.NEWS}`}
        description={_(msg`Cập nhật mới nhất từ hệ thống`)}
      />
      <BDivider />
      <CategoryNotification
        backgroundIconColor={theme.colors.primary}
        amount={countPromoNoti}
        iconColor={"primaryLight"}
        icon={"ticket-percent"}
        title={_(msg`Khuyến mãi`)}
        category={ENotificationCategory.PROMOTION}
        description={_(msg`Khám phá những khuyến mãi mới nhất`)}
      />
      <BDivider />
      <CategoryNotification
        backgroundIconColor={theme.colors.primary}
        amount={countEventNoti}
        iconColor={"primary"}
        icon={"calendar"}
        title={_(msg`Sự kiện`)}
        category={ENotificationCategory.EVENT}
        description={_(msg`Nắm bắt những sự kiện mới nhất`)}
      />

      <BView style={styles.headerList}>
        <BText variant={"md"} fontWeight={"600"}>
          {_(msg`Cập nhật đơn hàng`)}
        </BText>
      </BView>
    </BView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerList: {
    marginTop: MHS._12,
    padding: MHS._12,
  },
  contentContainer: {
    gap: MHS._12,
  },
  viewCategory: {
    padding: MHS._12,
    gap: MHS._12,

    ...s_row_justifyBetween_itemsCenter,
  },
  badge: {
    alignSelf: "center",
  },
  viewImageCategory: {
    width: MHS._52,
    height: MHS._52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: MHS._12,
  },
});
