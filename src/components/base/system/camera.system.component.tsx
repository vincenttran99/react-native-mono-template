import { Keyboard, StyleSheet } from "react-native";
import React, { useImperativeHandle, useRef, useState } from "react";
import {
  Camera as VisionCamera,
  CameraProps,
  PhotoFile,
  Templates,
  useCameraDevice,
  useCameraDevices,
  useCameraFormat,
} from "react-native-vision-camera";
import Reanimated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BImage from "components/base/image.base";
import BIconButton from "components/base/iconButton.base";
import { MHS } from "constants/sizes.constant";

import {
  s_100,
  s_row_justifyBetween_itemsCenter,
  s_width100,
} from "constants/styles.constant";
import { Device } from "constants/device.constant";
import BButton from "components/base/button.base";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { showErrorMessage } from "helpers/globalHelper";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "../view.base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CameraSystemComponent = React.forwardRef(
  ({ onSaveImagePress, ...props }: any, ref) => {
    const insets = useSafeAreaInsets();
    const devices = useCameraDevices();
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [photo, setPhoto] = useState<PhotoFile>();
    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const device = isFrontCamera
      ? useCameraDevice("front", {
          physicalDevices: [
            "ultra-wide-angle-camera",
            "wide-angle-camera",
            "telephoto-camera",
          ],
        })
      : useCameraDevice("back", {
          physicalDevices: [
            "ultra-wide-angle-camera",
            "wide-angle-camera",
            "telephoto-camera",
          ],
        });
    const cameraRef = useRef<VisionCamera>(null);
    const { _ } = useLingui();
    const zoom = useSharedValue(device?.neutralZoom);
    const zoomOffset = useSharedValue(0);
    const format = useCameraFormat(device, Templates.Instagram);
    const supportsVideoStabilization =
      format?.videoStabilizationModes.includes("cinematic-extended");

    const gesture = Gesture.Pinch()
      .onBegin(() => {
        zoomOffset.value = zoom.value;
      })
      .onUpdate((event) => {
        const z = zoomOffset.value * event.scale;
        zoom.value = interpolate(
          z,
          [1, 10],
          [device?.minZoom, device?.maxZoom],
          Extrapolation.CLAMP
        );
      });

    const animatedProps = useAnimatedProps<CameraProps>(
      () => ({ zoom: zoom.value }),
      [zoom]
    );

    useImperativeHandle(ref, () => ({
      present: async () => {
        if (device == null) {
          showErrorMessage("Không tìm thấy máy ảnh");
          return;
        }

        await Keyboard.dismiss();
        bottomSheetModalRef.current?.present();
      },
      dismiss: () => {
        bottomSheetModalRef.current?.dismiss();
      },
    }));

    const toggleCamera = () => {
      setIsFrontCamera((prevState) => !prevState);
    };

    const takePhoto = async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePhoto();
          console.log(photo);
          setPhoto({
            ...photo,
            path: (Device?.isAndroid ? "file://" : "") + photo?.path,
          });
        } catch (e) {
          console.error("Failed to take photo:", e);
        }
      }
    };

    const closeModal = () => {
      setPhoto(undefined);
      bottomSheetModalRef.current?.dismiss();
    };
    const onSavePress = () => {
      onSaveImagePress(photo);
      closeModal();
    };

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        enablePanDownToClose={false}
        handleIndicatorStyle={styles.headerIndicator}
        snapPoints={[Device.height - insets.top]}
      >
        <BView style={styles.closeModal}>
          <BIconButton
            size="md"
            backgroundColor="transparent"
            onPress={closeModal}
            style={styles.closeModal}
            iconColor={"white"}
            icon={"close"}
          />
        </BView>
        <BView style={styles.container}>
          {photo ? (
            <BView style={styles.previewContainer}>
              <BImage
                needConvertLink={false}
                height={Device.height}
                width={Device.width}
                contentFit={"cover"}
                source={photo?.path}
              />
              <BView style={styles.footerContent}>
                <BButton
                  onPress={() => setPhoto(null)}
                  label={_(msg`Chụp lại`)}
                />
                <BButton onPress={onSavePress} label={_(msg`Tiếp tục`)} />
              </BView>
            </BView>
          ) : (
            <>
              <GestureDetector gesture={gesture}>
                <ReanimatedCamera
                  ref={cameraRef}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={true}
                  format={format}
                  photo={true}
                  onPreviewStarted={() => console.log("Preview started!")}
                  onPreviewStopped={() => console.log("Preview stopped!")}
                  animatedProps={animatedProps}
                />
              </GestureDetector>

              <BView style={styles.controls}>
                <BIconButton
                  style={styles.leftIcon}
                  onPress={toggleCamera}
                  size={"md"}
                  icon={"camera-flip-outline"}
                  iconColor={"white"}
                />
                <BIconButton
                  style={styles.centerIcon}
                  onPress={takePhoto}
                  size={"xl"}
                  icon={"circle-slice-8"}
                  iconColor={"white"}
                />
              </BView>
            </>
          )}
        </BView>
        <BView style={styles.safeAreaBottom} />
      </BottomSheetModal>
    );
  }
);

export default CameraSystemComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: s_100,
  controls: {
    backgroundColor: "gray",
    position: "absolute",
    bottom: 0,
    // paddingBottom:20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...s_width100,
  },
  closeModal: {
    top: 0,
    position: "absolute",
    zIndex: 2,
    left: MHS._2,
  },
  leftIcon: {
    position: "absolute",
    left: MHS._20,
  },
  centerIcon: {
    zIndex: 1,
  },
  footerContent: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "gray",
    paddingHorizontal: MHS._20,
    paddingVertical: MHS._16,
    ...s_row_justifyBetween_itemsCenter,
    ...s_width100,
  },
  headerIndicator: {
    height: 0,
  },
  safeAreaBottom: {
    paddingBottom: Device.insets?.bottom,
    backgroundColor: "gray",
  },
  noDetectCamera: {
    marginHorizontal: MHS._12,
    fontWeight: "bold",
    color: "red",
  },
});

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(VisionCamera);
