---
sidebar_position: 6
---

# Image Optimization

## Understanding Image Performance Challenges

Images in React Native can cause performance issues due to:

- **Large file sizes**: High-resolution images consume bandwidth and storage
- **Memory usage**: Unoptimized images can cause memory spikes and crashes
- **Decoding overhead**: Image decoding happens on the main thread by default
- **Rendering cost**: Complex image operations can slow down UI rendering
- **Cache management**: Inefficient caching leads to redundant downloads and processing

## Key Optimization Techniques

### 1. Using FastImage Instead of Standard Image Component

The standard React Native `Image` component has several limitations. `FastImage` provides significant performance improvements:

```jsx
import FastImage from "react-native-fast-image";

const OptimizedAvatar = ({ uri, size }) => (
  <FastImage
    style={{ width: size, height: size, borderRadius: size / 2 }}
    source={{
      uri,
      priority: FastImage.priority.high,
      cache: FastImage.cacheControl.immutable,
    }}
    resizeMode={FastImage.resizeMode.cover}
  />
);
```

Key benefits of FastImage:

- **Better caching**: Uses OkHttp's disk caching on Android and SDWebImage on iOS
- **Priority control**: Allows setting loading priorities for critical images
- **Cache control**: Provides fine-grained cache control options
- **Preloading**: Supports preloading images before they're needed
- **Performance**: Significantly reduces image loading jank and stuttering

Advanced usage with preloading:

```jsx
// Preload important images when app starts
const preloadImages = () => {
  const uris = [
    "https://example.com/header-image.jpg",
    "https://example.com/profile-image.jpg",
    // More critical images
  ];

  FastImage.preload(uris.map((uri) => ({ uri })));
};

// Preload images for the next screen
const prepareNextScreen = (nextScreenImages) => {
  FastImage.preload(
    nextScreenImages.map((image) => ({
      uri: image.uri,
      priority: FastImage.priority.normal,
    }))
  );
};
```

### 2. Implementing Native Image Components

For high-performance image-intensive features, consider implementing native image components:

```jsx
import { requireNativeComponent, Platform } from "react-native";

// Custom native component optimized for image grids
const NativeImageGrid = Platform.select({
  ios: () => requireNativeComponent("RCTOptimizedImageGrid"),
  android: () => requireNativeComponent("OptimizedImageGridView"),
  default: () => View,
})();

const HighPerformanceImageGrid = ({ images, onImagePress }) => (
  <NativeImageGrid
    images={images.map((img) => img.url)}
    onImagePress={onImagePress}
    style={styles.imageGrid}
    placeholderColor="#E1E2E3"
    loadingIndicatorColor="#0066CC"
    imageFitMode="cover"
  />
);
```

Benefits of native image components:

- **Optimized rendering**: Direct use of native image libraries (Glide/Fresco on Android, SDWebImage on iOS)
- **Memory management**: Better memory handling for large image collections
- **Recycling**: Efficient view recycling for image lists and grids
- **Threading**: Image processing on background threads by default
- **Hardware acceleration**: Better utilization of GPU for image rendering

### 3. Progressive Image Loading

Implement progressive image loading for a better user experience:

```jsx
const ProgressiveImage = ({ thumbnailSource, source, style, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailAnimated = useRef(new Animated.Value(0)).current;
  const imageAnimated = useRef(new Animated.Value(0)).current;

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    Animated.timing(imageAnimated, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={[style, { opacity: thumbnailAnimated }]}
        onLoad={handleThumbnailLoad}
        blurRadius={2}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
        onLoad={handleImageLoad}
      />
      {!isLoaded && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0066CC" />
        </View>
      )}
    </View>
  );
};

// Usage
<ProgressiveImage
  thumbnailSource={{ uri: `${image.uri}?width=50` }}
  source={{ uri: image.uri }}
  style={styles.image}
/>;
```

### 4. Image Resizing and Compression

Resize and compress images before displaying them:

```jsx
import ImageResizer from "react-native-image-resizer";

const optimizeImage = async (
  imageUri,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 80
) => {
  try {
    const result = await ImageResizer.createResizedImage(
      imageUri,
      maxWidth,
      maxHeight,
      "JPEG",
      quality,
      0,
      undefined,
      false,
      { mode: "contain", onlyScaleDown: true }
    );

    return result.uri;
  } catch (error) {
    console.error("Image optimization failed:", error);
    return imageUri; // Return original if optimization fails
  }
};

// Usage in component
const OptimizedImageUploader = ({ originalUri }) => {
  const [optimizedUri, setOptimizedUri] = useState(null);

  useEffect(() => {
    const prepareImage = async () => {
      const optimized = await optimizeImage(originalUri);
      setOptimizedUri(optimized);
    };

    prepareImage();
  }, [originalUri]);

  return (
    <View style={styles.container}>
      {optimizedUri ? (
        <FastImage source={{ uri: optimizedUri }} style={styles.image} />
      ) : (
        <ActivityIndicator size="large" color="#0066CC" />
      )}
    </View>
  );
};
```

