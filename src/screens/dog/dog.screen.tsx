import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";

import BView from "@/components/base/base.view";
import { useDogListQuery } from "@/api/dog/dog.queries";
import { IDog } from "@/models/dog.model";
import { useInfiniteList } from "@/helpers/hooks/list.hook";
import { MHS } from "@/constants/sizes.constant";
import ItemDog from "./components/item.dog";
import BFlashList from "@/components/base/base.flashList";

export default function DogScreen() {
  const { listItems, onRefresh, isRefetching, onEndReached } =
    useInfiniteList<IDog>({
      query: useDogListQuery,
      keyAttribute: "id",
    });

  const renderItem = useCallback(({ item }: { item: IDog }) => {
    return <ItemDog item={item} />;
  }, []);

  return (
    <BView backgroundColor="background" flex={1}>
      <BFlashList
        keyAttribute={"id"}
        data={listItems}
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
