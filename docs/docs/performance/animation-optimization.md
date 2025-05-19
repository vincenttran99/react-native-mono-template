---
sidebar_position: 5
---

# Animation Optimization

Animations are a critical part of creating engaging mobile experiences, but they can also be a major source of performance issues in React Native applications. This guide focuses on techniques to optimize animations for smooth, 60fps performance.

## Understanding Animation Performance Challenges

React Native animations can suffer from performance issues due to:

- **JavaScript Thread Blocking**: Traditional animations run on the JS thread, competing with other operations
- **Bridge Overhead**: Communication between JS and native threads adds latency
- **Layout Calculations**: Complex animations can trigger expensive layout recalculations
- **Render Cycles**: Animations can cause cascading re-renders throughout your component tree

## Key Optimization Techniques

### 1. Using the Native Driver

The `useNativeDriver` option moves animation execution to the native UI thread, bypassing JavaScript thread limitations:

```jsx
import { Animated } from "react-native";

const AnimatedItem = ({ item }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Run animations in parallel
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true, // Critical for performance
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true, // Critical for performance
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text>{item.title}</Text>
    </Animated.View>
  );
};
```

Native driver limitations:

- Only supports non-layout properties: `opacity`, `transform`
- Cannot animate `width`, `height`, `position`, `margin`, etc.
- Cannot be used with `Animated.event` for gesture-based animations that modify layout

Best practices:

- Always use `useNativeDriver: true` when animating supported properties
- Prefer `transform` animations over layout changes
- Use `translateX/Y` instead of `left/top` position changes
- Combine multiple animations with `Animated.parallel` for efficiency

### 2. Using React Native Reanimated 2

Reanimated 2 provides a more powerful alternative to the standard Animated API, using worklets to run animations directly on the UI thread:

```jsx
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
} from "react-native-reanimated";

const WorkletOptimizedItem = ({ item }) => {
  // Shared values are accessible from both JS and UI threads
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  // Styles defined with useAnimatedStyle run on the UI thread
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    // Animations run directly on the UI thread
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0, { damping: 15 });
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Text>{item.title}</Text>
    </Animated.View>
  );
};
```

Advanced Reanimated 2 features:

#### Gesture Handling

```jsx
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const DraggableCard = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gesture handler runs on the UI thread
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text>Drag me!</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
```

#### Layout Animations

Reanimated 2 can animate layout properties that the native driver cannot:

```jsx
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Layout,
} from "react-native-reanimated";

const ExpandingCard = ({ expanded }) => {
  const height = useSharedValue(60);

  useEffect(() => {
    height.value = withTiming(expanded ? 200 : 60, { duration: 300 });
  }, [expanded]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <Animated.View
      style={[styles.card, animatedStyle]}
      layout={Layout.duration(300)} // Animate layout changes
    >
      <Text>Card Content</Text>
      {expanded && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
        >
          <Text>Expanded content here...</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};
```

### 3. GreenSock-like Animation System

Creating a high-performance animation system inspired by GreenSock can significantly improve animation fluidity and control:

