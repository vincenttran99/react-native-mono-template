import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { isDevice } from "expo-device";
import messaging from "@react-native-firebase/messaging";
import { AppState, Platform } from "react-native";
import { CONFIG } from "@/constants/config.constant";
import {
  getFcmTokenHelper,
  getTokenHelper,
  setFcmTokenHelper,
} from "./storage.helper";
import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

dayjs.extend(utc);

/**
 * Notification
 */
export async function requestUserPermissionHepler() {
  if (isDevice) {
    let authStatus = await notifee.requestPermission();
    // const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log("Authorization status:", authStatus.authorizationStatus);
    // if (authStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED || authStatus.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
    //     console.log("Authorization status:", authStatus);
    // }
  } else {
    console.log("Must use physical device for Push Notifications");
  }
}

export async function createDefaultChannelsHelper() {
  await notifee.createChannel({
    id: CONFIG.FIREBASE_DEFAULT_CHANNEL_ID,
    name: CONFIG.FIREBASE_DEFAULT_CHANNEL_ID,
    vibrationPattern: [0, 250, 250, 250],
    importance: AndroidImportance.HIGH,
    // sound: "notification.wav"
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
  // Xử lý thông báo từ Firebase khi ứng dụng đang chạy
  messaging().onMessage(async (remoteMessage) => {
    if (!remoteMessage.notification) {
      return;
    }
    console.log(
      "notification from foreground state....",
      remoteMessage,
      AppState.currentState
    );

    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body || "",
      data: remoteMessage.data,
      android: {
        channelId: CONFIG.FIREBASE_DEFAULT_CHANNEL_ID,
        pressAction: {
          id: "default",
        },
        ...(remoteMessage?.data?.fcm_options?.image
          ? { largeIcon: remoteMessage?.data?.fcm_options?.image }
          : {}),
        // sound: remoteMessage.notification?.sound || 'notification',
        smallIcon: "ic_notification",
        // color: Config.LOGO_NOTIFICATION_COLOR_ANDROID,
        importance: AndroidImportance.HIGH,
      },
      ios: {
        // sound: remoteMessage.notification?.sound || 'notification.MP3',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        ...(remoteMessage?.data?.fcm_options?.image
          ? {
              attachments: [
                {
                  // Remote image
                  url: remoteMessage?.data?.fcm_options?.image || "",
                },
              ],
            }
          : {}),
      },
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

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log("onBackgroundEvent");

    if (type !== EventType.PRESS) {
      return;
    }

    // Handle logic
  });

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

  notifee.onForegroundEvent(({ type, detail }) => {
    console.log("onForeground event", type, detail);
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail);
        break;
      case EventType.PRESS:
        // Handle logic

        console.log("User pressed notification", detail);
        break;
    }
  });
}

export async function bootstrapHelper() {
  // Kiểm tra xem ứng dụng có được mở từ thông báo không
  const initialNotification = await notifee.getInitialNotification();
  console.log(initialNotification, "lastNotificationResponse");

  if (initialNotification) {
    console.log(
      "Notification caused application to open",
      initialNotification.notification
    );

    // Handle logic
  }
}
