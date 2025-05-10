import React, { useCallback, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Pressable, StyleSheet } from "react-native";
import { ETypeOfBug } from "constants/firebase.constant";
import BText from "components/base/text.base";
import { FontSize, MHS } from "constants/sizes.constant";
import BTextMulti from "components/base/multiText.base";

import { NAVIGATION_DETAIL_LOGS_BUG_SCREEN } from "constants/navigation.constant";

import BButton from "components/base/button.base";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";
import { useTheme } from "@shopify/restyle";
import { showSuccessMessage } from "helpers/globalHelper";
import { navigateNavHelper } from "helpers/navigation.helper";

const bugsCollection = firestore().collection("Bugs");

export default function ItemBug({ item }: { item: any }) {
  const theme = useTheme();
  const [status, setStatus] = useState(item?.status || null);
  const { _ } = useLingui();

  const onUpdateBugs = useCallback(
    (item: any) => {
      if (status === ETypeOfBug.New) {
        bugsCollection
          .doc(item?.id)
          .update({
            status: ETypeOfBug.Fixed,
          })
          .then(() => {
            setStatus(ETypeOfBug.Fixed);
            showSuccessMessage(_(msg`Đã cập nhật`));
          })
          .catch((err) => console.log(err));
      } else {
        bugsCollection
          .doc(item?.id)
          .delete()
          .then(async () => {
            setStatus(null);
            showSuccessMessage(_(msg`Đã xóa`));
          })
          .catch((err) => console.log(err));
      }
    },
    [item, status]
  );
  console.log("item");
  if (status === null) {
    return null;
  }

  return (
    <Pressable
      onPress={() =>
        navigateNavHelper(NAVIGATION_DETAIL_LOGS_BUG_SCREEN, {
          item,
        })
      }
      style={{
        width: "100%",

        borderRadius: MHS._12,
        paddingHorizontal: MHS._12,
        paddingVertical: MHS._8,
      }}
    >
      <BView
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: MHS._12,
        }}
      >
        <BView>
          <BTextMulti
            style1={{
              fontSize: FontSize._18,
              fontWeight: "bold",
              color: item?.type === "api" ? "red" : "orange",
            }}
            style2={{ color: item?.isDevSite ? "green" : "blue" }}
          >{`${item?.type} - |||${
            item?.isDevSite ? "Dev" : "Live"
          }`}</BTextMulti>
          <BText>{new Date(item?.time).toLocaleString()}</BText>
        </BView>

        <BButton
          onPress={() => onUpdateBugs(item)}
          backgroundColor={status === ETypeOfBug.New ? "primary" : "success"}
          label={status === ETypeOfBug.New ? "Đã xử lý" : "Đã xong"}
        />
      </BView>

      <BText>{item?.error}</BText>
    </Pressable>
  );
}
