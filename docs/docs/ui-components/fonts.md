---
sidebar_position: 2
---

# Fonts

This template uses **Expo Font** for custom font management, providing a seamless way to load and use custom fonts in your React Native application with Shopify Restyle integration.

## Font Loading with Expo

With Expo, you can load fonts using the `expo-font` plugin which loads fonts natively for better performance. <mcreference link="https://starter.obytes.com/ui-and-theme/fonts/" index="0">0</mcreference> This approach eliminates the need to wait for fonts to load dynamically and provides better performance compared to runtime font loading.

The template comes with **Space Mono** font pre-configured:

```javascript:app.config.js
plugins: [
  // ... other plugins
  [
    "expo-font",
    {
      fonts: ["./src/assets/fonts/SpaceMono-Regular.ttf"],
    },
  ],
  // ... other plugins
]
```

## Font Integration with Restyle

Fonts are integrated into the Restyle theme system through the `FontSize` constants and `textVariants`:

**_Font Size Constants_**

```typescript:src/constants/sizes.constant.ts
export const FontSize = {
  none: mhs(2, 0.3),
  xxxxs: mhs(4, 0.3),
  xxxs: mhs(8, 0.3),
  xxs: mhs(10, 0.3),
  xs: mhs(12, 0.3),
  sm: mhs(14, 0.3),
  md: mhs(16, 0.3),
  lg: mhs(18, 0.3),
  xl: mhs(20, 0.3),
  xxl: mhs(24, 0.3),
  xxxl: mhs(30, 0.3),
  xxxxl: mhs(42, 0.3),
};
```

**_Text Variants in Theme_**

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

**_Using Fonts in Components_**

The `BText` component automatically uses the theme's text variants:

```jsx
// Using predefined variants
<BText variant="lg">Large text</BText>
<BText variant="md">Medium text</BText>
<BText variant="sm">Small text</BText>

// With additional styling
<BText
  variant="xl"
  fontWeight="bold"
  color="primary"
>
  Bold primary text
</BText>
```

You can also use custom font sizes from the FontSize constants:

```jsx
<BText fontSize={FontSize.xxl}>Custom sized text</BText>
```

The template includes accessibility considerations by controlling font scaling:

```typescript:src/components/base/base.textInput.tsx
<TextInputRestyle
  allowFontScaling={false}
  fontSize={FontSize.md}
  // ... other props
/>
```

## Adding Custom Fonts

To add a new custom font to your project:

**_1. Add Font Files_**

Place your font files in the `src/assets/fonts/` directory:

```
src/assets/fonts/
├── SpaceMono-Regular.ttf
├── Inter-Regular.ttf        # New font
├── Inter-Bold.ttf           # New font variant
└── Inter-Light.ttf          # New font variant
```

**_2. Update Expo Configuration_**

Add the new font files to your `app.config.js`: <mcreference link="https://starter.obytes.com/ui-and-theme/fonts/" index="0">0</mcreference>

```javascript:app.config.js
plugins: [
  [
    "expo-font",
    {
      fonts: [
        "./src/assets/fonts/SpaceMono-Regular.ttf",
        "./src/assets/fonts/Inter-Regular.ttf",
        "./src/assets/fonts/Inter-Bold.ttf",
        "./src/assets/fonts/Inter-Light.ttf",
      ],
    },
  ],
]
```

**_3. Building with Custom Fonts_**

After adding new fonts, you need to rebuild your app:

```bash
# Clear cache and rebuild
expo prebuild --clean

# Create notification icons for android
yarn generate-images

# Build for iOS
expo run:ios

# Build for Android
expo run:android
```

**_4. Update Theme Configuration_**

Add font family variants to your theme:

```typescript:src/constants/theme.constant.ts
export const LIGHT_THEME = createTheme({
  // ... existing theme properties
  textVariants: {
    // ... existing variants
    heading: {
      fontFamily: 'Inter-Bold',
      fontSize: FontSize.xl,
      lineHeight: mvs(28, 0.1),
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: FontSize.md,
      lineHeight: mvs(24, 0.1),
    },
    caption: {
      fontFamily: 'Inter-Light',
      fontSize: FontSize.sm,
      lineHeight: mvs(20, 0.1),
    },
  },
});
```

**_5. Use Custom Font Variants_**

```jsx
<BText variant="heading">This uses Inter Bold</BText>
<BText variant="body">This uses Inter Regular</BText>
<BText variant="caption">This uses Inter Light</BText>
```

## Accessibility Considerations

- **Font scaling**: The template controls font scaling to maintain layout consistency
- **Contrast**: Ensure sufficient contrast between text and background colors
- **Readability**: Use appropriate font sizes for different content types
- **Line height**: Maintain proper line spacing for better readability

This font system provides a robust foundation for typography in your React Native application, combining the power of Expo's native font loading with Shopify Restyle's theming capabilities.
