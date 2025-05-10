import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BButton, { IBButtonProps } from "components/base/button.base";

import { StyleSheet } from "react-native";

import BText from "components/base/text.base";

import { MHS } from "constants/sizes.constant";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import BackdropBottomSheetComponent from "components/base/backdrop.bottomSheet.component";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop";
import { Device } from "constants/device.constant";
import BDivider from "components/base/divider.base";
import {
  s_itemsCenter,
  s_row_justifyBetween_itemsCenter_gapMd,
} from "constants/styles.constant";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";
import BIcon, { BIconProps } from "components/base/icon.base";
import BIconButton from "components/base/iconButton.base";

export interface IBottomSheetDataDialog {
  title?: string;
  icon?: string;
  iconProps?: BIconProps;
  content?: React.ReactNode;
  scrollContent?: React.ReactNode;
  negativeButton?: {
    label?: string;
    onPress?: () => void;
    props?: Omit<IBButtonProps, "children" | "ref" | "onPress">;
  };
  positiveButton?: {
    label?: string;
    onPress?: () => void;
    props?: Omit<IBButtonProps, "children" | "ref" | "onPress">;
  };
  neutralButton?: {
    label?: string;
    onPress?: () => void;
    props?: Omit<IBButtonProps, "children" | "ref" | "onPress">;
  };
  closeButton?: boolean;
  enablePanDownToClose?: boolean;
  dismissable?: "close" | "none";
}

export interface IBottomSheetDialogGlobalComponentRef {
  showDialog: (dialogParams: IBottomSheetDataDialog) => void;
}

function BottomSheetDialogGlobalComponent(
  props: any,
  ref: React.ForwardedRef<IBottomSheetDialogGlobalComponentRef>
) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [dataDialog, setDataDialog] = useState<IBottomSheetDataDialog>();
  const { _ } = useLingui();
  useImperativeHandle(
    ref,
    () => ({
      showDialog,
    }),
    []
  );

  const showDialog = useCallback((dialogParams: IBottomSheetDataDialog) => {
    setDataDialog(dialogParams);
    bottomSheetModalRef?.current?.present();
  }, []);

  const onPress = useCallback((callBack?: Function) => {
    bottomSheetModalRef?.current?.dismiss();
    setDataDialog(undefined);
    callBack?.();
  }, []);

  const BackdropBottomSheet = useCallback(
    (value: BottomSheetBackdropProps) => (
      <BackdropBottomSheetComponent
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
          backgroundColor="background"
          style={{
            paddingHorizontal: MHS._24,
            paddingTop: MHS._8,
            paddingBottom: MHS._48,
            borderTopLeftRadius: MHS._40,
            borderTopRightRadius: MHS._40,
            gap: MHS._24,
          }}
        >
          {/*<BView style={{*/}
          {/*    backgroundColor: theme.colors.outline,*/}
          {/*    width: MHS._36,*/}
          {/*    height: MHS._3,*/}
          {/*    alignSelf:'center'*/}
          {/*}} />*/}

          {dataDialog?.title ? (
            <>
              <BText
                variant={"md"}
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
            <BView style={s_itemsCenter}>
              <BIcon {...dataDialog?.iconProps} name={dataDialog?.icon} />
            </BView>
          ) : null}
          {dataDialog?.content ? (
            <BText variant={"md"}>{dataDialog?.content}</BText>
          ) : null}

          <BView style={s_row_justifyBetween_itemsCenter_gapMd}>
            <BButton
              size={"md"}
              outline
              {...dataDialog?.negativeButton?.props}
              style={[
                { flexGrow: 1, flex: 1 },
                dataDialog?.negativeButton?.props?.style,
              ]}
              onPress={() => onPress(dataDialog?.negativeButton?.onPress)}
              label={dataDialog?.negativeButton?.label || _(msg`Huỷ`)}
            />

            {dataDialog?.neutralButton ? (
              <BButton
                size={"md"}
                {...dataDialog?.neutralButton?.props}
                style={[
                  { flexGrow: 1, flex: 1 },
                  dataDialog?.neutralButton?.props?.style,
                ]}
                onPress={() => onPress(dataDialog?.neutralButton?.onPress)}
                label={dataDialog?.neutralButton?.label || _(msg`Bỏ qua`)}
              />
            ) : null}

            {dataDialog?.positiveButton ? (
              <BButton
                size={"md"}
                {...dataDialog?.positiveButton?.props}
                style={[
                  { flexGrow: 1, flex: 1 },
                  dataDialog?.positiveButton?.props?.style,
                ]}
                onPress={() => onPress(dataDialog?.positiveButton?.onPress)}
                label={dataDialog?.positiveButton?.label || _(msg`Xác nhận`)}
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
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  handleStyle: {
    backgroundColor: "transparent",
    width: Device.width,
    borderTopRightRadius: MHS._40,
    borderTopLeftRadius: MHS._40,
  },
});

export default memo(forwardRef(BottomSheetDialogGlobalComponent));
