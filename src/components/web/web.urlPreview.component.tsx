import { memo, useEffect, useState } from "react";
import { useMemo } from "react";
import { GestureResponderEvent, Linking } from "react-native";

import { getPreviewDataHelper, PreviewData } from "@/helpers/web.helper";
import BText, { BTextProps } from "@/components/base/base.text";
import BImage, { BImageProps } from "@/components/base/base.image";
import { renderSpecialElementHelper } from "@/helpers/system.helper";
import BPressable, { BPressableProps } from "../base/base.pressable";

enum EUrlBPreview {
  Title = "BUrlPreview.Title",
  Description = "BUrlPreview.Description",
  Image = "BUrlPreview.Image",
}

export interface BWebUrlPreviewComponentProps
  extends Omit<BPressableProps, "onPress"> {
  onPreviewDataFetched?: (previewData: PreviewData) => void;
  onPress?: (
    data: PreviewData | undefined,
    event: GestureResponderEvent
  ) => void;
  requestTimeout?: number;
  url: string;
}

const BWebUrlPreview = memo(
  ({
    onPreviewDataFetched,
    requestTimeout = 5000,
    url,
    children,
    ...props
  }: BWebUrlPreviewComponentProps) => {
    const [data, setData] = useState<PreviewData>();

    useEffect(() => {
      let isCancelled = false;

      const fetchData = async () => {
        setData(undefined);
        const newData = await getPreviewDataHelper(url, requestTimeout);
        // Set data only if component is still mounted
        /* istanbul ignore next */
        if (!isCancelled) {
          // No need to cover LayoutAnimation
          /* istanbul ignore next */
          setData(newData);
          onPreviewDataFetched?.(newData);
        }
      };

      fetchData();
      return () => {
        isCancelled = true;
      };
    }, [onPreviewDataFetched, requestTimeout, url]);

    const handlePress = (event: GestureResponderEvent) => {
      if (typeof props.onPress === "function") {
        props.onPress(data, event);
      } else {
        if (data?.link)
          Linking.openURL(data.link).catch(() => console.log("ljafn"));
      }
    };

    const ContentPreview = useMemo(
      () =>
        renderSpecialElementHelper({
          children: children,
          props: {
            [EUrlBPreview.Title]: { children: data?.title || "" },
            [EUrlBPreview.Description]: { children: data?.description || "" },
            [EUrlBPreview.Image]: { source: data?.image || "" },
          },
        }),
      [data, children]
    );

    return (
      <BPressable {...props} onPress={handlePress}>
        {ContentPreview}
      </BPressable>
    );
  }
);

const Title = ({
  children,
  placeholder,
  ...props
}: BTextProps & { placeholder?: string }) => (
  <BText children={children || placeholder || ""} {...props} />
);
Title.displayName = EUrlBPreview.Title;

const Description = ({
  children,
  placeholder,
  ...props
}: BTextProps & { placeholder?: string }) => (
  <BText children={children || placeholder || ""} {...props} />
);
Description.displayName = EUrlBPreview.Description;

const Image = (props: BImageProps) => <BImage {...props} />;
Image.displayName = EUrlBPreview.Image;

const BWebUrlPreviewComponent = Object.assign(BWebUrlPreview, {
  Title: Title,
  Description: Description,
  Image: Image,
});

export default BWebUrlPreviewComponent;
