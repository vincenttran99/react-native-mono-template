import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { isDevice } from "expo-device";
import messaging from "@react-native-firebase/messaging";
import { AppState } from "react-native";
import { CONFIG } from "@/constants/config.constant";
import {
  getFcmTokenFromStorageHelper,
  getTokenHelper,
  setFcmTokenHelper,
} from "./storage.helper";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";

// Extend dayjs with UTC plugin for proper date handling
dayjs.extend(utc);

/**
 * Firebase Notification Module
 * This module handles all Firebase Cloud Messaging (FCM) related functionality
 * including permission requests, notification display, and event handling.
 */

/**
 * Requests notification permissions from the user
 * This should be called during app initialization or when user explicitly enables notifications
 * @returns {Promise<void>}
 */
export async function requestNotificationPermissionHelper() {
  if (isDevice) {
    const authStatus = await notifee.requestPermission();
    console.log("Authorization status:", authStatus.authorizationStatus);

    // Uncomment and implement proper permission handling if needed
    // if (authStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    //     authStatus.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
    //     console.log("Notification permission granted");
    //     // Perform additional setup if needed
    // } else {
    //     console.log("Notification permission denied");
    //     // Handle permission denial (e.g., show a message to the user)
    // }
  } else {
    console.log("Must use physical device for Push Notifications");
  }
}

/**
 * Creates default notification channels for Android
 * This is required for Android devices to display notifications properly
 * @returns {Promise<void>}
 */
export async function createDefaultNotificationChannelsHelper() {
  await notifee.createChannel({
    id: CONFIG.FIREBASE_DEFAULT_CHANNEL_ID,
    name: CONFIG.FIREBASE_DEFAULT_CHANNEL_ID,
    vibrationPattern: [0, 250, 250, 250],
    importance: AndroidImportance.HIGH,
  });
}

/**
 * Retrieves the FCM token for the device
 * If no token exists, it registers the device and gets a new token
 * @returns {Promise<string>} The FCM token or empty string if retrieval fails
 */
export async function getFcmTokenHelper() {
  const storedFcmToken = getFcmTokenFromStorageHelper();

  if (!storedFcmToken) {
    try {
      // Register device for remote messages if not already registered
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
      console.log("Error retrieving FCM token:", error);
      return "";
    }
  }
  return storedFcmToken;
}

/**
 * Sets up all notification handlers and listeners
 * This should be called during app initialization
 */
export function setupNotificationHandlersHelper() {
  // Handle foreground messages
  messaging().onMessage(async (remoteMessage) => {
    if (!remoteMessage.notification) {
      return;
    }
    console.log(
      "Notification received in foreground state:",
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
        // Add large icon if available in the message
        ...(typeof remoteMessage?.data?.fcm_options === "object" &&
        "image" in (remoteMessage?.data?.fcm_options || {})
          ? {
              largeIcon: (remoteMessage?.data?.fcm_options as { image: string })
                ?.image,
            }
          : {}),
        // Configure custom sound if needed
        // sound: remoteMessage.notification?.sound || 'notification',
        smallIcon: "ic_notification",
        // color: CONFIG.LOGO_NOTIFICATION_COLOR_ANDROID,
        importance: AndroidImportance.HIGH,
      },
      ios: {
        // Configure custom sound if needed
        // sound: remoteMessage.notification?.sound || 'notification.MP3',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        // Add attachments if image is available
        ...(typeof remoteMessage?.data?.fcm_options === "object" &&
        "image" in (remoteMessage?.data?.fcm_options || {})
          ? {
              attachments: [
                {
                  // Remote image
                  url:
                    (remoteMessage?.data?.fcm_options as { image: string })
                      ?.image || "",
                },
              ],
            }
          : {}),
      },
    });
  });

  // Handle notification that caused app to open from quit state
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        const notificationData = remoteMessage?.data || {};
        // TODO: Implement navigation or action based on notification data
        // Example: if (notificationData.screen) { navigate(notificationData.screen); }
      }
    });

  // Handle notification that caused app to open from background state
  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
    const notificationData = remoteMessage?.data || {};
    // TODO: Implement navigation or action based on notification data
    // Example: if (notificationData.screen) { navigate(notificationData.screen); }
  });

  // Handle background notification press events
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log("Background notification event:", type);

    if (type !== EventType.PRESS) {
      return;
    }
    const notificationData = detail?.notification?.data || {};

    // TODO: Implement navigation or action based on notification detail
    // Example: if (detail.notification?.data?.screen) { navigate(detail.notification.data.screen); }
  });

  // Subscribe to "all" topic for broadcast messages
  messaging()
    .subscribeToTopic("all")
    .then(() => console.log("Successfully subscribed to 'all' topic"));

  // Handle FCM token refresh
  messaging().onTokenRefresh((newFcmToken: string) => {
    console.log("FCM token refreshed:", newFcmToken);

    const authToken = getTokenHelper();
    if (authToken) {
      // TODO: Implement API call to update FCM token on server
      // Example: updateFcmTokenOnServer(authToken, newFcmToken);
      setFcmTokenHelper(newFcmToken);
    }
  });

  // Handle foreground notification events
  notifee.onForegroundEvent(({ type, detail }) => {
    console.log("Foreground notification event:", type, detail);
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail);
        break;
      case EventType.PRESS:
        const notificationData = detail?.notification?.data || {};
        console.log("User pressed notification", detail);
        // TODO: Implement navigation or action based on notification detail
        // Example: if (detail.notification?.data?.screen) { navigate(detail.notification.data.screen); }
        break;
    }
  });
}

/**
 * Initializes notification handling on app bootstrap
 * Checks if app was opened from a notification and handles accordingly
 * @returns {Promise<void>}
 */
export async function initializeNotificationsHelper() {
  // Check if app was opened from a notification
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log(
      "Application opened from notification:",
      initialNotification.notification
    );

    // TODO: Implement navigation or action based on notification
    // Example: if (initialNotification.notification?.data?.screen) {
    //   navigate(initialNotification.notification.data.screen);
    // }
  }
}