### 5. Static Content Pre-compilation

Pre-build templates for static content including images to improve performance:

```jsx
// Pre-build templates for static content
const TEMPLATES = {
  standard: ({ title, subtitle, image }) => (
    <View style={styles.standardTemplate}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <FastImage source={{ uri: image }} style={styles.image} />
    </View>
  ),
  compact: ({ title, image }) => (
    <View style={styles.compactTemplate}>
      <FastImage source={{ uri: image }} style={styles.smallImage} />
      <Text style={styles.smallTitle}>{title}</Text>
    </View>
  ),
  hero: ({ title, image, description }) => (
    <View style={styles.heroTemplate}>
      <FastImage
        source={{ uri: image }}
        style={styles.heroImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      >
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroDescription}>{description}</Text>
      </LinearGradient>
    </View>
  ),
};

// Usage
const TemplatedItem = ({ item }) => {
  const Template = TEMPLATES[item.templateType] || TEMPLATES.standard;
  return <Template {...item.data} />;
};

// Example implementation
const ImageGallery = ({ items }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TemplatedItem item={item} />}
      getItemLayout={(data, index) => ({
        length: item.templateType === "hero" ? 300 : 200,
        offset: item.templateType === "hero" ? 300 * index : 200 * index,
        index,
      })}
      removeClippedSubviews={true}
    />
  );
};

// Styles for templates
const styles = StyleSheet.create({
  standardTemplate: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  compactTemplate: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
  },
  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  smallTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  heroTemplate: {
    height: 300,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    padding: 16,
    justifyContent: "flex-end",
  },
  heroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroDescription: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
  },
});
```

Benefits of static content pre-compilation:

- **Reduced render time**: Templates are pre-defined and optimized
- **Consistent UI**: Ensures visual consistency across the app
- **Memory efficiency**: Reuses the same template structure for multiple items
- **Reduced JS bridge traffic**: Minimizes prop changes and re-renders
- **Optimized image loading**: Templates can include optimized image loading strategies

### 6. Bitmap Caching for Static Images

For static images that rarely change, use bitmap caching:

```jsx
const StaticImageComponent = ({ imageUrl, title }) => (
  <View
    style={styles.container}
    shouldRasterizeIOS={true} // iOS optimization
    renderToHardwareTextureAndroid={true} // Android optimization
  >
    <FastImage
      source={{ uri: imageUrl }}
      style={styles.image}
      resizeMode={FastImage.resizeMode.cover}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);
```

When to use bitmap caching:

- Static headers with images
- Image-based UI elements that don't change frequently
- Complex image compositions with overlays or effects
- Images with applied transformations or filters

### 7. Lazy Loading Images

Implement lazy loading for images in long scrolling views:

```jsx
const LazyLoadedImage = ({ item, isVisible }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !loaded) {
      // Only start loading when visible
      setLoaded(true);
    }
  }, [isVisible]);

  if (!loaded) {
    return <View style={[styles.imagePlaceholder, { height: item.height }]} />;
  }

  return (
    <FastImage
      source={{ uri: item.imageUrl }}
      style={[styles.image, { height: item.height }]}
      onLoad={() => console.log(`Image ${item.id} loaded`)}
    />
  );
};

// In a list component
const ImageList = ({ images }) => {
  const [visibleIndices, setVisibleIndices] = useState(new Set());

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    const newVisible = new Set(viewableItems.map((item) => item.index));
    setVisibleIndices(newVisible);
  }, []);

  const renderItem = ({ item, index }) => (
    <LazyLoadedImage item={item} isVisible={visibleIndices.has(index)} />
  );

  return (
    <FlashList
      data={images}
      renderItem={renderItem}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 20,
        minimumViewTime: 300,
      }}
    />
  );
};
```

## Measuring Image Performance

To identify image performance issues:

1. **Memory Profiling**: Monitor memory usage during image-heavy operations
2. **Network Monitoring**: Track image download sizes and times
3. **Frame Rate Analysis**: Measure FPS drops during image loading and scrolling
4. **Startup Time**: Measure impact of preloaded images on app startup time

## Best Practices Summary

1. **Use FastImage** instead of the standard Image component
2. **Implement native components** for image-intensive features
3. **Apply progressive loading** for better user experience
4. **Resize and compress images** before displaying
5. **Pre-compile static content** with optimized templates
6. **Use bitmap caching** for static images
7. **Implement lazy loading** for images in scrolling views
8. **Choose appropriate image formats** for different use cases
9. **Manage memory** in image-heavy screens
10. **Measure and optimize** based on performance metrics

By implementing these optimization techniques, you can significantly improve image performance in your React Native application, leading to faster load times, smoother scrolling, and better overall user experience.
