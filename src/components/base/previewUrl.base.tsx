import { memo, useEffect, useState } from "react";
import { useMemo } from "react";
import { Linking } from "react-native";

import { getPreviewDataHelper, PreviewData } from "helpers/web.helper";
import BText, { BTextProps } from "components/base/text.base";
import BImage, { TBImageProps } from "components/base/image.base";
import { renderSpecialElementHelper } from "helpers/system.helper";
import BPressable, { BPressableProps } from "./pressable.base";

enum EBPreviewUrl {
  Title = "BPreviewUrl.Title",
  Description = "BPreviewUrl.Description",
  Image = "BPreviewUrl.Image",
}

export interface IBPreviewUrlComponentProps extends BPressableProps {
  onPreviewDataFetched?: (previewData: PreviewData) => void;
  previewData?: PreviewData;
  requestTimeout?: number;
  url: string;
}

const BPreviewUrlComponent = memo(
  ({
    onPreviewDataFetched,
    previewData,
    requestTimeout = 5000,
    url,
    children,
    ...props
  }: IBPreviewUrlComponentProps) => {
    const [data, setData] = useState(previewData);

    useEffect(() => {
      let isCancelled = false;
      if (previewData) {
        setData(previewData);
        return;
      }

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
    }, [onPreviewDataFetched, previewData, requestTimeout, url]);

    const handlePress = () =>
      data?.link &&
      Linking.openURL(data.link).catch(() => console.log("ljafn"));

    const ContentPreview = useMemo(
      () =>
        renderSpecialElementHelper({
          children: children,
          props: {
            [EBPreviewUrl.Title]: { children: data?.title || "" },
            [EBPreviewUrl.Description]: { children: data?.description || "" },
            [EBPreviewUrl.Image]: { source: data?.image || "" },
          },
        }),
      [data, children]
    );

    return (
      <BPressable onPress={handlePress} {...props}>
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
Title.displayName = EBPreviewUrl.Title;

const Description = ({
  children,
  placeholder,
  ...props
}: BTextProps & { placeholder?: string }) => (
  <BText children={children || placeholder || ""} {...props} />
);
Description.displayName = EBPreviewUrl.Description;

const Image = (props: TBImageProps) => <BImage {...props} />;
Image.displayName = EBPreviewUrl.Image;

const BPreviewUrl = Object.assign(BPreviewUrlComponent, {
  Title: Title,
  Description: Description,
  Image: Image,
});

export default BPreviewUrl;
