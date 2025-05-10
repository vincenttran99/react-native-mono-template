import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import { MHS } from "constants/sizes.constant";
import ItemNotifications from "screens/notifications/components/item.notifications";
import { useInfiniteList } from "helpers/hooks/list.hook";
import { INotification } from "models/system.model";
import { useRoute } from "@react-navigation/native";
import { ListNotificationsScreenRouteProp } from "models/navigation.model";
import BList from "components/base/list.base";
import BView from "components/base/view.base";
import { useNotificationListQuery } from "api/pokemon/notification.queries";

export default function ListNotificationsScreen() {
  const route = useRoute<ListNotificationsScreenRouteProp>();

  const { items, onRefresh, isRefetching, onEndReached } =
    useInfiniteList<INotification>({
      query: useNotificationListQuery,
      params: route?.params?.category,
      keyAttribute: "notification_id",
    });

  const renderItem = useCallback(({ item }: { item: INotification }) => {
    return <ItemNotifications item={item} />;
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
