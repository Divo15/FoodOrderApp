/**
 * Design System: "The Culinary Curator"
 * Extracted from Stitch design project.
 *
 * Key principles:
 * - No borders/lines → use tonal surface shifts for separation
 * - ROUND_FULL roundness on interactive elements
 * - Generous spacing (min 20px gutters)
 * - No pure black text → always use onSurface (#2d2d42)
 * - Ambient shadows: Y:8, Blur:24, Opacity:6%, tinted with onSurface
 * - Glassmorphic floating bars
 */

export const COLORS = {
  // Core brand
  primary: "#FF6B35",
  primaryDim: "#922c00",
  primaryContainer: "#ff7949",
  onPrimary: "#ffefeb",
  onPrimaryContainer: "#451000",

  // Secondary (urgency / deals)
  secondary: "#a03834",
  secondaryContainer: "#ffc3be",
  onSecondary: "#ffefed",

  // Tertiary (positive accents — vegan, spicy chips)
  tertiary: "#4CAF50",
  tertiaryContainer: "#91f78e",
  onTertiary: "#d1ffc8",
  onTertiaryContainer: "#005e17",

  // Error states
  error: "#b31b25",
  errorContainer: "#fb5151",
  onError: "#ffefee",

  // Surfaces — the paper-stack hierarchy
  background: "#f8f5ff",
  surface: "#f8f5ff",
  surfaceBright: "#f8f5ff",
  surfaceDim: "#d3d1f8",
  surfaceContainer: "#e8e5ff",
  surfaceContainerHigh: "#e2dfff",
  surfaceContainerHighest: "#dbd9ff",
  surfaceContainerLow: "#f2efff",
  surfaceContainerLowest: "#ffffff",

  // On-surface text & icons
  onBackground: "#2d2d42",
  onSurface: "#2d2d42",
  onSurfaceVariant: "#5a5971",
  inverseSurface: "#0c0c1f",
  inverseOnSurface: "#9c9ab4",
  inversePrimary: "#fe6a34",

  // Outlines (use sparingly & at low opacity)
  outline: "#75748d",
  outlineVariant: "#acaac5",

  // Convenience aliases
  textPrimary: "#2d2d42",
  textSecondary: "#5a5971",
  textMuted: "#75748d",
  white: "#ffffff",
  star: "#FFD700",
};

export const FONTS = {
  headline: "PlusJakartaSans",
  body: "BeVietnamPro",
  // fallback when custom fonts not loaded
  headlineFallback: "System",
  bodyFallback: "System",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  DEFAULT: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const SHADOWS = {
  ambient: {
    shadowColor: "#2d2d42",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  soft: {
    shadowColor: "#2d2d42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  floating: {
    shadowColor: "#2d2d42",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 12,
  },
};
