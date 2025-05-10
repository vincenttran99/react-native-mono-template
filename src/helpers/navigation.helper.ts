import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
  StackActions,
} from "@react-navigation/native";
import { NAVIGATION_WEB_VIEW_SCREEN } from "constants/navigation.constant";
import { parseJSONHelper } from "./object.helper";

export let TIMESTAMP_LAST_SCREEN_OPENING = 0;

export const navigationRef = createNavigationContainerRef();

// @ts-ignore
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

/**
 * Variable to store the timestamp of screen opening
 */
export function updateTimestampLastScreenOpeningNavHepler() {
  TIMESTAMP_LAST_SCREEN_OPENING = new Date().getTime();
}

export async function handleNavHelper({
  screen,
  param,
  timeOut = 500,
}: {
  screen: string;
  param: any;
  timeOut?: number;
}) {
  try {
    switch (screen) {
      case "NAVIGATION_OPEN_EXTERNAL_LINK": {
        pushWithTimeoutNavHelper(
          NAVIGATION_WEB_VIEW_SCREEN,
          { link: param },
          timeOut
        );
        break;
      }
      default: {
        if (
          navigationRef
            .getRootState()
            ?.routes?.[0]?.state?.routeNames?.includes(screen)
        ) {
          pushWithTimeoutNavHelper(screen, parseJSONHelper(param), timeOut);
        }
      }
    }
  } catch (error: any) {
    console.log(error, "handleNavigation");
  }
}
