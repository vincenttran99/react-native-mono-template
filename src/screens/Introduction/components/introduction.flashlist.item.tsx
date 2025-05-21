import React, { memo, useCallback, useLayoutEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import BView from "components/base/base.view";
import { useLingui } from "@lingui/react";
import { IPost } from "./fakedata";
import { MHS } from "constants/sizes.constant";
import BSurface from "components/base/base.surface";
import BImage from "components/base/base.image";
import BTextEllipsis from "components/base/textEllipsis/base.textEllipsis";
import isEqual from "react-fast-compare";
import IntroductionFlashlistItemAction from "./introduction.flashlist.item.action";
import IntroductionFlashlistItemHeader from "./introduction.flashlist.item.header";
import IntroductionFlashlistItemStats from "./introduction.flashlist.item.stats";

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

  const renderImages = useCallback(() => {
    if (!item.images || item.images.length === 0) return null;

    if (item.images.length === 1) {
      return (
        <BImage
          // cachePolicy={"memory"}
          source={item.images[0]}
          // recyclingKey={item.images[0]}
          style={styles.singleImage}
        />
      );
    }

    return (
      <BView style={styles.imageGrid}>
        {item.images.map((image, index) => (
          <BImage
            // cachePolicy={"memory"}
            key={index}
            // recyclingKey={image}
            source={image}
            style={styles.gridImage}
          />
        ))}
      </BView>
    );
  }, [item.images]);

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
      {renderImages()}

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
  content: {
    marginVertical: MHS._10,
  },
  singleImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: MHS._8,
    marginVertical: MHS._5,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: MHS._5,
  },
  gridImage: {
    width: "48%",
    height: MHS._160,
    flexGrow: 1,
    margin: "1%",
    borderRadius: MHS._8,
  },
});

export default memo(IntroductionFlashlistItem, isEqual);
