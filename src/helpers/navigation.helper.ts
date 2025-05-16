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
export const navigationRef = createNavigationContainerRef();

/**
 * Navigates to a specified screen with optional parameters
 * Uses the navigate method which doesn't add to history if already on that screen
 *
 * @param screenName - The name of the screen to navigate to
 * @param params - Optional parameters to pass to the screen
 *
 * @example
 * navigateNavHelper('Home', { userId: 123 });
 */
export const navigateNavHelper = (screenName: string, params?: object) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(screenName, params);
  }
};

/**
 * Resets the navigation state to a new state
 * Useful for scenarios like authentication where you want to clear the stack
 *
 * @param params - The new navigation state to set
 *
 * @example
 * // Reset to a single screen
 * resetNavHelper({
 *   index: 0,
 *   routes: [{ name: 'Home' }]
 * });
 */
export const resetNavHelper = (
  params: PartialState<NavigationState> | NavigationState
) => {
  if (navigationRef.isReady()) {
    navigationRef.reset(params);
  }
};

/**
 * Pushes a new screen onto the stack
 * Unlike navigate, this always adds the screen to the stack even if it's already in the history
 *
 * @param screenName - The name of the screen to push
 * @param params - Optional parameters to pass to the screen
 *
 * @example
 * pushNavHelper('ProductDetails', { productId: 456 });
 */
export const pushNavHelper = (screenName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(screenName, params));
  }
};

/**
 * Pushes a new screen onto the stack after a specified timeout
 * Useful for delaying navigation after animations or other operations
 *
 * @param screenName - The name of the screen to push
 * @param params - Optional parameters to pass to the screen
 * @param timeOut - Delay in milliseconds before navigation occurs (default: 0)
 *
 * @example
 * pushWithTimeoutNavHelper('Success', { message: 'Operation completed' }, 500);
 */
export const pushWithTimeoutNavHelper = (
  screenName: string,
  params?: object,
  timeOut: number = 0
) => {
  if (navigationRef.isReady()) {
    setTimeout(
      () => navigationRef.dispatch(StackActions.push(screenName, params)),
      timeOut
    );
  }
};

/**
 * Removes screens from the navigation stack
 * Pops the specified number of screens from the stack
 *
 * @param stackCount - Number of screens to pop (default: 1)
 *
 * @example
 * // Pop back two screens
 * popNavHelper(2);
 */
export const popNavHelper = (stackCount: number = 1) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(stackCount));
  }
};

/**
 * Navigates back to the previous screen
 * Safely handles cases where going back is not possible
 *
 * @example
 * goBackNavHelper();
 */
export const goBackNavHelper = () => {
  if (navigationRef.isReady()) {
    try {
      // @ts-ignore
      navigationRef.goBack();
    } catch (error) {
      // Silently handle errors when we can't go back
    }
  }
};

/**
 * Checks if navigation can go back from the current screen
 * Returns true if there are screens to go back to, false otherwise
 *
 * @returns Boolean indicating if going back is possible
 *
 * @example
 * if (canGoBackNavHelper()) {
 *   // Safe to go back
 *   goBackNavHelper();
 * } else {
 *   // Handle case where we can't go back
 * }
 */
export const canGoBackNavHelper = () => {
  return navigationRef.canGoBack();
};

/**
 * Gets the name of the current route/screen
 * Returns empty string if navigation is not ready
 *
 * @returns The name of the current route or empty string
 *
 * @example
 * const currentScreen = getRouteNameNavHelper();
 * if (currentScreen === 'Home') {
 *   // We're on the home screen
 * }
 */
export const getRouteNameNavHelper = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return "";
};

/**
 * Gets the name of the active route in nested navigators
 * Recursively traverses the navigation state to find the deepest active route
 *
 * @param state - The navigation state to analyze
 * @returns The name of the deepest active route
 *
 * @example
 * // In a navigation state change handler:
 * const onStateChange = (state) => {
 *   const activeRouteName = getActiveRouteNameNavHelper(state);
 *   // Track screen view, analytics, etc.
 * }
 */
export const getActiveRouteNameNavHelper = (state: any): any => {
  const route = state?.routes?.[state.index];

  if (route?.state) {
    // Dive into nested navigators
    return getActiveRouteNameNavHelper(route.state);
  }

  return route?.name;
};

/**
 * Replaces the current screen with a new one
 * Only performs the replacement if the target screen is different from the current one
 *
 * @param screenName - The name of the screen to replace with
 * @param params - Optional parameters to pass to the screen
 *
 * @example
 * replaceNavHelper('UpdatedProfile', { refreshed: true });
 */
export const replaceNavHelper = (screenName: string, params?: object) => {
  if (navigationRef.isReady() && getRouteNameNavHelper() !== screenName) {
    navigationRef.dispatch(StackActions.replace(screenName, params));
  }
};
