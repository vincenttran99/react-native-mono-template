---
sidebar_position: 7
---

# Data and State Management Optimization

Efficient data and state management is a crucial factor in creating high-performance React Native applications. As applications grow, inefficient data handling and state management can lead to performance issues such as unnecessary re-renders, repetitive calculations, and excessive memory usage.

## Understanding Data and State Management Challenges

Data and state management in React Native can face performance issues due to:

- **Unnecessary re-renders**: When state changes, components may re-render even when not necessary
- **Repetitive calculations**: Complex data processing may be performed multiple times unnecessarily
- **Prop drilling through many layers**: Leading to cascading re-renders and debugging difficulties
- **Distributed state management**: Increasing complexity and making optimization difficult
- **Inefficient data processing**: Expensive data transformations can slow down the application

## Key Optimization Techniques

### 1. Creating Custom Hooks for List State Management

Custom hooks help encapsulate data processing and state management logic, separating it from UI:

```jsx
const useOptimizedList = (sourceData) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Process data only once when sourceData changes
  const data = useMemo(() => {
    console.log("Processing list data...");
    return sourceData.map((item) => ({
      ...item,
      formattedDate: formatDate(item.timestamp),
      displayName: `${item.firstName} ${item.lastName}`,
      // Other data transformations
    }));
  }, [sourceData]);

  // Memoize handlers to avoid creating new functions on each render
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Refresh data logic
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleSelect = useCallback((id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }, []);

  // Calculate values dependent on state
  const selectedItem = useMemo(() => {
    return data.find((item) => item.id === selectedId);
  }, [data, selectedId]);

  return {
    data,
    refreshing,
    selectedId,
    selectedItem,
    handleRefresh,
    handleSelect,
  };
};

// Usage in component
const MyListScreen = () => {
  const { data, refreshing, selectedId, handleRefresh, handleSelect } =
    useOptimizedList(sourceData);

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          isSelected={item.id === selectedId}
          onSelect={handleSelect}
        />
      )}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      estimatedItemSize={100}
    />
  );
};
```

Benefits of custom hooks:

- **Logic reuse**: Reuse data processing and state management logic across screens
- **Separation of concerns**: Separate data processing logic from display logic
- **Testability**: Easily write unit tests for data processing logic
- **Targeted optimization**: Focus on optimizing data processing without affecting UI

### 2. Optimizing Data Processing with useMemo

Use `useMemo` to avoid recalculating data when unnecessary:

```jsx
const ItemRenderer = ({ item }) => {
  // Pre-process data once when component mounts or when item changes
  const processedData = useMemo(() => {
    console.log(`Processing item ${item.id}...`);

    // Perform expensive data transformations
    return {
      formattedTitle: formatTitle(item.title),
      processedImages: preprocessImages(item.images),
      metaInfo: extractMetaInfo(item.meta),
      stats: calculateStats(item.data),
      searchableText: generateSearchableText(item),
    };
  }, [item.id, item.version, item.title, item.images, item.meta, item.data]); // Only recalculate when dependencies change

  return <OptimizedItem data={processedData} />;
};
```

Effective use cases for `useMemo`:

- **Complex data transformations**: Formatting, calculations, information extraction
- **Filtering and sorting lists**: Especially for large lists
- **Creating complex data structures**: Maps, trees, or custom data structures
- **Calculating values dependent on multiple data sources**

Important notes:

- Only use `useMemo` for expensive calculations
- Provide accurate dependency arrays
- Avoid overusing `useMemo` for simple calculations

### 3. Optimizing Props Stability with useMemo

Ensure props stability to avoid unnecessary re-renders:

```jsx
const MyList = ({ sourceData, onItemSelect }) => {
  // Ensure data only changes when necessary
  const data = useMemo(() => {
    return sourceData.map((item) => ({
      ...item,
      processed: processItem(item), // Pre-process data
    }));
  }, [sourceData]);

  // Create complex props once and reuse
  const listProps = useMemo(
    () => ({
      contentContainerStyle: { paddingBottom: 20 },
      showsVerticalScrollIndicator: false,
      removeClippedSubviews: true,
      initialNumToRender: 10,
      maxToRenderPerBatch: 5,
      windowSize: 5,
      keyExtractor: (item) => item.id.toString(),
    }),
    []
  );

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={100}
      {...listProps}
    />
  );
};
```

### 4. Using Context API Effectively

