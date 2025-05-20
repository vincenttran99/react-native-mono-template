import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import BView from "components/base/base.view";
import { useLingui } from "@lingui/react";
import BText from "components/base/base.text";
import { FontSize, MHS } from "constants/sizes.constant";
import BIcon from "components/base/base.icon";
import { msg } from "@lingui/core/macro";
import BPressable from "components/base/base.pressable";
import BDivider from "components/base/base.divider";

export const IntroductionFlashlistItemActionButton = forwardRef(
  (
    {
      iconTrue = "",
      iconFalse,
      labelTrue,
      labelFalse,
      initBooleanValue,
      onPress,
    }: {
      iconTrue?: string;
      iconFalse: string;
      labelTrue?: string;
      labelFalse: string;
      initBooleanValue?: boolean;
      onPress?: () => void;
    },
    ref: any
  ) => {
    const [booleanValue, setBooleanValue] = useState<boolean | undefined>(
      initBooleanValue
    );
    useImperativeHandle(
      ref,
      () => ({
        setBooleanValue: (value: boolean) => setBooleanValue(value),
      }),
      []
    );

    console.log("render");

    const toggleBooleanValue = useCallback(() => {
      // we understand iconTrue is "like" button
      if (iconTrue) {
        setBooleanValue((oldValue) => !oldValue);
      } else {
        onPress?.();
      }
    }, [onPress]);

    return (
      <BPressable onPress={toggleBooleanValue} style={styles.actionButton}>
        <BIcon
          name={booleanValue ? iconTrue : iconFalse}
          size={FontSize.lg}
          color={booleanValue ? "primary" : "text"}
        />
        <BText
          variant="sm"
          color={booleanValue ? "primary" : "text"}
          style={styles.actionText}
        >
          {booleanValue ? labelTrue : labelFalse}
        </BText>
      </BPressable>
    );
  }
);

const IntroductionFlashlistItemAction = ({
  liked,
  ButtonLikeRef,
}: {
  liked: boolean;
  ButtonLikeRef: React.RefObject<any>;
}) => {
  const { _ } = useLingui();

  return (
    <>
      <BDivider marginVertical="xxxxs" />
      <BView style={styles.actionsContainer}>
        <IntroductionFlashlistItemActionButton
          ref={ButtonLikeRef}
          iconTrue="thumb-up"
          iconFalse="thumb-up-outline"
          labelTrue={_(msg`Liked`)}
          labelFalse={_(msg`Like`)}
          initBooleanValue={liked}
        />
        <IntroductionFlashlistItemActionButton
          iconFalse="comment-outline"
          labelFalse={_(msg`Comment`)}
        />
        <IntroductionFlashlistItemActionButton
          iconFalse="share-outline"
          labelFalse={_(msg`Share`)}
        />
      </BView>
    </>
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

const compareAlwayTrue = () => {
  return true;
};

export default memo(IntroductionFlashlistItemAction, compareAlwayTrue);
