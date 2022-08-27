import type { Colors, Shadows } from "./index";
import { colors } from "./index";

export const darkColors: Colors = {
    ...colors,
    "background":           colors["gray-900"],
    "solid":                colors["gray-800"],
    "solid-primary":        colors["primary-300"],
    "solid-on-card":        colors["gray-700"],
    "text":                 colors["gray-100"],
    "text-muted":           colors["gray-300"],
    "text-disabled":        colors["gray-400"],
    "text-warning":         colors["warning-400"],
    "text-warning-muted":   colors["warning-200"],
    "text-primary":         colors["primary-300"],
    "text-on-primary":      colors["primary-900"]
};

export const darkShadows: Shadows = {
    low: `
        1px 2px 2px hsl(262deg 20% 7% / 0.25)
    `,
    medium: `
        1px 2px 2px hsl(262deg 20% 7% / 0.3),
        2px 4px 4px hsl(262deg 20% 7% / 0.3),
        3px 6px 6px hsl(262deg 20% 7% / 0.3)
    `,
    high: `
        1px 2px 2px hsl(262deg 20% 10% / 0.5),
        2px 4px 4px hsl(262deg 20% 10% / 0.5),
        4px 8px 8px hsl(262deg 20% 10% / 0.5),
        8px 16px 16px hsl(262deg 20% 10% / 0.5),
        16px 32px 32px hsl(262deg 20% 10% / 0.5)
    `
};
