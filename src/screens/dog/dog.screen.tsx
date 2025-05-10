import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";

import BView from "components/base/view.base";
import BScrollview from "components/base/scrollview.base";
import { useRoute } from "@react-navigation/native";
import { useDogListQuery } from "api/dog/dog.queries";
import { IDog } from "models/dog.model";
import { useInfiniteList } from "helpers/hooks/list.hook";
import BList from "components/base/list.base";
import { MHS } from "constants/sizes.constant";
import ItemDog from "./components/item.dog";

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
    <BView backgroundColor="background" flex={1}>
      <BList
        keyAttribute={"notification_id"}
        estimatedItemSize={MHS._70}
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
