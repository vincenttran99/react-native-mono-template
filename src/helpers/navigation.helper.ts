import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
  StackActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigateNavHelper = (screenName: string, params?: object) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(screenName, params);
  }
};

export const resetNavHelper = (
  params: PartialState<NavigationState> | NavigationState
) => {
  if (navigationRef.isReady()) {
    navigationRef.reset(params);
  }
};

export const pushNavHelper = (screenName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(screenName, params));
  }
};

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

export const popNavHelper = (numOfStack: number = 1) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(numOfStack));
  }
};

export const goBackNavHelper = () => {
  if (navigationRef.isReady()) {
    try {
      // @ts-ignore
      navigationRef.goBack();
    } catch (error) {}
  }
};

export const canGoBackNavHelper = () => {
  return navigationRef.canGoBack();
};

export const getRouteNameNavHelper = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return "";
};

export const getActiveRouteNameNavHelper = (state: any): any => {
  const route = state?.routes?.[state.index];

  if (route?.state) {
    // Dive into nested navigators
    return getActiveRouteNameNavHelper(route.state);
  }

  return route?.name;
};

export const replaceNavHelper = (screenName: string, params?: object) => {
  if (navigationRef.isReady() && getRouteNameNavHelper() !== screenName) {
    navigationRef.dispatch(StackActions.replace(screenName, params));
  }
};