```jsx
// High-performance animation system based on requestAnimationFrame
class PerformanceAnimator {
  constructor() {
    this.animations = new Map();
    this.running = false;
    this.tick = this.tick.bind(this);
  }

  animate(id, options) {
    const {
      target,
      duration = 300,
      from,
      to,
      onUpdate,
      onComplete,
      easing,
    } = options;

    // Store animation configuration
    this.animations.set(id, {
      startTime: Date.now(),
      endTime: Date.now() + duration,
      from,
      to,
      target,
      onUpdate,
      onComplete,
      easing: easing || this.easeOutQuad,
    });

    // Start animation loop if not already running
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.tick);
    }

    // Return control object
    return {
      cancel: () => this.animations.delete(id),
      pause: () => {
        const anim = this.animations.get(id);
        if (anim) {
          anim.paused = true;
          anim.pausedTime = Date.now();
        }
      },
      resume: () => {
        const anim = this.animations.get(id);
        if (anim && anim.paused) {
          const pauseDuration = Date.now() - anim.pausedTime;
          anim.startTime += pauseDuration;
          anim.endTime += pauseDuration;
          anim.paused = false;
        }
      },
    };
  }

  // Easing functions
  easeOutQuad(t) {
    return t * (2 - t);
  }

  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  easeOutElastic(t) {
    const p = 0.3;
    return (
      Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
    );
  }

  // Animation loop
  tick() {
    const now = Date.now();

    for (const [id, anim] of this.animations.entries()) {
      // Skip paused animations
      if (anim.paused) continue;

      const {
        startTime,
        endTime,
        from,
        to,
        target,
        onUpdate,
        onComplete,
        easing,
      } = anim;

      if (now >= endTime) {
        // Animation complete
        onUpdate && onUpdate(to, 1, target);
        onComplete && onComplete();
        this.animations.delete(id);
      } else {
        // Animation in progress
        const rawProgress = (now - startTime) / (endTime - startTime);
        const progress = easing(rawProgress);

        // Calculate current value based on animation type
        let value;
        if (typeof from === "object" && typeof to === "object") {
          // Handle object animations (like multiple properties)
          value = {};
          for (const key in from) {
            if (to.hasOwnProperty(key)) {
              value[key] = from[key] + (to[key] - from[key]) * progress;
            }
          }
        } else {
          // Handle simple value animations
          value = from + (to - from) * progress;
        }

        onUpdate && onUpdate(value, progress, target);
      }
    }

    // Continue animation loop if animations remain
    if (this.animations.size > 0) {
      requestAnimationFrame(this.tick);
    } else {
      this.running = false;
    }
  }

  // Timeline functionality
  createTimeline() {
    return new AnimationTimeline(this);
  }
}

// Timeline implementation for sequence control
class AnimationTimeline {
  constructor(animator) {
    this.animator = animator;
    this.sequence = [];
    this.currentTime = 0;
    this.controls = [];
  }

  add(options, position) {
    const startTime = position === undefined ? this.currentTime : position;
    const duration = options.duration || 300;

    this.sequence.push({
      ...options,
      startTime,
    });

    this.currentTime = Math.max(this.currentTime, startTime + duration);
    return this;
  }

  play() {
    // Sort by start time
    this.sequence.sort((a, b) => a.startTime - b.startTime);

    // Start time reference
    const timelineStart = Date.now();

    // Process each animation
    this.sequence.forEach((item) => {
      setTimeout(() => {
        const control = this.animator.animate(
          `timeline-${Date.now()}-${Math.random()}`,
          item
        );
        this.controls.push(control);
      }, item.startTime);
    });

    return {
      cancel: () => this.controls.forEach((control) => control.cancel()),
      pause: () => this.controls.forEach((control) => control.pause()),
      resume: () => this.controls.forEach((control) => control.resume()),
    };
  }
}

// Usage example
const animator = new PerformanceAnimator();

const AnimatedCard = ({ item }) => {
  const ref = useRef();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Create animation timeline
    const timeline = animator.createTimeline();

    if (expanded) {
      timeline
        .add({
          target: ref.current,
          from: { opacity: 0.5, scale: 1 },
          to: { opacity: 1, scale: 1.05 },
          duration: 150,
          easing: animator.easeOutQuad,
          onUpdate: (value) => {
            if (ref.current) {
              ref.current.setNativeProps({
                style: {
                  opacity: value.opacity,
                  transform: [{ scale: value.scale }],
                },
              });
            }
          },
        })
        .add({
          target: ref.current,
          from: { scale: 1.05 },
          to: { scale: 1 },
          duration: 150,
          easing: animator.easeOutElastic,
          onUpdate: (value) => {
            if (ref.current) {
              ref.current.setNativeProps({
                style: {
                  transform: [{ scale: value.scale }],
                },
              });
            }
          },
        });
    } else {
      // Collapse animation
      timeline.add({
        target: ref.current,
        from: { opacity: 1, scale: 1 },
        to: { opacity: 0.5, scale: 0.95 },
        duration: 200,
        easing: animator.easeInOutQuad,
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.setNativeProps({
              style: {
                opacity: value.opacity,
                transform: [{ scale: value.scale }],
              },
            });
          }
        },
      });
    }

    const control = timeline.play();

    return () => control.cancel();
  }, [expanded]);

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <View ref={ref} style={styles.card}>
        <Text>{item.title}</Text>
        {expanded && <Text>{item.description}</Text>}
      </View>
    </TouchableOpacity>
  );
};
```

Key benefits of a custom animation system:

- **Fine-grained control**: Custom easing functions and precise timing
- **Performance optimization**: Direct manipulation of native properties
- **Animation sequencing**: Timeline-based control similar to GreenSock
- **Reduced overhead**: Minimal bridge communication
- **Memory efficiency**: Proper cleanup and animation pooling

### 4. GPU-accelerated Filters and Effects

Leveraging GPU for visual effects dramatically improves performance:

