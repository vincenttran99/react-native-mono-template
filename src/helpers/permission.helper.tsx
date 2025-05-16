import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Camera } from "react-native-vision-camera";

import BText from "components/base/base.text";
import { Linking, PermissionsAndroid } from "react-native";
import { Device } from "constants/device.constant";
import { Permission, requestMultiple, RESULTS } from "react-native-permissions";
import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { showDialog, showErrorMessage } from "./global.helper";

dayjs.extend(isBetween);

export async function requestPermissionHelper(
  listPermission: Permission[]
): Promise<string> {
  return await requestMultiple(listPermission)
    .then((statuses) => {
      let permissionRequestResult: Permission[] = [];
      let isBlocked: boolean = false;
      listPermission.map((item) => {
        if (statuses[item] === RESULTS.DENIED)
          permissionRequestResult.push(item);
        if (statuses[item] === RESULTS.BLOCKED) isBlocked = true;
      });

      if (isBlocked) {
        return RESULTS.BLOCKED;
      } else {
        if (permissionRequestResult.length === 0) {
          return RESULTS.GRANTED;
        }
        return RESULTS.DENIED;
      }
    })
    .catch((error) => {
      console.log(error);
      return RESULTS.BLOCKED;
    });
}

export async function getCameraPermissionHelper() {
  const cameraPermission = Camera.getCameraPermissionStatus();
  switch (cameraPermission) {
    case "granted":
      return true;
    case "not-determined": {
      let result = await Camera.requestCameraPermission();
      return result === "granted";
    }
    case "denied": {
      showDialog({
        title: i18n._(msg`Cần cấp quyền`),
        content: (
          <BText>
            {i18n._(
              msg`Ứng dụng cần quyền sử dụng máy ảnh. Truy cập vào cài đặt và cấp quyền.`
            )}
          </BText>
        ),
        positiveButton: {
          title: i18n._(msg`Mở cài đặt`),
          onPress: async () => Linking.openSettings(),
        },
      });
      return false;
    }
    default:
  }
}

export async function getDownloadPermissionHelper() {
  if (Device.isIos) return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: i18n._(msg`Quyền tải xuống`),
        message: i18n._(
          msg`Chức năng này yêu cầu quyền tải và lưu tệp tinh vào thiết bị của bạn`
        ),
        buttonNegative: i18n._(msg`Hủy`),
        buttonPositive: i18n._(msg`OK`),
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw "no permission";
    }
    return true;
  } catch (err) {
    console.log("err", err);
    showErrorMessage(i18n._(msg`Không được cấp quyền`));
    return false;
  }
}
