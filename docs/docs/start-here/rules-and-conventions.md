---
sidebar_position: 3
---

# Rules and Conventions

To maintain a consistent code style and prevent common issues in the codebase, this starter enforces a set of rules and conventions throughout the project.

## TypeScript

This starter uses **TypeScript** to provide type safety and reduce bugs in the codebase. The project configuration is based on Expo, with adjustments to support absolute imports.

If you are new to TypeScript, you can read this article: [Typescript for React Developers](https://elazizi.com/posts/how-to-learn-typescript-for-react-developers/).

More information can be found in the [Expo TypeScript Guide](https://docs.expo.io/guides/typescript/).

---

## Naming Conventions

- **Static files and resources** (assets, docs, etc.) use **kebab-case**.
- **Folders** use **camelCase**.
- **Main files** follow the **Modular File Naming** convention.

### Example: Order Feature Module

Suppose you are building a group of screens for the "order" feature. You can organize them in an `order` folder as follows:

#### Screens

- `order.list.screen.tsx`  
  _Displays the order list screen (Main function: `OrderListScreen`)_
- `order.detail.screen.tsx`  
  _Displays the order detail screen (Main function: `OrderDetailScreen`)_
- `order.create.screen.tsx`  
  _Displays the order creation screen (Main function: `OrderCreateScreen`)_

#### Components

- `order.create.form.tsx`  
  _Form component for creating an order, used within `order.create.screen.tsx` (located in the `/components` subfolder of `order`, without the "screen" suffix)_

#### Global Components

Except for base and form components (which use the special prefixes `B**` and `F**`), all global components must include "component" in both the file and variable names:

- `base.button.component.tsx`  
  _Basic button component (Main function: `BButton`)_
- `form.textInput.component.tsx`  
  _Form input component (Main function: `FTextInput`)_
- `global.dialog.component.tsx`  
  _Global dialog component (Main function: `GlobalDialogComponent`)_
- `global.toast.component.tsx`  
  _Global toast component (Main function: `GlobalToastComponent`)_

#### Other Files

- `date.constant.ts`  
  _Contains constants for date handling_
- `date.helper.ts`  
  _Contains helper functions for date handling_
- `user.model.ts`  
  _Defines models for user-related entities_
- `auth.store.ts`  
  _Contains stores for state and actions related to authentication_
- `auth.api.ts`  
  _Contains APIs related to authentication_
- `auth.login.queries.ts`  
  _Contains hooks and React Query logic for the login feature in the authentication module_

---

## Interfaces, Constants, Enums, and Types

- **Interfaces, Enums, and Types** use **PascalCase**.
- **Static constants** use **UPPER_CASE**.

**Examples:**

- Interface: `IOrder`, `IUser`, `IProduct`
- Enum: `EOrderStatus`, `EUserRole`
- Type: Type used for quick definition, usually comes with corresponding suffix: BButtonProps, LoginResponse, etc
- Constant: `ORDER_STATUS`, `USER_ROLE`
