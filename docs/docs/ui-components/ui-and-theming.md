---
sidebar_position: 1
---

# UI and Theming

This template uses **Shopify Restyle** as the primary theming solution, providing a powerful and type-safe way to build consistent UI components with a design system approach.

## Why Shopify Restyle?

For this React Native template, we chose Shopify Restyle because it offers:

- **Type Safety**: Full TypeScript support with compile-time checking for theme values
- **Performance**: Optimized styling with minimal runtime overhead
- **Consistency**: Enforces design system constraints across all components
- **Developer Experience**: Intuitive API that feels natural for React Native developers
- **Flexibility**: Easy to customize and extend while maintaining consistency

## About Shopify Restyle

Shopify Restyle is a type-enforced system for building UI components in React Native with React Native Web support. It provides a set of utility functions to create components that automatically consume values from a centralized theme.

Key features:

- Theme-based design system
- Responsive design support
- Dark mode capabilities
- Variant-based component styling
- Automatic TypeScript inference

For more details about Shopify Restyle, check their [official documentation](https://github.com/Shopify/restyle).

## Theme Structure

The theme system is built around several core concepts:

### Colors

The template includes comprehensive color palettes for both light and dark themes:

```typescript:src/constants/theme.constant.ts
export const COLORS = {
  light: {
    background: "#f5f5f5",
    primaryLightest: "#eff4fd",
    primaryLight: "#c7d9f9",
    primary: "#8cb0f3",
    primaryDark: "#578cee",
    primaryDarkest: "#1d61e0",
    reverse: "#05122a",
  },
  dark: {
    background: "#1b1b1b",
    primaryDarkest: "#031b3c",
    primaryDark: "#08459a",
    primary: "#4290ff",
    primaryLight: "#a0c8ff",
    primaryLightest: "#dfedff",
    reverse: "#ffffff",
  },
};
```

### Spacing System

Consistent spacing values using a scale-based approach:

```typescript:src/constants/sizes.constant.ts
export const Space = {
  none: 0,
  xxxxs: MHS._2,
  xxxs: MHS._4,
  xxs: MHS._6,
  xs: MHS._8,
  sm: MHS._10,
  md: MHS._12,
  lg: MHS._16,
  xl: MHS._20,
  xxl: MHS._26,
  xxxl: MHS._34,
  xxxxl: MHS._48,
};
```

### Typography

Predefined text variants with responsive sizing:

```typescript:src/constants/theme.constant.ts
textVariants: {
  sm: {
    fontSize: FontSize.sm,
    letterSpacing: mhs(0.25, 0.3),
    lineHeight: mvs(20, 0.1),
  },
  md: {
    fontSize: FontSize.md,
    letterSpacing: mhs(0.15, 0.3),
    lineHeight: mvs(24, 0.1),
  },
  lg: {
    fontSize: FontSize.lg,
    letterSpacing: mhs(0.15, 0.3),
    lineHeight: mvs(25, 0.1),
  },
  // ... more variants
}
```

### Shadow Variants

Consistent elevation system:

```typescript:src/constants/theme.constant.ts
shadowVariants: {
  xs: {
    shadowColor: "shadowLight",
    shadowOffset: { width: 0, height: mhs(1) },
    shadowOpacity: 0.2,
    shadowRadius: mhs(0.7),
    elevation: 1,
  },
  md: {
    shadowColor: "shadow",
    shadowOffset: { width: 0, height: mhs(2) },
    shadowOpacity: 0.3,
    shadowRadius: mhs(2.22),
    elevation: 3,
  },
  // ... more variants
}
```

## Theme Provider Setup

The theme is provided at the app level using Shopify Restyle's ThemeProvider:

```typescript:src/navigation/index.tsx
import { ThemeProvider } from "@shopify/restyle";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme.constant";

export default function AppNavigation() {
  const theme = useSystemStore((state) => state.theme);

  const themeValue = useMemo(
    () => (theme === "light" ? LIGHT_THEME : DARK_THEME),
    [theme]
  );

  return (
    <ThemeProvider theme={themeValue}>
      {/* App content */}
    </ThemeProvider>
  );
}
```

## Dark Mode Support

The template includes built-in dark mode support with automatic theme switching:

- **Automatic Detection**: Respects system theme preferences
- **Manual Override**: Users can manually switch themes
- **Persistent Storage**: Theme preference is saved across app sessions
- **Status Bar Integration**: Automatically adjusts status bar style

## Responsive Design

The template uses responsive scaling functions for consistent sizing across devices and also supports Shopify Restyle's built-in responsive values system.

### Device Scaling Functions

The template includes custom scaling functions for consistent sizing across different screen sizes:

```typescript:src/helpers/theme.helper.ts
// Horizontal scaling
export function horizontalScale(size: number) {
  return (size * shortDimension) / guidelineBaseWidth;
}

// Vertical scaling
export function verticalScale(size: number) {
  return (size * longDimension) / guidelineBaseHeight;
}

// Moderate scaling with factor
export function moderateHorizontalScale(size: number, factor = 0.5) {
  return size + (horizontalScale(size) - size) * factor;
}
```

### Breakpoint-Based Responsive Values

Shopify Restyle supports responsive values through breakpoints defined in your theme. <mcreference link="https://shopify.github.io/restyle/fundamentals/responsive-values" index="0">0</mcreference> Any prop powered by Restyle can accept different values for each screen size:

#### Setting Up Breakpoints

First, define breakpoints in your theme configuration:

```typescript:src/constants/theme.constant.ts
export const LIGHT_THEME = createTheme({
  // ... other theme properties
  breakpoints: {
    phone: 0,
    tablet: 768,
    desktop: 1024,
  },
  // ...
});
```

#### Using Responsive Props

Once breakpoints are defined, you can use responsive values in any Restyle-powered component:

```jsx
// Single value (applies to all screen sizes)
<BView flexDirection="row" />

// Responsive values (different values per breakpoint)
<BView flexDirection={{phone: 'column', tablet: 'row'}} />

// Responsive spacing
<BText
  fontSize={{phone: 'sm', tablet: 'md', desktop: 'lg'}}
  padding={{phone: 'sm', tablet: 'md'}}
>
  Responsive text
</BText>

// Responsive layout
<BView
  width={{phone: '100%', tablet: '50%', desktop: '33%'}}
  marginBottom={{phone: 'md', tablet: 'lg'}}
>
  Responsive container
</BView>
```

#### Advanced Responsive Usage

For complex responsive logic, you can extract responsive prop values using the `useResponsiveProp` hook: <mcreference link="https://shopify.github.io/restyle/fundamentals/responsive-values" index="0">0</mcreference>

```typescript
import { useResponsiveProp, useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme.constant";

const ResponsiveButton = ({
  color = { phone: "primary", tablet: "secondary" },
  ...props
}) => {
  const theme = useTheme<Theme>();

  // Extract the current responsive value
  const currentColor = useResponsiveProp(color);

  // Use the extracted value for conditional logic
  const backgroundColor =
    currentColor === "primary" ? "primaryLight" : "secondaryLight";

  return (
    <BPressable
      backgroundColor={backgroundColor}
      padding={{ phone: "sm", tablet: "md" }}
      borderRadius={{ phone: "sm", tablet: "md" }}
      {...props}
    >
      <BText color={color}>Responsive Button</BText>
    </BPressable>
  );
};
```

### Best Practices for Responsive Design

1. **Mobile First**: Start with mobile design and scale up
2. **Consistent Breakpoints**: Use the same breakpoint names across your app
3. **Performance**: Responsive values are optimized and don't cause unnecessary re-renders
4. **Testing**: Test your responsive layouts on different screen sizes
5. **Fallbacks**: Always provide fallback values for smaller screens

This responsive system provides powerful tools for creating adaptive layouts that work seamlessly across different device sizes while maintaining design consistency and performance.

## Custom Hook for Theme Access

The template provides a custom hook for accessing theme values in components:

```typescript:src/helpers/hooks/system.hook.ts
export function useSystemTheme<T extends NamedStyles<T>>(
  createStyle?: (theme: BaseTheme) => T
): {
  styles: T;
  theme: BaseTheme;
} {
  const theme = useTheme();
  const styles = useMemo(() => {
    return createStyle?.(theme) || ({} as T);
  }, [theme]);

  return { theme, styles };
}
```

Usage:

```jsx
const { styles, theme } = useSystemTheme((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
}));
```

## Best Practices

1. **Use Theme Values**: Always use theme values instead of hardcoded colors or sizes
2. **Consistent Naming**: Follow the established naming conventions for variants and colors
3. **Responsive Scaling**: Use the provided scaling functions for consistent sizing
4. **Component Composition**: Build complex components by composing base components
5. **Type Safety**: Leverage TypeScript for compile-time theme validation

## Extending the Theme

To add new colors, spacing, or variants:

1. **Add to Constants**: Update the relevant constant files
2. **Update Theme**: Modify the theme configuration
3. **Type Safety**: Ensure TypeScript types are updated
4. **Documentation**: Update component documentation

Example of adding a new color:

```typescript
// In theme.constant.ts
export const COLORS = {
  light: {
    // ... existing colors
    accent: "#ff6b6b",
  },
  dark: {
    // ... existing colors
    accent: "#ff8e8e",
  },
};
```

This theming system provides a solid foundation for building consistent, maintainable, and scalable React Native applications with excellent developer experience and type safety.
