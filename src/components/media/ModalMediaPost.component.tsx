// import {IconClose, IconLeft, IconRight} from "assets/svgIcons";
// import {useSystem} from "helpers/system.helper";
// import React, {forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
// import {Button, Image, StyleSheet, TouchableOpacity, BView} from "react-native";
// import ImageViewer from "react-native-image-zoom-viewer";
// import Modal from "react-native-modal";
// import {Device} from "ui/device.ui";
// import {FontSizes, HS, MHS, VS} from "ui/sizes.ui";
// import {RootColor, SystemTheme} from "ui/theme";
//
// import TextBase from "components/TextBase";
// import isEqual from "react-fast-compare";
// import {IImageInfo} from "react-native-image-zoom-viewer/built/// import {IconClose, IconLeft, IconRight} from "assets/svgIcons";
// // import {useSystem} from "helpers/system.helper";
// // import React, {forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
// // import {Button, Image, StyleSheet, TouchableOpacity, BView} from "react-native";
// // import ImageViewer from "react-native-image-zoom-viewer";
// // import Modal from "react-native-modal";
// // import {Device} from "ui/device.ui";
// // import {FontSizes, HS, MHS, VS} from "ui/sizes.ui";
// // import {RootColor, SystemTheme} from "ui/theme";
// //
// // import TextBase from "components/TextBase";
// // import isEqual from "react-fast-compare";
// // import {IImageInfo} from "react-native-image-zoom-viewer/built/image-viewer.type";
// // import Orientation from "react-native-orientation-locker";
// // import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
// // import WebView from "react-native-webview";
// // import YoutubePlayer from "react-native-youtube-iframe";
// // import VideoPreview from "screens/module/components/video.preview";
// // import webPlayer from "./webPlayer.component";
// // import Swiper from 'react-native-swiper';
// //
// // const getVideoIdVimeo = (url) => {
// //   const match = /vimeo.*\/(\d+)/i.exec(url);
// //   if (match) {
// //     return match[1];
// //   }
// //   return null
// // }
// //
// // const getVideoIdYoutube = (url) => {
// //   const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
// //   const match = url.match(regExp);
// //   if (match && match[2].length == 11) {
// //     return match[2];
// //   }
// //   return ""
// // }
// //
// // export interface TypedRefModalMedia {
// //   show: (media: IImageInfo[], index: number, type?: string) => void
// //   hide: () => void
// // }
// //
// // const injected = `var isFullScreen = false;
// // function onFullScreenChange() {
// //   isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
// //   window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'fullScreenChange', data: Boolean(isFullScreen)}));
// // }
// //
// // document.addEventListener('fullscreenchange', onFullScreenChange)`
// //
// // const ModalMediaPostComponent = forwardRef((_, ref: React.Ref<TypedRefModalMedia>) => {
// //   const {styles, theme} = useSystem(createStyles);
// //   const [visible, setVisible] = useState(false);
// //   const refIndexAlbum = useRef(0);
// //   const refMediaData = useRef<any[]>([]);
// //   const [type, setType] = useState("image");
// //   const videoRef = useRef<any>(null)
// //   const isLanscape = useSharedValue(1)
// //
// //
// //   useImperativeHandle(ref, () => ({
// //     show(media: any[], index: number) {
// //       refMediaData.current = media;
// //       refIndexAlbum.current = index;
// //       setType(media?.[index]?.media_type)
// //       setVisible(true);
// //
// //     },
// //     hide() {
// //       setVisible(false);
// //     },
// //   }));
// //
// //   useEffect(() => {
// //     if (!visible) {
// //       Orientation.lockToPortrait()
// //       videoRef.current?.paused()
// //       isLanscape.value = withTiming(0, {duration: 0})
// //     }
// //     goToIndex?.(refIndexAlbum.current)
// //   }, [visible])
// //
// //   const close = useCallback(() => setVisible(false), []);
// //
// //
// //   const renderIndicator = (currentIndex?: number | undefined, allSize?: number | undefined) => {
// //     return (
// //       <BView style={styles.viewHeader}>
// //         <TextBase style={styles.viewHeaderText}>
// //           {currentIndex}/{allSize}
// //         </TextBase>
// //       </BView>
// //     );
// //   };
// //
// //   const onStateChange = useCallback((state) => {
// //     if (state === "ended") {
// //
// //     }
// //   }, []);
// //
// //   const onMessage = useCallback((event) => {
// //     try {
// //       const message = JSON.parse(event?.nativeEvent?.data);
// //       if (message?.eventType !== "fullScreenChange") {
// //         return;
// //       }
// //
// //       changeToLanscape(`${message.data}` === "true")
// //     } catch (error) {
// //
// //     }
// //   }, [])
// //
// //   const changeToLanscape = useCallback((isLan) => {
// //     if (Device.isAndroid) {
// //       if (isLan) {
// //         Orientation.lockToLandscape()
// //       } else {
// //         Orientation.lockToPortrait()
// //       }
// //     }
// //   }, [])
// //
// //   const swiperRef = useRef(null);
// //
// //   const goToIndex = () => {
// //     if (swiperRef.current) {
// //       swiperRef.current.scrollTo(refIndexAlbum.current, true);
// //     }
// //   };
// //
// //   const goToNextSlide = () => {
// //     if (swiperRef.current) {
// //       swiperRef.current.scrollBy(1, true);
// //     }
// //   };
// //
// //   const goToPreviousSlide = () => {
// //     if (swiperRef.current) {
// //       swiperRef.current.scrollBy(-1, true);
// //     }
// //   };
// //
// //   const renderContent = useCallback(() => {
// //
// //     return (
// //       <BView style={{flex: 1}}>
// //         <Swiper
// //           index={refIndexAlbum.current}
// //           ref={swiperRef}
// //           autoplay={false}
// //           showsButtons={true}
// //           prevButton={
// //             <TouchableOpacity style={[styles.btnTop, {left: HS._12}]} onPress={goToPreviousSlide}>
// //               <IconLeft width={FontSizes._16} height={FontSizes._16}/>
// //             </TouchableOpacity>
// //           }
// //           nextButton={
// //             <TouchableOpacity style={[styles.btnTop, {right: HS._12}]} onPress={goToNextSlide}>
// //               <IconRight width={FontSizes._16} height={FontSizes._16}/>
// //             </TouchableOpacity>
// //           }
// //         >
// //           {refMediaData.current.map((item, index) => {
// //             return (
// //               <BView
// //                 key={index}
// //                 style={styles.slide}>
// //                 {type === 'youtube' &&
// //                   <YoutubePlayer
// //                     height={VS._200}
// //                     width={Device.width}
// //                     play={true}
// //                     mute={true}
// //                     videoId={video_id}
// //                     onChangeState={onStateChange}
// //                     onFullScreenChange={changeToLanscape}
// //                   />
// //                 }
// //                 {item?.media_type === 'wistia' &&
// //                   <WebView
// //                     style={{...StyleSheet.absoluteFillObject}}
// //                     javaScriptEnabled={true}
// //                     mediaPlaybackRequiresUserAction={false}
// //                     builtInZoomControls={false}
// //                     allowsInlineMediaPlayback={true}
// //                     scalesPageToFit={false}
// //                     scrollEnabled={false}
// //                     allowfullscreen
// //                     injectedJavaScript={injected}
// //                     onMessage={onMessage}
// //                     bounces={false}
// //                     source={{
// //                       html: webPlayer(video_id),
// //                       baseUrl: 'https://wistia.com',
// //                     }}
// //                   />
// //                 }
// //                 {item?.media_type === 'vimeo' &&
// //                   <WebView
// //                     style={{...StyleSheet.absoluteFillObject}}
// //                     onError={console.log}
// //                     allowsFullscreenVideo
// //                     allowfullscreen
// //                     injectedJavaScript={injected}
// //                     javaScriptEnabled={true}
// //                     onMessage={onMessage}
// //                     scrollEnabled={false}
// //                     allowsInlineMediaPlayback={true}
// //                     automaticallyAdjustContentInsets
// //                     source={{
// //                       html: `
// //               <html>
// //
// //               <head>
// //                   <meta http-equiv="Content-Security-Policy"
// //                       content="default-src * gap:; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data: blob: android-webview-video-poster:; style-src * 'unsafe-inline';">
// //                       <meta
// //                         name="viewport"
// //                         content="width=device-width, initial-scale=1, maximum-scale=1"
// //                       />
// //                       <style>
// //                         html,
// //                         body {
// //                           overflow-x: hidden;
// //                           overflow-y: hidden;
// //                           padding: 0;
// //                           margin: 0;
// //                         }
// //                         body {
// //                           position: relative;
// //                           padding: 0;
// //                           margin: 0;
// //                           background-color: black;
// //                         }
// //                       </style>
// //                       </head>
// //
// //               <body style="margin: 0; padding: 0">
// //                   <iframe src="https://player.vimeo.com/video/${video_id}" webkitallowfullscreen mozallowfullscreen allowfullscreen
// //                       width="100%" height="100%" margin="0" padding="0" marginwidth="0" marginheight="0" hspace="0" vspace="0" ,
// //                       frameborder="0" scrolling="no">
// //                   </iframe>
// //               </body>
// //
// //               </html>
// //         `,
// //                     }}
// //                   />
// //                 }
// //
// //                 {item?.media_type === 'video' &&
// //                   <VideoPreview
// //                     ref={videoRef}
// //                     url={item.media_url}
// //
// //                     onPressLanscape={(v) => {
// //                       isLanscape.value = withTiming(v ? 1 : 0, {duration: 300})
// //                     }}
// //                   />
// //                 }
// //                 {item?.media_type === 'image' &&
// //                   <Image source={{uri: item.media_url}}
// //                          style={{width: Device.width, height: Device.height, resizeMode: 'contain'}}/>
// //                 }
// //               </BView>
// //             )
// //           })}
// //         </Swiper>
// //         <BView style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
// //           {/* <Button  title="Previous" onPress={goToPreviousSlide} />
// //         <Button  title="Close" onPress={() =>  setVisible(false)} />
// //         <Button title="Next" onPress={goToNextSlide} /> */}
// //         </BView>
// //       </BView>
// //     )
// //   }, [type])
// //
// //   const styleViewVideo = useAnimatedStyle(() => {
// //     return {
// //       height: isLanscape.value == 1 ? Device.width : Device.heightScreen,
// //       width: isLanscape.value == 1 ? Device.heightScreen : Device.width,
// //       transform: isLanscape.value == 1 ? [{rotate: "90deg"}] : [{rotate: "0deg"}]
// //     }
// //   })
// //
// //   return (
// //     <Modal
// //       isVisible={visible}
// //       animationIn={"fadeInUp"}
// //       animationOut={"fadeOutDown"}
// //       hideModalContentWhileAnimating={false}
// //       backdropColor={"transparent"}
// //       backdropOpacity={1}
// //       hasBackdrop={false}
// //       propagateSwipe
// //       useNativeDriverForBackdrop={Device.isAndroid}
// //       statusBarTranslucent
// //       style={styles.modal}
// //       deviceHeight={Device.heightScreen}
// //       onBackButtonPress={close}
// //     >
// //       <BView style={styles.containerModalBlock}>
// //
// //         <Animated.BView style={[styleViewVideo]}>
// //           <TouchableOpacity onPress={() => setVisible(false)} style={styles.btnClose}>
// //             <IconClose size={MHS._16} color={theme.textLight}/>
// //           </TouchableOpacity>
// //           {renderContent()}
// //         </Animated.BView>
// //       </BView>
// //     </Modal>
// //   );
// // });
// //
// // const createStyles = (theme: SystemTheme) => {
// //   return StyleSheet.create({
// //     modal: {
// //       flex: 1,
// //       margin: 0
// //     },
// //     btnTop: {
// //       height: 36,
// //       width: 36,
// //       borderRadius: 50,
// //       position: "absolute",
// //       top: !Device.isX ? 20 : 0,
// //       zIndex: 1000000,
// //       backgroundColor: "rgba(0,0,0,0.5)",
// //       justifyContent: "center",
// //       alignItems: "center",
// //     },
// //     btnClose: {
// //       height: 36,
// //       width: 36,
// //       borderRadius: 50,
// //       position: "absolute",
// //       top: 64,
// //       zIndex: 1000000,
// //       backgroundColor: "rgba(0,0,0,0.5)",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       right: 16
// //     },
// //     containerModal: {
// //       height: "100%",
// //       width: Device.width,
// //       justifyContent: "center",
// //       alignItems: "center",
// //       margin: 0,
// //       backgroundColor: RootColor.DarkBackground,
// //     },
// //     containerModalBlock: {
// //       width: Device.width,
// //       height: Device.heightScreen,
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       backgroundColor: "#000000"
// //     },
// //     video: {
// //       width: "100%",
// //       flex: 1,
// //       alignSelf: "center",
// //       position: "relative",
// //       backgroundColor: "#000000",
// //     },
// //     viewHeader: {
// //       top: !Device.isX ? 26 : 66,
// //       width: "100%",
// //       position: "absolute",
// //       textAlign: "center",
// //       alignItems: "center",
// //       height: 36,
// //       alignContent: "center",
// //     },
// //     viewHeaderText: {
// //       fontWeight: "900",
// //       color: theme.textLight,
// //       backgroundColor: "rgba(0,0,0,0.3)",
// //       overflow: "hidden",
// //       borderRadius: 8,
// //       paddingHorizontal: 16,
// //       paddingVertical: 4,
// //       zIndex: 10000,
// //     },
// //     styleVideo: {
// //       width: "100%",
// //       height: "100%"
// //     },
// //     slide: {
// //       flex: 1,
// //       justifyContent: 'center',
// //       backgroundColor: 'transparent'
// //     },
// //     wrapper: {}
// //   });
// // };
// //
// // export default memo(ModalMediaPostComponent, isEqual);image-viewer.type";
// import Orientation from "react-native-orientation-locker";
// import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
// import WebView from "react-native-webview";
// import YoutubePlayer from "react-native-youtube-iframe";
// import VideoPreview from "screens/module/components/video.preview";
// import webPlayer from "./webPlayer.component";
// import Swiper from 'react-native-swiper';
//
// const getVideoIdVimeo = (url) => {
//   const match = /vimeo.*\/(\d+)/i.exec(url);
//   if (match) {
//     return match[1];
//   }
//   return null
// }
//
// const getVideoIdYoutube = (url) => {
//   const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   if (match && match[2].length == 11) {
//     return match[2];
//   }
//   return ""
// }
//
// export interface TypedRefModalMedia {
//   show: (media: IImageInfo[], index: number, type?: string) => void
//   hide: () => void
// }
//
// const injected = `var isFullScreen = false;
// function onFullScreenChange() {
//   isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
//   window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'fullScreenChange', data: Boolean(isFullScreen)}));
// }
//
// document.addEventListener('fullscreenchange', onFullScreenChange)`
//
// const ModalMediaPostComponent = forwardRef((_, ref: React.Ref<TypedRefModalMedia>) => {
//   const {styles, theme} = useSystem(createStyles);
//   const [visible, setVisible] = useState(false);
//   const refIndexAlbum = useRef(0);
//   const refMediaData = useRef<any[]>([]);
//   const [type, setType] = useState("image");
//   const videoRef = useRef<any>(null)
//   const isLanscape = useSharedValue(1)
//
//
//   useImperativeHandle(ref, () => ({
//     show(media: any[], index: number) {
//       refMediaData.current = media;
//       refIndexAlbum.current = index;
//       setType(media?.[index]?.media_type)
//       setVisible(true);
//
//     },
//     hide() {
//       setVisible(false);
//     },
//   }));
//
//   useEffect(() => {
//     if (!visible) {
//       Orientation.lockToPortrait()
//       videoRef.current?.paused()
//       isLanscape.value = withTiming(0, {duration: 0})
//     }
//     goToIndex?.(refIndexAlbum.current)
//   }, [visible])
//
//   const close = useCallback(() => setVisible(false), []);
//
//
//   const renderIndicator = (currentIndex?: number | undefined, allSize?: number | undefined) => {
//     return (
//       <BView style={styles.viewHeader}>
//         <TextBase style={styles.viewHeaderText}>
//           {currentIndex}/{allSize}
//         </TextBase>
//       </BView>
//     );
//   };
//
//   const onStateChange = useCallback((state) => {
//     if (state === "ended") {
//
//     }
//   }, []);
//
//   const onMessage = useCallback((event) => {
//     try {
//       const message = JSON.parse(event?.nativeEvent?.data);
//       if (message?.eventType !== "fullScreenChange") {
//         return;
//       }
//
//       changeToLanscape(`${message.data}` === "true")
//     } catch (error) {
//
//     }
//   }, [])
//
//   const changeToLanscape = useCallback((isLan) => {
//     if (Device.isAndroid) {
//       if (isLan) {
//         Orientation.lockToLandscape()
//       } else {
//         Orientation.lockToPortrait()
//       }
//     }
//   }, [])
//
//   const swiperRef = useRef(null);
//
//   const goToIndex = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollTo(refIndexAlbum.current, true);
//     }
//   };
//
//   const goToNextSlide = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollBy(1, true);
//     }
//   };
//
//   const goToPreviousSlide = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollBy(-1, true);
//     }
//   };
//
//   const renderContent = useCallback(() => {
//
//     return (
//       <BView style={{flex: 1}}>
//         <Swiper
//           index={refIndexAlbum.current}
//           ref={swiperRef}
//           autoplay={false}
//           showsButtons={true}
//           prevButton={
//             <TouchableOpacity style={[styles.btnTop, {left: HS._12}]} onPress={goToPreviousSlide}>
//               <IconLeft width={FontSizes._16} height={FontSizes._16}/>
//             </TouchableOpacity>
//           }
//           nextButton={
//             <TouchableOpacity style={[styles.btnTop, {right: HS._12}]} onPress={goToNextSlide}>
//               <IconRight width={FontSizes._16} height={FontSizes._16}/>
//             </TouchableOpacity>
//           }
//         >
//           {refMediaData.current.map((item, index) => {
//             return (
//               <BView
//                 key={index}
//                 style={styles.slide}>
//                 {type === 'youtube' &&
//                   <YoutubePlayer
//                     height={VS._200}
//                     width={Device.width}
//                     play={true}
//                     mute={true}
//                     videoId={video_id}
//                     onChangeState={onStateChange}
//                     onFullScreenChange={changeToLanscape}
//                   />
//                 }
//                 {item?.media_type === 'wistia' &&
//                   <WebView
//                     style={{...StyleSheet.absoluteFillObject}}
//                     javaScriptEnabled={true}
//                     mediaPlaybackRequiresUserAction={false}
//                     builtInZoomControls={false}
//                     allowsInlineMediaPlayback={true}
//                     scalesPageToFit={false}
//                     scrollEnabled={false}
//                     allowfullscreen
//                     injectedJavaScript={injected}
//                     onMessage={onMessage}
//                     bounces={false}
//                     source={{
//                       html: webPlayer(video_id),
//                       baseUrl: 'https://wistia.com',
//                     }}
//                   />
//                 }
//                 {item?.media_type === 'vimeo' &&
//                   <WebView
//                     style={{...StyleSheet.absoluteFillObject}}
//                     onError={console.log}
//                     allowsFullscreenVideo
//                     allowfullscreen
//                     injectedJavaScript={injected}
//                     javaScriptEnabled={true}
//                     onMessage={onMessage}
//                     scrollEnabled={false}
//                     allowsInlineMediaPlayback={true}
//                     automaticallyAdjustContentInsets
//                     source={{
//                       html: `
//               <html>
//
//               <head>
//                   <meta http-equiv="Content-Security-Policy"
//                       content="default-src * gap:; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data: blob: android-webview-video-poster:; style-src * 'unsafe-inline';">
//                       <meta
//                         name="viewport"
//                         content="width=device-width, initial-scale=1, maximum-scale=1"
//                       />
//                       <style>
//                         html,
//                         body {
//                           overflow-x: hidden;
//                           overflow-y: hidden;
//                           padding: 0;
//                           margin: 0;
//                         }
//                         body {
//                           position: relative;
//                           padding: 0;
//                           margin: 0;
//                           background-color: black;
//                         }
//                       </style>
//                       </head>
//
//               <body style="margin: 0; padding: 0">
//                   <iframe src="https://player.vimeo.com/video/${video_id}" webkitallowfullscreen mozallowfullscreen allowfullscreen
//                       width="100%" height="100%" margin="0" padding="0" marginwidth="0" marginheight="0" hspace="0" vspace="0" ,
//                       frameborder="0" scrolling="no">
//                   </iframe>
//               </body>
//
//               </html>
//         `,
//                     }}
//                   />
//                 }
//
//                 {item?.media_type === 'video' &&
//                   <VideoPreview
//                     ref={videoRef}
//                     url={item.media_url}
//
//                     onPressLanscape={(v) => {
//                       isLanscape.value = withTiming(v ? 1 : 0, {duration: 300})
//                     }}
//                   />
//                 }
//                 {item?.media_type === 'image' &&
//                   <Image source={{uri: item.media_url}}
//                          style={{width: Device.width, height: Device.height, resizeMode: 'contain'}}/>
//                 }
//               </BView>
//             )
//           })}
//         </Swiper>
//         <BView style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
//           {/* <Button  title="Previous" onPress={goToPreviousSlide} />
//         <Button  title="Close" onPress={() =>  setVisible(false)} />
//         <Button title="Next" onPress={goToNextSlide} /> */}
//         </BView>
//       </BView>
//     )
//   }, [type])
//
//   const styleViewVideo = useAnimatedStyle(() => {
//     return {
//       height: isLanscape.value == 1 ? Device.width : Device.heightScreen,
//       width: isLanscape.value == 1 ? Device.heightScreen : Device.width,
//       transform: isLanscape.value == 1 ? [{rotate: "90deg"}] : [{rotate: "0deg"}]
//     }
//   })
//
//   return (
//     <Modal
//       isVisible={visible}
//       animationIn={"fadeInUp"}
//       animationOut={"fadeOutDown"}
//       hideModalContentWhileAnimating={false}
//       backdropColor={"transparent"}
//       backdropOpacity={1}
//       hasBackdrop={false}
//       propagateSwipe
//       useNativeDriverForBackdrop={Device.isAndroid}
//       statusBarTranslucent
//       style={styles.modal}
//       deviceHeight={Device.heightScreen}
//       onBackButtonPress={close}
//     >
//       <BView style={styles.containerModalBlock}>
//
//         <Animated.BView style={[styleViewVideo]}>
//           <TouchableOpacity onPress={() => setVisible(false)} style={styles.btnClose}>
//             <IconClose size={MHS._16} color={theme.textLight}/>
//           </TouchableOpacity>
//           {renderContent()}
//         </Animated.BView>
//       </BView>
//     </Modal>
//   );
// });
//
// const createStyles = (theme: SystemTheme) => {
//   return StyleSheet.create({
//     modal: {
//       flex: 1,
//       margin: 0
//     },
//     btnTop: {
//       height: 36,
//       width: 36,
//       borderRadius: 50,
//       position: "absolute",
//       top: !Device.isX ? 20 : 0,
//       zIndex: 1000000,
//       backgroundColor: "rgba(0,0,0,0.5)",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     btnClose: {
//       height: 36,
//       width: 36,
//       borderRadius: 50,
//       position: "absolute",
//       top: 64,
//       zIndex: 1000000,
//       backgroundColor: "rgba(0,0,0,0.5)",
//       justifyContent: "center",
//       alignItems: "center",
//       right: 16
//     },
//     containerModal: {
//       height: "100%",
//       width: Device.width,
//       justifyContent: "center",
//       alignItems: "center",
//       margin: 0,
//       backgroundColor: RootColor.DarkBackground,
//     },
//     containerModalBlock: {
//       width: Device.width,
//       height: Device.heightScreen,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: "#000000"
//     },
//     video: {
//       width: "100%",
//       flex: 1,
//       alignSelf: "center",
//       position: "relative",
//       backgroundColor: "#000000",
//     },
//     viewHeader: {
//       top: !Device.isX ? 26 : 66,
//       width: "100%",
//       position: "absolute",
//       textAlign: "center",
//       alignItems: "center",
//       height: 36,
//       alignContent: "center",
//     },
//     viewHeaderText: {
//       fontWeight: "900",
//       color: theme.textLight,
//       backgroundColor: "rgba(0,0,0,0.3)",
//       overflow: "hidden",
//       borderRadius: 8,
//       paddingHorizontal: 16,
//       paddingVertical: 4,
//       zIndex: 10000,
//     },
//     styleVideo: {
//       width: "100%",
//       height: "100%"
//     },
//     slide: {
//       flex: 1,
//       justifyContent: 'center',
//       backgroundColor: 'transparent'
//     },
//     wrapper: {}
//   });
// };
//
// export default memo(ModalMediaPostComponent, isEqual);
