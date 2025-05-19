import React, {
  Profiler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

// Hàm tự động cuộn danh sách
const autoScroll = (ref, scrollDistance, duration) => {
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const offset = progress * scrollDistance;
    ref.current?.scrollToOffset({ offset, animated: false });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export default function IntroductionFlashlistScreen() {
  const { _ } = useLingui();
  const refInput = React.useRef(null);
  const totalRenderTime = React.useRef(0);
  const renderCount = React.useRef(0);
  const flashListRef = useRef(null);
  const onRender = (id, phase, actualDuration) => {
    if (phase === "update") {
      // Cập nhật tổng thời gian và số lần render
      totalRenderTime.current += actualDuration;
      renderCount.current += 1;

      refInput.current?.setNativeProps({
        text: `Hiệu suất trung bình: ${
          renderCount.current > 0
            ? (totalRenderTime.current / renderCount.current).toFixed(2)
            : 0
        } ms`,
      });
    }
  };
  // useEffect(() => {
  //   autoScroll(flashListRef, 117141, 30000);
  // }, []);

  const renderItem = useCallback(({ item }: { item: IPost }) => {
    return <IntroductionFlashlistItem item={item} />;
  }, []);

  return (
    <Profiler id="FlashList" onRender={onRender}>
      <BTextInput ref={refInput} />
      <BFlashList
        ref={flashListRef}
        keyAttribute={"id"}
        estimatedItemSize={450}
        data={fakePosts}
        renderItem={renderItem}
        backgroundColor="background"
      />
    </Profiler>
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
