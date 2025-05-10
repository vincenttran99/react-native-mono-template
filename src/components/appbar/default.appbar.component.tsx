import { StyleSheet } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import BIconButton from "components/base/iconButton.base";
import BView from "components/base/view.base";
import BText from "components/base/text.base";
import { Device } from "constants/device.constant";
import { mhs } from "helpers/system.helper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useMemo } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const DefaultAppbarComponent = memo(
  ({ navigation, route, options, back }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    //@ts-ignore
    const headerNavigationIcons = route.params?.headerNavigationIcons || [];
    const insets = useSafeAreaInsets();
    const paddingTop = useMemo(() => {
      let paddingTop = insets.top;
      return {
        paddingTop: paddingTop,
        height: paddingTop + Device.heightAppBar,
      };
    }, [insets.top]);

    return (
      <BView
        backgroundColor="background"
        gap="xxxs"
        paddingHorizontal="xxs"
        paddingVertical="xxs"
        style={[paddingTop, styles.container]}
      >
        {back ? (
          <BIconButton icon={"arrow-left"} onPress={navigation.goBack} />
        ) : null}
        <BText fontWeight="700" flex={1} variant="xl">
          {title}
        </BText>
        {headerNavigationIcons?.map(({ icon, screen }: any) => (
          <BIconButton
            key={screen}
            icon={icon}
            onPress={() => navigation.navigate(screen)}
          />
        ))}
      </BView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DefaultAppbarComponent;