```jsx
import { BlurView } from "@react-native-community/blur";
import { SurfaceView } from "react-native-surface";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

const GPUAcceleratedCard = ({ item }) => {
  return (
    <SurfaceView
      style={styles.container}
      blending="premultiplied" // GPU blending mode
    >
      {/* Hardware-accelerated image loading */}
      <FastImage
        source={{ uri: item.imageUrl }}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* GPU-accelerated blur effect */}
      <BlurView
        style={styles.blurOverlay}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      >
        {/* Hardware-accelerated gradient */}
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)", "transparent"]}
          style={styles.gradient}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </LinearGradient>
      </BlurView>

      {/* Content container with hardware acceleration hints */}
      <View
        style={styles.contentContainer}
        shouldRasterizeIOS={true}
        renderToHardwareTextureAndroid={true}
      >
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </SurfaceView>
  );
};

// Optimized styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden", // Important for performance
    // Use transform instead of positioning where possible
    transform: [{ translateZ: 0 }], // Hardware acceleration hint
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  gradient: {
    width: "100%",
    height: "100%",
    padding: 16,
    justifyContent: "flex-end",
  },
  contentContainer: {
    padding: 16,
    marginTop: 100,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
```

GPU acceleration techniques:

- **shouldRasterizeIOS**: Caches a flattened representation of the view hierarchy
- **renderToHardwareTextureAndroid**: Renders view to an off-screen buffer
- **FastImage**: Uses native image loading and caching
- **BlurView**: Offloads blur calculations to GPU
- **SurfaceView**: Provides direct access to hardware rendering
- **LinearGradient**: Hardware-accelerated gradient rendering
- **transform: `[{ translateZ: 0 }]`** Forces hardware acceleration on some platforms

Performance considerations:

- Only use GPU acceleration for complex views that benefit from it
- Excessive use can increase memory consumption
- Monitor for memory leaks and performance regressions
- Test on lower-end devices to ensure good performance across the board

### 5. Gesture-driven Animation Optimization

Optimizing animations triggered by user gestures requires special attention:

```jsx
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const OptimizedGestureCard = ({ item, onOpen }) => {
  // Shared values for gesture tracking
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const isActive = useSharedValue(false);

  // Pre-compute gesture boundaries for performance
  const SWIPE_THRESHOLD = 100;
  const MAX_ROTATION = 15;

  // Optimized pan gesture handler
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      // Store initial position
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;

      // Immediate visual feedback
      scale.value = withTiming(1.05, { duration: 150 });
      isActive.value = true;
    },
    onActive: (event, ctx) => {
      // Apply movement with constraints
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;

      // Calculate rotation based on horizontal movement (feels more natural)
      const rotationValue = interpolate(
        translateX.value,
        [-200, 0, 200],
        [MAX_ROTATION * -1, 0, MAX_ROTATION],
        Extrapolate.CLAMP
      );

      // Apply rotation through transform style in useAnimatedStyle
    },
    onEnd: (event, ctx) => {
      // Check if swipe threshold was exceeded
      const swipedRight = event.translationX > SWIPE_THRESHOLD;
      const swipedLeft = event.translationX < -SWIPE_THRESHOLD;
      const swipedUp = event.translationY < -SWIPE_THRESHOLD;

      if (swipedRight) {
        // Swipe right animation
        translateX.value = withTiming(500, { duration: 300 });
        cardOpacity.value = withTiming(0, { duration: 300 });

        // Notify JS thread after animation completes
        runOnJS(onOpen)(item, "right");
      } else if (swipedLeft) {
        // Swipe left animation
        translateX.value = withTiming(-500, { duration: 300 });
        cardOpacity.value = withTiming(0, { duration: 300 });

        runOnJS(onOpen)(item, "left");
      } else if (swipedUp) {
        // Swipe up animation
        translateY.value = withTiming(-500, { duration: 300 });
        cardOpacity.value = withTiming(0, { duration: 300 });

        runOnJS(onOpen)(item, "up");
      } else {
        // Return to original position with spring physics
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
        scale.value = withTiming(1, { duration: 150 });
      }

      isActive.value = false;
    },
  });

  // Double tap handler with optimized animation
  const doubleTapHandler = useAnimatedGestureHandler({
    onActive: () => {
      // Sequence of animations for double-tap
      scale.value = withTiming(1.2, { duration: 100 }, () => {
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 150,
        });
      });

      // Notify JS thread
      runOnJS(onOpen)(item, "doubleTap");
    },
  });

  // Optimized animated styles
  const animatedStyle = useAnimatedStyle(() => {
    // Calculate rotation based on horizontal movement
    const rotationValue = interpolate(
      translateX.value,
      [-200, 0, 200],
      [MAX_ROTATION * -1, 0, MAX_ROTATION],
      Extrapolate.CLAMP
    );

    // Shadow intensity based on elevation
    const shadowOpacity = interpolate(
      scale.value,
      [1, 1.1],
      [0.1, 0.3],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotateZ: `${rotationValue}deg` },
      ],
      opacity: cardOpacity.value,
      backgroundColor: isActive.value
        ? "rgba(255,255,255,1)"
        : "rgba(245,245,245,1)",
      shadowOpacity: shadowOpacity,
      shadowRadius: 10 * scale.value,
      elevation: 5 * scale.value,
    };
  });

  return (
    <TapGestureHandler numberOfTaps={2} onGestureEvent={doubleTapHandler}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <FastImage
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};
```

