import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import BView from "components/base/base.view";
import { useLingui } from "@lingui/react";
import BText from "components/base/base.text";
import { IPost } from "./fakedata";
import { FontSize, MHS } from "constants/sizes.constant";
import BIcon from "components/base/base.icon";
import BDivider from "components/base/base.divider";
import BSurface from "components/base/base.surface";
import BImage from "components/base/base.image";
import { msg } from "@lingui/core/macro";
import BTextEllipsis from "components/base/textEllipsis/base.textEllipsis";
import isEqual from "react-fast-compare";
import IntroductionFlashlistItemAction, {
  IntroductionFlashlistItemActionButton,
} from "./introduction.flashlist.item.action";

interface IntroductionFlashlistItemProps {
  item: IPost;
}

const IntroductionFlashlistItem = ({
  item,
}: IntroductionFlashlistItemProps) => {
  const { _ } = useLingui();
  const ButtonLikeref = useRef<any>(null);
  const ButtonLike = useMemo(() => {
    return (
      <IntroductionFlashlistItemActionButton
        ref={ButtonLikeref}
        iconTrue="thumb-up"
        iconFalse="thumb-up-outline"
        labelTrue={_(msg`Liked`)}
        labelFalse={_(msg`Like`)}
        initBooleanValue={item.liked}
      />
    );
  }, []);

  useLayoutEffect(() => {
    ButtonLikeref.current?.setBooleanValue(item.liked);
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
      <BView style={styles.header}>
        <BImage
          // cachePolicy={"memory"}
          source={item.author.avatar}
          // recyclingKey={item.author.avatar}
          style={styles.avatar}
        />
        <BView style={styles.headerInfo}>
          <BText variant="sm" fontWeight="bold" numberOfLines={1}>
            {item.author.name}
          </BText>
          <BView style={styles.groupContainer} gap="xs">
            {item.group ? (
              <BText variant="sm" numberOfLines={1} style={styles.groupText}>
                {item.group.name}
              </BText>
            ) : null}

            <BText variant="xs" color="secondary">
              {item.timeAgo}
            </BText>
            <BView style={styles.dot} />
            <BIcon
              name={
                item.privacy === "public"
                  ? "earth"
                  : item.privacy === "friends"
                  ? "account-group"
                  : "lock"
              }
              size={14}
              color="secondary"
            />
          </BView>
        </BView>
        <TouchableOpacity style={styles.moreButton}>
          <BIcon name="dots-horizontal" size={FontSize.lg} color="text" />
        </TouchableOpacity>
      </BView>

      {/* Content */}
      <BTextEllipsis numberOfLines={3} variant="md" style={styles.content}>
        {item.content + " " + item.content}
      </BTextEllipsis>

      {/* Images */}
      {renderImages()}

      {/* Stats */}
      <BView style={styles.statsContainer}>
        <BView style={styles.statItem}>
          <BIcon name="thumb-up" size={FontSize.md} color="primary" />
          <BText variant="sm" color="secondary">
            {item.stats.likes}
          </BText>
        </BView>
        <BView style={styles.statsRight}>
          <BText variant="sm" color="secondary">
            {item.stats.comments} {_(msg`Comments`)}
          </BText>
          <BView style={styles.dot} marginHorizontal="xxs" />
          <BText variant="sm" color="secondary">
            {item.stats.shares} {_(msg`Shares`)}
          </BText>
        </BView>
      </BView>

      <BDivider marginVertical="xxxxs" />

      {/* Actions */}
      <IntroductionFlashlistItemAction ButtonLike={ButtonLike} />
    </BSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: MHS._4,
    padding: MHS._12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: MHS._52,
    height: MHS._52,
    borderRadius: MHS._30,
  },
  headerInfo: {
    flex: 1,
    marginLeft: MHS._10,
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  groupText: {
    maxWidth: "50%",
  },
  dot: {
    width: MHS._3,
    height: MHS._3,
    borderRadius: MHS._1,
    backgroundColor: "gray",
  },
  moreButton: {
    padding: MHS._5,
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
  lastImageInThree: {
    width: "99%",
  },
  moreImagesOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "48%",
    height: MHS._100,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: MHS._8,
    margin: "1%",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: MHS._8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: MHS._5,
  },
  statsRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: MHS._8,
  },
  actionText: {
    marginLeft: MHS._5,
  },
});

export default memo(IntroductionFlashlistItem, isEqual);
