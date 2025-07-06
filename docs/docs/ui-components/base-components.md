---
sidebar_position: 3
---

# Base Components

This template comes with a comprehensive set of base components built on top of `@shopify/restyle` to help you get started and save development time. All components are designed to be theme-aware, responsive, and highly customizable.

All base components can be found in the <mcfolder name="base" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/components/base"></mcfolder> folder. Our philosophy is to keep components simple, reusable, and consistent with the design system while leveraging the power of Shopify Restyle for theming.

Based on your needs, you can either use them as they are or customize them to fit your specific requirements. You can also create new components following the same approach.

## Available Components

### Core Components

#### BView

The foundational view component created using `createBox` from `@shopify/restyle`. It supports all Restyle box props for layout, spacing, colors, and borders.

```typescript
import BView from "@/components/base/base.view";

<BView backgroundColor="primary" padding="md" borderRadius="lg" margin="sm">
  {/* Your content */}
</BView>;
```

**Props:** All `BoxProps<Theme>` and `ViewProps` from React Native

#### BText

A theme-aware text component that leverages `textVariants` from your theme for consistent typography across the app.

```typescript
import BText from "@/components/base/base.text";

<BText variant="heading" color="primary" textAlign="center">
  Hello World
</BText>;
```

**Props:** All `TextProps<Theme>` from Restyle and `TextProps` from React Native

#### BSafeAreaView

A theme-aware safe area view component that ensures content is displayed within the safe area boundaries of the device.

```typescript
import BSafeAreaView from "@/components/base/base.safeAreaView";

<BSafeAreaView
  backgroundColor="background"
  padding="md"
  edges={["top", "bottom"]}
>
  {/* Your content */}
</BSafeAreaView>;
```

**Props:** All `BoxProps<Theme>` and `SafeAreaViewProps` from react-native-safe-area-context

#### BKeyboardAvoidingView

A keyboard-aware view component that automatically adjusts its position when the keyboard appears.

```typescript
import BKeyboardAvoidingView from "@/components/base/base.keyboardAvoidingView";

<BKeyboardAvoidingView
  backgroundColor="background"
  padding="md"
  behavior="padding"
>
  {/* Your content with text inputs */}
</BKeyboardAvoidingView>;
```

**Props:** All `BoxProps<Theme>` and `KeyboardAvoidingViewProps` from react-native-keyboard-controller

### Interactive Components

#### BButton

A highly customizable button component with support for icons, different sizes, outline styles, and rounded corners.

```typescript
import BButton from '@/components/base/base.button';

<BButton
  size="md"
  label="Click me"
  leftIcon="heart"
  backgroundColor="primary"
  onPress={() => console.log('Pressed!')}
/>

// Outline button
<BButton
  size="lg"
  label="Outline Button"
  outline
  round
  rightIcon="arrow-right"
/>
```

**Props:**

- `size`: Button size from theme spacing (`"xs"` to `"xxxxl"`)
- `label`: Button text
- `leftIcon`/`rightIcon`: Icon names (MaterialCommunityIcons)
- `outline`: Boolean for outline style
- `round`: Boolean for fully rounded button
- All `BPressableProps`

#### BPressable

An enhanced pressable component with built-in opacity animation and full Restyle support.

```typescript
import BPressable from "@/components/base/base.pressable";

<BPressable
  backgroundColor="secondary"
  padding="md"
  borderRadius="md"
  onPress={handlePress}
  disableOpacityEffect={false}
>
  <BText>Pressable Content</BText>
</BPressable>;
```

**Props:**

- `disableOpacityEffect`: Disable the press animation
- All Restyle props (spacing, colors, layout, etc.)
- All `PressableProps` from React Native

#### BIconButton

A simple icon button component perfect for toolbars and action buttons.

```typescript
import BIconButton from "@/components/base/base.iconButton";

<BIconButton
  icon="menu"
  size="md"
  iconColor="primary"
  backgroundColor="ground"
  onPress={openMenu}
/>;
```

**Props:**

- `icon`: Icon name (string) or custom React node
- `size`: Size from theme spacing
- `iconColor`: Color from theme
- All `BPressableProps`

#### BChip

A compact chip component perfect for tags, filters, and selections with icon support.