Key benefits of optimized gesture animations:

- **Worklet-based execution**: All animation logic runs on the UI thread
- **Immediate feedback**: Visual responses happen instantly without JS thread involvement
- **Physics-based animations**: Natural-feeling interactions with spring physics
- **Gesture prediction**: The system can predict gesture outcomes for smoother animations
- **Reduced bridge traffic**: Minimal communication between JS and UI threads

### 6. Hardware-accelerated Animation Paths

For complex path animations, leveraging hardware acceleration can dramatically improve performance:

```jsx
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const HardwareAcceleratedPathAnimation = () => {
  // Animation progress value
  const progress = useSharedValue(0);

  // Start animation on mount
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      -1, // Infinite repetitions
      true // Reverse on each iteration
    );
  }, []);

  // Animated path properties
  const animatedProps = useAnimatedProps(() => {
    // Calculate path based on progress
    const p = progress.value;

    // Create a dynamic path that changes with animation progress
    // This example creates a morphing curve
    const startX = 50;
    const startY = 100;
    const endX = 300;
    const endY = 100;
    const controlX1 = 100 + 100 * Math.sin(p * Math.PI);
    const controlY1 = 50 + 50 * Math.cos(p * Math.PI * 2);
    const controlX2 = 250 - 100 * Math.sin(p * Math.PI);
    const controlY2 = 150 - 50 * Math.cos(p * Math.PI * 2);

    return {
      d: `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`,
      stroke: `rgba(${Math.floor(255 * p)}, ${Math.floor(
        100 + 155 * (1 - p)
      )}, ${Math.floor(200 * (1 - p))}, 1)`,
      strokeWidth: 2 + 3 * p,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width="100%" height="200">
        <AnimatedPath animatedProps={animatedProps} fill="none" />
      </Svg>
    </View>
  );
};

// Complex particle system with hardware acceleration
const ParticleSystem = ({ count = 50 }) => {
  const particles = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => ({
        id: i,
        x: useSharedValue(Math.random() * 300),
        y: useSharedValue(Math.random() * 500),
        scale: useSharedValue(0.5 + Math.random() * 1.5),
        rotation: useSharedValue(0),
        opacity: useSharedValue(0.3 + Math.random() * 0.7),
        speed: 0.5 + Math.random() * 2,
      }));
  }, [count]);

  // Animate all particles
  useEffect(() => {
    particles.forEach((particle) => {
      // Create unique animation for each particle
      particle.rotation.value = withRepeat(
        withTiming(2 * Math.PI, {
          duration: 5000 / particle.speed,
          easing: Easing.linear,
        }),
        -1,
        false
      );

      // Floating animation
      const animatePosition = () => {
        const targetX = Math.random() * 300;
        const targetY = Math.random() * 500;
        const duration = 3000 + Math.random() * 5000;

        particle.x.value = withTiming(targetX, {
          duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });

        particle.y.value = withTiming(
          targetY,
          {
            duration,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          () => {
            // When animation completes, start next animation
            runOnJS(animatePosition)();
          }
        );
      };

      // Start animation loop
      animatePosition();
    });
  }, [particles]);

  return (
    <View style={styles.particleContainer}>
      {particles.map((particle) => (
        <ParticleItem key={particle.id} particle={particle} />
      ))}
    </View>
  );
};

const ParticleItem = ({ particle }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: particle.x.value,
      top: particle.y.value,
      opacity: particle.opacity.value,
      transform: [
        { scale: particle.scale.value },
        { rotate: `${particle.rotation.value}rad` },
      ],
    };
  });

  return (
    <Animated.View style={[styles.particle, animatedStyle]}>
      <View style={styles.particleInner} />
    </Animated.View>
  );
};
```

Key benefits of hardware-accelerated path animations:

