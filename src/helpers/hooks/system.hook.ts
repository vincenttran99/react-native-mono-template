import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigation } from "@react-navigation/native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { BaseTheme, useTheme } from "@shopify/restyle";

/**
 * Extend dayjs with the isBetween plugin
 * This allows using date range comparison functionality
 */
dayjs.extend(isBetween);

/**
 * A custom hook that provides access to the current theme and generates styles based on that theme
 *
 * This hook combines the Shopify/restyle useTheme hook with React's useMemo to:
 * 1. Access the current theme from the theme context
 * 2. Generate styles using the provided style creation function
 * 3. Memoize the generated styles to prevent unnecessary recalculations
 *
 * @param createStyle - Optional function that takes the current theme and returns styles
 * @returns An object containing:
 *          - styles: The generated styles object (or empty object if no createStyle function provided)
 *          - theme: The current theme object from the theme context
 *
 * @example
 * const { styles, theme } = useSystemTheme((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md
 *   }
 * }));
 */

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export function useSystemTheme<T extends NamedStyles<T> | NamedStyles<any>>(
  createStyle?: (theme: BaseTheme) => T
): {
  styles: T;
  theme: BaseTheme;
} {
  const theme = useTheme();
  const styles = useMemo(() => {
    return createStyle?.(theme) || ({} as T);
  }, [theme]);

  return { theme, styles };
}

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
    const unsubscribe = navigation.addListener(
      "beforeRemove",
      async (event) => {
        // Handle back navigation specifically if preventBackOnly is true
        if (preventBackOnly && event.data.action.type === "GO_BACK") {
          // Prevent the default navigation behavior
          event.preventDefault();

          // If a confirmation callback is provided, execute it
          if (typeof confirmNavigationCallback === "function") {
            // Get user confirmation result
            const shouldProceedWithNavigation =
              await confirmNavigationCallback();

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
            const shouldProceedWithNavigation =
              await confirmNavigationCallback();

            // If confirmed, manually dispatch the navigation action
            if (shouldProceedWithNavigation) {
              navigation.dispatch(event.data.action);
            }
          }
        }
      }
    );

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation, preventBackOnly, confirmNavigationCallback]);
}
