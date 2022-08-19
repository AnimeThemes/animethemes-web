export interface Setting<T> {
    __KEY__: string
    __INITIAL_VALUE__: T
    [key: string]: string | T
}

export const ShowAnnouncements: Setting<string> = Object.freeze({
    __KEY__: "showAnnouncements",
    __INITIAL_VALUE__: "enabled",
    ENABLED: "enabled",
    DISABLED: "disabled",
});

export const FeaturedThemePreview: Setting<string> = Object.freeze({
    __KEY__: "featuredThemePreview",
    __INITIAL_VALUE__: "video",
    VIDEO: "video",
    COVER: "cover",
    DISABLED: "disabled",
});

export const DeveloperMode: Setting<string> = Object.freeze({
    __KEY__: "devMode",
    __INITIAL_VALUE__: "disabled",
    DISABLED: "disabled",
    ENABLED: "enabled",
});

export const RevalidationToken: Setting<string | undefined> = Object.freeze({
    __KEY__: "revalidationToken",
    __INITIAL_VALUE__: undefined,
});

export const GlobalVolume: Setting<number> = Object.freeze({
    __KEY__: "volume",
    __INITIAL_VALUE__: 1,
});

export const ColorTheme: Setting<string> = Object.freeze({
    __KEY__: "theme",
    __INITIAL_VALUE__: "system",
    SYSTEM: "system",
    DARK: "dark",
    LIGHT: "light",
});

export const AudioMode: Setting<string> = Object.freeze({
    __KEY__: "audioMode",
    __INITIAL_VALUE__: "disabled",
    DISABLED: "disabled",
    ENABLED: "enabled",
});
