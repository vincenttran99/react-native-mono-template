---
sidebar_position: 4
---

# Global Components

Global components are application-wide UI elements that provide consistent user interactions across the entire app. These components are typically used for system-level notifications, dialogs, loading states, and other overlay elements that need to be accessible from anywhere in the application.

## Overview

This template includes three main global components located in `src/components/global/` and managed through helper functions in <mcfile name="global.helper.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/helpers/global.helper.tsx"></mcfile>:

- **GlobalDialog**: Modal dialogs for confirmations, alerts, and user interactions
- **GlobalBottomSheetDialog**: Bottom sheet dialogs for mobile-optimized interactions
- **GlobalLoading**: Application-wide loading overlay
- **Flash Messages**: Toast notifications for user feedback

## Usage

### GlobalDialog Usage

The global dialog is accessed through the `showDialog` function that accepts a <mcsymbol name="GlobalDialogComponentData" filename="global.dialog.component.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/components/global/global.dialog.component.tsx" startline="17" type="class"></mcsymbol> object.

**Basic Usage**

```typescript
import { showDialog } from "@/helpers/global.helper";

const MyComponent = () => {
  const handleShowConfirmDialog = () => {
    showDialog({
      title: "Confirm Action",
      icon: "warning",
      content: "Are you sure you want to proceed?",
      dismissable: true,
      positiveButton: {
        label: "Confirm",
        onPress: () => {
          console.log("Confirmed");
        },
      },
      negativeButton: {
        label: "Cancel",
        onPress: () => {
          console.log("Cancelled");
        },
      },
    });
  };

  return <BButton onPress={handleShowConfirmDialog} label="Show Dialog" />;
};
```

**Dialog Configuration Options**

```typescript
type GlobalDialogComponentData = {
  title?: string; // Dialog title
  titleProps?: BTextProps; // Custom title styling
  icon?: string; // Icon name from icon set
  dismissable?: boolean; // Allow backdrop dismissal
  dismissableBackButton?: boolean; // Allow back button dismissal
  iconProps?: Omit<BIconProps, "name">; // Custom icon styling
  content?: React.ReactNode | string; // Main content
  scrollContent?: React.ReactNode; // Scrollable content area
  negativeButton?: ButtonConfig; // Cancel/No button
  positiveButton?: ButtonConfig; // Confirm/Yes button
  neutralButton?: ButtonConfig; // Neutral option button
  closeButton?: boolean; // Show close button
};
```

**Advanced Dialog Examples**

```typescript
// Error Dialog
showDialog({
  title: "Error",
  icon: "alert-circle",
  iconProps: { color: "error" },
  content: "Something went wrong. Please try again.",
  dismissable: true,
  positiveButton: {
    label: "OK",
    props: { backgroundColor: "error" },
  },
});

// Custom Content Dialog
showDialog({
  title: "Custom Content",
  content: (
    <BView gap="md">
      <BText>This is custom content</BText>
      <BTextInput placeholder="Enter your input" />
    </BView>
  ),
  positiveButton: { label: "Submit" },
  negativeButton: { label: "Cancel" },
});

// Three Button Dialog
showDialog({
  title: "Choose Option",
  content: "Select one of the following options:",
  positiveButton: { label: "Option A" },
  neutralButton: { label: "Option B" },
  negativeButton: { label: "Cancel" },
});
```

### GlobalBottomSheetDialog Usage

The bottom sheet dialog is accessed through the `showBottomSheetDialog` function, providing a mobile-optimized dialog experience.

**Basic Usage**

```typescript
import { showBottomSheetDialog } from "@/helpers/global.helper";

const MyComponent = () => {
  const handleShowBottomSheet = () => {
    showBottomSheetDialog({
      title: "Select Option",
      icon: "settings",
      content: "Choose your preferred option:",
      enablePanDownToClose: true,
      dismissable: "close",
      positiveButton: {
        label: "Option A",
        onPress: () => console.log("Option A selected"),
      },
      neutralButton: {
        label: "Option B",
        onPress: () => console.log("Option B selected"),
      },
      negativeButton: {
        label: "Cancel",
        onPress: () => console.log("Cancelled"),
      },
    });
  };

  return <BButton onPress={handleShowBottomSheet} label="Show Bottom Sheet" />;
};
```

**Bottom Sheet Configuration**

```typescript
type GlobalBottomSheetDialogComponentData = {
  title?: string; // Dialog title
  icon?: string; // Icon name
  iconProps?: BIconProps; // Icon styling
  content?: React.ReactNode; // Main content
  scrollContent?: React.ReactNode; // Scrollable content
  negativeButton?: ButtonConfig; // Cancel button
  positiveButton?: ButtonConfig; // Primary action button
  neutralButton?: ButtonConfig; // Secondary action button
  closeButton?: boolean; // Show close button
  enablePanDownToClose?: boolean; // Enable pan gesture to close
  dismissable?: "close" | "none"; // Backdrop behavior
};
```

### GlobalLoading Usage

The global loading overlay is controlled through simple helper functions for showing and hiding loading states.

**Basic Usage**

