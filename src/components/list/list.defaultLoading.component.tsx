import BView from "components/base/base.view";
import { Device } from "constants/device.constant";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { ActivityIndicator } from "react-native";

const ListDefaultLoadingComponent = memo(
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

export default ListDefaultLoadingComponent;
