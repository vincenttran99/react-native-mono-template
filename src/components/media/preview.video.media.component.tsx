// import Slider from '@react-native-community/slider';
// import {IconFoward, IconFullScreen, IconMuted, IconPause, IconPlay, IconReplay, IconSpeaker} from 'assets/svgIcons';
// import {HIT_SLOP_EXPAND_10, HIT_SLOP_EXPAND_20} from 'constants/system.constant';
// import {useSystem} from 'helpers/system.helper';
// import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
// import {ActivityIndicator, Pressable, StyleSheet, TouchableWithoutFeedback, BView} from 'react-native';
// import FastImage from 'react-native-fast-image';
// import Orientation from 'react-native-orientation-locker';
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withTiming
// } from 'react-native-reanimated';
// import Video from 'react-native-video';
// import {VLCPlayer} from 'react-native-vlc-media-player';
// import {Device} from 'ui/device.ui';
// import {HS, MHS, VS} from 'ui/sizes.ui';
// import {RootColor, SystemTheme} from 'ui/theme';
//
// const PERCENT_DONE_VIDEO = 0.3
//
// const PreviewVideoMediaComponent = ({
//                         onPressLanscape = (status: boolean) => {
//                         },
//                         url,
//                         hasFullScreen = true,
//                         repeat = false,
//                         changeOrientation = false,
//                         markDoneCourse = () => {
//                         },
//                         thumbnail = "",
//                         useVlc = false,
//                         shouldCountToMarkDone = false
//                       }, ref) => {
//   const {styles, theme} = useSystem(createStyles)
//   const duration = useRef(1000)
//   const videoRef = useRef<any>(null)
//   const [muted, setMuted] = useState(false)
//   const currentTime = useRef(0)
//   const loadDone = useSharedValue(false)
//   const showOptions = useSharedValue(0);
//   const sliderRef = useRef<Slider>(null);
//   const pausedRef = useRef(false);
//   const aniPause = useSharedValue(0);
//   const isFullScreen = useRef(false);
//   const [ready, setReady] = useState(true)
//   const firstTime = useRef(true)
//   const needPaused = useRef(false)
//   const [isLanscapeVideo, setIsLanscapeVideo] = useState(true)
//   const countTimeoutDone = useRef(0)
//   const isDoneCourse = useRef(false)
//   const refIntervalCountDown = useRef<any>()
//
//
//   useEffect(() => {
//
//     if (firstTime.current) {
//       firstTime.current = false
//     } else {
//       countTimeoutDone.current = 0
//       currentTime.current = 0
//       loadDone.value = false
//       pausedRef.current = false
//       aniPause.value = withTiming(0, {duration: 0})
//       duration.current = 1000
//       videoRef.current?.setNativeProps({
//         paused: true
//       })
//       isDoneCourse.current = false
//       setReady(false)
//     }
//   }, [url])
//
//   useEffect(() => {
//     if (!ready) {
//       setTimeout(() => {
//         setReady(true)
//       }, 500);
//     }
//   }, [ready])
//
//   useImperativeHandle(ref, () => ({
//     paused: () => {
//       videoRef.current?.setNativeProps({
//         paused: true
//       })
//     }
//   }))
//
//   const styleVideo = useAnimatedStyle(() => {
//     return {
//       transform: [{
//         scale: loadDone.value ? 0 : 1
//       }]
//     }
//   })
//
//   const onProgress = (data) => {
//     loadDone.value = true
//     // onProgressWatchVideo()
//     if (!useVlc) {
//       if (duration.current !== 0) {
//         currentTime.current = Number(data.currentTime)
//         sliderRef.current?.setNativeProps({
//           value: currentTime.current
//         })
//       }
//       return
//     }
//
//
//     currentTime.current = Number(data.currentTime / 1000)
//
//     if (duration.current === 0 && data.duration > 0) {
//       duration.current = Number(data.duration / 1000)
//       sliderRef.current?.setNativeProps({
//         maximumValue: Number(duration.current),
//       })
//     }
//
//     if (data.duration > 0) {
//       sliderRef.current?.setNativeProps({
//         value: currentTime.current
//       })
//     }
//   }
//
//   const onSlidingComplete = (value) => {
//     if (duration.current > 0) {
//       videoRef.current?.setNativeProps({
//         paused: false,
//       })
//       videoRef.current?.seek(useVlc ? value / duration.current : value)
//     } else {
//       videoRef.current?.setNativeProps({
//         paused: false,
//       })
//     }
//   }
//
//   const styleAction = useAnimatedStyle(() => {
//     return {
//       opacity: interpolate(showOptions.value, [0, 1], [0, 1], Extrapolate.CLAMP)
//     }
//   })
//
//   const styleButton = useAnimatedStyle(() => {
//     return {
//       transform: [{
//         scale: interpolate(showOptions.value, [0, 1], [0, 1], Extrapolate.CLAMP)
//       }]
//     }
//   })
//
//   const stylePlayButton = useAnimatedStyle(() => {
//     return {
//       opacity: interpolate(aniPause.value, [0, 1], [1, 0], Extrapolate.CLAMP)
//     }
//   })
//
//   const stylePauseButton = useAnimatedStyle(() => {
//     return {
//       opacity: interpolate(aniPause.value, [0.5, 1], [0, 1], Extrapolate.CLAMP)
//     }
//   })
//
//   const onPressPause = () => {
//     pausedRef.current = !pausedRef.current
//     aniPause.value = withTiming(pausedRef.current ? 1 : 0, {duration: 300})
//     videoRef.current?.setNativeProps({paused: pausedRef.current})
//     //set lại hiển thị bộ option chứ không thì sẽ ăn cái gesture handle rồi ẩn đi mất
//     showOptions.value = withTiming(1, {duration: 0}, (f1) => {
//       if (f1) {
//         showOptions.value = withDelay(2000, withTiming(0, {duration: 300}))
//       }
//     })
//   }
//
//   const onPressReplay = () => {
//     if (duration.current === 0) {
//       return
//     }
//     currentTime.current = Math.max(0, currentTime.current - 10)
//     sliderRef.current?.setNativeProps({
//       value: currentTime.current
//     })
//     const timeSeek = useVlc ? (currentTime.current / duration.current).toFixed(10) : currentTime.current
//     videoRef.current?.seek(timeSeek)
//     showOptions.value = withTiming(1, {duration: 0}, (f1) => {
//       if (f1) {
//         showOptions.value = withDelay(2000, withTiming(0, {duration: 300}))
//       }
//     })
//   }
//
//   const onPressForward = () => {
//     if (duration.current === 0) {
//       return
//     }
//     currentTime.current = Math.min(duration.current - 3, currentTime.current + 10)
//     sliderRef.current?.setNativeProps({
//       value: currentTime.current
//     })
//     const timeSeek = useVlc ? currentTime.current / duration.current : currentTime.current
//     videoRef.current?.seek(timeSeek)
//     showOptions.value = withTiming(1, {duration: 0}, (f1) => {
//       if (f1) {
//         showOptions.value = withDelay(2000, withTiming(0, {duration: 300}))
//       }
//     })
//   }
//
//   const onPressFullScreen = () => {
//     console.log("onPressFullScreen");
//     isFullScreen.current = !isFullScreen.current
//     onPressLanscape?.(isFullScreen.current)
//     if (changeOrientation) {
//       if (isFullScreen.current) {
//         Orientation.lockToLandscape()
//       } else {
//         Orientation.lockToPortrait()
//       }
//     }
//
//     showOptions.value = withTiming(1, {duration: 0}, (f1) => {
//       if (f1) {
//         showOptions.value = withDelay(2000, withTiming(0, {duration: 300}))
//       }
//     })
//   }
//
//   const onPressMute = () => {
//     showOptions.value = withTiming(1, {duration: 0}, (f1) => {
//       if (f1) {
//         showOptions.value = withDelay(2000, withTiming(0, {duration: 300}))
//       }
//     })
//     setMuted(prev => !prev)
//   }
//
//   const onPressView = () => {
//     showOptions.value = withTiming(showOptions.value === 0 ? 1 : 0, {duration: 300}, (f1) => {
//       if (f1) {
//         showOptions.value = withDelay(2000, withTiming(0, {duration: 300}))
//       }
//     })
//   }
//
//   useEffect(() => {
//     console.log(shouldCountToMarkDone, "shouldCountToMarkDone")
//     if (refIntervalCountDown.current) {
//       clearInterval(refIntervalCountDown.current)
//       refIntervalCountDown.current = undefined;
//     }
//     if (shouldCountToMarkDone) {
//       refIntervalCountDown.current = setInterval(() => {
//         onProgressWatchVideo()
//       }, 995)
//     }
//
//     return (() => {
//       if (refIntervalCountDown.current) {
//         clearInterval(refIntervalCountDown.current)
//         refIntervalCountDown.current = undefined;
//       }
//     })
//   }, [shouldCountToMarkDone, url]);
//
//   const onProgressWatchVideo = () => {
//     if (!markDoneCourse) {
//       return
//     }
//     countTimeoutDone.current += 1;
//     if ((countTimeoutDone.current / duration.current) >= PERCENT_DONE_VIDEO && !isDoneCourse.current) {
//       isDoneCourse.current = true
//       console.log("call done course");
//       markDoneCourse?.();
//
//       if (refIntervalCountDown.current) {
//         clearInterval(refIntervalCountDown.current)
//         refIntervalCountDown.current = undefined;
//       }
//     }
//   }
//
//   const renderVideo = () => {
//     if (!useVlc) {
//       return (
//         <Video
//           pictureInPicture={false}
//           ref={videoRef}
//           progressUpdateInterval={995}
//           style={StyleSheet.absoluteFill}
//           resizeMode={isLanscapeVideo ? "contain" : "cover"}
//           source={{uri: url}}
//           onLoad={(data) => {
//             console.log("onLoad Video", data);
//             countTimeoutDone.current = 0
//             loadDone.value = true
//             duration.current = data.duration
//             sliderRef.current?.setNativeProps({
//               maximumValue: Number(duration.current)
//             })
//             if (data?.naturalSize?.orientation) {
//               setIsLanscapeVideo(data?.naturalSize?.orientation === "landscape")
//             }
//
//             setTimeout(() => {
//               if (currentTime.current === 0) {
//                 videoRef.current?.setNativeProps({paused: false})
//               }
//             }, 0);
//           }}
//           onProgress={onProgress}
//           onEnded={(data) => console.log("onEnded", data)}
//           muted={muted}
//           repeat={false}
//         />
//       )
//     }
//
//     if (!ready) {
//       return null
//     }
//
//     return (
//       <VLCPlayer
//         progressUpdateInterval={995}
//         ref={videoRef}
//         style={[{width: "100%", height: "100%"}]}
//         resizeMode={!isLanscapeVideo ? "contain" : "cover"}
//         source={{uri: url}}
//         onLoad={(data) => {
//           console.log("onLoadVlc", data);
//           countTimeoutDone.current = 0;
//           loadDone.value = true
//           duration.current = Number(data.duration / 1000)
//           sliderRef.current?.setNativeProps({
//             maximumValue: Number(duration.current)
//           })
//
//           setTimeout(() => {
//             if (currentTime.current === 0) {
//               videoRef.current?.setNativeProps({paused: false})
//             }
//           }, 2000);
//
//           if (needPaused.current) {
//             needPaused.current = false
//             videoRef.current?.setNativeProps({paused: true})
//           } else {
//             setTimeout(() => {
//               videoRef.current?.setNativeProps({paused: false})
//             }, 0);
//           }
//           if (data?.videoSize?.height) {
//             setIsLanscapeVideo(data?.videoSize?.height > data?.videoSize?.width)
//           }
//         }}
//         onProgress={onProgress}
//         onStopped={() => {
//           if (!repeat) {
//             needPaused.current = true
//           }
//
//           setReady(false)
//         }}
//         paused={true}
//         onEnded={(data) => console.log("onEnded", data)}
//         muted={muted}
//         repeat={false}
//       />
//     )
//   }
//
//   return (
//     <Pressable style={[styles.container]} onPress={onPressView}>
//       <Animated.BView style={[styles.loading, styleVideo]}>
//         {
//           thumbnail ? (
//             <FastImage
//               style={StyleSheet.absoluteFillObject}
//               source={{uri: thumbnail}}
//             />
//           ) : null
//         }
//
//         <ActivityIndicator size={"large"} color={theme.textMain}/>
//
//       </Animated.BView>
//
//       <BView style={[{...StyleSheet.absoluteFillObject}]}>
//         {renderVideo()}
//       </BView>
//
//
//       <Animated.BView style={[styles.actionVideo, styleAction]}>
//         <Animated.BView style={[styles.centerContent, {flexDirection: "row", gap: HS._20}, styleButton]}>
//           <Pressable onPress={onPressReplay} hitSlop={HIT_SLOP_EXPAND_20}>
//             <IconReplay size={MHS._40} color={theme.textLight}/>
//           </Pressable>
//           <Pressable onPress={onPressPause} hitSlop={HIT_SLOP_EXPAND_20}>
//             <Animated.BView style={[stylePlayButton]}>
//               <IconPause size={MHS._40} color={theme.textLight}/>
//             </Animated.BView>
//             <Animated.BView style={[{position: "absolute"}, stylePauseButton]}>
//               <IconPlay size={MHS._40} color={theme.textLight}/>
//             </Animated.BView>
//           </Pressable>
//           <Pressable onPress={onPressForward} hitSlop={HIT_SLOP_EXPAND_20}>
//             <IconFoward size={MHS._40} color={theme.textLight}/>
//           </Pressable>
//
//         </Animated.BView>
//         {
//           Device.isIos && (
//             <Slider
//               //@ts-ignore
//               ref={sliderRef}
//               style={styles.slider}
//               minimumValue={0}
//               maximumValue={0}
//               minimumTrackTintColor={RootColor.RedNegative}
//               thumbTintColor={RootColor.RedNegative}
//               hitSlop={HIT_SLOP_EXPAND_20}
//               onSlidingStart={() => {
//                 loadDone.value = false
//                 videoRef.current?.setNativeProps({paused: true})
//               }}
//               onSlidingComplete={onSlidingComplete}
//             />
//           )
//         }
//         <Pressable style={[styles.bottonMuted, {right: hasFullScreen ? HS._40 : HS._16}]} onPress={onPressMute}
//                    hitSlop={HIT_SLOP_EXPAND_10}>
//           {
//             muted ? (
//               <IconMuted size={MHS._24} color={theme.textLight}/>
//             ) : (
//               <IconSpeaker size={MHS._24} color={theme.textLight}/>
//             )
//           }
//         </Pressable>
//
//       </Animated.BView>
//       {
//         Device.isAndroid && (
//           <Slider
//             //@ts-ignore
//             ref={sliderRef}
//             style={styles.slider}
//             minimumValue={0}
//             maximumValue={0}
//             minimumTrackTintColor={RootColor.RedNegative}
//             thumbTintColor={RootColor.RedNegative}
//             hitSlop={HIT_SLOP_EXPAND_20}
//             onSlidingStart={() => {
//               loadDone.value = false
//               videoRef.current?.setNativeProps({paused: true})
//             }}
//             onSlidingComplete={onSlidingComplete}
//           />
//         )
//       }
//       {
//         hasFullScreen ? (
//           <TouchableWithoutFeedback onPress={onPressFullScreen} hitSlop={HIT_SLOP_EXPAND_20}>
//             <Animated.BView style={[styles.iconFullScreen, styleAction]}>
//               <IconFullScreen size={MHS._24} color={theme.textLight}/>
//             </Animated.BView>
//           </TouchableWithoutFeedback>
//
//         ) : null
//       }
//     </Pressable>
//   )
// }
//
// const createStyles = (theme: SystemTheme) => {
//   return StyleSheet.create({
//     container: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: "#000000",
//       justifyContent: "center",
//       alignItems: "center"
//     },
//     bottonMuted: {
//       position: "absolute",
//       bottom: VS._12,
//       backgroundColor: `${theme.backgroundTextInput}40`,
//       padding: VS._6,
//       borderRadius: MHS._16,
//       zIndex: 100
//     },
//     viewEndVideo: {
//       position: "absolute",
//       width: MHS._20 * 2,
//       height: MHS._20 * 2,
//       borderRadius: MHS._20,
//       borderWidth: 2,
//       borderColor: "white",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 11
//     },
//     slider: {
//       width: "100%",
//       position: "absolute",
//       bottom: VS._40,
//       left: 0,
//       right: 0,
//       zIndex: 1000
//     },
//     actionVideo: {
//       ...StyleSheet.absoluteFillObject,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "rgba(0, 0, 0, 0.4)",
//       zIndex: 100
//     },
//     centerContent: {
//       justifyContent: "center",
//       alignItems: "center"
//     },
//     iconFullScreen: {
//       position: "absolute",
//       right: HS._10,
//       bottom: VS._20,
//       zIndex: 100,
//     },
//     loading: {
//       ...StyleSheet.absoluteFillObject,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "transparent",
//       zIndex: 10
//     }
//   })
// }
//
// export default forwardRef(PreviewVideoMediaComponent);
