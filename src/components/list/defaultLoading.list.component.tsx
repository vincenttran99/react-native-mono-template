import BView from "components/base/view.base";
import { Device } from "constants/device.constant";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { ActivityIndicator } from "react-native";

const DefaultLoadingListComponent = memo(
  ({ horizontal }: { horizontal?: boolean | null }) => {
    return (
      <BView
        width={horizontal ? Device.width : "100%"}
        height={horizontal ? "100%" : undefined}
        aspectRatio={horizontal ? undefined : 1}
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size={"large"} />
      </BView>
    );
  },
  isEqual
);

export default DefaultLoadingListComponent;
