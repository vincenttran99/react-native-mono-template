---
sidebar_position: 1
---

# Re-rendering Optimization

Optimizing re-renders is one of the most effective ways to improve React Native performance. Unnecessary re-renders can significantly impact your app's performance, especially in list components and complex UIs.

## Understanding React's Rendering Mechanism

React's rendering process involves:

1. **Render Phase**: Component functions are called, and React builds a virtual DOM
2. **Reconciliation**: React compares the new virtual DOM with the previous one
3. **Commit Phase**: Actual DOM updates are applied

Optimizing re-renders focuses on minimizing unnecessary work in these phases.

## Key Optimization Techniques

### 1. Memoizing Components with React.memo

`React.memo` is a higher-order component that prevents re-rendering when props haven't changed.

```jsx
// Without optimization - re-renders on every parent render
const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item.id)}>
    <Text>{item.title}</Text>
    <Image source={{ uri: item.image }} style={styles.image} />
  </TouchableOpacity>
);

// With React.memo - only re-renders when props change
const OptimizedItem = React.memo(({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item.id)}>
    <Text>{item.title}</Text>
    <Image source={{ uri: item.image }} style={styles.image} />
  </TouchableOpacity>
));
```

For more complex components, you can provide a custom comparison function:

```jsx
const ComplexItem = React.memo(
  ({ item }) => (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
  ),
  (prevProps, nextProps) => {
    // Only re-render if id or version changed
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.version === nextProps.item.version
    );
  }
);
```

### 2. Stabilizing Props with useCallback and useMemo

Functions and objects created during render are new references each time, causing child components to re-render even with React.memo.

```jsx
// Bad practice - new function reference on every render
const ParentComponent = () => {
  const handlePress = (id) => {
    console.log(`Item ${id} pressed`);
  };

  return <OptimizedItem item={item} onPress={handlePress} />;
};

// Good practice - stable function reference
const ParentComponent = () => {
  const handlePress = useCallback((id) => {
    console.log(`Item ${id} pressed`);
  }, []); // Dependencies array - re-create only when dependencies change

  return <OptimizedItem item={item} onPress={handlePress} />;
};
```

Similarly, use `useMemo` for computed values and objects:

```jsx
// Stable data reference
const data = useMemo(() => {
  return sourceData.map((item) => ({
    ...item,
    processed: processItem(item),
  }));
}, [sourceData]);
```

### 3. Avoiding Inline Styles and Functions

Inline styles and functions create new references on every render, defeating memoization.

```jsx
// Bad practice - new style object on every render
const BadItem = () => (
  <View style={{ padding: 10, margin: 5 }}>
    <TouchableOpacity onPress={() => console.log("Pressed")}>
      <Text>Item</Text>
    </TouchableOpacity>
  </View>
);

// Good practice - stable style references
const styles = StyleSheet.create({
  container: { padding: 10, margin: 5 },
});

const GoodItem = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={handlePress}>
      <Text>Item</Text>
    </TouchableOpacity>
  </View>
);
```

### 4. Using extraData Correctly in Lists

When using FlatList or FlashList, use `extraData` to trigger re-renders only when necessary:

```jsx
const MyListComponent = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <ItemComponent
          item={item}
          isSelected={item.id === selectedId}
          onSelect={setSelectedId}
        />
      )}
      extraData={selectedId} // Only re-render when selectedId changes
    />
  );
};
```

### 5. Creating Fully Cached Components

For truly static components that never need to update:

```jsx
const StaticHeader = React.memo(
  ({ title }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  ),
  () => true // Always return true = never re-render
);
```

### 6. Using PureComponent for Class Components

For class components, extend `PureComponent` or implement `shouldComponentUpdate`:

```jsx
class OptimizedItemComponent extends React.PureComponent {
  // PureComponent implements shouldComponentUpdate with shallow comparison

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Text>{item.title}</Text>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
    );
  }
}

// Or with custom update logic
class CustomOptimizedComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Custom logic - only update when specific props change
    return (
      this.props.item.id !== nextProps.item.id ||
      this.props.item.updated !== nextProps.item.updated
    );
  }

  render() {
    // Component rendering logic
  }
}
```