```typescript
import { showGlobalLoading, hideGlobalLoading } from "@/helpers/global.helper";

const MyComponent = () => {
  const handleAsyncOperation = async () => {
    // Show loading with auto-hide after 10 seconds (default)
    showGlobalLoading(true);

    try {
      await someAsyncOperation();
    } finally {
      // Manually hide loading when operation completes
      hideGlobalLoading();
    }
  };

  const handleLongOperation = () => {
    // Show loading without auto-hide
    showGlobalLoading(false);

    // Remember to manually hide when done
    setTimeout(() => {
      hideGlobalLoading();
    }, 5000);
  };

  return (
    <BView gap="md">
      <BButton onPress={handleAsyncOperation} label="Async Operation" />
      <BButton onPress={handleLongOperation} label="Long Operation" />
    </BView>
  );
};
```

**Loading Functions**

- **`showGlobalLoading(autoHide: boolean = true)`**: Shows the loading overlay
  - `autoHide`: Whether to automatically hide after 10 seconds (default: true)
- **`hideGlobalLoading()`**: Manually hides the loading overlay

### Flash Messages Usage

Flash messages provide toast-style notifications for user feedback using `react-native-flash-message`.

**Basic Usage**

```typescript
import {
  showMessage,
  showSuccessMessage,
  showErrorMessage,
  showInfoMessage,
  showWaringMessage,
  hideMessage,
} from "@/helpers/global.helper";

const MyComponent = () => {
  const handleSuccess = () => {
    showSuccessMessage("Operation completed successfully!");
  };

  const handleError = () => {
    showErrorMessage("Something went wrong", "Please try again later");
  };

  const handleInfo = () => {
    showInfoMessage("Information", "This is an informational message");
  };

  const handleWarning = () => {
    showWaringMessage("Warning", "Please check your input");
  };

  const handleCustomMessage = () => {
    showMessage({
      message: "Custom Message",
      description: "This is a custom styled message",
      type: "success",
      duration: 4000,
      icon: "auto",
    });
  };

  return (
    <BView gap="md">
      <BButton onPress={handleSuccess} label="Success Message" />
      <BButton onPress={handleError} label="Error Message" />
      <BButton onPress={handleInfo} label="Info Message" />
      <BButton onPress={handleWarning} label="Warning Message" />
      <BButton onPress={handleCustomMessage} label="Custom Message" />
    </BView>
  );
};
```

**Message Functions**

- **`showSuccessMessage(message: string, description?: string)`**: Shows success toast
- **`showErrorMessage(message: string, description?: string)`**: Shows error toast
- **`showInfoMessage(message: string, description?: string)`**: Shows info toast
- **`showWaringMessage(message: string, description?: string)`**: Shows warning toast
- **`showMessage(messageOptions: MessageOptions)`**: Shows custom message with full options
- **`hideMessage()`**: Manually hides current message

## Integration Setup

The global components are automatically integrated in <mcfile name="index.tsx" path="/Users/vincent_tran/Work/ReactNative/react-native-mono-template/src/navigation/index.tsx"></mcfile> using refs from the global helper:

```typescript
import {
  BottomSheetDialogRef,
  DialogRef,
  LoadingRef,
} from "@/helpers/global.helper";

export default function AppNavigation() {
  return (
    <ThemeProvider theme={themeValue}>
      {/* Your navigation structure */}

      {/* Global components with refs */}
      <BLazy timeRender={1500} haveIndicator={false}>
        <GlobalBottomSheetDialogComponent ref={BottomSheetDialogRef} />
        <GlobalLoadingComponent ref={LoadingRef} />
        <GlobalDialogComponent ref={DialogRef} />
      </BLazy>

      {/* Flash message component */}
      <FlashMessage position={"top"} />
    </ThemeProvider>
  );
}
```

## Best Practices

**1. Use Helper Functions**

- Always use the helper functions instead of accessing refs directly
- Helper functions provide a cleaner API and better error handling
- They abstract away the complexity of ref management

**2. Error Handling**

```typescript
const handleOperation = async () => {
  showGlobalLoading();

  try {
    const result = await apiCall();
    showSuccessMessage("Operation successful!");
    return result;
  } catch (error) {
    showErrorMessage("Operation failed", error.message);
  } finally {
    hideGlobalLoading();
  }
};
```

**3. User Feedback**

```typescript
// Provide immediate feedback for user actions
const handleDelete = () => {
  showDialog({
    title: "Confirm Delete",
    content: "This action cannot be undone.",
    icon: "trash",
    iconProps: { color: "error" },
    positiveButton: {
      label: "Delete",
      props: { backgroundColor: "error" },
      onPress: async () => {
        showGlobalLoading();
        try {
          await deleteItem();
          showSuccessMessage("Item deleted successfully");
        } catch (error) {
          showErrorMessage("Failed to delete item");
        } finally {
          hideGlobalLoading();
        }
      },
    },
    negativeButton: { label: "Cancel" },
  });
};
```

**4. Loading States**

```typescript
// Always pair loading states with operations
const handleSubmit = async (data) => {
  showGlobalLoading();

  try {
    await submitForm(data);
    showSuccessMessage("Form submitted successfully!");
    navigation.goBack();
  } catch (error) {
    showErrorMessage(
      "Submission failed",
      "Please check your data and try again"
    );
  } finally {
    hideGlobalLoading();
  }
};
```

**5. Accessibility**

- Provide meaningful titles and content for screen readers
- Use appropriate button labels that describe the action
- Ensure proper focus management when dialogs open/close

**6. Performance**

- Global components are lazy-loaded to improve initial app performance
- Use `BLazy` component with appropriate timing for non-critical UI elements
- Avoid showing multiple dialogs simultaneously
