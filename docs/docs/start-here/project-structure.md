---
sidebar_position: 4
---

# Project Structure

If you open the new project you will see the following structure:

```
📁 plugins     ## Plugins for Expo used during prebuild to customize native code.
📁 scripts     ## Scripts written for tasks and automated functionalities.
📁 src
 ┣ 📁 api
 ┃ ┣ 📄 api.ts  ## Axios Configuration.
 ┃ ┣ 📄 reactQuery.ts   ## React Query Configuration.
 ┃ ┗ 📁 auth
 ┃   ┣ 📄 auth.api.ts   ## Managing the API for the auth module.
 ┃   ┗ 📄 auth.login.queries.ts   ## Managing query hooks related to login in the auth module.
 ┃
 ┣ 📁 assets     ## Contains static assets.
 ┃ ┣ 📁 fonts
 ┃ ┣ 📁 images
 ┃ ┣ 📁 lotties
 ┃ ┗ ...
 ┃
 ┣ 📁 components     ## Globally used components.
 ┃ ┣ 📁 base
 ┃ ┃ ┣ 📄 base.button.tsx   ## Basic button for the application.
 ┃ ┃ ┗ ...
 ┃ ┃
 ┃ ┣ 📁 form
 ┃ ┃ ┣ 📄 form.textInput.tsx   ## Text input for form use.
 ┃ ┃ ┗ ...
 ┃ ┃
 ┃ ┣ 📁 global
 ┃ ┃ ┣ 📄 global.dialog.component.tsx   ## Globally used Dialog component.
 ┃ ┃ ┗ ...
 ┃ ┗ ...
 ┃
 ┣ 📁 constants   ## Predefined values.
 ┃ ┣ 📄 config.constant.ts   ## Configuration values for the entire application retrieved from .env
 ┃ ┣ 📄 size.constant.ts   ## Pre-calculated size values for responsive layout.
 ┃ ┣ 📄 theme.constant.ts   ## Define the theme, colors, default styles, and variants for styling.
 ┃ ┣ 📄 date.constant.ts   ## Predefined values for date handling.
 ┃ ┗ ...
 ┃
 ┣ 📁 helpers   ## Utility functions.
 ┃ ┣ 📄 date.helper.ts   ## Date handling utility functions.
 ┃ ┗ ...
 ┃
 ┣ 📁 locale   ## Contains language directories and multilingual configuration.
 ┃
 ┣ 📁 models   ## Define the entities.
 ┃ ┣ 📄 user.model.ts   ## Define the user-related entities.
 ┃ ┗ ...
 ┃
 ┣ 📁 navigation   ## Configure navigation for the project.
 ┃
 ┣ 📁 screens   ## Declare the screens.
 ┃ ┣ 📁 home
 ┃ ┃ ┣ 📁 components   ## Components for screens in the "home" folder.
 ┃ ┃ ┃ ┣ 📄 home.header.tsx   ## Header component for the home screen.
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📄 home.screen.tsx   ## Home screen
 ┃ ┃ ┗ ...
 ┃ ┣ 📁 order
 ┃ ┃ ┣ 📁 components   ## Components for screens in the "order" folder.
 ┃ ┃ ┃ ┣ 📄 order.list.item.tsx   ## Item component for the order list screen.
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📄 order.list.screen.tsx   ## Order list screen.
 ┃ ┃ ┗ ...
 ┃ ┗ ...
 ┃
 ┣ 📁 store   ## Define global state and actions for Zustand.
 ┃ ┣ 📄 auth.store.ts
 ┃ ┗ ...
 ┃
 ┗ ...
```

## Main Folders

### `/plugins`

Contains Expo plugins used during prebuild to customize native code for specific platform requirements.

### `/scripts`

Contains utility scripts for automation tasks and project maintenance.

### `/src`

The main source code directory containing all application code:

#### `/src/api`

Manages API-related code including:

- API configuration with Axios
- React Query setup and configuration
- Module-specific API calls and query hooks organized by feature

#### `/src/assets`

Static resources including:

- Fonts
- Images
- Lottie animations
- Other media files

#### `/src/components`

Reusable components organized into:

- Base components (fundamental UI elements)
- Form components (input fields, form controls)
- Global components (app-wide dialogs, modals)

#### `/src/constants`

Application-wide constants including:

- Environment configurations
- Responsive sizing calculations
- Theme definitions and style variants
- etc.

#### `/src/helpers`

Utility functions organized by domain (date handling, etc.)

#### `/src/locale`

Internationalization configurations and language files

#### `/src/models`

Type definitions and interfaces for domain entities

#### `/src/navigation`

Navigation configuration and routing setup

#### `/src/screens`

Screen components organized by feature, each containing:

- Main screen component
- Screen-specific components
- Feature-specific logic

#### `/src/store`

Global state management using Zustand:

- Store definitions
- Actions and state updates
