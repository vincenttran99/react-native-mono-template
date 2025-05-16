import { AxiosResponse } from "axios";
import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  hideGlobalLoading,
  showErrorMessage,
  showGlobalLoading,
  showSuccessMessage,
} from "./global.helper";

export type HandleProps<T> = {
  params?: any;
  successedMessage?: string;
  showMessageFailed?: boolean;
  onSuccess?: (response: AxiosResponse<T, any>) => void;
  showLoading?: boolean;
  autoHideLoading?: boolean;
  failedMessage?: string;
  onFailed?: (error: any) => void;
  request?: Function;
};

export async function handleRequestHelper<T>({
  request: requestFunction,
  params,
  successedMessage: messageSuccess = "",
  showMessageFailed = true,
  onSuccess: actionSuccess = undefined,
  showLoading = true,
  autoHideLoading = true,
  onFailed: actionFailed,
  failedMessage: messageFailed = "",
}: HandleProps<T>) {
  try {
    if (showLoading) {
      showGlobalLoading();
    }
    const res = await requestFunction?.(params);

    if (autoHideLoading) {
      hideGlobalLoading();
    }
    if (res) {
      if (actionSuccess) {
        actionSuccess?.(res);
      }
      if (messageSuccess) {
        showSuccessMessage(messageSuccess);
      }
      return;
    }
    actionFailed?.("Network Error");
  } catch (error: any) {
    hideGlobalLoading();
    const messages = error?.response?.data?.message;
    const message = Array.isArray(messages)
      ? messages?.[0]
      : messages || i18n._(msg`Something went wrong`);
    if (showMessageFailed) {
      showErrorMessage(messageFailed || message);
    }
    actionFailed?.(error);
  }
}
