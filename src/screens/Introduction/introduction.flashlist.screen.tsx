import React, { useCallback, useRef } from "react";
import BFlashList from "components/base/base.flashList";
import IntroductionFlashlistItem from "./components/introduction.flashlist.item";
import { fakePosts, IPost } from "./components/fakedata";

export default function IntroductionFlashlistScreen() {
  const flashListRef = useRef(null);

  const renderItem = useCallback(
    ({ item }: { item: IPost }) => <IntroductionFlashlistItem item={item} />,
    []
  );
  return (
    <BFlashList
      ref={flashListRef}
      keyAttribute={"id"}
      estimatedItemSize={450}
      data={fakePosts}
      renderItem={renderItem}
      backgroundColor="background"
    />
  );
}
