import { StyleSheet, ViewProps } from "react-native";
import { memo, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Device } from "constants/device.constant";
import BSurface from "components/base/base.surface";

interface TAppbarComponentProps extends ViewProps {}

function AppbarComponent({ style, ...props }: TAppbarComponentProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = useMemo(() => {
    let paddingTop = insets.top;
    return {
      paddingTop: paddingTop,
      height: paddingTop + Device.heightAppBar,
    };
  }, [insets.top]);

  return (
    <BSurface
      variant="xs"
      backgroundColor="background"
      gap="xxxs"
      paddingHorizontal="xxs"
      paddingBottom="xxs"
      style={[paddingTop, styles.container, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(AppbarComponent);
