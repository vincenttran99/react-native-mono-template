import { RouteProp } from "@react-navigation/native";
import {
  NAVIGATION_DETAIL_RIDE_SCREEN,
  NAVIGATION_LIST_NOTIFICATIONS_SCREEN,
  NAVIGATION_STATISTIC_RIDE_SCREEN,
  NAVIGATION_VERIFY_OTP_SCREEN,
  NAVIGATION_WEB_VIEW_SCREEN,
} from "constants/navigation.constant";
import DetailRideScreen from "screens/ride/detail.ride.screen";
import StatisticRideScreen from "screens/ride/statistic.ride.screen";

export type RootStackParamList = {
  [NAVIGATION_LIST_NOTIFICATIONS_SCREEN]: { title: string; category: string };
  [NAVIGATION_WEB_VIEW_SCREEN]: { link: string };
  [NAVIGATION_VERIFY_OTP_SCREEN]: { phone_number: string };
  [NAVIGATION_DETAIL_RIDE_SCREEN]: { ride: any };
  [NAVIGATION_STATISTIC_RIDE_SCREEN]: { ride: any };
};

export type VerifyOTPRegisterScreenRouteProp = RouteProp<
  RootStackParamList,
  "NAVIGATION_VERIFY_OTP_SCREEN"
>;
export type ListNotificationsScreenRouteProp = RouteProp<
  RootStackParamList,
  "NAVIGATION_LIST_NOTIFICATIONS_SCREEN"
>;
export type WebviewScreenRouteProp = RouteProp<
  RootStackParamList,
  "NAVIGATION_WEB_VIEW_SCREEN"
>;
export type DetailRideScreenRouteProp = RouteProp<
  RootStackParamList,
  "NAVIGATION_DETAIL_RIDE_SCREEN"
>;
export type StatisticRideScreenRouteProp = RouteProp<
  RootStackParamList,
  "NAVIGATION_STATISTIC_RIDE_SCREEN"
>;