Optimize Context API to avoid unnecessary re-renders:

```jsx
// Split context into smaller functional parts
const UserDataContext = createContext();
const UserActionsContext = createContext();

// Optimized provider
const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialData);

  // Memoize data to avoid unnecessary re-renders
  const processedUserData = useMemo(() => {
    return {
      displayName: `${userData.firstName} ${userData.lastName}`,
      formattedJoinDate: formatDate(userData.joinDate),
      // Other transformations
    };
  }, [userData.firstName, userData.lastName, userData.joinDate]);

  // Memoize actions to ensure stability
  const userActions = useMemo(
    () => ({
      updateProfile: (data) => {
        // Profile update logic
        setUserData((prev) => ({ ...prev, ...data }));
      },
      logout: () => {
        // Logout logic
        setUserData(initialData);
      },
    }),
    []
  );

  return (
    <UserDataContext.Provider value={processedUserData}>
      <UserActionsContext.Provider value={userActions}>
        {children}
      </UserActionsContext.Provider>
    </UserDataContext.Provider>
  );
};

// Custom hooks to use context
const useUserData = () => useContext(UserDataContext);
const useUserActions = () => useContext(UserActionsContext);

// Usage in components
const ProfileHeader = () => {
  // Only re-renders when userData changes
  const userData = useUserData();
  return <Text>{userData.displayName}</Text>;
};

const LogoutButton = () => {
  // Only re-renders when userActions changes (rarely happens)
  const { logout } = useUserActions();
  return <Button title="Logout" onPress={logout} />;
};
```

### 5. Using Selector Pattern

Selector pattern helps efficiently access parts of complex state:

```jsx
// Define selectors
const selectFilteredItems = (items, filter) => {
  return items.filter((item) => {
    if (filter.category && item.category !== filter.category) return false;
    if (filter.status && item.status !== filter.status) return false;
    if (
      filter.search &&
      !item.title.toLowerCase().includes(filter.search.toLowerCase())
    )
      return false;
    return true;
  });
};

const selectSortedItems = (items, sortBy, sortOrder) => {
  return [...items].sort((a, b) => {
    const factor = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "date") return factor * (a.date - b.date);
    if (sortBy === "name") return factor * a.title.localeCompare(b.title);
    return 0;
  });
};

// Usage in component
const ItemList = ({ items, filter, sortBy, sortOrder }) => {
  // Apply selectors in chain, each step is memoized
  const filteredItems = useMemo(
    () => selectFilteredItems(items, filter),
    [items, filter]
  );

  const sortedAndFilteredItems = useMemo(
    () => selectSortedItems(filteredItems, sortBy, sortOrder),
    [filteredItems, sortBy, sortOrder]
  );

  return (
    <FlashList
      data={sortedAndFilteredItems}
      renderItem={renderItem}
      estimatedItemSize={100}
    />
  );
};
```

### 6. Proxy-based State Management

Use JavaScript Proxies to detect precise state changes and optimize rendering:

```jsx
// Create observable state with Proxy
function createObservableState(initialState, onChange) {
  const listeners = new Set();

  if (onChange) {
    listeners.add(onChange);
  }

  function notifyChange(path, value, previousValue) {
    for (const listener of listeners) {
      listener(path, value, previousValue);
    }
  }

  function createProxy(target, path = "") {
    return new Proxy(target, {
      get(target, property) {
        const value = target[property];
        if (typeof value === "object" && value !== null) {
          return createProxy(value, path ? `${path}.${property}` : property);
        }
        return value;
      },
      set(target, property, value) {
        const previousValue = target[property];
        if (previousValue !== value) {
          target[property] = value;
          const currentPath = path ? `${path}.${property}` : property;
          notifyChange(currentPath, value, previousValue);
        }
        return true;
      },
    });
  }

  return {
    state: createProxy(initialState),
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// Component using Proxy-based state
const ProxyBasedComponent = ({ item }) => {
  const [observableState, setObservableState] = useState(() => {
    return createObservableState(
      { title: item.title, liked: item.liked, views: item.views },
      (path, value, previousValue) => {
        console.log(
          `Property changed: ${path} from ${previousValue} to ${value}`
        );

        // Only re-render for specific property changes
        if (path === "liked" || path === "title") {
          forceUpdate();
        }

        // Log but don't re-render for analytics properties
        if (path === "views") {
          logAnalytics("item_viewed", { itemId: item.id, views: value });
        }
      }
    );
  });

  // Custom hook for forcing update
  const forceUpdate = useForceUpdate();

  // Update only necessary properties
  const handleLike = () => {
    observableState.state.liked = !observableState.state.liked;
    // No need to call setState - proxy handles notification
  };

  const handleView = () => {
    observableState.state.views += 1;
    // This won't cause re-render due to our path filtering
  };

  return (
    <View style={styles.container}>
      <Text>{observableState.state.title}</Text>
      <Text>Views: {observableState.state.views}</Text>
      <Button
        title={observableState.state.liked ? "Liked" : "Like"}
        onPress={handleLike}
      />
      <Button title="View" onPress={handleView} />
    </View>
  );
};

// Helper hook for force update
const useForceUpdate = () => {
  const [, setTick] = useState(0);
  return useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
};
```

