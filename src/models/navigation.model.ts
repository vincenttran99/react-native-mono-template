import {
  NAVIGATION_DOG_SCREEN,
  NAVIGATION_INTRODUCTION_BASE_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_ONBOARDING_SCREEN,
  NAVIGATION_SETTINGS_LANGUAGE_SCREEN,
  NAVIGATION_SETTINGS_SCREEN,
  NAVIGATION_STYLE_NATIVE_SCREEN,
  NAVIGATION_STYLE_RESTYLE_SCREEN,
  NAVIGATION_TAB_NAVIGATION,
} from "@/constants/navigation.constant";
import { RouteProp } from "@react-navigation/native";

/**
 * Navigation Model - Type definitions for application navigation
 *
 * This file contains all type definitions for navigation stack parameters,
 * ensuring type safety when navigating between screens in React Navigation.
 *
 * Navigation structure:
 * - AuthStackParamList: Screens in the authentication flow
 * - MainStackParamList: Main application screens
 * - AppStackParamList: Combined all screens in the application
 */

/**
 * Parameter definitions for screens in the Authentication Stack.
 *
 * The Authentication Stack includes screens related to user login,
 * registration, and onboarding processes.
 *
 * @example
 * // Usage in navigation:
 * navigation.navigate(NAVIGATION_LOGIN_SCREEN);
 * navigation.navigate(NAVIGATION_ONBOARDING_SCREEN);
 */
export type AuthStackParamList = {
  /** Onboarding screen - Introduces the app to new users */
  [NAVIGATION_ONBOARDING_SCREEN]: undefined;
  /** Login screen - Allows users to authenticate into the app */
  [NAVIGATION_LOGIN_SCREEN]: undefined;
};

/**
 * Parameter definitions for screens in the Main Stack.
 *
 * The Main Stack contains all primary application screens that are
 * accessible after the user has completed the authentication process.
 *
 * @example
 * // Usage in navigation:
 * navigation.navigate(NAVIGATION_TAB_NAVIGATION);
 * navigation.navigate(NAVIGATION_SETTINGS_SCREEN);
 * navigation.navigate(NAVIGATION_DOG_SCREEN);
 */
export type MainStackParamList = {
  /** Tab Navigation - Container for the main app tabs */
  [NAVIGATION_TAB_NAVIGATION]: undefined;

  /**Other Screens */
  [NAVIGATION_INTRODUCTION_BASE_SCREEN]: undefined;
  [NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN]: undefined;
  [NAVIGATION_SETTINGS_SCREEN]: undefined;
  [NAVIGATION_SETTINGS_LANGUAGE_SCREEN]: undefined;
  [NAVIGATION_DOG_SCREEN]: undefined;
  [NAVIGATION_STYLE_NATIVE_SCREEN]: undefined;
  [NAVIGATION_STYLE_RESTYLE_SCREEN]: undefined;
};

/**
 * Combined type for all navigation stacks in the application.
 *
 * AppStackParamList is a union type of AuthStackParamList and MainStackParamList,
 * allowing navigation to any screen throughout the entire application.
 *
 * This type is used by:
 * - Navigation helpers to ensure type safety
 * - Navigation container to define the root navigator
 * - Screen components to type-check navigation props
 *
 * @example
 * // Usage in navigation helper:
 * export const navigateToScreenHelper = <T extends keyof AppStackParamList>(
 *   screenName: T,
 *   params?: AppStackParamList[T]
 * ) => { ... }
 */
export type AppStackParamList = AuthStackParamList & MainStackParamList;

/**
 * Type definition for the Settings Screen route prop.
 *
 * Used in the Settings Screen component to type-check
 * route parameters and navigation props.
 * @example
 * // Usage with useRoute hook:
 * const route = useRoute<SettingsScreenRouteProp>();
 * // route.params will be type-safe
 *
 * @example
 * // Usage in Settings Screen:
 * interface SettingsScreenProps {
 *   route: SettingsScreenRouteProp;
 *   navigation: NavigationProp<AppStackParamList, 'NAVIGATION_SETTINGS_SCREEN'>;
 * }
 *
 * const SettingsScreen: React.FC<SettingsScreenProps> = ({ route, navigation }) => {
 *   // route.params will have type safety
 *   return <View>...</View>;
 * };
 */
export type SettingsScreenRouteProp = RouteProp<
  AppStackParamList,
  "NAVIGATION_SETTINGS_SCREEN"
>;
