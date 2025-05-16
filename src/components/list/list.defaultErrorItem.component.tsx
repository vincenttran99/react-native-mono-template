import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BText from "components/base/base.text";
import BView from "components/base/base.view";
import { memo } from "react";
import isEqual from "react-fast-compare";

const ListDefaultErrorItemComponent = memo(
  ({ horizontal }: { horizontal?: boolean | null }) => {
    const { _ } = useLingui();
    return (
      <BView
        width={horizontal ? undefined : "100%"}
        height={horizontal ? "100%" : undefined}
        justifyContent="center"
        alignItems="center"
        gap="lg"
        padding="md"
        borderRadius="md"
        borderWidth={1}
        borderColor="error"
      >
        <BText
          variant={"md"}
          fontWeight={"600"}
          color="error"
          textAlign="center"
        >
          {_(msg`Lỗi khi tải thêm`)}
        </BText>
      </BView>
    );
  },
  isEqual
);

export default ListDefaultErrorItemComponent;
