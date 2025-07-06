---
sidebar_position: 5
---

# Forms

Forms are a common feature of any application. This section shows you how to handle forms the right way with this React Native template using `react-hook-form` and custom form components.

## React Hook Form Integration

This template uses `react-hook-form` to handle forms <mcreference link="https://starter.obytes.com/ui-and-theme/forms/" index="0">0</mcreference>. It is a popular library that provides a lot of features out of the box and is very easy to use and integrate with React Native.

Make sure to check the [react-hook-form documentation](https://react-hook-form.com/) to learn more about how to use it.

## Form Components Overview

The template provides a set of controlled components that are specifically designed to work with `react-hook-form`. All form components are located in `src/components/form/` and follow a consistent API pattern:

- **FTextInput**: Text input field with validation
- **FTextInputBottomSheet**: Text input optimized for bottom sheet usage
- **FSelectSingle**: Single selection dropdown with search functionality
- **FSelectChip**: Multi/single selection using chip components
- **FSwitch**: Toggle switch component

## Basic Form Setup

Here's how to set up a basic form using the template's form components, as demonstrated in <mcfile name="login.screen.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/screens/login/login.screen.tsx"></mcfile>:

```typescript
import React, { useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FTextInput from "@/components/form/form.textInput";
import BButton from "@/components/base/base.button";
import BView from "@/components/base/base.view";

type FormData = {
  email: string;
  password: string;
};

const MyForm = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const ruleInput = useMemo(
    () => ({
      email: {
        required: {
          value: true,
          message: "Email should not be empty",
        },
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Email is not valid",
        },
      },
      password: {
        required: {
          value: true,
          message: "Password should not be empty",
        },
      },
    }),
    []
  );

  const onSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    console.log("Form data:", data);
    // Handle form submission
  }, []);

  return (
    <BView gap="md">
      <FTextInput
        name="email"
        control={control}
        placeholder="Your email"
        rules={ruleInput.email}
        leftIcon="email"
        keyboardType="email-address"
      />

      <FTextInput
        name="password"
        control={control}
        placeholder="Your password"
        rules={ruleInput.password}
        secureTextEntry
        leftIcon="lock"
      />

      <BButton onPress={handleSubmit(onSubmit)} label="Submit" />
    </BView>
  );
};
```

## Components

### FTextInput Component

The <mcsymbol name="FTextInput" filename="form.textInput.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/components/form/form.textInput.tsx" startline="32" type="function"></mcsymbol> is a controlled text input component that integrates seamlessly with `react-hook-form`.

**_Props Interface_**

```typescript
type FTextInputProps = BTextInputProps & {
  control: Control<any>; // React Hook Form control
  name: string; // Field name
  defaultValue?: string; // Default value
  hint?: string; // Helper text
  containerStyle?: StyleProp<ViewStyle>; // Container styling
  rules?: RegisterOptions; // Validation rules
};
```

**_Usage Examples_**

```typescript
// Basic text input
<FTextInput
  name="username"
  control={control}
  placeholder="Enter username"
  rules={{
    required: { value: true, message: "Username is required" },
    minLength: { value: 3, message: "Minimum 3 characters" }
  }}
/>

// Email input with validation
<FTextInput
  name="email"
  control={control}
  placeholder="Enter email"
  keyboardType="email-address"
  leftIcon="email"
  rules={{
    required: { value: true, message: "Email is required" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format"
    }
  }}
/>

// Password input
<FTextInput
  name="password"
  control={control}
  placeholder="Enter password"
  secureTextEntry
  leftIcon="lock"
  rules={{
    required: { value: true, message: "Password is required" },
    minLength: { value: 8, message: "Minimum 8 characters" }
  }}
/>

// Text input with hint
<FTextInput
  name="description"
  control={control}
  placeholder="Enter description"
  multiline
  numberOfLines={4}
  hint="Provide a brief description (optional)"
/>
```

### FTextInputBottomSheet Component

The <mcsymbol name="FTextInputBottomSheet" filename="form.textInput.bottomSheet.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/components/form/form.textInput.bottomSheet.tsx" startline="33" type="function"></mcsymbol> is specifically designed for use within bottom sheet modals, handling keyboard events properly.

**_Usage_**

```typescript
import FTextInputBottomSheet from "@/components/form/form.textInput.bottomSheet";

// Inside a bottom sheet modal
<FTextInputBottomSheet
  name="comment"
  control={control}
  placeholder="Add your comment"
  multiline
  numberOfLines={3}
  rules={{
    required: { value: true, message: "Comment is required" },
  }}
/>;
```

### FSelectSingle Component

The <mcsymbol name="FSelectSingle" filename="form.select.single.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/components/form/form.select.single.tsx" startline="48" type="function"></mcsymbol> provides a dropdown selection with search functionality using bottom sheet modal.

**_Props Interface_**

```typescript
type FSelectSingleProps = BTextInputProps & {
  control: Control<any>;
  name: string;
  defaultValue?: { value: any; label?: string };
  hint?: string;
  label?: string;
  rules?: RegisterOptions;
  search?: boolean; // Enable search functionality
  disabled?: boolean;
  searchPlaceHolder?: string;
  onChangeSearchValue?: (value: string) => Promise<FSelectSingleItem[]>;
  heightSelectBox?: string | number;
  initData: FSelectSingleItem[]; // Options data
  onValueChange?: (value: FSelectSingleItem) => void;
  renderItem?: (item, currentValue, onPress) => React.JSX.Element;
};

type FSelectSingleItem = {
  value: any;
  label: string;
  [key: string]: any;
};
```

**_Usage Examples_**

```typescript
// Basic select
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
];

<FSelectSingle
  name="country"
  control={control}
  label="Select Country"
  placeholder="Choose a country"
  initData={countryOptions}
  rules={{
    required: { value: true, message: "Country is required" }
  }}
/>

// Select with search
<FSelectSingle
  name="city"
  control={control}
  label="Select City"
  placeholder="Choose a city"
  search={true}
  searchPlaceHolder="Search cities..."
  initData={cityOptions}
  heightSelectBox="60%"
  onValueChange={(selected) => {
    console.log('Selected city:', selected);
  }}
/>

// Select with async search
<FSelectSingle
  name="user"
  control={control}
  label="Select User"
  placeholder="Choose a user"
  search={true}
  initData={userOptions}
  onChangeSearchValue={async (searchTerm) => {
    const response = await searchUsers(searchTerm);
    return response.data;
  }}
/>

// Custom item rendering
<FSelectSingle
  name="product"
  control={control}
  label="Select Product"
  initData={productOptions}
  renderItem={(item, currentValue, onPress) => (
    <BPressable
      onPress={() => onPress(item)}
      paddingVertical="md"
      flexDirection="row"
      alignItems="center"
      gap="sm"
    >
      <BImage source={{ uri: item.image }} width={40} height={40} />
      <BView flex={1}>
        <BText variant="md" fontWeight="bold">{item.label}</BText>
        <BText variant="sm" color="secondary">{item.description}</BText>
      </BView>
      {currentValue?.value === item.value && (
        <BIcon name="check" color="primary" />
      )}
    </BPressable>
  )}
/>
```

### FSelectChip Component

The <mcsymbol name="FSelectChip" filename="form.select.chip.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/components/form/form.select.chip.tsx" startline="41" type="function"></mcsymbol> allows selection using chip components, supporting both single and multiple selection modes.

**_Props Interface_**

```typescript
type FSelectChipProps = {
  control: Control<any>;
  name: string;
  defaultValue?: FChipItem[];
  hint?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rules?: RegisterOptions;
  initData: FChipItem[]; // Chip options
  onValueChange?: (values: FChipItem[]) => void;
  multi?: boolean; // Enable multiple selection
  chipProps?: BChipProps; // Props for chip styling
};

type FChipItem = {
  value: any;
  label: string;
  icon?: string;
};
```

**_Usage Examples_**

```typescript
// Single selection chips
const sizeOptions = [
  { value: 'xs', label: 'Extra Small' },
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

<FSelectChip
  name="size"
  control={control}
  initData={sizeOptions}
  multi={false}
  hint="Select your preferred size"
  rules={{
    required: { value: true, message: "Size is required" }
  }}
/>

// Multiple selection chips
const interestOptions = [
  { value: 'tech', label: 'Technology', icon: 'laptop' },
  { value: 'sports', label: 'Sports', icon: 'football' },
  { value: 'music', label: 'Music', icon: 'music' },
  { value: 'travel', label: 'Travel', icon: 'airplane' },
];

<FSelectChip
  name="interests"
  control={control}
  initData={interestOptions}
  multi={true}
  chipProps={{
    size: 'md',
    variant: 'outline'
  }}
  containerStyle={{
    flexWrap: 'wrap',
    gap: 8
  }}
  onValueChange={(selected) => {
    console.log('Selected interests:', selected);
  }}
/>

// Custom styled chips
<FSelectChip
  name="tags"
  control={control}
  initData={tagOptions}
  multi={true}
  chipProps={{
    backgroundColor: 'primary',
    labelColor: 'white',
    selectedBackgroundColor: 'secondary',
    borderRadius: 'full'
  }}
/>
```

### FSwitch Component

The <mcsymbol name="FSwitch" filename="form.switch.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/components/form/form.switch.tsx" startline="30" type="function"></mcsymbol> provides a toggle switch for boolean values.

**_Props Interface_**

```typescript
type FSwitchProps = SwitchProps & {
  control: Control<any>;
  name: string;
  defaultValue?: boolean;
  hint?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rules?: RegisterOptions;
};
```

**_Usage Examples_**

```typescript
// Basic switch
<FSwitch
  name="notifications"
  control={control}
  defaultValue={true}
  hint="Enable push notifications"
/>

// Switch with validation
<FSwitch
  name="terms"
  control={control}
  defaultValue={false}
  rules={{
    required: {
      value: true,
      message: "You must accept the terms and conditions"
    }
  }}
  onValueChange={(value) => {
    console.log('Terms accepted:', value);
  }}
/>

// Custom styled switch
<BView flexDirection="row" alignItems="center" justifyContent="space-between">
  <BView flex={1}>
    <BText variant="md" fontWeight="bold">Dark Mode</BText>
    <BText variant="sm" color="secondary">Switch to dark theme</BText>
  </BView>
  <FSwitch
    name="darkMode"
    control={control}
    trackColor={{ false: '#767577', true: '#81b0ff' }}
    thumbColor={watchDarkMode ? '#f5dd4b' : '#f4f3f4'}
  />
</BView>
```

## Form Validation

All form components support `react-hook-form` validation rules. Here are common validation patterns:

**_Common Validation Rules_**

```typescript
const validationRules = {
  // Required field
  required: {
    value: true,
    message: "This field is required",
  },

  // Minimum length
  minLength: {
    value: 3,
    message: "Minimum 3 characters required",
  },

  // Maximum length
  maxLength: {
    value: 50,
    message: "Maximum 50 characters allowed",
  },

  // Pattern matching
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: "Only alphanumeric characters allowed",
  },

  // Custom validation
  validate: {
    notEmpty: (value) => value.trim() !== "" || "Field cannot be empty",
    uniqueEmail: async (value) => {
      const exists = await checkEmailExists(value);
      return !exists || "Email already exists";
    },
  },
};
```

**_Complex Validation Example_**

```typescript
const passwordRules = {
  required: {
    value: true,
    message: "Password is required",
  },
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  validate: {
    hasUpperCase: (value) =>
      /[A-Z]/.test(value) ||
      "Password must contain at least one uppercase letter",
    hasLowerCase: (value) =>
      /[a-z]/.test(value) ||
      "Password must contain at least one lowercase letter",
    hasNumber: (value) =>
      /\d/.test(value) || "Password must contain at least one number",
    hasSpecialChar: (value) =>
      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
      "Password must contain at least one special character",
  },
};
```

## Error Handling and Display

All form components automatically display validation errors. The error display follows this priority:

1. **Hint text**: Shows when no validation errors exist
2. **Validation errors**: Shows when field validation fails
3. **Error styling**: Components automatically apply error styling when invalid

```typescript
// Error display is automatic
<FTextInput
  name="email"
  control={control}
  placeholder="Enter email"
  hint="We'll never share your email" // Shows when valid
  rules={{
    required: { value: true, message: "Email is required" }, // Shows when invalid
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
  }}
/>
```

## Best Practices

**_1. Form Structure_**

- Use `BKeyboardAvoidingView` for forms to handle keyboard properly
- Group related fields using `BView` with appropriate spacing
- Provide clear labels and placeholders
- Use appropriate keyboard types for different input types

**_2. Validation_**

- Define validation rules in `useMemo` to prevent unnecessary re-renders
- Use descriptive error messages
- Implement client-side validation for better UX
- Consider server-side validation for security

**_3. Performance_**

- Use `defaultValues` in `useForm` to prevent controlled/uncontrolled warnings
- Memoize validation rules and options
- Use `watch` sparingly to avoid unnecessary re-renders
- Consider using `useController` for complex custom components

**_4. Accessibility_**

- Provide meaningful labels and hints
- Use appropriate `testID` props for testing
- Ensure proper focus management
- Support screen readers with descriptive text

**_5. User Experience_**

- Show loading states during form submission
- Provide immediate feedback for validation errors
- Use appropriate input types and keyboards
- Implement proper error handling and user feedback

```typescript
// Example of good form practices
const WellStructuredForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const validationRules = useMemo(
    () => ({
      email: {
        required: { value: true, message: "Email is required" },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email",
        },
      },
      password: {
        required: { value: true, message: "Password is required" },
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    }),
    []
  );

  const onSubmit = useCallback(async (data) => {
    try {
      await submitForm(data);
      showSuccessMessage("Form submitted successfully!");
    } catch (error) {
      showErrorMessage("Submission failed. Please try again.");
    }
  }, []);

  return (
    <BKeyboardAvoidingView flex={1} padding="lg">
      <BView gap="md">
        <FTextInput
          testID="email-input"
          name="email"
          control={control}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="email"
          rules={validationRules.email}
        />

        <FTextInput
          testID="password-input"
          name="password"
          control={control}
          placeholder="Enter your password"
          secureTextEntry
          leftIcon="lock"
          rules={validationRules.password}
        />

        <BView flexDirection="row" alignItems="center" gap="sm">
          <FSwitch name="rememberMe" control={control} defaultValue={false} />
          <BText>Remember me</BText>
        </BView>

        <BButton
          testID="submit-button"
          onPress={handleSubmit(onSubmit)}
          label={isSubmitting ? "Submitting..." : "Submit"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </BView>
    </BKeyboardAvoidingView>
  );
};
```

These form components provide a robust foundation for building forms in your React Native application while maintaining consistency with the design system and providing excellent user experience.
