interface BaseColors {
    "white": string
    "gray-100": string
    "gray-200": string
    "gray-300": string
    "gray-400": string
    "gray-500": string
    "gray-600": string
    "gray-700": string
    "gray-800": string
    "gray-900": string
    "primary-100": string
    "primary-200": string
    "primary-300": string
    "primary-400": string
    "primary-500": string
    "primary-600": string
    "primary-700": string
    "primary-800": string
    "primary-900": string
    "warning-100": string
    "warning-200": string
    "warning-300": string
    "warning-400": string
    "warning-500": string
    "warning-600": string
    "warning-700": string
    "warning-800": string
    "warning-900": string
}

export interface Colors extends BaseColors {
    "background": string
    "solid": string
    "solid-primary": string
    "solid-on-card": string
    "text": string
    "text-muted": string
    "text-disabled": string
    "text-warning": string
    "text-warning-muted": string
    "text-primary": string
    "text-on-primary": string
}

export interface Shadows {
    low: string
    medium: string
    high: string
}

const baseColors: BaseColors = {
    "white": "#ffffff",
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
    "warning-900": "#7f1d1d"
};

export const colors: Colors = {
    ...baseColors,
    "background":           baseColors["gray-100"],
    "solid":                baseColors["white"],
    "solid-primary":        baseColors["primary-700"],
    "solid-on-card":        baseColors["gray-200"],
    "text":                 baseColors["gray-900"],
    "text-muted":           baseColors["gray-500"],
    "text-disabled":        baseColors["gray-400"],
    "text-warning":         baseColors["warning-600"],
    "text-warning-muted":   baseColors["warning-900"],
    "text-primary":         baseColors["primary-600"],
    "text-on-primary":      baseColors["primary-100"]
};

export const shadows: Shadows = {
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
    `
};
