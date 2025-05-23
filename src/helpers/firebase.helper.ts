import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  cancelScheduledNotificationAsync,
  getLastNotificationResponseAsync,
  getPermissionsAsync,
  removeNotificationSubscription,
  requestPermissionsAsync,
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from "expo-notifications";
import { isDevice } from "expo-device";
import messaging from "@react-native-firebase/messaging";
import { AppState, Platform } from "react-native";
import { CONFIG } from "@/constants/config.constant";
import {
  getFcmTokenHelper,
  getTokenHelper,
  setFcmTokenHelper,
} from "./storage.helper";

dayjs.extend(utc);

/**
 * Notification
 */
export async function requestUserPermissionHepler() {
  if (isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }

    console.log("Authorization status:", finalStatus);

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
  } else {
    console.log("Must use physical device for Push Notifications");
  }
}

export async function createDefaultChannelsHelper() {
  await setNotificationChannelAsync("default", {
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
  });
}

export async function getFCMTokenHelper() {
  const fcmToken = getFcmTokenHelper();
  if (!fcmToken) {
    try {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }

      const token = await messaging().getToken();
      if (token) {
        setFcmTokenHelper(token);
        return token;
      }
      return "";
    } catch (error) {
      console.log("error fcm token", error);
      return "";
    }
  }
  return fcmToken;
}

export function setupNotificationHelper() {
  // Cấu hình xử lý thông báo khi ứng dụng đang chạy
  setNotificationHandler({
    handleNotification: async (notification) => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Xử lý thông báo từ Firebase khi ứng dụng đang chạy
  messaging().onMessage(async (remoteMessage) => {
    console.log(
      "notification from foreground state....",
      remoteMessage,
      AppState.currentState
    );

    await scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title || "",
        body: remoteMessage.notification?.body || "",
        data: remoteMessage.data || {},
        // sound: remoteMessage.notification?.sound || "notification",
        badge: 1,
        ...(remoteMessage?.data?.fcm_options?.image
          ? {
              attachments: [
                {
                  url: remoteMessage?.data?.fcm_options?.image || "",
                  identifier: remoteMessage?.data?.fcm_options?.image || "",
                  type: "image",
                },
              ],
            }
          : {}),
      },
      trigger: null, // Hiển thị ngay lập tức
    });
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      console.log(remoteMessage, "remoteMessage");
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        const data: any = remoteMessage?.data || {};
        // Handle logic
      }
    });

  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
    const data: any = remoteMessage?.data || {};
    // Handle logic
  });

  // Xử lý sự kiện khi người dùng nhấn vào thông báo
  const notificationListener = addNotificationReceivedListener(
    (notification) => {
      console.log("Notification received in foreground!", notification);
    }
  );

  // Xử lý sự kiện khi người dùng nhấn vào thông báo để mở ứng dụng
  const responseListener = addNotificationResponseReceivedListener(
    (response) => {
      console.log("Notification response received!", response);
      const data: any = response.notification.request.content.data;
      // Handle logic
    }
  );

  messaging()
    .subscribeToTopic("all")
    .then(() => console.log("Subscribed to topic all!"));

  messaging().onTokenRefresh((newFcmToken: string) => {
    console.log("refreshFCMToken", newFcmToken);

    let authToken = getTokenHelper();
    if (authToken) {
      //call api update fcm token
    }
  });

  // Trả về hàm dọn dẹp để hủy đăng ký các listener khi không cần thiết
  return () => {
    removeNotificationSubscription(notificationListener);
    removeNotificationSubscription(responseListener);
  };
}

export async function bootstrapHelper() {
  // Kiểm tra xem ứng dụng có được mở từ thông báo không
  const lastNotificationResponse = await getLastNotificationResponseAsync();
  console.log(lastNotificationResponse, "lastNotificationResponse");

  if (lastNotificationResponse) {
    console.log(
      "Notification caused application to open",
      lastNotificationResponse.notification
    );
    const data: any =
      lastNotificationResponse.notification.request.content.data;
    // Handle logic
  }
}

/**
 * File
 */
//   export async function updateFile(
//     filePath: string,
//     folderName: string,
//     fileName?: string
//   ): Promise<{
//     ref?: string;
//     downloadUrl?: string;
//   }> {
//     let ref = `/${folderName}/${
//       fileName ||
//       dayjs.utc().format(`img_HH_mm_SSS_DD_MM_YY`) +
//         (FileHelper.getFileExtension(filePath) &&
//           "." + FileHelper.getFileExtension(filePath))
//     }`;
//     let reference = storage().ref(ref);
//     return await reference
//       .putFile(filePath)
//       .then(async (result) => {
//         if (result.state === "success") {
//           let downloadUrl = await reference.getDownloadURL();
//           return {
//             downloadUrl,
//             ref,
//           };
//         }
//         return {};
//       })
//       .catch(() => {
//         return {};
//       });
//   }

//   export async function deleteFile(ref: string): Promise<boolean> {
//     let reference = storage().ref(ref);
//     return await reference
//       .delete()
//       .then(async (result) => {
//         return true;
//       })
//       .catch((error) => {
//         console.log(error, "doirnfworungpi");
//         return false;
//       });
//   }

export async function createTriggerNotificationHelper({
  title = "",
  data,
  notificationId = "default",
  image,
  oldNotificationId,
  time = new Date(),
  body = "",
}: {
  title: string;
  body?: string;
  image?: string | number;
  notificationId: string;
  time: Date;
  data?: { screen: string; param?: any };
  oldNotificationId?: string;
}) {
  try {
    // Kiểm tra quyền thông báo
    const { status } = await getPermissionsAsync();

    if (status === "granted") {
      // Hủy thông báo cũ nếu có
      if (oldNotificationId) {
        await cancelScheduledNotificationAsync(oldNotificationId).catch(
          (error) => console.log(error, "oodood")
        );
      }

      // Đăng ký kênh thông báo cho Android
      if (Platform.OS === "android") {
        await setNotificationChannelAsync("mono-template", {
          name: "mono-template",
          importance: AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: CONFIG.PRIMARY_COLOR,
          // sound: "notification",
        });
      }

      // Lên lịch thông báo
      await scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: data || {},
          // sound: "notification",
          badge: 1,
          ...(image
            ? {
                attachments: [
                  {
                    url: typeof image === "string" ? image : "",
                    identifier: typeof image === "string" ? image : "",
                    type: "image",
                  },
                ],
              }
            : {}),
        },
        trigger: {
          date: time,
          type: SchedulableTriggerInputTypes.DATE,
        },
        identifier: notificationId,
      });

      return true;
    } else {
      // Mở cài đặt quyền thông báo
      await requestPermissionsAsync();
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteTriggerNotificationByIdHelper(id: string) {
  await cancelScheduledNotificationAsync(id).catch((error) =>
    console.log(error, "oofffdood")
  );
}
