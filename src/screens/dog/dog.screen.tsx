import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";

import BView from "components/base/base.view";
import { useDogListQuery } from "api/dog/dog.queries";
import { IDog } from "models/dog.model";
import { useInfiniteList } from "helpers/hooks/list.hook";
import { MHS } from "constants/sizes.constant";
import ItemDog from "./components/item.dog";
import BLegendList from "components/base/base.legendList";

export default function DogScreen() {
  const { items, onRefresh, isRefetching, onEndReached } =
    useInfiniteList<IDog>({
      query: useDogListQuery,
      keyAttribute: "notification_id",
    });

  const renderItem = useCallback(({ item }: { item: IDog }) => {
    return <ItemDog item={item} />;
  }, []);

  return (
    <BView backgroundColor="background" flex={1} paddingTop="xxxl">
      <BLegendList
        keyAttribute={"notification_id"}
        estimatedItemSize={450}
        data={items}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={isRefetching}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </BView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: MHS._12,
  },
  contentContainer: {
    gap: MHS._12,
  },
});
