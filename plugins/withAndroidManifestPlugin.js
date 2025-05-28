const { withAndroidManifest } = require("@expo/config-plugins");

/**
 * Custom Expo config plugin to modify the Android manifest
 *
 * This plugin resolves conflicts between Firebase messaging configuration
 * and Expo's default configuration by adding tools:replace attributes
 * to specific meta-data elements in the AndroidManifest.xml file.
 *
 * Without these modifications, the build process might fail with duplicate
 * declaration errors when both Expo and Firebase try to define the same
 * notification properties.
 */
const withAndroidManifestPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    /**
     * Ensure the tools namespace is properly declared
     * This namespace is required to use the tools:replace attribute
     * If the root element doesn't have any attributes yet, initialize it
     */
    if (!androidManifest.$) {
      androidManifest.$ = {};
    }

    /**
     * Add the tools namespace declaration if it doesn't exist
     * This is required for the tools:replace attribute to be recognized
     */
    if (!androidManifest.$["xmlns:tools"]) {
      androidManifest.$["xmlns:tools"] = "http://schemas.android.com/tools";
    }

    /**
     * Find the application element in the manifest
     * All meta-data elements we need to modify are children of this element
     * The ?.[0] syntax safely accesses the first application element if it exists
     */
    const application = androidManifest.application?.[0];
    if (!application) {
      // If there's no application element, return the config unchanged
      return config;
    }

    /**
     * Ensure the meta-data array exists in the application element
     * If it doesn't exist yet, initialize it as an empty array
     */
    if (!application["meta-data"]) {
      application["meta-data"] = [];
    }

    /**
     * Find the Firebase notification icon meta-data element
     * This element defines the default icon for Firebase notifications
     */
    const firebaseNotificationIconMetaData = application["meta-data"].find(
      (metaData) =>
        metaData?.$?.["android:name"] ===
        "com.google.firebase.messaging.default_notification_icon"
    );

    /**
     * If the notification icon meta-data element doesn't exist, add it
     * This sets the default notification icon to ic_notification in mipmap folder
     */
    if (!firebaseNotificationIconMetaData) {
      application["meta-data"].push({
        $: {
          "android:name":
            "com.google.firebase.messaging.default_notification_icon",
          "android:resource": "@mipmap/ic_notification",
        },
      });
    }

    /**
     * Find the Firebase notification color meta-data element
     * This element defines the default color for Firebase notifications
     * We need to add tools:replace to prevent conflicts with Expo's configuration
     */
    const firebaseNotificationColorMetaData = application["meta-data"].find(
      (metaData) =>
        metaData?.$?.["android:name"] ===
        "com.google.firebase.messaging.default_notification_color"
    );

    /**
     * If the notification color meta-data element exists, add the tools:replace attribute
     * This tells the Android build system to use this value instead of any other
     * declarations of the same resource
     */
    if (firebaseNotificationColorMetaData) {
      // Add tools:replace attribute to override any conflicting declarations
      firebaseNotificationColorMetaData.$["tools:replace"] = "android:resource";
    } else {
      /**
       * If the notification color meta-data doesn't exist, add it with tools:replace
       * This sets the default notification color to the notification color in colors.xml
       */
      application["meta-data"].push({
        $: {
          "android:name":
            "com.google.firebase.messaging.default_notification_color",
          "android:resource": "@color/notification_color",
          "tools:replace": "android:resource",
        },
      });
    }

    /**
     * Find the Firebase default notification channel ID meta-data element
     * This element defines which notification channel to use by default
     * Similar to the color, we need to resolve potential conflicts
     */
    const firebaseNotificationDefaultChannelIDMetaData = application[
      "meta-data"
    ].find(
      (metaData) =>
        metaData?.$?.["android:name"] ===
        "com.google.firebase.messaging.default_notification_channel_id"
    );

    /**
     * If the notification channel ID meta-data element exists, add the tools:replace attribute
     * This ensures our channel ID takes precedence over any other declarations
     */
    if (firebaseNotificationDefaultChannelIDMetaData) {
      // Add tools:replace attribute to override any conflicting declarations
      firebaseNotificationDefaultChannelIDMetaData.$["tools:replace"] =
        "android:value";
    }

    // Return the modified configuration
    return config;
  });
};

module.exports = withAndroidManifestPlugin;
