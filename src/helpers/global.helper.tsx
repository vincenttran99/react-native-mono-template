import { createRef } from "react";
import { GlobalLoadingComponentRef } from "@/components/global/global.loading.component";
import {
  showMessage as showFlashMessage,
  hideMessage as hideFlashMessage,
  MessageOptions,
} from "react-native-flash-message";

import {
  GlobalBottomSheetDialogComponentData,
  GlobalBottomSheetDialogComponentRef,
} from "@/components/global/global.bottomSheetDialog.component";
import { GlobalDialogComponentRef } from "@/components/global/global.dialog.component";

/**
 * Refs
 */
export const LoadingRef = createRef<GlobalLoadingComponentRef>();
export const BottomSheetDialogRef =
  createRef<GlobalBottomSheetDialogComponentRef>();
export const DialogRef = createRef<GlobalDialogComponentRef>();

export function showBottomSheetDialog(
  dialogParams: GlobalBottomSheetDialogComponentData
) {
  BottomSheetDialogRef.current?.showDialog(dialogParams);
}

/**
 * Functions Loading
 */
export function showGlobalLoading(autoHide: boolean = true) {
  LoadingRef.current?.showLoading(autoHide);
}

export function hideGlobalLoading() {
  LoadingRef.current?.hideLoading();
}

/**
 * Functions message
 */
export function showMessage(messageOptions: MessageOptions) {
  showFlashMessage(messageOptions);
}

export function showSuccessMessage(message: string, description?: string) {
  showFlashMessage({ type: "success", message, description });
}

export function showInfoMessage(message: string, description?: string) {
  showFlashMessage({ type: "info", message, description });
}

export function showErrorMessage(message: string, description?: string) {
  showFlashMessage({ type: "danger", message, description });
}

export function showWaringMessage(message: string, description?: string) {
  showFlashMessage({ type: "warning", message, description });
}

export function hideMessage() {
  hideFlashMessage();
}

export function showDialog(dialogProps: DialogProps) {
  DialogRef.current?.show(dialogProps);
}
