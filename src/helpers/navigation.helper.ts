import { AppStackParamList } from "@/models/navigation.model";
import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
  StackActions,
} from "@react-navigation/native";

/**
 * Global navigation reference that allows navigation outside of React components
 * This reference must be attached to the NavigationContainer component in the app's root
 *
 * @example
 * // In App.tsx or navigation setup file:
 * <NavigationContainer ref={navigationRef}>
 *   ...
 * </NavigationContainer>
 */
export const navigationRef = createNavigationContainerRef<AppStackParamList>();

/**
 * Navigates to a specified screen with optional parameters.
 * Uses type-safe navigation with proper parameter validation.
 * If already on the target screen, it won't add a new entry to the navigation history.
 *
 * @template T - Screen name type that extends keyof AppStackParamList
 * @param screenName - Name of the target screen to navigate to
 * @param params - Optional parameters object to pass data to the target screen
 *
 * @example
 * // Navigate to Home screen with user ID
 * navigateToScreenHelper('Home', { userId: 123 });
 *
 * // Navigate to Profile screen without params
 * navigateToScreenHelper('Profile');
 */
export const navigateToScreenHelper = <T extends keyof AppStackParamList>(
  screenName: T,
  ...args: AppStackParamList[T] extends undefined
    ? [params?: undefined]
    : [params: AppStackParamList[T]]
) => {
  if (navigationRef.isReady()) {
    const [params] = args;
    (navigationRef as any).navigate(screenName, params);
  }
};

/**
 * Resets the navigation state to a new state with type safety.
 * Useful for scenarios like authentication where you want to clear the stack.
 * Completely replaces the current navigation state.
 *
 * @param state - The new navigation state to set, must be valid NavigationState or PartialState
 *
 * @example
 * // Reset to a single screen
 * resetNavigationHelper({
 *   index: 0,
 *   routes: [{ name: 'Home' }]
 * });
 *
 * // Reset to authentication flow
 * resetNavigationHelper({
 *   index: 0,
 *   routes: [{ name: 'NAVIGATION_LOGIN_SCREEN' }]
 * });
 */
export const resetNavigationHelper = (
  state: PartialState<NavigationState> | NavigationState
): void => {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
};

/**
 * Pushes a new screen onto the stack with type-safe screen name validation.
 * Unlike navigate, this always adds the screen to the stack even if it's already in the history.
 * Useful when you need multiple instances of the same screen in the stack.
 *
 * @template T - Screen name type that extends keyof AppStackParamList
 * @param screenName - The name of the screen to push
 * @param params - Optional parameters to pass to the screen
 *
 * @example
 * // Push ProductDetails screen with product ID
 * pushToScreenHelper('ProductDetails', { productId: 456 });
 *
 * // Push screen without parameters
 * pushToScreenHelper('Settings');
 */
export const pushToScreenHelper = <T extends keyof AppStackParamList>(
  screenName: T,
  ...args: AppStackParamList[T] extends undefined
    ? [params?: undefined]
    : [params: AppStackParamList[T]]
): void => {
  if (navigationRef.isReady()) {
    const [params] = args;
    navigationRef.dispatch(StackActions.push(screenName as string, params));
  }
};

/**
 * Pushes a new screen onto the stack after a specified timeout with type safety.
 * Useful for delaying navigation after animations, API calls, or other asynchronous operations.
 * Provides better UX by allowing smooth transitions.
 *
 * @template T - Screen name type that extends keyof AppStackParamList
 * @param screenName - The name of the screen to push
 * @param params - Optional parameters to pass to the screen
 * @param timeOut - Delay in milliseconds before navigation occurs (default: 0)
 *
 * @example
 * // Push Success screen after 500ms delay
 * pushToScreenWithTimeoutHelper('Success', { message: 'Operation completed' }, 500);
 *
 * // Push screen immediately (same as pushToScreenHelper)
 * pushToScreenWithTimeoutHelper('Profile', undefined, 0);
 */
export const pushToScreenWithTimeoutHelper = <
  T extends keyof AppStackParamList
>(
  screenName: T,
  timeOut: number = 0,
  ...args: AppStackParamList[T] extends undefined
    ? [params?: undefined]
    : [params: AppStackParamList[T]]
): void => {
  if (navigationRef.isReady()) {
    const [params] = args;
    setTimeout(
      () =>
        navigationRef.dispatch(StackActions.push(screenName as string, params)),
      timeOut
    );
  }
};

/**
 * Removes screens from the navigation stack by popping them.
 * Pops the specified number of screens from the stack.
 * Useful for going back multiple screens at once.
 *
 * @param stackCount - Number of screens to pop from the stack (default: 1, minimum: 1)
 *
 * @example
 * // Pop back one screen (same as goBack)
 * popToScreenHelper();
 *
 * // Pop back two screens
 * popToScreenHelper(2);
 *
 * // Pop back to root (pop all screens except the first one)
 * popToScreenHelper(navigationRef.getRootState().routes.length - 1);
 */
