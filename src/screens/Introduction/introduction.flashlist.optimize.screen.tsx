import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useLingui } from "@lingui/react";
import BFlashList from "components/base/base.flashList";
import { fakePosts, IPost } from "./components/fakedata";
import IntroductionFlashlistOptimizeItem from "./components/introduction.flashlist.item.optimize";

export default function IntroductionFlashlistOptimizeScreen() {
  const { _ } = useLingui();

  const renderItem = useCallback(({ item }: { item: IPost }) => {
    return <IntroductionFlashlistOptimizeItem item={item} />;
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