```typescript
import BChip from '@/components/base/base.chip';

<BChip
  label="React Native"
  isSelected={isSelected}
  onPress={() => setIsSelected(!isSelected)}
  icon="react"
/>

// Without icon
<BChip
  label="JavaScript"
  isSelected={false}
  onPress={handlePress}
/>
```

**Props:**

- `label`: Chip text content
- `isSelected`: Boolean for selected state styling
- `icon`: Icon name from MaterialCommunityIcons
- `iconProps`: Additional props for the icon
- `labelProps`: Additional props for the text
- All `BPressableProps`

### Form Components

#### BTextInput

A comprehensive text input component with icon support, error states, and full theming integration.

```typescript
import BTextInput from "@/components/base/base.textInput";

<BTextInput
  placeholder="Enter your email"
  leftIcon="email"
  rightIcon="eye"
  onRightIconPress={togglePasswordVisibility}
  error={hasError}
  containerBackgroundColor="ground"
  containerBorderRadius="md"
/>;
```

**Props:**

- `leftIcon`/`rightIcon`: Icon support with press handlers
- `error`: Boolean for error state styling
- `container*`: Props for styling the input container
- All Restyle text and layout props
- All `TextInputProps` from React Native

#### BCheckBox

An animated checkbox component with customizable colors and sizes.

```typescript
import BCheckBox from "@/components/base/base.checkbox";

<BCheckBox
  isChecked={isChecked}
  onPress={() => setIsChecked(!isChecked)}
  size="md"
  activeColor="primary"
  outline={false}
/>;
```

**Props:**

- `isChecked`: Boolean state
- `size`: Size from theme spacing
- `activeColor`/`inactiveColor`: Theme colors
- `outline`: Boolean for outline style
- `disabled`: Boolean for disabled state

#### BRadio

An animated radio button component with smooth transitions.

```typescript
import BRadio from "@/components/base/base.radio";

<BRadio
  isSelected={selectedValue === "option1"}
  onPress={() => setSelectedValue("option1")}
  size="md"
  activeColor="primary"
/>;
```

**Props:**

- `isSelected`: Boolean state
- `size`: Size from theme spacing
- `activeColor`/`inactiveColor`: Theme colors
- `disabled`: Boolean for disabled state

### Display Components

#### BIcon

A theme-aware icon component using MaterialCommunityIcons with color support from your theme.

```typescript
import BIcon from "@/components/base/base.icon";

<BIcon name="heart" size={24} color="primary" />;
```

**Props:**

- `name`: Icon name from MaterialCommunityIcons
- `size`: Icon size in pixels
- `color`: Color from theme

#### BSVGIcon

A component for rendering SVG icons with theme color support and automatic color replacement.

```typescript
import BSVGIcon from "@/components/base/base.svgIcon";

<BSVGIcon
  xml={svgString}
  size={24}
  color="primary"
  ignoreOverrideColor={false}
/>;
```

**Props:**

- `xml`: SVG string content
- `size`: Icon size
- `color`: Theme color or custom color string
- `ignoreOverrideColor`: Skip automatic color replacement

#### BImage

An optimized image component using `expo-image` with blur hash support and automatic sizing.

```typescript
import BImage from "@/components/base/base.image";

<BImage
  source={{ uri: "https://example.com/image.jpg" }}
  width={200}
  height={200}
  round
  hasBlur
/>;
```

**Props:**

- `width`/`height`: Image dimensions
- `round`: Boolean for circular image
- `hasBlur`: Boolean for blur hash placeholder
- All `ImageProps` from expo-image

#### BDivider

A flexible divider component supporting different styles and orientations.

```typescript
import BDivider from '@/components/base/base.divider';

<BDivider type="solid" bold />
<BDivider type="dashed" vertical />
<BDivider type="dotted" backgroundColor="secondary" />
```

**Props:**

- `type`: `"solid"` | `"dotted"` | `"dashed"`
- `vertical`: Boolean for vertical orientation
- `bold`: Boolean for thicker line
- All `BViewProps`

### Layout Components

#### BSurface

A pressable surface component with shadow variant support from your theme.

```typescript
import BSurface from "@/components/base/base.surface";

<BSurface
  variant="card"
  backgroundColor="background"
  padding="md"
  borderRadius="lg"
  onPress={handlePress}
>
  <BText>Surface Content</BText>
</BSurface>;
```

**Props:**

- `variant`: Shadow variant from theme
- All Restyle props and `PressableProps`

