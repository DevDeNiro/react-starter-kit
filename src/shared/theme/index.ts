export const breakpoints = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1200px",
    largeDesktop: "1440px",
} as const;

export const mediaQueries = {
    mobile: `@media (max-width: ${breakpoints.tablet})`,
    tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.laptop})`,
    laptop: `@media (min-width: ${breakpoints.laptop}) and (max-width: ${breakpoints.desktop})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    belowTablet: `@media (max-width: ${breakpoints.tablet})`,
    aboveTablet: `@media (min-width: ${breakpoints.tablet})`,
    belowLaptop: `@media (max-width: ${breakpoints.laptop})`,
    aboveLaptop: `@media (min-width: ${breakpoints.laptop})`,
} as const;

const spacing = {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    xxl: "2rem",
    xxxl: "2.5rem",
} as const;

const typography = {
    fontFamily: "\"Inter\", \"Segoe UI\", sans-serif",
    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.5rem",
        xxl: "2rem",
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

const radii = {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    pill: "9999px",
} as const;

const shadows = {
    sm: "0 1px 2px rgb(15 23 42 / 0.08)",
    md: "0 4px 12px rgb(15 23 42 / 0.12)",
    lg: "0 12px 32px rgb(15 23 42 / 0.16)",
} as const;

export const lightColors = {
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    text: "#0f172a",
    textMuted: "#64748b",
    border: "#e2e8f0",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryText: "#ffffff",
    success: "#15803d",
    warning: "#b45309",
    danger: "#dc2626",
    focus: "#60a5fa",
} as const;

export const darkColors = {
    background: "#0f172a",
    surface: "#1e293b",
    surfaceMuted: "#334155",
    text: "#f8fafc",
    textMuted: "#cbd5e1",
    border: "#475569",
    primary: "#60a5fa",
    primaryHover: "#93c5fd",
    primaryText: "#0f172a",
    success: "#4ade80",
    warning: "#fbbf24",
    danger: "#f87171",
    focus: "#93c5fd",
} as const;

const layout = {
    maxContentWidth: "1200px",
    navbarHeight: {
        mobile: "3.5rem",
        desktop: "4rem",
    },
    grid: {
        mobile: {columns: 1, gap: spacing.md, padding: spacing.lg},
        tablet: {columns: 2, gap: spacing.lg, padding: spacing.xl},
        laptop: {columns: 3, gap: spacing.xl, padding: spacing.xxl},
        desktop: {columns: 4, gap: spacing.xxl, padding: spacing.xxxl},
    },
} as const;

const zIndices = {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 30,
    toast: 40,
} as const;

const navbar = {
    height: {
        mobile: layout.navbarHeight.mobile,
        tablet: "4rem",
        desktop: layout.navbarHeight.desktop,
    },
    fontSize: {
        mobile: typography.fontSize.xs,
        tablet: typography.fontSize.sm,
        desktop: typography.fontSize.md,
    },
} as const;

const verticalMenu = {
    width: {
        mobile: "100vw",
        tablet: "50vw",
        laptop: "40vw",
        desktop: "30vw",
    },
} as const;

export const createTheme = (colors: typeof lightColors | typeof darkColors = lightColors) => ({
    breakpoints,
    mediaQueries,
    spacing,
    typography,
    radii,
    shadows,
    zIndices,
    colors,
    layout,
    grid: layout.grid,
    navbar,
    verticalMenu,
});

export const theme = createTheme();
export const darkTheme = createTheme(darkColors);

export type Theme = ReturnType<typeof createTheme>;

declare module "styled-components" {
    // Required for styled-components' module augmentation.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends Theme {}
}
