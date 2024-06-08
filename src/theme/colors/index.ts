const baseColors = {
    transparent: "#00000000",
    white: "#ffffff",
    "gray-100": "#f5f2fa",
    "gray-200": "#e6e1f0",
    "gray-300": "#d1cae0",
    "gray-400": "#9f93b8",
    "gray-500": "#72658c",
    "gray-600": "#574e6a",
    "gray-700": "#453d53",
    "gray-800": "#2e293a",
    "gray-900": "#1c1823",
    "primary-100": "#d1fbf1",
    "primary-200": "#a5f6e4",
    "primary-300": "#75ead4",
    "primary-400": "#52d4bf",
    "primary-500": "#40b8a6",
    "primary-600": "#319488",
    "primary-700": "#28766e",
    "primary-800": "#215e59",
    "primary-900": "#1e4e4a",
    "warning-100": "#fee2e2",
    "warning-200": "#fecaca",
    "warning-300": "#fca5a5",
    "warning-400": "#f87171",
    "warning-500": "#ef4444",
    "warning-600": "#dc2626",
    "warning-700": "#b91c1c",
    "warning-800": "#991b1b",
    "warning-900": "#7f1d1d",
    gold: "gold",
};

export const colors = {
    ...baseColors,
    background: baseColors["gray-100"],
    solid: baseColors["white"],
    "solid-primary": baseColors["primary-700"],
    "solid-warning": baseColors["warning-700"],
    "solid-on-card": baseColors["gray-200"],
    text: baseColors["gray-900"],
    "text-muted": baseColors["gray-500"],
    "text-disabled": baseColors["gray-400"],
    "text-warning": baseColors["warning-600"],
    "text-warning-muted": baseColors["warning-900"],
    "text-on-warning": baseColors["warning-100"],
    "text-primary": baseColors["primary-600"],
    "text-on-primary": baseColors["primary-100"],
};

export type Colors = typeof colors;

export const shadows = {
    low: `
        1px 2px 2px hsl(262deg 20% 50% / 0.4)
    `,
    medium: `
        1px 2px 2px hsl(262deg 20% 50% / 0.15),
        2px 4px 4px hsl(262deg 20% 50% / 0.15),
        3px 6px 6px hsl(262deg 20% 50% / 0.15)
    `,
    high: `
        1px 2px 2px hsl(262deg 20% 50% / 0.1),
        2px 4px 4px hsl(262deg 20% 50% / 0.1),
        4px 8px 8px hsl(262deg 20% 50% / 0.1),
        8px 16px 16px hsl(262deg 20% 50% / 0.1),
        16px 32px 32px hsl(262deg 20% 50% / 0.1)
    `,
};

export type Shadows = typeof shadows;
