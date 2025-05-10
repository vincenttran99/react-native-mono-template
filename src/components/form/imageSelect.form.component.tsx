import {
  BottomSheetFlatList,
  BottomSheetModal,
  WINDOW_WIDTH,
} from "@gorhom/bottom-sheet";
import {
  CameraRoll,
  PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll";
import BButton from "components/base/button.base";
import BImage from "components/base/image.base";
import BPressable from "components/base/pressable.base";
import BText from "components/base/text.base";
import { Device } from "constants/device.constant";

import { HIT_SLOP_EXPAND_10, MHS } from "constants/sizes.constant";
import {
  s_itemsCenter,
  s_row_justifyBetween_itemsCenter,
} from "constants/styles.constant";

import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Keyboard, StyleSheet } from "react-native";
import CameraSystemComponent from "components/base/system/camera.system.component";
import { PERMISSION } from "constants/permission.constant";
import { openSettings, RESULTS } from "react-native-permissions";

import { Control, useController } from "react-hook-form";
import { PhotoFile } from "react-native-vision-camera";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";
import BIcon from "components/base/icon.base";
import { useTheme } from "@shopify/restyle";
import { convertPhotoFileToIdentifierHelper } from "helpers/file.helper";
import { requestPermissionHelper } from "helpers/permission.helper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NUMBER_PHOTO_ITEMS: number = Math.round(WINDOW_WIDTH / MHS._140);
const PHOTO_ITEM_WIDTH =
  (WINDOW_WIDTH - (NUMBER_PHOTO_ITEMS - 1) * MHS._2) / NUMBER_PHOTO_ITEMS;

interface IFImageSelectProps {
  control: Control<any>;
  name: string;
  maxImage?: number;
  defaultValue?: PhotoIdentifier[];
  hint?: string;
  handleSelectedPhotos?: (selectedPhotos: PhotoIdentifier[]) => void;
  handleSubmitSelectedPhotos?: (selectedPhotos: PhotoIdentifier[]) => void;
  handlePhotoFromCamera?: (photo: PhotoFile) => void;
}

export interface IFImageSelectRef {
  present: () => void;
  dismiss: () => void;
  deleteItem: (item: PhotoIdentifier | number) => void;
}

