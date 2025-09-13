import { StyleSheet, ViewProps } from "react-native";
import { memo, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DEVICE } from "@/constants/system.constant";
import BSurface from "@/components/base/base.surface";

interface TAppbarComponentProps extends ViewProps {}

function AppbarComponent({ style, ...props }: TAppbarComponentProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = useMemo(() => {
    let paddingTop = insets.top * (DEVICE.isIos || DEVICE.isTablet ? 1 : 1.3);
    return {
      paddingTop: paddingTop,
      height: paddingTop + DEVICE.heightAppBar,
    };
  }, [insets.top]);

  return (
    <BSurface
      variant="xs"
      backgroundColor="background"
      gap="xxxs"
      paddingHorizontal="xxs"
      alignItems={"center"}
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
