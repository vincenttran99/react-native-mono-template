import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BIcon from "components/base/base.icon";
import BText from "components/base/base.text";
import BView from "components/base/base.view";
import { DEVICE } from "constants/system.constant";
import { MHS } from "constants/sizes.constant";
import { memo } from "react";
import isEqual from "react-fast-compare";

const ListDefaultErrorComponent = memo(
  ({ horizontal }: { horizontal?: boolean | null }) => {
    const { _ } = useLingui();
    return (
      <BView
        width={horizontal ? DEVICE.width : "100%"}
        height={horizontal ? "100%" : undefined}
        aspectRatio={horizontal ? undefined : 1}
        justifyContent="center"
        alignItems="center"
        gap="lg"
      >
        <BIcon name={"alert-box"} color="error" size={MHS._80} />
        <BText
          variant={"xl"}
          fontWeight={"bold"}
          color="error"
          textAlign="center"
        >
          {_(msg`Something went wrong`)}
        </BText>
      </BView>
    );
  },
  isEqual
);

export default ListDefaultErrorComponent;
