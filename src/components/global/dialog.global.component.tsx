import BButton, { IBButtonProps } from "components/base/button.base";
import BIcon, { BIconProps } from "components/base/icon.base";
import BIconButton from "components/base/iconButton.base";
import { BPressable } from "components/base/pressable.base";
import BSurface from "components/base/surface.base";
import BText, { BTextProps } from "components/base/text.base";
import BView from "components/base/view.base";
import { MHS } from "constants/sizes.constant";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { StyleSheet, ScrollView, Modal } from "react-native";

export interface IDataDialog {
  title?: string;
  titleProps?: BTextProps;
  icon?: string;
  dismissable?: boolean;
  dismissableBackButton?: boolean;
  iconProps?: Omit<BIconProps, "name">;
  content?: React.ReactNode | string;
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
}

export interface IDialogGlobalComponentRef {
  showDialog: (dialogParams: IDataDialog) => void;
}

const DialogGlobalComponent = forwardRef<IDialogGlobalComponentRef, {}>(
  (props, ref) => {
    // const [visible, setVisible] = useState(false);
    const [dialogData, setDialogData] = useState<IDataDialog | undefined>();

    const showDialog = (dialogParams: IDataDialog) => {
      setDialogData(dialogParams);
      // setVisible(true);
    };

    const hideDialog = () => {
      setDialogData(undefined);
      // setVisible(false);
    };

    const onBackDropPress = useCallback(() => {
      if (dialogData?.dismissable) {
        hideDialog();
      }
    }, [dialogData?.dismissable]);

    const onRequestClose = useCallback(() => {
      if (dialogData?.dismissableBackButton) {
        hideDialog();
      }
    }, [dialogData?.dismissable]);

    useImperativeHandle(
      ref,
      () => ({
        showDialog,
      }),
      []
    );

    const handleNegativeButtonPress = () => {
      dialogData?.negativeButton?.onPress?.();
      hideDialog();
    };

    const handlePositiveButtonPress = () => {
      dialogData?.positiveButton?.onPress?.();
      hideDialog();
    };

    const handleNeutralButtonPress = () => {
      dialogData?.neutralButton?.onPress?.();
      hideDialog();
    };

    if (!dialogData) {
      return null;
    }

    return (
      <Modal
        transparent
        visible
        // un-comment below line if you want to use fade animation
        // visible={visible}
        // animationType="fade"
        onRequestClose={onRequestClose}
      >
        <BPressable
          backgroundColor="backdrop"
          onPress={onBackDropPress}
          disableOpacityEffect
          style={StyleSheet.absoluteFill}
        />
        <BView flex={1} justifyContent="center" alignItems="center">
          <BSurface
            variant="md"
            alignItems="center"
            backgroundColor="background"
            width={"85%"}
            borderRadius="xxl"
            paddingVertical="xl"
            paddingHorizontal="xl"
            maxHeight={"60%"}
            gap="lg"
          >
            {dialogData.icon && (
              <BIcon
                name={dialogData.icon}
                size={dialogData.iconProps?.size || 32}
                {...dialogData.iconProps}
              />
            )}

            {dialogData.title && (
              <BText
                fontWeight={"bold"}
                textAlign="center"
                variant="lg"
                {...dialogData?.titleProps}
              >
                {dialogData.title}
              </BText>
            )}

            {typeof dialogData?.content === "string" ? (
              <BText variant={"md"} textAlign={"center"}>
                {dialogData?.content}
              </BText>
            ) : (
              dialogData?.content
            )}

            {dialogData.scrollContent && (
              <ScrollView style={styles.scrollContentContainer}>
                {dialogData.scrollContent}
              </ScrollView>
            )}

            <BView
              flexDirection="row"
              gap={
                dialogData.positiveButton && dialogData.neutralButton
                  ? "xxxxs"
                  : "xxl"
              }
              justifyContent={
                dialogData.positiveButton && dialogData.neutralButton
                  ? "space-between"
                  : "flex-end"
              }
              width={"100%"}
            >
              {dialogData.negativeButton && (
                <BButton
                  onPress={handleNegativeButtonPress}
                  size="sm"
                  backgroundColor="transparent"
                  labelColor="error"
                  paddingVertical="xxxxs"
                  paddingHorizontal={"xxxxs"}
                  label={dialogData?.negativeButton?.label || "Disagree"}
                  {...dialogData?.negativeButton?.props}
                />
              )}

              {dialogData.neutralButton && (
                <BButton
                  onPress={handleNeutralButtonPress}
                  size="sm"
                  backgroundColor="transparent"
                  paddingHorizontal={"xxxxs"}
                  paddingVertical="xxxxs"
                  labelColor="secondary"
                  label={dialogData.neutralButton.label || "Neutral"}
                  {...dialogData.neutralButton.props}
                />
              )}

              {dialogData.positiveButton && (
                <BButton
                  onPress={handlePositiveButtonPress}
                  size="sm"
                  backgroundColor="transparent"
                  paddingHorizontal={"xxxxs"}
                  paddingVertical="xxxxs"
                  label={dialogData.positiveButton.label || "Agree"}
                  {...dialogData.positiveButton.props}
                />
              )}
            </BView>

            {dialogData.closeButton && (
              <BIconButton
                style={styles.closeButton}
                onPress={hideDialog}
                icon="close"
                size="md"
              />
            )}
          </BSurface>
        </BView>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: MHS._4,
    right: MHS._4,
    zIndex: 1,
  },
  scrollContentContainer: {
    width: "100%",
  },
});

export default DialogGlobalComponent;
