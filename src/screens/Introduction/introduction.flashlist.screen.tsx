import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BText from "components/base/base.text";
import BView from "components/base/base.view";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BScrollview from "components/base/base.scrollview";
import { MHS } from "constants/sizes.constant";
import BIcon from "components/base/base.icon";
import BSurface from "components/base/base.surface";
import BPressable from "components/base/base.pressable";
import BButton from "components/base/base.button";
import BIconButton from "components/base/base.iconButton";
import BChip from "components/base/base.chip";
import BDivider from "components/base/base.divider";
import BLazy from "components/base/base.lazy";
import BTextMulti from "components/base/base.multiText";
import BTextEllipsis from "components/base/textEllipsis/base.textEllipsis";
import BTextInput from "components/base/base.textInput";
import BWebUrlPreviewComponent from "components/web/web.urlPreview.component";
import BFlashList from "components/base/base.flashList";
import IntroductionFlashlistItem from "./components/introduction.flashlist.item";
import { fakePosts, IPost } from "./components/fakedata";

export default function IntroductionFlashlistScreen() {
  const { _ } = useLingui();

  const renderItem = useCallback(({ item }: { item: IPost }) => {
    return <IntroductionFlashlistItem item={item} />;
  }, []);

  return (
    <BFlashList
      keyAttribute={"id"}
      estimatedItemSize={450}
      data={fakePosts}
      renderItem={renderItem}
      backgroundColor="background"
    />
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 26,
    color: "red",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 22,
    color: "green",
    fontWeight: "normal",
  },
  text3: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  text4: {
    fontSize: 14,
    color: "orange",
    fontWeight: "normal",
    textDecorationLine: "underline",
  },
});
