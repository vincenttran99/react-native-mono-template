import React from "react";
import { Pressable, StyleSheet } from "react-native";
import BText from "components/base/text.base";
import { MHS } from "constants/sizes.constant";

import {
  s_row,
  s_row_justifyBetween_itemsCenter,
} from "constants/styles.constant";
import BView from "components/base/view.base";
import BIcon from "components/base/icon.base";
import { IDog } from "models/dog.model";
import BSurface from "components/base/surface.base";

export default function ItemDog({ item }: { item: IDog }) {
  const {} = item || {};

  return (
    <BSurface
      variant="md"
      backgroundColor={"ground"}
      marginVertical="xxs"
      borderRadius="lg"
      padding="lg"
    >
      <BIcon color={"reverse"} size={MHS._24} name={"bell"} />
      <BView
        style={{
          flex: 1,
          gap: MHS._2,
        }}
      >
        <BText variant={"md"} fontWeight={"bold"}>
          {"item.notification_title"}
        </BText>
        <BText
          variant={"md"}
          // color={theme.colors.outline}
        >
          {"item.createdAt"}
        </BText>
      </BView>
    </BSurface>
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