### 7. Optimizing Virtual DOM Reconciliation

Providing stable keys helps React's reconciliation process:

```jsx
const ReconciliationOptimized = ({ item }) => {
  return (
    <View>
      {item.elements.map((el) => (
        <Element
          key={`${item.id}-${el.id}`} // Structured and stable key
          data={el}
        />
      ))}
    </View>
  );
};
```

### 8. DOM Pooling Manual

DOM Pooling is a technique that manages and reuses DOM elements to minimize the creation and destruction of elements, which can be expensive operations:

```jsx
class DOMPoolManager {
  constructor(size = 50) {
    this.views = Array(size)
      .fill()
      .map(() => createViewRef());
    this.inUse = new Set();
  }

  getView() {
    const availableView = this.views.find((v) => !this.inUse.has(v));
    if (availableView) {
      this.inUse.add(availableView);
      return availableView;
    }
    return createViewRef(); // Fallback
  }

  releaseView(view) {
    this.inUse.delete(view);
  }
}

// Usage
const viewPool = new DOMPoolManager();

const PooledView = ({ item, onUnmount }) => {
  const viewRef = useRef(null);

  useEffect(() => {
    viewRef.current = viewPool.getView();

    return () => {
      viewPool.releaseView(viewRef.current);
      onUnmount && onUnmount();
    };
  }, []);

  return (
    <View ref={viewRef} style={styles.container}>
      <Text>{item.title}</Text>
    </View>
  );
};
```

Benefits of DOM pooling:

- Reduces garbage collection overhead
- Minimizes layout thrashing
- Improves performance in high-frequency update scenarios
- Particularly effective for lists with many items being added/removed

### 9. Ahead-of-Time (AOT) Component Pre-processing

Using babel plugins to pre-process components at build time can significantly improve runtime performance:

```jsx
// babel-plugin-transform-react-components.js
module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      FunctionDeclaration(path) {
        // Transform React component for better performance
        if (isReactComponent(path.node)) {
          // Pre-compute static parts
          // Optimize render logic
        }
      },
    },
  };
};

// Component optimized at build time
function ItemComponent({ item }) {
  // Build tool will analyze and optimize this component before bundling
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
    </View>
  );
}
```

Benefits of AOT pre-processing:

- Moves computation from runtime to build time
- Optimizes component structure before execution
- Can automatically apply best practices
- Reduces bundle size by eliminating redundant code
- Improves startup performance

### 10. Component Diffing Optimization

Deep prop comparison techniques can avoid unnecessary rendering:

```jsx
const ComponentDiffOptimizer = ({ component, props }) => {
  const cachedPropsRef = useRef(props);
  const shouldUpdate = useRef(true);
  const [renderKey, setRenderKey] = useState(0);

  // Deep prop comparison with optimizations
  useEffect(() => {
    const diffs = getDeepPropChanges(cachedPropsRef.current, props);

    // Only signal update for non-trivial prop changes
    if (diffs.some((diff) => isSignificantPropChange(diff))) {
      shouldUpdate.current = true;
      setRenderKey((prev) => prev + 1);
    }

    cachedPropsRef.current = { ...props };
  }, [props]);

  // Only render if there's a meaningful change
  if (!shouldUpdate.current) {
    return null;
  }

  shouldUpdate.current = false;
  const Component = component;
  return <Component key={renderKey} {...props} />;
};

// Helper for identifying significant prop changes
const isSignificantPropChange = (diff) => {
  const { path, oldValue, newValue } = diff;

  // Skip style changes that don't affect layout
  if (path.includes("style")) {
    if (path.includes("color") || path.includes("backgroundColor")) {
      return false;
    }
  }

  // Skip certain props that don't affect rendering
  if (path.includes("onLayout") || path.includes("testID")) {
    return false;
  }

  return true;
};
```

