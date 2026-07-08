# 📦 Interactive React Admin Panel & Auth Dashboard

A state-of-the-art responsive admin dashboard built with **React 19**, **TypeScript**, and **Vite**. The project features a premium glassmorphic visual aesthetic, client-side authentication, custom analytics line charts, paginated transaction tables, and form schema validation.

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
Clone or download the project and run the following command in the root folder to install all dependencies (including Bootstrap and Font Awesome):
```bash
npm install
```

### Development Server
Launch the local development server with hot-module reloading:
```bash
npm run dev
```
By default, the application runs on [http://localhost:5173](http://localhost:5173).

### Production Build
To build the compiled, optimized production assets into the `dist/` directory, run:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🎨 Theme & Design Tokens System

We use a unified, centralized theme token system to enforce design consistency across CSS and React TSX files.

### 1. Declaring Design Tokens (`src/theme.ts`)
All theme values (colors, border-radiuses, shadows, typography weights, transition presets) are declared inside [theme.ts](file:///c:/Users/Santhosh/Desktop/UI-task/src/theme.ts).
```typescript
export const theme = {
  colors: {
    primary: "#0d0d0d",
    secondary: "#4f8ef7",
    success: "#22c55e",
    danger: "#ef4444",
    sidebarBg: "#121217",
    dashboardBg: "#ffffff",
    cardBg: "#ffffff",
    // ...
  },
  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  }
} as const;
```

### 2. Reusing Tokens in CSS (`src/index.css`)
CSS custom properties (variables) are mapped to theme colors inside the `:root` pseudo-class at the top of [index.css](file:///c:/Users/Santhosh/Desktop/UI-task/src/index.css):
```css
:root {
  --color-primary: #0d0d0d;
  --color-secondary: #4f8ef7;
  --color-sidebar-bg: #121217;
  --color-dashboard-bg: #ffffff;
  --radius-xl: 24px;
  /* ... */
}
```

### 3. Reusing Tokens in TSX Components
To style components using React inline styles, import the default theme export:
```tsx
import theme from '../theme';

const StatCard = () => (
  <div style={{ borderRadius: theme.borderRadius.md, background: theme.colors.cardBg }}>
    <h3 style={{ color: theme.colors.textPrimary }}>Title</h3>
  </div>
);
```

---

## ⚙️ Core Architecture & Code Reuse

The codebase uses atomic React components designed for portability and maximum reusability:

- **`AuthCard`** (`src/components/AuthCard/AuthCard.tsx`): A split-panel card component that wraps the authentication forms (Register, Login, OTP). It locks the layout, displays a premium background image panel on the left, and renders the form content on the right.
- **`Sidebar`** (`src/components/Sidebar/Sidebar.tsx`): A dark vertical navigation sidebar. On desktop, it is a flex child that slides tab curves inward cleanly against the content panel. On mobile, it automatically behaves as a slide-out drawer with overlay backdrop triggers.
- **`SimpleLineChart`** (`src/components/SimpleLineChart/SimpleLineChart.tsx`): An analytics component powered by Recharts. It generates smooth cubic Bezier lines, tooltip pills, and highlight columns.
- **`LazyImage`** (`src/components/LazyImage/LazyImage.tsx`): Implements lazy-loading using the `IntersectionObserver` API, showing a shimmer skeletal background until the asset loads.

---

## ⚡ Lazy Loading & Routing Structure

Performance is optimized through code-splitting. Pages are loaded asynchronously so that the user's initial download remains small.

### Routing Configuration (`src/App.tsx`)
Vite groups pages into separate JS chunks using React's `lazy` and `Suspense`:
```tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ─── Lazy-loaded Pages ───────────────────────────────────────
const LoginPage     = lazy(() => import('./pages/LoginPage'));
const RegisterPage  = lazy(() => import('./pages/RegisterPage'));
const OtpPage       = lazy(() => import('./pages/OtpPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

---

## 🔒 Form Validation & Authentication Logic

We separate validation logic from presentation views for ease of testing.

### 1. Zod Validation Schema (`src/schema.ts`)
Input criteria are enforced using Zod schemas:
- **`RegisterSchema`**: Enforces strict name, valid email structure, password minimum length of 6, and matching password verification fields.
- **`LoginSchema`**: Enforces valid email formats and password entries.

### 2. Form Handling
Components use `react-hook-form` connected to the Zod resolver (`@hookform/resolvers/zod`). This guarantees instant, client-side input validation and error prompts:
```tsx
const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
  resolver: zodResolver(RegisterSchema)
});
```

### 3. LocalStorage Authentication flow
1. **Register**: The user details are stored inside `localStorage` under the key `registeredUser`. Upon clicking register, a random OTP is generated and passed via React Router navigation state to the OTP screen.
2. **OTP Verification**: The OTP screen loads a premium top banner showing the verification code. An **Auto-fill** button allows the user to immediately verify and enter the application.
3. **Login**: Validates credentials against the stored `registeredUser` credentials in local storage.
4. **Logout**: Removes credentials state and redirects back to the login page.
