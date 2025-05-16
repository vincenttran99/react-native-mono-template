import { useEffect } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigation } from "@react-navigation/native";

/**
 * Extend dayjs with the isBetween plugin
 * This allows using date range comparison functionality
 */
dayjs.extend(isBetween);

/**
 * Custom hook to prevent screen removal (navigation away) without confirmation
 * 
 * This hook intercepts navigation actions and allows custom logic to determine
 * if navigation should proceed. Useful for forms with unsaved changes or
 * critical processes that shouldn't be interrupted.
 * 
 * Note: For proper gesture handling, use options={{gestureEnabled: false}}
 * when defining the screen in the navigator to prevent gesture-based navigation.
 * 
 * @param preventBackOnly - When true, only back navigation is intercepted. When false, all navigation is intercepted.
 * @param confirmNavigationCallback - Async function that returns a boolean indicating if navigation should proceed
 * @returns void
 * 
 * @example
 * // Basic usage to prevent accidental back navigation
 * useNavigationGuard(true, async () => {
 *   // Show confirmation dialog
 *   const userConfirmed = await showConfirmDialog('Discard changes?');
 *   return userConfirmed;
 * });
 */
export function useNavigationGuard(
  preventBackOnly: boolean = true,
  confirmNavigationCallback?: () => Promise<boolean>
) {
  const navigation = useNavigation();
  
  useEffect(() => {
    // Add listener for the beforeRemove event which fires when screen is about to be removed from the stack
    const unsubscribe = navigation.addListener("beforeRemove", async (event) => {
      // Handle back navigation specifically if preventBackOnly is true
      if (preventBackOnly && event.data.action.type === "GO_BACK") {
        // Prevent the default navigation behavior
        event.preventDefault();
        
        // If a confirmation callback is provided, execute it
        if (typeof confirmNavigationCallback === "function") {
          // Get user confirmation result
          const shouldProceedWithNavigation = await confirmNavigationCallback();
          
          // If confirmed, manually dispatch the navigation action
          if (shouldProceedWithNavigation) {
            navigation.dispatch(event.data.action);
          }
        }
      }
      // Handle all navigation types if preventBackOnly is false
      else if (!preventBackOnly) {
        // Prevent the default navigation behavior
        event.preventDefault();
        
        // If a confirmation callback is provided, execute it
        if (typeof confirmNavigationCallback === "function") {
          // Get user confirmation result
          const shouldProceedWithNavigation = await confirmNavigationCallback();
          
          // If confirmed, manually dispatch the navigation action
          if (shouldProceedWithNavigation) {
            navigation.dispatch(event.data.action);
          }
        }
      }
    });
    
    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation, preventBackOnly, confirmNavigationCallback]);
}