Benefits of component diffing:

- Provides fine-grained control over re-renders
- Can ignore cosmetic changes that don't affect layout
- Allows custom logic for determining significant changes
- Works well for complex nested props

### 11. Snapshot Diffing & Partial Updates

Instead of re-rendering an entire component, this technique only updates the changed parts:

```jsx
class SnapshotDiffingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.lastSnapshot = null;
    this.viewRefs = new Map();
  }

  shouldComponentUpdate() {
    // Always return false to handle updates manually
    return false;
  }

  getSnapshotFromProps(props) {
    // Generate a lightweight representation of the component state
    return {
      title: props.item.title,
      subtitle: props.item.subtitle,
      imageUrl: props.item.imageUrl,
      isActive: props.isActive,
    };
  }

  componentDidMount() {
    this.lastSnapshot = this.getSnapshotFromProps(this.props);
    this.forceFullRender();
  }

  componentDidUpdate(prevProps) {
    const newSnapshot = this.getSnapshotFromProps(this.props);
    const diffs = this.diffSnapshots(this.lastSnapshot, newSnapshot);

    if (diffs.length > 0) {
      // Apply only the necessary updates
      this.applyPartialUpdates(diffs);
      this.lastSnapshot = newSnapshot;
    }
  }

  diffSnapshots(oldSnapshot, newSnapshot) {
    const diffs = [];

    Object.keys(newSnapshot).forEach((key) => {
      if (oldSnapshot[key] !== newSnapshot[key]) {
        diffs.push({ key, value: newSnapshot[key] });
      }
    });

    return diffs;
  }

  applyPartialUpdates(diffs) {
    diffs.forEach((diff) => {
      const updateMethod = this[`update${capitalize(diff.key)}`];
      if (updateMethod) {
        updateMethod.call(this, diff.value);
      }
    });
  }

  // Update methods for each property
  updateTitle(newTitle) {
    const titleRef = this.viewRefs.get("title");
    if (titleRef) {
      titleRef.setNativeProps({ text: newTitle });
    }
  }

  updateIsActive(isActive) {
    const containerRef = this.viewRefs.get("container");
    if (containerRef) {
      containerRef.setNativeProps({
        style: isActive ? styles.activeContainer : styles.container,
      });
    }
  }

  // Full render as fallback
  forceFullRender() {
    // Implement full rendering logic
  }

  render() {
    return (
      <View
        ref={(ref) => this.viewRefs.set("container", ref)}
        style={this.props.isActive ? styles.activeContainer : styles.container}
      >
        <Text ref={(ref) => this.viewRefs.set("title", ref)}>
          {this.props.item.title}
        </Text>
        <Text ref={(ref) => this.viewRefs.set("subtitle", ref)}>
          {this.props.item.subtitle}
        </Text>
        <Image
          ref={(ref) => this.viewRefs.set("image", ref)}
          source={{ uri: this.props.item.imageUrl }}
          style={styles.image}
        />
      </View>
    );
  }
}
```

Benefits of snapshot diffing:

- Minimizes DOM operations by only updating what changed
- Bypasses React's reconciliation for performance-critical components
- Particularly effective for components with frequent small updates
- Can significantly reduce rendering overhead in complex UIs

## Performance Measurement

To identify unnecessary re-renders:

1. Use the React DevTools Profiler
2. Add console logs in render functions
3. Use the `why-did-you-render` library

## Best Practices Summary

1. Memoize components with `React.memo`
2. Stabilize props with `useCallback` and `useMemo`
3. Avoid inline styles and functions
4. Use `extraData` correctly in list components
5. Create fully cached components when appropriate
6. Use `PureComponent` or `shouldComponentUpdate` for class components
7. Provide stable, structured keys for lists
8. Implement DOM pooling for frequently changing lists
9. Use AOT component pre-processing for complex components
10. Apply component diffing for fine-grained update control
11. Implement snapshot diffing for performance-critical components

By implementing these techniques, you can significantly reduce unnecessary re-renders and improve your app's performance.
