// ============================================================
// theme.ts — Centralized Design Tokens
// All components must import colors from this file ONLY.
// ============================================================

export const theme = {
  colors: {
    // Primary brand colors
    primary: "#0d0d0d",
    primaryHover: "#222222",
    secondary: "#4f8ef7",
    secondaryHover: "#2f6fd4",
    accent: "#f7c948",
    success: "#22c55e",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#38bdf8",

    // Auth / form backgrounds
    authBg: "#f0f0f3",
    cardBg: "#ffffff",
    cardLeft: "#1a2236", // dark side of split card
    formBg: "#ffffff",
    inputBg: "#f9f9f9",
    inputBorder: "#e2e2e2",
    inputBorderFocus: "#0d0d0d",
    inputPlaceholder: "#aaaaaa",

    // Text colors
    textPrimary: "#0d0d0d",
    textSecondary: "#6b7280",
    textMuted: "#9ca3af",
    textLight: "#ffffff",
    textLink: "#0d0d0d",
    textLinkHover: "#4f8ef7",

    // Dashboard sidebar
    sidebarBg: "#1a1a2e",
    sidebarText: "#c8c8d8",
    sidebarActiveText: "#ffffff",
    sidebarActiveBg: "#2a2a4a",
    sidebarHoverBg: "#252545",
    sidebarBorder: "#2a2a4a",

    // Dashboard main area
    dashboardBg: "#f4f6fb",
    headerBg: "#ffffff",
    headerBorder: "#e8eaf0",

    // Stat cards
    statCard1Bg: "#e8f0ff",
    statCard1Icon: "#4f8ef7",
    statCard2Bg: "#ffe8e8",
    statCard2Icon: "#ef4444",
    statCard3Bg: "#fff3e0",
    statCard3Icon: "#f59e0b",

    // Table
    tableHeaderBg: "#f8f9fc",
    tableRowHover: "#f0f4ff",
    tableBorder: "#e8eaf0",

    // Product cards
    productCardBg: "#ffffff",
    productCardBorder: "#e8eaf0",
    productCardHoverShadow: "0 20px 40px rgba(79,142,247,0.15)",
    priceBadgeBg: "#0d0d0d",
    priceBadgeText: "#ffffff",

    // OTP boxes
    otpBoxBorder: "#d1d5db",
    otpBoxFocusBorder: "#0d0d0d",
    otpBoxBg: "#ffffff",

    // Shadows
    shadowSm: "0 2px 8px rgba(0,0,0,0.06)",
    shadowMd: "0 8px 24px rgba(0,0,0,0.10)",
    shadowLg: "0 20px 48px rgba(0,0,0,0.14)",
    shadowCard: "0 4px 32px rgba(0,0,0,0.12)",
  },

  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontSizeXs: "0.75rem",
    fontSizeSm: "0.875rem",
    fontSizeBase: "1rem",
    fontSizeLg: "1.125rem",
    fontSizeXl: "1.25rem",
    fontSize2xl: "1.5rem",
    fontSize3xl: "1.875rem",
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  },

  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  transitions: {
    fast: "all 0.15s ease",
    base: "all 0.25s ease",
    slow: "all 0.4s ease",
  },
} as const;

export type Theme = typeof theme;
export default theme;
