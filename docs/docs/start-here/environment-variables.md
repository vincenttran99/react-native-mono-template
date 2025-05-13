---
sidebar_position: 5
---

# Environment Variables and Configuration

You can define environment variables in `.env.development`, `.env.production`, and `.env.staging` files to manage different configuration values for your application.

Each file contains separate environment variables that will be used when the application is built with the corresponding environment. Some special environment variables are only effective in the development environment and are not used in production. Detailed comments are included in the environment files.

## How to Use

To use environment variables in your code, you can use `Constants.expoConfig?.extra?.[environment variable name]`. For convenience and flexibility, a `config.constant.ts` file has been created to manage the application's configuration variables. You can map environment variables to variables in this file and also declare variables that are independent of the environment.

Example:

```ts
// Use in React Native

import { Constants } from "expo-constants";
export const config = {
  apiUrl: Constants.expoConfig?.extra?.API_URL,
};

// or simply use Constants.expoConfig?.extra?.API_URL directly
```

Interestingly, you can also use these variables in native code:

```swift
// Here's how to access them in Swift code for iOS:
import Foundation
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  // ... existing code ...

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Read environment variables from Info.plist
    if let apiUrl = Bundle.main.object(forInfoDictionaryKey: "API_URL") as? String {
      print("API URL from environment variable: \(apiUrl)")
    }

    if let primaryColor = Bundle.main.object(forInfoDictionaryKey: "PRIMARY_COLOR") as? String {
      // Use primaryColor in iOS application
      print("Primary color from environment variable: \(primaryColor)")
    }

    // Check boolean variable
    if let enableLogUserBugsToFirebase = Bundle.main.object(forInfoDictionaryKey: "ENABLE_LOG_USER_BUGS_TO_FIREBASE") as? Bool {
      if enableLogUserBugsToFirebase {
        // Enable user bug logging to Firebase
        print("User bug logging to Firebase enabled")
      }
    }

    // ... existing code ...
    return true
  }

  // ... existing code ...
}

// You can also create a utility class to access environment variables:

import Foundation

class EnvConfig {
  static let shared = EnvConfig()

  var apiUrl: String {
    return Bundle.main.object(forInfoDictionaryKey: "API_URL") as? String ?? ""
  }

  var policyUrl: String {
    return Bundle.main.object(forInfoDictionaryKey: "POLICY_URL") as? String ?? ""
  }

  var deepLink: String {
    return Bundle.main.object(forInfoDictionaryKey: "DEEP_LINK") as? String ?? ""
  }

  var enableLogUserBugsToFirebase: Bool {
    return Bundle.main.object(forInfoDictionaryKey: "ENABLE_LOG_USER_BUGS_TO_FIREBASE") as? Bool ?? false
  }

  var primaryColor: String {
    return Bundle.main.object(forInfoDictionaryKey: "PRIMARY_COLOR") as? String ?? "#000000"
  }
}

// Use in Swift code
// let apiUrl = EnvConfig.shared.apiUrl
```

```kotlin
// Here's how to access them in Kotlin code for Android:
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.util.Log

class MainActivity : ReactActivity() {
  // ... existing code ...

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Read environment variables from BuildConfig
    val apiUrl = BuildConfig.API_URL
    Log.d("EnvVariables", "API URL from environment variable: $apiUrl")

    val primaryColor = BuildConfig.PRIMARY_COLOR
    Log.d("EnvVariables", "Primary color from environment variable: $primaryColor")

    // Check boolean variable
    val enableLogUserBugsToFirebase = BuildConfig.ENABLE_LOG_USER_BUGS_TO_FIREBASE.toBoolean()
    if (enableLogUserBugsToFirebase) {
      // Enable user bug logging to Firebase
      Log.d("EnvVariables", "User bug logging to Firebase enabled")
    }
  }

  // ... existing code ...
}

// You can also create a utility class to access environment variables:
object EnvConfig {
  val apiUrl: String
    get() = BuildConfig.API_URL

  val policyUrl: String
    get() = BuildConfig.POLICY_URL

  val deepLink: String
    get() = BuildConfig.DEEP_LINK

  val enableLogUserBugsToFirebase: Boolean
    get() = BuildConfig.ENABLE_LOG_USER_BUGS_TO_FIREBASE.toBoolean()

  val enableLogEventToFirebase: Boolean
    get() = BuildConfig.ENABLE_LOG_EVENT_TO_FIREBASE.toBoolean()

  val primaryColor: String
    get() = BuildConfig.PRIMARY_COLOR
}

// Use in Kotlin code
// val apiUrl = EnvConfig.apiUrl
```

## How It Works

Basically, you customize the environment files according to your needs. Whenever you want to switch environments, make sure to run the `prebuild` command (`prebuild:prod` or `prebuild:stag`, all defined in `package.json`) corresponding to the environment you want to use. Expo will then read the environment variables in the `.env.[environment]` file and write them to `app.config.js`, while also writing those environment variables to iOS's Info.plist and Android's build.gradle using a plugin in the form of `build-config-fields`.

```js
expo: {
  ios: {
    infoPlist: {
      // iOS Environment variables
      ...configVars,
    }
  },
  plugins: [
    // Plugin to set Android environment variables
    "./plugins/withAppBuildGradlePlugin.js",
  ]
}
```

### Security Considerations

- Never commit sensitive environment variables to version control
- Consider using a secure secrets management system for production environments
- Use different values for development, staging, and production environments
- Review environment variables regularly to ensure they're still needed
