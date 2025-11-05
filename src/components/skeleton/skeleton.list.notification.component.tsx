import { JSX, memo } from "react";

import { StyleSheet } from "react-native";
import SkeletonContainerComponent from "@/components/skeleton/skeleton.container.component";
import isEqual from "react-fast-compare";

import { MHS } from "@/constants/sizes.constant";

import BDivider from "@/components/base/base.divider";
import BView from "@/components/base/base.view";
import BFlashList from "@/components/base/base.flashList";
import { useTheme } from "@shopify/restyle";

const SkeletonListNotificationComponent = memo((): JSX.Element => {
  const theme = useTheme();

  const renderItem = () => {
    return (
      <BView style={{ backgroundColor: theme.colors.background }}>
        <SkeletonContainerComponent>
          <BView style={styles.viewCategory}>
            <BView style={styles.image} />
            <BView gap="xxxs" flex={1}>
              <BView
                style={{
                  width: MHS._220,
                  height: MHS._18,
                  borderRadius: MHS._12,
                }}
              />
              <BView
                style={{
                  width: "100%",
                  height: MHS._16,
                  borderRadius: MHS._12,
                }}
              />
              <BView
                style={{
                  width: MHS._120,
                  height: MHS._16,
                  borderRadius: MHS._12,
                }}
              />
              <BView
                style={{
                  width: MHS._72,
                  height: MHS._14,
                  borderRadius: MHS._12,
                }}
              />
            </BView>
          </BView>
        </SkeletonContainerComponent>
      </BView>
    );
  };

  return (
    <BFlashList
      bounces={false}
      showsVerticalScrollIndicator={false}
      data={[
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
      ]}
      renderItem={renderItem}
      ItemSeparatorComponent={BDivider}
      keyAttribute={""}
    />
  );
}, isEqual);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTitle: {
    gap: MHS._12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    gap: MHS._12,
  },
  viewCategory: {
    padding: MHS._12,
    gap: MHS._12,
    flexDirection: "row",
  },
  image: {
    width: MHS._52,
    height: MHS._52,
    borderRadius: MHS._12,
  },
  badge: {
    alignSelf: "center",
  },
  viewImageCategory: {
    padding: MHS._8,
    borderRadius: MHS._12,
  },
});

export default SkeletonListNotificationComponent;