Benefits of Proxy-based state management:

- **Granular updates**: Only re-render when specific properties change
- **Deep property tracking**: Automatically track nested property changes
- **Path-based filtering**: Filter which property changes should trigger updates
- **Reduced boilerplate**: No need for multiple setState calls or action creators
- **Transparent API**: State can be updated with natural JavaScript syntax

### 7. Hybrid Native/JS Rendering Strategy

Combine native and JavaScript rendering for optimal performance:

```jsx
import { NativeModules } from "react-native";
const { HybridRenderingManager } = NativeModules;

const HybridRenderedList = ({ data }) => {
  // State to track which items should render natively vs in JS
  const [renderingStrategy, setRenderingStrategy] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Analyze which items are better for native rendering
    setIsAnalyzing(true);
    HybridRenderingManager.analyzeItems(data)
      .then((strategies) => {
        setRenderingStrategy(strategies);
        setIsAnalyzing(false);
      })
      .catch((error) => {
        console.error("Failed to analyze items:", error);
        // Fallback to all JS rendering
        setRenderingStrategy(
          data.reduce((acc, item) => {
            acc[item.id] = "js";
            return acc;
          }, {})
        );
        setIsAnalyzing(false);
      });
  }, [data]);

  const renderItem = ({ item, index }) => {
    // During analysis, render simple placeholders
    if (isAnalyzing) {
      return <PlaceholderCell style={styles.item} />;
    }

    // Based on analysis, choose the appropriate rendering strategy
    if (renderingStrategy[item.id] === "native") {
      // Render complex items using native components
      return (
        <NativeOptimizedCell
          item={item}
          style={styles.item}
          onPress={() => handleItemPress(item)}
        />
      );
    } else {
      // Render simple items using JS
      return (
        <JSRenderedCell
          item={item}
          style={styles.item}
          onPress={() => handleItemPress(item)}
        />
      );
    }
  };

  const handleItemPress = useCallback((item) => {
    // Handle item press
    console.log("Item pressed:", item.id);
  }, []);

  // Memoize list props for performance
  const listProps = useMemo(
    () => ({
      removeClippedSubviews: true,
      maxToRenderPerBatch: 10,
      updateCellsBatchingPeriod: 50,
      windowSize: 10,
      keyExtractor: (item) => item.id,
    }),
    []
  );

  return <FlatList data={data} renderItem={renderItem} {...listProps} />;
};

// Native module implementation (in native code)
// Android: HybridRenderingManager.java
// iOS: HybridRenderingManager.m
```

Implementation details for native module:

```java
// Android implementation (simplified)
@ReactMethod
public void analyzeItems(ReadableArray items, Promise promise) {
  WritableMap strategies = Arguments.createMap();

  for (int i = 0; i < items.size(); i++) {
    ReadableMap item = items.getMap(i);
    String id = item.getString("id");

    // Analyze item complexity
    boolean isComplex = analyzeItemComplexity(item);

    // Determine optimal rendering strategy
    String strategy = isComplex ? "native" : "js";
    strategies.putString(id, strategy);
  }

  promise.resolve(strategies);
}

private boolean analyzeItemComplexity(ReadableMap item) {
  // Check for complex rendering needs:
  // 1. Has many nested elements
  // 2. Contains heavy images
  // 3. Requires complex layouts
  // 4. Needs animations
  // 5. Has custom drawing

  if (item.hasKey("images") && item.getArray("images").size() > 3) {
    return true;
  }

  if (item.hasKey("type") &&
     (item.getString("type").equals("carousel") ||
      item.getString("type").equals("chart"))) {
    return true;
  }

  return false;
}
```

