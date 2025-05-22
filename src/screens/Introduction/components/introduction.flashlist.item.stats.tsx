import React, { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import BView from "@/components/base/base.view";
import { useLingui } from "@lingui/react";
import BText from "@/components/base/base.text";
import { FontSize, MHS } from "@/constants/sizes.constant";
import BIcon from "@/components/base/base.icon";
import { msg } from "@lingui/core/macro";
import isEqual from "react-fast-compare";

const IntroductionFlashlistItemStats = ({
  likes,
  comments,
  shares,
}: {
  likes: number;
  comments: number;
  shares: number;
}) => {
  const { _ } = useLingui();

  const ViewDot = useMemo(() => {
    return <BView style={styles.dot} marginHorizontal="xxs" />;
  }, []);

  const IconThumpUp = useMemo(() => {
    return <BIcon name="thumb-up" size={FontSize.md} color="primary" />;
  }, []);

  return (
    <BView style={styles.statsContainer}>
      {IconThumpUp}
      <BText variant="sm" color="secondary" flex={1}>
        {likes}
      </BText>
      <BText variant="sm" color="secondary">
        {comments} {_(msg`Comments`)}
      </BText>
      {ViewDot}
      <BText variant="sm" color="secondary">
        {shares} {_(msg`Shares`)}
      </BText>
    </BView>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: MHS._3,
    height: MHS._3,
    borderRadius: MHS._1,
    backgroundColor: "gray",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: MHS._8,
    gap: MHS._4,
    alignItems: "center",
  },
});

export default memo(IntroductionFlashlistItemStats, isEqual);
