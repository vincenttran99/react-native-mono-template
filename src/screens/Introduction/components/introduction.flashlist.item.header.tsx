import React, { memo, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import BView from "components/base/base.view";
import BText from "components/base/base.text";
import { FontSize, MHS } from "constants/sizes.constant";
import BIcon from "components/base/base.icon";
import BImage from "components/base/base.image";
import isEqual from "react-fast-compare";
import BPressable from "components/base/base.pressable";

const IconPrivacyName = {
  public: "earth",
  friends: "account-group",
  private: "lock",
};

const IntroductionFlashlistItemHeader = ({
  privacy,
  id,
  avatar,
  name,
  group,
  timeAgo,
}: {
  privacy: string;
  id: string;
  avatar: string;
  name: string;
  group?: string;
  timeAgo: string;
}) => {
  const itemId = useRef<string>(null);
  const IconPrivary = useMemo(() => {
    return (
      <BIcon
        name={IconPrivacyName[privacy as keyof typeof IconPrivacyName]}
        size={MHS._14}
        color="secondary"
      />
    );
  }, [privacy]);

  const BtnOptions = useMemo(() => {
    return (
      <BPressable style={styles.moreButton}>
        <BIcon name="dots-horizontal" size={FontSize.lg} color="text" />
      </BPressable>
    );
  }, []);

  const ViewDot = useMemo(() => {
    return <BView style={styles.dot} />;
  }, []);

  useEffect(() => {
    itemId.current = id;
  }, [id]);

  return (
    <BView style={styles.header}>
      <BImage
        // cachePolicy={"memory"}
        source={avatar}
        // recyclingKey={item.author.avatar}
        style={styles.avatar}
      />
      <BView style={styles.headerInfo}>
        <BText variant="sm" fontWeight="bold" numberOfLines={1}>
          {name}
        </BText>
        <BView style={styles.groupContainer} gap="xs">
          {group ? (
            <BText variant="sm" numberOfLines={1} style={styles.groupText}>
              {group}
            </BText>
          ) : null}

          <BText variant="xs" color="secondary">
            {timeAgo}
          </BText>
          {ViewDot}
          {IconPrivary}
        </BView>
      </BView>
      {BtnOptions}
    </BView>
  );
};

const styles = StyleSheet.create({
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
});

export default memo(IntroductionFlashlistItemHeader, isEqual);
