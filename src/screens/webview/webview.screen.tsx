import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { useRoute } from "@react-navigation/native";
import { WebviewScreenRouteProp } from "models/navigation.model";
import { setStringAsync } from "expo-clipboard";

import WebView from "react-native-webview";
import { MHS } from "constants/sizes.constant";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import {
  s_flex1,
  s_height100,
  s_justifyCenter_itemsCenter,
} from "constants/styles.constant";
import BView from "components/base/base.view";
import AppbarComponent from "components/appbar/appbar.component";
import BIconButton from "components/base/base.iconButton";
import BText from "components/base/base.text";
import { showErrorMessage, showInfoMessage } from "helpers/global.helper";
import { goBackNavHelper } from "helpers/navigation.helper";
import { getPreviewDataHelper } from "helpers/web.helper";

export default function WebviewScreen() {
  const route = useRoute<WebviewScreenRouteProp>();
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { _ } = useLingui();

  useEffect(() => {
    if (!route?.params?.link) return;

    let isCancelled = false;
    const fetchData = async () => {
      const newData = await getPreviewDataHelper(route?.params?.link, 5000);
      // Set data only if component is still mounted
      if (!isCancelled) {
        // No need to cover LayoutAnimation
        setTitle(newData?.title || "");
      }
    };

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [route?.params?.link]);

  const onCopyLink = () => {
    setStringAsync(route?.params?.link || "");
    showInfoMessage(_(msg`Đã sao chép`));
  };

  const Header = useCallback(
    () => (
      <AppbarComponent>
        <BIconButton icon={"arrow-left"} onPress={goBackNavHelper} />
        <BText fontWeight="700" flex={1} variant="xl">
          {title}
        </BText>
        <BIconButton icon={"content-copy"} onPress={onCopyLink} />
      </AppbarComponent>
    ),
    [route?.params, title]
  );

  if (!route?.params?.link) {
    showErrorMessage(_(msg`Đường dẫn không hợp lệ`));
    goBackNavHelper();
  }

  return (
    <BView style={styles.container}>
      <Header />
      {isLoading ? (
        <BView style={[s_height100, s_justifyCenter_itemsCenter]}>
          <ActivityIndicator size="large" />
        </BView>
      ) : null}
      <WebView
        source={{ uri: route?.params?.link }}
        onLoadEnd={() => setIsLoading(false)}
        style={s_flex1}
      />
    </BView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
