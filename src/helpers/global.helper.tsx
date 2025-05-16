import { createRef } from "react";
import { GlobalLoadingComponentRef } from "components/global/loading.global.component";
import { GlobalModalMediaComponentRef } from "components/global/modalMedia.global.component";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";
import {
  showMessage as showFlashMessage,
  hideMessage as hideFlashMessage,
  MessageOptions,
} from "react-native-flash-message";

import {
  IBottomSheetDataDialog,
  IBottomSheetDialogGlobalComponentRef,
} from "components/global/bottomSheetDialog.global.component";
import { IDialogGlobalComponentRef } from "components/global/dialog.global.component";

/**
 * Refs
 */
export const LoadingRef = createRef<GlobalLoadingComponentRef>();
export const BottomSheetDialogRef =
  createRef<IBottomSheetDialogGlobalComponentRef>();
export const ModalMediaGlobalComponentRef =
  createRef<GlobalModalMediaComponentRef>();
export const DialogRef = createRef<IDialogGlobalComponentRef>();

/**
 * Functions Modal Media
 */
export function showMediaModal(
  media: IImageInfo[],
  currentIndex?: number,
  type?: "image" | "wistia" | "video" | "vimeo" | "youtube"
) {
  ModalMediaGlobalComponentRef.current?.show(media, currentIndex, type);
}

export function hideMediaModal() {
  ModalMediaGlobalComponentRef.current?.hide();
}

export function showBottomSheetDialog(dialogParams: IBottomSheetDataDialog) {
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
