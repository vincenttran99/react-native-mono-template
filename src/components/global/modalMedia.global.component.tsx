import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import isEqual from "react-fast-compare";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import WebView from "react-native-webview";
// import YoutubePlayer from "react-native-youtube-iframe";
// import VideoPreview from "screens/module/components/video.preview";
import webPlayer from "../media/webPlayer.component";

import { Device } from "constants/device.constant";
import BText from "components/base/text.base";
import { MHS, VS } from "constants/sizes.constant";
import BImage from "components/base/image.base";
import BView from "components/base/view.base";
import BIcon from "components/base/icon.base";
import { useTheme } from "@shopify/restyle";
// import Modal from "react-native-modal";

const getVideoIdVimeo = (url: string) => {
  const match = /vimeo.*\/(\d+)/i.exec(url);
  if (match) {
    return match[1];
  }
  return null;
};

const getVideoIdYoutube = (url: string) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  }
  return "";
};

export interface IModalMediaGlobalComponentRef {
  show: (
    media: IImageInfo[],
    currentIndex?: number,
    type?: "image" | "wistia" | "video" | "vimeo" | "youtube"
  ) => void;
  hide: () => void;
}

const injected = `var isFullScreen = false;
function onFullScreenChange() {
  isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'fullScreenChange', data: Boolean(isFullScreen)}));
}

document.addEventListener('fullscreenchange', onFullScreenChange)`;

const ModalMediaGlobalComponent = forwardRef(
  (_, ref: React.Ref<IModalMediaGlobalComponentRef>) => {
    const theme = useTheme();
    const refIndexAlbum = useRef(0);
    const refMediaData = useRef<any[]>([]);
    const [type, setType] = useState("image");
    // const videoRef = useRef<any>(null)
    const isLanscape = useSharedValue(1);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      show(media: any[], currentIndex: number = 0, type = "image") {
        refMediaData.current = media;
        refIndexAlbum.current = currentIndex;

        setType(type);
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    }));

    useEffect(() => {
      if (!visible) {
        // Orientation.lockToPortrait()
        // videoRef.current?.paused()
        isLanscape.value = withTiming(0, { duration: 0 });
      }
    }, [visible]);

    const close = useCallback(() => setVisible(false), []);

    const renderIndicator = (
      currentIndex?: number | undefined,
      allSize?: number | undefined
    ) => {
      return (
        <BView style={styles.viewHeader}>
          <BText style={styles.viewHeaderText}>
            {currentIndex}/{allSize}
          </BText>
        </BView>
      );
    };

    const renderContent = useCallback(() => {
      // if (type === "youtube") {
      //     const video_id = getVideoIdYoutube(refMediaData.current?.[0]?.url)
      //
      //     return (
      //         <BView style={{...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center"}}>
      //             <YoutubePlayer
      //                 height={VS._200}
      //                 width={Device.width}
      //                 play={true}
      //                 mute={true}
      //                 videoId={video_id}
      //                 onChangeState={onStateChange}
      //                 onFullScreenChange={changeToLanscape}
      //             />
      //             <TouchableOpacity style={styles.btnTop} onPress={close}>
      //                 <Icon source={'close'} color={"#ffffff"} size={MHS._28}/>
      //             </TouchableOpacity>
      //         </BView>
      //     )
      // }

      // if (type === "video") {
      //   return (
      //     <BView style={{...StyleSheet.absoluteFillObject}}>
      //       <VideoPreview
      //         ref={videoRef}
      //         url={refMediaData.current?.[0]?.url}
      //         onPressLanscape={(v) => {
      //           isLanscape.value = withTiming(v ? 1 : 0, {duration: 300})
      //         }}
      //       />
      //       <TouchableOpacity style={styles.btnTop} onPress={close}>
      //         <IconLeft width={FontSizes._16} height={FontSizes._16}/>
      //       </TouchableOpacity>
      //     </BView>
      //   )
      // }

      return (
        <ImageViewer
          index={refIndexAlbum.current}
          imageUrls={refMediaData.current}
          enableImageZoom={true}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
          renderImage={({ source, style }) => (
            <BImage
              needConvertLink={false}
              hasBlur={false}
              source={source}
              contentFit={"contain"}
              style={style}
            />
          )}
          loadingRender={() => (
            <ActivityIndicator
              animating
              color={theme.colors.primary}
              size={"large"}
            />
          )}
          style={styles.containerMedia}
          onSwipeDown={() => {
            setVisible(false);
          }}
          renderIndicator={renderIndicator}
          renderHeader={() => (
            <TouchableOpacity style={styles.btnTop} onPress={close}>
              <BIcon name={"close"} color={"white"} size={MHS._28} />
            </TouchableOpacity>
          )}
        />
      );
    }, [type]);

    const styleViewVideo = useAnimatedStyle(() => {
      return {
        height: isLanscape.value == 1 ? Device.width : Device.height,
        width: isLanscape.value == 1 ? Device.height : Device.width,
        transform:
          isLanscape.value == 1 ? [{ rotate: "90deg" }] : [{ rotate: "0deg" }],
      };
    });

    return (
      <Modal visible={visible} style={styles.modal}>
        <BView style={styles.containerModalBlock}>
          <Animated.View style={[styleViewVideo]}>
            {renderContent()}
          </Animated.View>
        </BView>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  btnTop: {
    height: MHS._36,
    width: MHS._36,
    borderRadius: MHS._52,
    position: "absolute",
    top: MHS._20,
    zIndex: 1000000,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    right: MHS._20,
  },
  containerModal: {
    height: "100%",
    width: Device.width,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    backgroundColor: "gray",
  },
  containerModalBlock: {
    width: Device.width,
    height: Device.height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  video: {
    width: "100%",
    flex: 1,
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#000000",
  },
  viewHeader: {
    top: MHS._26,
    width: "100%",
    position: "absolute",
    textAlign: "center",
    alignItems: "center",
    height: 36,
    alignContent: "center",
  },
  viewHeaderText: {
    fontWeight: "900",
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.3)",
    overflow: "hidden",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    zIndex: 10000,
  },
  styleVideo: {
    width: "100%",
    height: "100%",
  },
  containerMedia: {
    width: Device.width,
  },
});

export default memo(ModalMediaGlobalComponent, isEqual);
