import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import { setStringAsync } from "expo-clipboard";
import firestore from "@react-native-firebase/firestore";
import { ETypeOfBug } from "constants/firebase.constant";

import BTextMulti from "components/base/multiText.base";
import { FontSize, MHS, VS } from "constants/sizes.constant";
import BText from "components/base/text.base";
import { Device } from "constants/device.constant";

import BButton from "components/base/button.base";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";
import { useTheme } from "@shopify/restyle";
import { showInfoMessage, showSuccessMessage } from "helpers/globalHelper";
import { parseJSONHelper } from "helpers/object.helper";
import { goBackNavHelper } from "helpers/navigation.helper";

const DetailLogsBugScreen = () => {
  const theme = useTheme();
  const route = useRoute<any>();
  const [item, setItem] = useState<any>(route?.params?.item);
  const [device] = useState<any>(
    parseJSONHelper(route?.params?.item?.device || "{}")
  );
  const [screenStack] = useState<any>(
    (route?.params?.item?.detail || "").split("|_|")
  );
  const { _ } = useLingui();

  const onCopy = useCallback((value: string = "") => {
    setStringAsync(value);
    showInfoMessage(_(msg`Đã sao chép`));
  }, []);

  const onUpdateBugs = useCallback(() => {
    if (item?.status === ETypeOfBug.New) {
      firestore()
        .collection("Bugs")
        .doc(item?.id)
        .update({
          status: ETypeOfBug.Fixed,
        })
        .then(() => {
          setItem((old: any) => ({
            ...old,
            status: ETypeOfBug.Fixed,
          }));
          showSuccessMessage(_(msg`Đã cập nhật`));
        })
        .catch((err) => console.log(err));
    } else {
      firestore()
        .collection("Bugs")
        .doc(item?.id)
        .delete()
        .then(async () => {
          showSuccessMessage(_(msg`Đã xóa`));
          goBackNavHelper();
        })
        .catch((err) => console.log(err));
    }
  }, [item]);

  const renderObjectInfo = useCallback((item: string, parent: any) => {
    return (
      // <TextBase fontSize={16} key={item} onPress={() => onCopy(String(parent?.[item]) || "")}
      //           title={item + ": "} fontWeight={"bold"}
      //           style={styles.paddingVer4}>
      //     <TextBase fontSize={16}
      //               title={typeof parent?.[item] === "object" ? JSON.stringify(parent?.[item]) : String(parent?.[item])}/>
      // </TextBase>

      <BTextMulti
        key={item}
        onPress={() => onCopy(String(parent?.[item]) || "")}
        style1={[
          { fontSize: FontSize._16, fontWeight: "bold" },
          styles.paddingVer4,
        ]}
        style2={{ fontWeight: "300" }}
      >
        {`${item}: |||${
          typeof parent?.[item] === "object"
            ? JSON.stringify(parent?.[item])
            : String(parent?.[item])
        }`}
      </BTextMulti>
    );
  }, []);

  const renderAPI = useCallback((item: string) => {
    let apiObject = parseJSONHelper(item.replace("API_", ""));

    return (
      <BView key={apiObject?.endpoint} style={styles.viewAPI}>
        <BView style={styles.viewTopAPI}>
          <BTextMulti
            style1={{
              fontSize: FontSize._16,
              fontWeight: "bold",
              color: "red",
            }}
            style2={{ color: apiObject?.hasAuth ? "black" : "red" }}
            style3={{ color: apiObject?.type == "get" ? "green" : "blue" }}
          >
            {`API - |||${
              apiObject?.hasAuth ? "Có AUTH - " : "Không AUTH - "
            }|||${apiObject?.type}`}
          </BTextMulti>

          <BText
            style={{
              fontWeight: "bold",
              color:
                Number(apiObject?.responseCode) >= 300
                  ? theme.colors.error
                  : theme.colors.success,
            }}
          >
            {apiObject?.responseCode}
          </BText>
        </BView>

        <BText variant={"md"} style={styles.marginTop16}>
          {"Endpoint:"}
        </BText>
        <BText variant={"md"} onPress={() => onCopy(apiObject?.endpoint || "")}>
          {apiObject?.endpoint || "Không có"}
        </BText>

        <BText variant={"md"} style={styles.marginTop16}>
          {"Data Request:"}
        </BText>
        {typeof apiObject?.data === "object" ? (
          Object.keys(apiObject?.data).map((item) =>
            renderObjectInfo(item, apiObject?.data)
          )
        ) : (
          <BText>{"Không có"}</BText>
        )}

        <BText variant={"md"} style={styles.marginTop16}>
          {"Response:"}
        </BText>
        {typeof apiObject?.typeOfResponse === "object" ? (
          Object.keys(apiObject?.typeOfResponse).map((item) =>
            renderObjectInfo(item, apiObject?.typeOfResponse)
          )
        ) : (
          <BText>{"Không có"}</BText>
        )}

        {apiObject?.error ? (
          <>
            <BText variant={"md"} style={styles.marginTop16}>
              {"Error:"}
            </BText>
            <BText
              variant={"md"}
              onPress={() => onCopy(apiObject?.error || "")}
            >
              {apiObject?.error || "Không có"}
            </BText>
          </>
        ) : null}

        {apiObject?.messageError ? (
          <>
            <BText variant={"md"} style={styles.marginTop16}>
              {"Error Message:"}
            </BText>
            <BText
              variant={"md"}
              onPress={() => onCopy(apiObject?.messageError || "")}
            >
              {apiObject?.messageError || "Không có"}
            </BText>
          </>
        ) : null}
      </BView>
    );
  }, []);

  const renderScreenStack = useCallback((item: string, index: number) => {
    let actionStack = item.split("|*|");
    let screen = actionStack.shift();

    return (
      <BView style={{ width: "100%" }} key={"screen_" + index + "screen"}>
        <BText
          variant={"md"}
          style={styles.marginTop16}
          fontWeight={"bold"}
          // color={theme.colors.info}
        >
          {screen}
        </BText>
        {actionStack.map(renderAPI)}
      </BView>
    );
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: VS._20 }}
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
              fontSize: FontSize._22,
              fontWeight: "bold",
              color: item?.type === "api" ? "red" : "orange",
            }}
            style2={{ color: item?.isDevSite ? "green" : "blue" }}
          >
            {`${item?.type} - |||${item?.isDevSite ? "Dev" : "Live"}`}
          </BTextMulti>
          <BText>{new Date(item?.time).toLocaleString()}</BText>
        </BView>

        <BButton
          onPress={onUpdateBugs}
          backgroundColor={
            item?.status === ETypeOfBug.New ? "primary" : "success"
          }
          label={item?.status === ETypeOfBug.New ? "Đã xử lý" : "Đã xong"}
        />
      </BView>

      <BText variant={"md"} style={styles.marginTop16}>
        {"Lỗi:"}
      </BText>
      <BText onPress={() => onCopy(item?.error || "")}>
        {item?.error || "Không có"}
      </BText>

      <BText variant={"md"} style={styles.marginTop16}>
        {"Stack Trace:"}
      </BText>
      <BText onPress={() => onCopy(item?.stackTrace || "")}>
        {item?.stackTrace || "Không có"}
      </BText>

      <BText variant={"md"} style={styles.marginTop16}>
        {"Account ID:"}
      </BText>
      <BText onPress={() => onCopy(item?.user || "")}>
        {item?.user || "Không có"}
      </BText>

      <BText variant={"md"} style={styles.marginTop16}>
        {"Channel ID:"}
      </BText>
      <BText onPress={() => onCopy(item?.channelId || "")}>
        {item?.channelId || "Không có"}
      </BText>

      <BText variant={"md"} style={styles.marginTop16}>
        {"Thiết bị:"}
      </BText>
      <BView
        style={{
          gap: MHS._16,
        }}
      >
        {Object.keys(device).map((item) => renderObjectInfo(item, device))}
      </BView>

      <BText variant={"md"} style={styles.marginTop16}>
        {"Logs:"}
      </BText>
      {screenStack.map(renderScreenStack)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MHS._12,
  },
  marginTop16: {
    marginTop: VS._16,
  },
  viewAPI: {
    width: "100%",
    marginTop: VS._12,
    paddingBottom: VS._12,
    borderBottomWidth: 1,
  },
  viewTopAPI: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: MHS._12,
  },
  paddingVer4: {
    paddingVertical: MHS._4,
  },
});

export default DetailLogsBugScreen;