const FImageSelect = forwardRef(
  (
    {
      handleSelectedPhotos,
      control,
      name,
      maxImage = 1,
      handleSubmitSelectedPhotos,
      defaultValue = [],
      handlePhotoFromCamera,
      ...props
    }: IFImageSelectProps,
    ref: ForwardedRef<IFImageSelectRef>
  ) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const [loading, setLoading] = useState(false);
    const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
    const bottomSheetCameraModalRef = React.useRef<BottomSheetModal>(null);
    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const { _ } = useLingui();
    const { field, fieldState, formState } = useController({
      control: control,
      defaultValue: defaultValue,
      name,
    });
    const maxImageAvailable = useMemo(
      () =>
        field?.value?.reduce((total: number, item: PhotoIdentifier) => {
          if (item?.node?.type === "camera") {
            total -= 1;
          }
          return total;
        }, 5),
      [field?.value, maxImage]
    );

    useImperativeHandle(ref, () => ({
      present: () => {
        Keyboard.dismiss();
        showModalSelect();
      },
      dismiss: () => {
        bottomSheetModalRef.current?.dismiss();
      },
      deleteItem: (item: PhotoIdentifier | number) => {
        pressPhoto(typeof item === "number" ? field?.value?.[item] : item);
      },
    }));

    const getPhotos = async (after: string | undefined = undefined) => {
      if (loading) return;

      setLoading(true);

      try {
        const photosData = await CameraRoll.getPhotos({
          first: 20,
          assetType: "Photos",
          after: after,
          include: ["filename"],
        });

        if (after) {
          setPhotos((prevPhotos) => [...prevPhotos, ...photosData.edges]);
        } else {
          setPhotos([{ node: { id: "camera" } }, ...photosData.edges]);
        }
        setEndCursor(photosData.page_info.end_cursor);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const loadMorePhotos = () => {
      if (endCursor) {
        getPhotos(endCursor);
      }
    };

    const showCamera = React.useCallback(async () => {
      await bottomSheetCameraModalRef.current?.present();
    }, []);

    const onSaveImagePress = () => {
      handleSubmitSelectedPhotos?.(field?.value || []);
      bottomSheetModalRef.current?.dismiss();
    };

    const pressPhoto = (photo: PhotoIdentifier) => {
      console.log(photo, "photo");
      if (maxImageAvailable > 1) {
        const indexOfPhoto = field?.value?.findIndex(
          (selected: PhotoIdentifier) =>
            selected?.node?.image?.uri === photo?.node?.image?.uri
        );
        if (indexOfPhoto !== -1) {
          let newArr = [...field?.value];
          newArr.splice(indexOfPhoto, 1);
          handleSelectedPhotos?.(newArr);
          field.onChange(newArr);
        } else {
          handleSelectedPhotos?.([...(field?.value || []), photo]);
          field?.onChange([...(field?.value || []), photo]);
        }
      } else {
        handleSelectedPhotos?.([photo]);
        field?.onChange([photo]);
        bottomSheetModalRef.current?.dismiss();
      }
    };

    const onSaveImageCameraPress = (photo: PhotoFile) => {
      handlePhotoFromCamera?.(photo);
      let objectPhotoIdentifier = convertPhotoFileToIdentifierHelper(photo);
      if (objectPhotoIdentifier) {
        handleSubmitSelectedPhotos?.([
          ...(field?.value || []),
          objectPhotoIdentifier,
        ]);
        field?.onChange?.([...(field?.value || []), objectPhotoIdentifier]);
        bottomSheetModalRef.current?.dismiss();
      }
    };

    const renderItem = ({
      item,
      index,
    }: {
      item: PhotoIdentifier;
      index: number;
    }) => {
      if (item?.node?.id === "camera") {
        return (
          <BPressable
            onPress={showCamera}
            style={{
              marginEnd: index + (1 % NUMBER_PHOTO_ITEMS) === 0 ? 0 : MHS._2,
            }}
          >
            <BView style={styles.cameraItem}>
              <BIcon size={MHS._48} name={"camera-outline"} />
            </BView>
          </BPressable>
        );
      }

      const isSelected = field?.value?.some(
        (photo: PhotoIdentifier) =>
          photo?.node?.image?.uri === item?.node?.image?.uri
      );
      const selectedPhotoFromLibrary = field?.value?.filter(
        (photo: PhotoIdentifier) => photo?.node?.type !== "camera"
      );
      const selectedIndex = isSelected
        ? selectedPhotoFromLibrary.findIndex(
            (photo: PhotoIdentifier) =>
              photo?.node?.image?.uri === item?.node?.image?.uri
          ) + 1
        : null;
      return (
        <BPressable
          onPress={() => pressPhoto(item)}
          disabled={
            selectedPhotoFromLibrary?.length >= maxImageAvailable && !isSelected
          }
          style={{
            marginEnd: index + (1 % NUMBER_PHOTO_ITEMS) === 0 ? 0 : MHS._2,
          }}
        >
          <BImage
            width={PHOTO_ITEM_WIDTH}
            source={{ uri: item?.node?.image?.uri }}
          />

          {maxImageAvailable > 1 &&
            (selectedPhotoFromLibrary?.length < maxImageAvailable ||
              isSelected) && (
              <BView
                style={[
                  styles.selectedOverlay,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.reverse,
                  },
                ]}
              >
                <BView style={styles.circle}>
                  <BText
                    fontWeight={"600"}
                    variant={"md"}
                    // color={MD3Colors.tertiary100}
                  >
                    {selectedIndex}
                  </BText>
                </BView>
              </BView>
            )}
        </BPressable>
      );
    };

    const ItemSeparatorComponent = React.useCallback(
      () => <BView style={styles.separator} />,
      []
    );

    const showModalSelect = useCallback(async () => {
      const permission = await requestPermissionHelper([
        ...PERMISSION.permissionLibrary,
        ...PERMISSION.permissionCamera,
      ]);

      if (permission === RESULTS.BLOCKED) {
        showDialog({
          title: _(msg`Truy cập thư viện hoặc máy ảnh bị từ chối`),
          content: <BText>{_(msg`Truy cập cài đặt để cấp quyền`)}</BText>,
          negativeButton: {
            title: _(msg`Hủy`),
          },
          positiveButton: {
            title: _(msg`Mở cài đặt`),
            onPress: async () =>
              await openSettings().catch(() =>
                console.warn("cannot open settings")
              ),
          },
        });
        return;
      }

      if (permission !== RESULTS.GRANTED) {
        return;
      }

      if ((photos?.length || 0) <= 0) {
        await getPhotos();
      }

      bottomSheetModalRef.current?.present();
    }, []);

    return (
      <BView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          enablePanDownToClose={false}
          enableDynamicSizing={false}
          handleIndicatorStyle={styles.headerIndicator}
          snapPoints={[Device.height - insets.top]}
        >
          <BView style={styles.header}>
            <BText variant={"md"}>{_(msg`Chọn ảnh`)}</BText>
            <BButton
              hitSlop={HIT_SLOP_EXPAND_10}
              paddingHorizontal={undefined}
              onPress={onSaveImagePress}
              label={_(msg`Đóng`)}
            />
          </BView>
          <BottomSheetFlatList
            numColumns={NUMBER_PHOTO_ITEMS}
            data={photos}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={renderItem}
            onEndReached={loadMorePhotos}
            onEndReachedThreshold={0.5}
          />
          {maxImageAvailable > 1 && (
            <BView style={styles.footer}>
              <BText variant={"md"} fontWeight={"600"}>
                {_(msg`${field?.value?.length} ảnh đã được chọn`)}
              </BText>
              <BButton onPress={onSaveImagePress} label={_(msg`Tiếp tục`)} />
            </BView>
          )}
        </BottomSheetModal>
        <CameraSystemComponent
          onSaveImagePress={onSaveImageCameraPress}
          ref={bottomSheetCameraModalRef}
        />
      </BView>
    );
  }
);

export default FImageSelect;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: MHS._16,
    paddingHorizontal: MHS._16,
  },
  btnHeaderLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  btnHeaderRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  separator: {
    height: MHS._2,
  },
  selectedOverlay: {
    position: "absolute",
    top: MHS._4,
    right: MHS._4,
    borderRadius: MHS._24,
    width: MHS._24,
    height: MHS._24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  circle: {
    borderColor: "gray",
    borderWidth: MHS._2,
    borderRadius: MHS._24,
    width: MHS._24,
    height: MHS._24,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: MHS._16,
    paddingTop: MHS._16,
    paddingBottom: MHS._32,
    ...s_row_justifyBetween_itemsCenter,
    backgroundColor: "white",
  },
  headerIndicator: {
    height: 0,
  },
  cameraItem: {
    width: PHOTO_ITEM_WIDTH,
    height: PHOTO_ITEM_WIDTH,
    ...s_itemsCenter,
    justifyContent: "center",
    backgroundColor: "gray",
  },
});
function showDialog(arg0: {
  title: string;
  content: React.JSX.Element;
  negativeButton: { title: string };
  positiveButton: { title: string; onPress: () => Promise<void> };
}) {
  throw new Error("Function not implemented.");
}
