const { withAndroidManifest } = require("@expo/config-plugins");

/**
 * Plugin to add tools:replace attribute to Firebase messaging meta-data tag
 */
const withAndroidManifestPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    // Ensure tools namespace exists
    if (!androidManifest.$) {
      androidManifest.$ = {};
    }

    if (!androidManifest.$["xmlns:tools"]) {
      androidManifest.$["xmlns:tools"] = "http://schemas.android.com/tools";
    }

    // Find application tag
    const application = androidManifest.application?.[0];
    if (!application) {
      return config;
    }

    // Find meta-data tags
    if (!application["meta-data"]) {
      application["meta-data"] = [];
    }

    // Find specific meta-data tag for Firebase messaging notification color
    const firebaseNotificationColorMetaData = application["meta-data"].find(
      (metaData) =>
        metaData?.$?.["android:name"] ===
        "com.google.firebase.messaging.default_notification_color"
    );

    if (firebaseNotificationColorMetaData) {
      // Add tools:replace attribute
      firebaseNotificationColorMetaData.$["tools:replace"] = "android:resource";
    }

    const firebaseNotificationDefaultChannelIDMetaData = application[
      "meta-data"
    ].find(
      (metaData) =>
        metaData?.$?.["android:name"] ===
        "com.google.firebase.messaging.default_notification_channel_id"
    );

    if (firebaseNotificationDefaultChannelIDMetaData) {
      // Add tools:replace attribute
      firebaseNotificationDefaultChannelIDMetaData.$["tools:replace"] =
        "android:value";
    }

    return config;
  });
};

module.exports = withAndroidManifestPlugin;