Benefits of hybrid rendering:

- **Optimized performance**: Use native rendering for complex items
- **Reduced JS bridge traffic**: Minimize communication between JS and native
- **Better memory management**: Native components can better manage memory
- **Improved scrolling performance**: Native rendering reduces JS thread load
- **Adaptive optimization**: Dynamically choose rendering strategy based on content

## Advanced Optimization Techniques

### 1. Using Memoization Cache

Create cache for expensive calculations:

```jsx
// Utility function to create memoized function
const createMemoizedFunction = (
  fn,
  getKey = (...args) => JSON.stringify(args)
) => {
  const cache = new Map();

  return (...args) => {
    const key = getKey(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Use for expensive calculations
const expensiveCalculation = createMemoizedFunction((data, config) => {
  console.log("Running expensive calculation...");
  // Complex calculation
  return processData(data, config);
});

// In component
const ProcessedData = ({ data, config }) => {
  const result = expensiveCalculation(data, config);
  return <DataDisplay result={result} />;
};
```

### 2. Using Normalized State Shape

Normalize data for efficient access and updates:

```jsx
// Normalized state structure
const initialState = {
  entities: {
    users: {
      byId: {
        user1: { id: "user1", name: "John", roleId: "role1" },
        user2: { id: "user2", name: "Jane", roleId: "role2" },
      },
      allIds: ["user1", "user2"],
    },
    roles: {
      byId: {
        role1: { id: "role1", name: "Admin" },
        role2: { id: "role2", name: "User" },
      },
      allIds: ["role1", "role2"],
    },
  },
};

// Selectors to access data
const selectUserById = (state, userId) => state.entities.users.byId[userId];
const selectAllUsers = (state) =>
  state.entities.users.allIds.map((id) => state.entities.users.byId[id]);
const selectUserWithRole = (state, userId) => {
  const user = selectUserById(state, userId);
  const role = state.entities.roles.byId[user.roleId];
  return { ...user, role };
};

// Reducers to update data
const updateUser = (state, user) => ({
  ...state,
  entities: {
    ...state.entities,
    users: {
      ...state.entities.users,
      byId: {
        ...state.entities.users.byId,
        [user.id]: {
          ...state.entities.users.byId[user.id],
          ...user,
        },
      },
    },
  },
});
```

### 3. Lazy State Initialization

Initialize complex state lazily:

```jsx
const ComplexDataComponent = () => {
  // Use initializer function to avoid calculation on each render
  const [data, setData] = useState(() => {
    console.log("Initializing complex data...");

    // Complex calculation only happens once when component mounts
    const initialData = {};

    // Initialize complex data structure
    for (let i = 0; i < 1000; i++) {
      initialData[`item-${i}`] = {
        id: `item-${i}`,
        value: Math.random(),
        processed: heavyProcessing(i),
      };
    }

    return initialData;
  });

  // Component rendering
  return <View>{/* Render using data */}</View>;
};
```

## Measuring Data and State Management Performance

To identify performance issues in data and state management:

1. **React DevTools Profiler**: Analyze render times and render counts
2. **Performance Monitor**: Track CPU and memory usage
3. **Custom Timing**: Add performance markers in code
4. **Memory Snapshots**: Check for memory leaks and excessive memory usage

```jsx
const MeasuredComponent = ({ data }) => {
  useEffect(() => {
    // Start timing
    const startTime = performance.now();

    // Process data
    const result = processData(data);

    // Log time
    console.log(`Data processing took ${performance.now() - startTime}ms`);
  }, [data]);

  // Component rendering
};
```

## Best Practices Summary

1. **Create custom hooks** to encapsulate data processing and state management logic
2. **Use useMemo** for expensive calculations
3. **Ensure props stability** to avoid unnecessary re-renders
4. **Optimize Context API** by splitting context and memoizing values
5. **Apply Selector Pattern** to efficiently access complex state
6. **Use Proxy-based state management** to detect precise state changes
7. **Implement hybrid native/JS rendering** for optimal performance
8. **Use immutable data structures** to improve comparison performance
9. **Normalize data** for efficient access and updates
10. **Initialize complex state lazily** to avoid unnecessary calculations
11. **Measure and optimize** based on actual performance metrics

By applying these techniques, you can significantly improve data and state management performance in your React Native application, leading to smoother user experience and more efficient resource usage.
