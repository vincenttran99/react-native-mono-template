import { useEffect } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigation } from "@react-navigation/native";

dayjs.extend(isBetween);

/**
 * Note: use options={{gestureEnabled: false}}
 * @param isOnlyBack
 * @param onRemoveHandle
 */
export function usePreventRemoveScreen(
  isOnlyBack: boolean = true,
  onRemoveHandle?: () => Promise<boolean>
) {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", async (e) => {
      if (isOnlyBack && e.data.action.type === "GO_BACK") {
        e.preventDefault();
        if (typeof onRemoveHandle === "function") {
          let allowBack = await onRemoveHandle();
          if (allowBack) {
            navigation.dispatch(e.data.action);
          }
        }
      }

      if (!isOnlyBack) {
        e.preventDefault();
        if (typeof onRemoveHandle === "function") {
          let allowBack = await onRemoveHandle();
          if (allowBack) {
            navigation.dispatch(e.data.action);
          }
        }
      }
    });
  }, [navigation, isOnlyBack]);
}
