# MoE – ReactJS Project

## 1. Introduction

**MoE** is a frontend project built with **ReactJS**, following a **module-based and scalable architecture**, suitable for large-scale systems such as:

* Dashboards
* SaaS Platforms
* Admin Panels
* Enterprise Web Applications

The project architecture focuses on:

* Clear separation of concerns
* High scalability and maintainability
* High reusability
* Team-friendly development

---

## 2. Tech Stack

* **React 18**
* **Vite** (Build Tool)
* **JavaScript / JSX**
* **SCSS** (Global & Modular styles)
* **Axios** (API communication)
* **React Router DOM** (Routing)
* **Context API** (Global State Management)

---

## 3. Project Structure

```bash
src/
 ├── assets/          # Static assets (Images, Icons, Fonts)
 ├── styles/          # Global SCSS (variables, mixins, global styles)
 ├── components/      # Shared UI Components (Button, Input, Modal, etc.)
 ├── constants/       # Global constants, API endpoints, config values
 ├── contexts/        # Global state management using Context API
 ├── hooks/           # Reusable custom hooks (useAuth, useFetch, etc.)
 ├── layouts/         # Layout wrappers (MainLayout, AuthLayout, DashboardLayout)
 ├── pages/           # Application pages (feature-based modules)
 │    └── [PageName]/
 │         ├── components/ # Components used ONLY by this page
 │         └── [Page].jsx  # Main page component
 ├── routes/          # Centralized routing configuration
 ├── services/        # API layer (Axios instance & API services)
 ├── utils/           # Helper functions (formatting, validation, etc.)
 ├── App.jsx          # Root component
 └── main.jsx         # Application entry point
```

---

## 4. Folder Responsibilities

### 4.1 `assets/`

Contains all static resources:

* Images
* Icons
* Fonts

📌 **No logic or components should be placed here**

---

### 4.2 `styles/`

Manages global styling using SCSS:

* `_variables.scss` – Colors, spacing, typography variables
* `_mixins.scss` – Shared SCSS mixins
* `global.scss` – Global styles and CSS reset

📌 Import `global.scss` in `main.jsx`

---

### 4.3 `components/`

Shared UI components reused across the entire application:

Examples:

* Button
* Input
* Modal
* Table
* Loader

📌 Components here should be **UI-focused and business-logic free**

---

### 4.4 `constants/`

Global constants and configuration values:

* API endpoints
* Role definitions
* Enum-like values
* Application configuration

Example:

```js
export const API_BASE_URL = '/api';
```

---

### 4.5 `contexts/`

Manages **global application state** using React Context API:

Examples:

* AuthContext
* ThemeContext
* LoadingContext

📌 Use only for truly global state

---

### 4.6 `hooks/`

Reusable custom hooks shared across the project:

Examples:

* `useAuth()`
* `useFetch()`
* `useDebounce()`

📌 Hooks are UI-agnostic and reusable

---

### 4.7 `layouts/`

Layout wrappers for different page groups:

* `MainLayout` – Main application layout
* `AuthLayout` – Authentication pages (Login / Register)
* `DashboardLayout` – Admin / Dashboard pages

📌 Layouts typically include Header, Sidebar, and Footer

---

### 4.8 `pages/`

Each page is a **self-contained feature module**:

```bash
pages/UserManage/
 ├── components/
 └── UserManage.jsx
```

Key principles:

* No local hooks inside `pages`
* All hooks are centralized in `src/hooks/`
* Pages focus on orchestration and composition

This approach improves reusability and avoids duplicated business logic.

---

### 4.9 `routes/`

Centralized routing configuration:

* Public routes
* Private routes
* Role-based routes

📌 Routes should not be declared directly inside pages

---

### 4.10 `services/`

API communication layer:

* Axios instance configuration
* Domain-based API services

Examples:

* authService
* userService
* productService

📌 Components and hooks should not call APIs directly

---

### 4.11 `utils/`

Utility helper functions:

* Date formatting
* Form validation
* Data transformation

📌 No state management or JSX here

---

## 5. High-level Flow

```text
Page → Hook → Service → API
  ↓
Component → UI
```

---

## 6. Installation & Running the Project

### 6.1 System Requirements

* Node.js >= 18
* npm or yarn

Check versions:

```bash
node -v
npm -v
```

---

### 6.2 Clone the Repository

```bash
git clone <repository-url>
cd MoE
```

---

### 6.3 Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

### 6.4 Environment Configuration

Create a `.env` file at the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

📌 `VITE_` prefix is required

---

### 6.5 Run in Development Mode

```bash
npm run dev
```

Or:

```bash
yarn dev
```

Default URL:

```
http://localhost:5173
```

---

### 6.6 Build for Production

```bash
npm run build
```

Build output:

```bash
dist/
```

---

## 7. Conventions & Best Practices

* Do not call APIs directly inside components
* Keep business logic out of UI components
* One page equals one feature
* Shared components must live in `components/`
* Shared hooks must live in `hooks/`

---

## 8. Future Enhancements

* Add Redux Toolkit for complex state management
* Add i18n for multi-language support
* Add Storybook for UI documentation
* Implement role-based permissions

---

## 9. Project Information

**Project Name:** MoE
**Frontend Architecture:** Modular – Scalable – Clean

---

> If you need additional documentation such as:
>
> * Coding conventions
> * Advanced folder structure
> * Clean Architecture mapping for React
> * Standardized service / hook patterns

Just let me know 👍