export const popToScreenHelper = (stackCount: number = 1): void => {
  if (navigationRef.isReady() && stackCount > 0) {
    navigationRef.dispatch(StackActions.pop(stackCount));
  }
};

/**
 * Navigates back to the previous screen safely.
 * Handles cases where going back is not possible gracefully.
 * Preferred method for simple back navigation.
 *
 * @returns void
 *
 * @example
 * // Simple back navigation
 * goBackHelper();
 *
 * // Use with canGoBack check for safety
 * if (canGoBackHelper()) {
 *   goBackHelper();
 * }
 */
export const goBackHelper = (): void => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    try {
      navigationRef.goBack();
    } catch (error) {
      // Silently handle errors when navigation fails
      console.warn("Navigation goBack failed:", error);
    }
  }
};

/**
 * Checks if navigation can go back from the current screen.
 * Returns true if there are screens to go back to, false otherwise.
 * Essential for conditional back navigation logic.
 *
 * @returns Boolean indicating if going back is possible
 *
 * @example
 * // Conditional back navigation
 * if (canGoBackHelper()) {
 *   // Safe to go back
 *   goBackHelper();
 * } else {
 *   // Handle case where we can't go back (e.g., exit app or show confirmation)
 *   Alert.alert('Exit App', 'Do you want to exit?');
 * }
 *
 * // Use in UI components
 * const showBackButton = canGoBackHelper();
 */
export const canGoBackHelper = (): boolean => {
  return navigationRef.isReady() && navigationRef.canGoBack();
};

/**
 * Gets the name of the current route/screen with type safety.
 * Returns the current screen name or undefined if navigation is not ready.
 * Useful for conditional logic based on current screen.
 *
 * @returns The name of the current route or undefined
 *
 * @example
 * // Check current screen
 * const currentScreen = getRouteNameHelper();
 * if (currentScreen === 'NAVIGATION_HOME_SCREEN') {
 *   // We're on the home screen
 *   console.log('User is on home screen');
 * }
 *
 * // Use for analytics or tracking
 * const screenName = getRouteNameHelper();
 * if (screenName) {
 *   analytics.track('screen_view', { screen: screenName });
 * }
 */
export const getRouteNameHelper = (): keyof AppStackParamList | undefined => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name as keyof AppStackParamList;
  }
  return undefined;
};

/**
 * Gets the name of the active route in nested navigators with improved type safety.
 * Recursively traverses the navigation state to find the deepest active route.
 * Essential for complex navigation structures with nested navigators.
 *
 * @param state - The navigation state to analyze (NavigationState or any for flexibility)
 * @returns The name of the deepest active route or undefined
 *
 * @example
 * // In a navigation state change handler:
 * const onStateChange = (state: NavigationState | undefined) => {
 *   if (state) {
 *     const activeRouteName = getActiveRouteNameHelper(state);
 *     if (activeRouteName) {
 *       // Track screen view, analytics, etc.
 *       console.log('Active screen:', activeRouteName);
 *     }
 *   }
 * };
 *
 * // Use with navigation container
 * <NavigationContainer
 *   ref={navigationRef}
 *   onStateChange={onStateChange}
 * >
 */
export const getActiveRouteNameHelper = (
  state: NavigationState | any
): string | undefined => {
  if (!state || !state.routes || !Array.isArray(state.routes)) {
    return undefined;
  }

  const route = state.routes[state.index];
  if (!route) {
    return undefined;
  }

  // If route has nested state, dive deeper
  if (route.state) {
    return getActiveRouteNameHelper(route.state);
  }

  return route.name;
};

/**
 * Replaces the current screen with a new one using type-safe navigation.
 * Only performs the replacement if the target screen is different from the current one.
 * Useful for updating the current screen without adding to navigation history.
 *
 * @template T - Screen name type that extends keyof AppStackParamList
 * @param screenName - The name of the screen to replace with
 * @param params - Optional parameters to pass to the screen
 *
 * @example
 * // Replace current screen with updated profile
 * replaceScreenHelper('NAVIGATION_PROFILE_SCREEN', { refreshed: true });
 *
 * // Replace with screen without parameters
 * replaceScreenHelper('NAVIGATION_HOME_SCREEN');
 *
 * // Conditional replacement
 * if (getRouteNameHelper() !== 'NAVIGATION_SUCCESS_SCREEN') {
 *   replaceScreenHelper('NAVIGATION_SUCCESS_SCREEN', { data: result });
 * }
 */
export const replaceScreenHelper = <T extends keyof AppStackParamList>(
  screenName: T,
  ...args: AppStackParamList[T] extends undefined
    ? [params?: undefined]
    : [params: AppStackParamList[T]]
): void => {
  if (navigationRef.isReady() && getRouteNameHelper() !== screenName) {
    const [params] = args;
    navigationRef.dispatch(StackActions.replace(screenName as string, params));
  }
};