- **GPU-based rendering**: Path calculations are offloaded to the GPU
- **Complex motion paths**: Support for bezier curves and complex trajectories
- **Smooth transitions**: High frame rates even with many animated elements
- **Dynamic path morphing**: Ability to smoothly transform between different paths
- **Reduced CPU load**: Frees up CPU resources for other tasks

## Measuring Animation Performance

To identify animation performance issues:

1. **Frame Rate Monitoring**: Use the Performance Monitor to track FPS during animations
2. **Systrace**: Capture detailed thread activity on Android
3. **Chrome DevTools**: Profile JavaScript execution time during animations
4. **Interaction Timing**: Measure time between user input and visual response

```jsx
// Simple performance monitoring component
const PerformanceMonitor = ({ children }) => {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastFrameTime = useRef(Date.now());
  const frameId = useRef(null);

  const measureFrameRate = () => {
    frameCount.current += 1;
    const now = Date.now();
    const elapsed = now - lastFrameTime.current;

    if (elapsed >= 1000) {
      setFps(Math.round((frameCount.current * 1000) / elapsed));
      frameCount.current = 0;
      lastFrameTime.current = now;
    }

    frameId.current = requestAnimationFrame(measureFrameRate);
  };

  useEffect(() => {
    frameId.current = requestAnimationFrame(measureFrameRate);
    return () => cancelAnimationFrame(frameId.current);
  }, []);

  return (
    <View style={styles.container}>
      {children}
      <View style={styles.fpsCounter}>
        <Text
          style={[
            styles.fpsText,
            { color: fps > 55 ? "green" : fps > 30 ? "orange" : "red" },
          ]}
        >
          {fps} FPS
        </Text>
      </View>
    </View>
  );
};
```

## Best Practices Summary

When optimizing animations in React Native applications, follow these best practices to achieve smooth, 60fps performance:

### General Performance Optimization

- **Prioritize Native Driver**: Always use `useNativeDriver: true` when possible to offload animations to the UI thread
- **Avoid unnecessary re-renders**: Isolate animated components from their parents to prevent cascading re-renders
- **Use transform properties over layout**: Prefer `translateX/Y` over `left/top` to leverage GPU acceleration
- **Limit concurrent animations**: Reduce the number of simultaneous animations to avoid overloading CPU/GPU
- **Use `requestAnimationFrame` for custom animations**: Synchronize with device render cycles to prevent frame drops

### Reanimated Optimization

- **Utilize worklets for complex logic**: Move animation logic to the UI thread to avoid blocking the JS thread
- **Leverage shared values**: Use `useSharedValue` to share values between JS and UI threads
- **Minimize `runOnJS` calls**: Each call to `runOnJS` incurs a performance cost
- **Use `useDerivedValue` for dependent values**: Calculate derived values on the UI thread
- **Take advantage of Layout Animation API**: Use `Layout.duration()` for complex layout animations

### GPU Acceleration

- **Selectively use `shouldRasterizeIOS` and `renderToHardwareTextureAndroid`**: Apply only to complex views
- **Avoid overusing blur and shadow effects**: These effects are GPU-intensive
- **Use `overflow: 'hidden'` for containers**: Minimize the area that needs redrawing
- **Optimize images**: Use `FastImage` and ensure appropriate image dimensions
- **Apply `transform: [{ translateZ: 0 }]`**: Hint to the renderer to use hardware acceleration

### Gesture-driven Animation Optimization

- **Use `PanResponder` or `react-native-gesture-handler`**: Leverage native gesture APIs
- **Pre-compute thresholds and boundaries**: Define values like `SWIPE_THRESHOLD` in advance
- **Provide immediate visual feedback**: Respond as soon as the user begins interaction
- **Use spring physics for natural feel**: Animations with `withSpring` feel more natural
- **Optimize `onGestureEvent` handlers**: Ensure gesture handlers are lightweight and efficient

### Testing and Monitoring

- **Test on real devices**: Don't rely solely on emulators or high-end devices
- **Use Flipper to analyze performance**: Monitor frame drops and execution time
- **Test on low-end devices**: Ensure smooth experience across a range of devices
- **Monitor memory usage**: Watch for memory leaks from improperly cleaned up animations
- **Measure FPS**: Use tools like `react-native-fps-monitor` to track frame rates

### Special Case Optimization

- **Long lists**: Use `VirtualizedList` or `FlashList` with optimized `CellRendererComponent`
- **Screen transitions**: Use `react-navigation` with optimized animations
- **Charts and graphs**: Consider optimized SVG or Canvas-based libraries
- **Special effects**: Use native libraries like `lottie-react-native` for complex animations

By following these principles, you can create smooth, efficient, and resource-friendly animations in your React Native applications.