#### BScrollview

An optimized scrollable container using FlashList with keyboard awareness.

```typescript
import BScrollview from "@/components/base/base.scrollview";

<BScrollview estimatedItemSize={100} padding="md" backgroundColor="background">
  {children}
</BScrollview>;
```

**Props:**

- `estimatedItemSize`: Required for FlashList optimization
- All FlashList props and Restyle spacing/background props

#### BFlashList

A high-performance list component with built-in loading, error, and empty states.

```typescript
import BFlashList from "@/components/base/base.flashList";

const data = [
  { id: "1", name: "Item 1", type: "item" },
  { id: "2", name: "Item 2", type: "item" },
];

<BFlashList
  data={data}
  keyAttribute="id"
  keyTypeAttribute="type"
  renderItem={({ item }) => (
    <BView padding="md">
      <BText>{item.name}</BText>
    </BView>
  )}
  estimatedItemSize={60}
  LoadingComponent={CustomLoadingComponent}
  ErrorComponent={CustomErrorComponent}
  padding="md"
/>;
```

**Props:**

- `keyAttribute`: Key field for item identification (required)
- `keyTypeAttribute`: Type field for item type identification (default: "type")
- `LoadingComponent`: Custom loading component
- `ErrorComponent`: Custom error component
- `LoadMoreErrorComponent`: Custom load more error component
- All FlashList props and Restyle spacing/background props

### Text Components

#### BTextEllipsis

An intelligent text component with "see more"/"see less" functionality for long content.

```typescript
import BTextEllipsis from "@/components/base/textEllipsis/base.textEllipsis";

<BTextEllipsis
  numberOfLines={3}
  readMoreText="Read more"
  readLessText="Show less"
>
  {longTextContent}
</BTextEllipsis>;
```

**Props:**

- `numberOfLines`: Maximum lines before truncation
- `readMoreText`/`readLessText`: Custom button text
- `compensationSpaceAndroid`/`compensationSpaceIos`: Platform-specific spacing
- All `BTextProps`

#### BTextMulti

A component for rendering text with multiple styles using the `|||` separator.

```typescript
import BTextMulti from "@/components/base/base.multiText";

<BTextMulti
  style1={{ color: "red" }}
  style2={{ fontWeight: "bold" }}
  style3={{ fontStyle: "italic" }}
>
  Normal text|||Bold red text|||Italic text
</BTextMulti>;
```

**Props:**

- `style1`, `style2`, ..., `style21`: Styles for each text segment
- All `BTextProps` (excluding children and style)

### Utility Components

#### BLazy

A component for lazy rendering with optional loading indicator.

```typescript
import BLazy from "@/components/base/base.lazy";

<BLazy timeRender={1000} haveIndicator>
  <ExpensiveComponent />
</BLazy>;
```

**Props:**

- `timeRender`: Delay in milliseconds before rendering
- `haveIndicator`: Show ActivityIndicator while waiting
- `children`: Content to render after delay

## Usage Patterns

### Theme Integration

All components automatically integrate with your theme system:

```typescript
// Colors from theme
<BView backgroundColor="primary" />
<BText color="secondary" />

// Spacing from theme
<BView padding="md" margin="lg" />

// Border radius from theme
<BView borderRadius="xl" />

// Text variants from theme
<BText variant="heading" />
```

### Responsive Design

Components support responsive values using breakpoints:

```typescript
<BView
  padding={{ phone: "sm", tablet: "lg" }}
  flexDirection={{ phone: "column", tablet: "row" }}
/>
```

### Composition

Components are designed to work together seamlessly:

```typescript
<BSurface variant="card" padding="md">
  <BView flexDirection="row" alignItems="center" gap="sm">
    <BIcon name="user" color="primary" />
    <BView flex={1}>
      <BText variant="heading">User Name</BText>
      <BText variant="body" color="secondary">
        user@example.com
      </BText>
    </BView>
    <BIconButton icon="more-vert" onPress={showMenu} />
  </BView>
</BSurface>
```

### List Performance

For optimal list performance, use BFlashList with proper configuration:

```typescript
<BFlashList
  data={items}
  keyAttribute="id"
  estimatedItemSize={80}
  renderItem={({ item }) => <ItemComponent item={item} />}
  onEndReached={loadMore}
  refreshing={isRefreshing}
  onRefresh={handleRefresh}
/>
```
