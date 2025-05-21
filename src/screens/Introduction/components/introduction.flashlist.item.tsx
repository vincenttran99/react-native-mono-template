import React, { memo, useLayoutEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { useLingui } from "@lingui/react";
import { IPost } from "./fakedata";
import { MHS } from "constants/sizes.constant";
import BSurface from "components/base/base.surface";
import BTextEllipsis from "components/base/textEllipsis/base.textEllipsis";
import isEqual from "react-fast-compare";
import IntroductionFlashlistItemAction from "./introduction.flashlist.item.action";
import IntroductionFlashlistItemHeader from "./introduction.flashlist.item.header";
import IntroductionFlashlistItemStats from "./introduction.flashlist.item.stats";
import IntroductionFlashlistItemMedia from "./introduction.flashlist.item.media";

interface IntroductionFlashlistItemProps {
  item: IPost;
}

const IntroductionFlashlistItem = ({
  item,
}: IntroductionFlashlistItemProps) => {
  const { _ } = useLingui();
  const ButtonLikeref = useRef<any>(null);

  useLayoutEffect(() => {
    return () => {
      ButtonLikeref.current?.setBooleanValue(item.liked);
    };
  }, [item.liked]);

  return (
    <BSurface variant="xs" backgroundColor="white" style={styles.container}>
      {/* Header */}
      <IntroductionFlashlistItemHeader
        id={item.id}
        name={item.author.name}
        group={item.group?.name}
        avatar={item.author.avatar}
        privacy={item.privacy}
        timeAgo={item.timeAgo}
      />

      {/* Content */}
      <BTextEllipsis numberOfLines={3} variant="md" style={styles.content}>
        {item.content + " " + item.content}
      </BTextEllipsis>

      {/* Images */}
      <IntroductionFlashlistItemMedia images={item.images} />

      {/* Stats */}
      <IntroductionFlashlistItemStats
        likes={item.stats.likes}
        comments={item.stats.comments}
        shares={item.stats.shares}
      />

      {/* Actions */}
      <IntroductionFlashlistItemAction
        liked={item.liked}
        ButtonLikeRef={ButtonLikeref}
      />
    </BSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: MHS._4,
    padding: MHS._12,
  },
  dot: {
    width: MHS._3,
    height: MHS._3,
    borderRadius: MHS._1,
    backgroundColor: "gray",
  },
  content: {
    marginVertical: MHS._10,
  },
});

export default memo(IntroductionFlashlistItem, isEqual);
