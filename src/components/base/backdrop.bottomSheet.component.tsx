import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React from "react";
import { StyleSheet } from "react-native";

export default function BackdropBottomSheetComponent(
  props: BottomSheetDefaultBackdropProps
) {
  return (
    <BottomSheetBackdrop
      style={styles.container}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
});
