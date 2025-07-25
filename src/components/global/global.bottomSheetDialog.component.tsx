import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BButton, { BButtonProps } from "@/components/base/base.button";

import { StyleSheet } from "react-native";

import BText from "@/components/base/base.text";

import { MHS } from "@/constants/sizes.constant";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheetBackdropComponent from "@/components/bottomSheet/bottomSheet.backdrop.component";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop";
import { DEVICE } from "@/constants/system.constant";
import BDivider from "@/components/base/base.divider";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "@/components/base/base.view";
import BIcon, { BIconProps } from "@/components/base/base.icon";
import BIconButton from "@/components/base/base.iconButton";

export type GlobalBottomSheetDialogComponentData = {
  title?: string;
  icon?: string;
  iconProps?: BIconProps;
  content?: React.ReactNode;
  scrollContent?: React.ReactNode;
  negativeButton?: {
    label?: string;
    onPress?: () => void;
    props?: Omit<BButtonProps, "children" | "ref" | "onPress">;
  };
  positiveButton?: {
    label?: string;
    onPress?: () => void;
    props?: Omit<BButtonProps, "children" | "ref" | "onPress">;
  };
  neutralButton?: {
    label?: string;
    onPress?: () => void;
    props?: Omit<BButtonProps, "children" | "ref" | "onPress">;
  };
  closeButton?: boolean;
  enablePanDownToClose?: boolean;
  dismissable?: "close" | "none";
};

export type GlobalBottomSheetDialogComponentRef = {
  showDialog: (dialogParams: GlobalBottomSheetDialogComponentData) => void;
};

const GlobalBottomSheetDialog = (
  props: any,
  ref: React.ForwardedRef<GlobalBottomSheetDialogComponentRef>
) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [dataDialog, setDataDialog] =
    useState<GlobalBottomSheetDialogComponentData>();
  const { _ } = useLingui();
  useImperativeHandle(
    ref,
    () => ({
      showDialog,
    }),
    []
  );

  const showDialog = useCallback(
    (dialogParams: GlobalBottomSheetDialogComponentData) => {
      setDataDialog(dialogParams);
      bottomSheetModalRef?.current?.present();
    },
    []
  );

  const onPress = useCallback((callBack?: Function) => {
    bottomSheetModalRef?.current?.dismiss();
    setDataDialog(undefined);
    callBack?.();
  }, []);

  const BackdropBottomSheet = useCallback(
    (value: BottomSheetBackdropProps) => (
      <BottomSheetBackdropComponent
        {...value}
        pressBehavior={dataDialog?.dismissable ? "close" : "none"}
      />
    ),
    [dataDialog?.dismissable]
  );

  return (
    <BottomSheetModal
      index={0}
      ref={bottomSheetModalRef}
      enablePanDownToClose={dataDialog?.enablePanDownToClose ?? false}
      android_keyboardInputMode={"adjustResize"}
      enableDynamicSizing
      handleComponent={null}
      keyboardBehavior={"interactive"}
      keyboardBlurBehavior={"restore"}
      backgroundStyle={styles.handleStyle}
      enableDismissOnClose
      style={styles.handleStyle}
      backdropComponent={BackdropBottomSheet}
    >
      <BottomSheetView style={{ flex: 1, justifyContent: "flex-end" }}>
        <BView
          backgroundColor="absolute"
          style={{
            paddingHorizontal: MHS._24,
            paddingTop: MHS._16,
            paddingBottom: MHS._48,
            borderTopLeftRadius: MHS._40,
            borderTopRightRadius: MHS._40,
            gap: MHS._24,
          }}
        >
          {dataDialog?.title ? (
            <>
              <BText
                variant={"xl"}
                alignSelf={"center"}
                numberOfLines={1}
                fontWeight={"bold"}
              >
                {dataDialog.title}
              </BText>
              <BDivider />
            </>
          ) : null}
          {dataDialog?.icon ? (
            <BView alignItems="center">
              <BIcon {...dataDialog?.iconProps} name={dataDialog?.icon} />
            </BView>
          ) : null}
          {dataDialog?.content ? (
            <BText variant={"lg"} fontWeight={"600"} textAlign="center">
              {dataDialog?.content}
            </BText>
          ) : null}

          <BView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            gap="lg"
          >
            <BButton
              size={"md"}
              flex={1}
              outline
              backgroundColor="errorLightest"
              labelColor="error"
              round
              paddingVertical="sm"
              {...dataDialog?.negativeButton?.props}
              style={[
                { flexGrow: 1, flex: 1 },
                dataDialog?.negativeButton?.props?.style,
              ]}
              onPress={() => onPress(dataDialog?.negativeButton?.onPress)}
              label={dataDialog?.negativeButton?.label || _(msg`Cancel`)}
            />

            {dataDialog?.neutralButton ? (
              <BButton
                size={"md"}
                flex={1}
                round
                paddingVertical="sm"
                {...dataDialog?.neutralButton?.props}
                style={[
                  { flexGrow: 1, flex: 1 },
                  dataDialog?.neutralButton?.props?.style,
                ]}
                onPress={() => onPress(dataDialog?.neutralButton?.onPress)}
                label={dataDialog?.neutralButton?.label || _(msg`Ignore`)}
              />
            ) : null}

            {dataDialog?.positiveButton ? (
              <BButton
                size={"md"}
                flex={1}
                round
                paddingVertical="sm"
                {...dataDialog?.positiveButton?.props}
                style={[
                  { flexGrow: 1, flex: 1 },
                  dataDialog?.positiveButton?.props?.style,
                ]}
                onPress={() => onPress(dataDialog?.positiveButton?.onPress)}
                label={dataDialog?.positiveButton?.label || _(msg`Confirm`)}
              />
            ) : null}
          </BView>

          {dataDialog?.closeButton ? (
            <BIconButton
              onPress={() => onPress()}
              icon={"close"}
              style={styles.closeButton}
            />
          ) : null}
        </BView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  handleStyle: {
    backgroundColor: "transparent",
    width: DEVICE.width,
    borderTopRightRadius: MHS._40,
    borderTopLeftRadius: MHS._40,
  },
});

const GlobalBottomSheetDialogComponent = memo(
  forwardRef(GlobalBottomSheetDialog)
);
export default GlobalBottomSheetDialogComponent;
