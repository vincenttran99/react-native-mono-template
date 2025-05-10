import React from "react";
import { Pressable, StyleSheet } from "react-native";
import BText from "components/base/text.base";
import { MHS } from "constants/sizes.constant";

import BImage from "components/base/image.base";
import { INotification } from "models/system.model";

import {
  s_row,
  s_row_justifyBetween_itemsCenter,
} from "constants/styles.constant";
import BView from "components/base/view.base";
import { BPressable } from "components/base/pressable.base";
import BIcon from "components/base/icon.base";
import { parseJSONHelper } from "helpers/object.helper";
import { handleNavHelper } from "helpers/navigation.helper";

export default function ItemNotifications({ item }: { item: INotification }) {
  const {
    notification_image = require("assets/images/logo.png"),
    notification_content = "",
    createdAt,
    notification_data,
  } = item || {};

  const data: any = parseJSONHelper(notification_data);

  return (
    <BPressable
      onPress={() =>
        handleNavHelper({
          screen: data?.screen,
          param: data?.param,
          timeOut: 0,
        })
      }
      backgroundColor={item?.isUnRead ? "ground" : "background"}
      style={styles.container}
    >
      <BIcon color={"reverse"} size={MHS._24} name={"bell"} />
      <BView
        style={{
          flex: 1,
          gap: MHS._2,
        }}
      >
        <BText variant={"md"} fontWeight={"bold"}>
          {item.notification_title}
        </BText>
        <BText
          variant={"md"}
          // color={theme.colors.outline}
        >
          {item.createdAt}
        </BText>
      </BView>
    </BPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: MHS._16,
    alignItems: "center",
    gap: MHS._16,
    ...s_row,
    borderRadius: MHS._16,
  },
  viewTitle: {
    gap: MHS._12,
    ...s_row_justifyBetween_itemsCenter,
  },
  contentContainer: {
    gap: MHS._12,
  },
  image: {
    width: MHS._52,
    height: MHS._52,
    borderRadius: MHS._12,
  },
  badge: {
    alignSelf: "center",
  },
  viewImageCategory: {
    padding: MHS._8,
    borderRadius: MHS._12,
  },
});
