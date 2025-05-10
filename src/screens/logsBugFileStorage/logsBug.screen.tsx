import React, { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { FlatList, StyleSheet } from "react-native";
import { ETypeOfBug } from "constants/firebase.constant";
import { HS, MHS, VS } from "constants/sizes.constant";

import { Device } from "constants/device.constant";

import ItemBug from "screens/logsBugFileStorage/components/item.bug";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { showSuccessMessage } from "helpers/globalHelper";
import { uniqByHelper } from "helpers/array.helper";

const bugsCollection = firestore().collection("Bugs");

const LogsBugScreen = () => {
  const [bugs, setBugs] = useState<any[]>([]); // Initial empty array of users
  const [lastDocument, setLastDocument] = useState();
  const { _ } = useLingui();

  useEffect(() => {
    loadData();

    // const subscriber = firestore()
    //     .collection("Bugs")
    //     .orderBy('time', 'desc')
    //     .onSnapshot(querySnapshot => {
    //         const bugsList: any[] = [];
    //         querySnapshot.forEach(documentSnapshot => {
    //             console.log(documentSnapshot.id,"documentSnapshot")
    //
    //             bugsList.push({
    //                 ...documentSnapshot.data(),
    //                 id: documentSnapshot.id
    //             });
    //         });
    //
    //         setBugs(bugsList);
    //     });
    //
    // // Unsubscribe from events when no longer in use
    // return () => subscriber();
  }, []);

  function loadData() {
    let query = bugsCollection.orderBy("time", "desc"); // sort the data
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument); // fetch data following the last document accessed
    }
    query
      .limit(10)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs?.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
          convertData(querySnapshot.docs);
        }
      });
  }

  function convertData(docs: any) {
    let bugsList: any[] = []; //[...userData] <- use this instead of [] if you want to save the previous data.
    docs.forEach((doc, i) => {
      bugsList.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setBugs((old) => uniqByHelper([...old, ...bugsList], "id")); //replace with the new data
  }

  const onUpdateBugs = useCallback((item: any) => {
    if (item?.status === ETypeOfBug.New) {
      bugsCollection
        .doc(item?.id)
        .update({
          status: ETypeOfBug.Fixed,
        })
        .then(() => {
          showSuccessMessage(_(msg`Đã cập nhật`));
        })
        .catch((err) => console.log(err));
    } else {
      bugsCollection
        .doc(item?.id)
        .delete()
        .then(async () => {
          showSuccessMessage(_(msg`Đã xóa`));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <ItemBug item={item} />;
  }, []);

  const keyExtractor = useCallback((item: any) => item.id, []);
  const onEndReached = useCallback(({ distanceFromEnd }) => {
    if (distanceFromEnd < 1) return;
    loadData();
  }, []);
  return (
    <FlatList
      data={bugs}
      contentContainerStyle={{
        width: Device.width,
        paddingHorizontal: HS._6,
        gap: MHS._12,
        paddingVertical: VS._12,
      }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      removeClippedSubviews
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
    />
  );
};

export default LogsBugScreen;
