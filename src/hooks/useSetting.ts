import useLocalStorageState from "use-local-storage-state";
import type { Setting } from "utils/settings";
import type { LocalStorageOptions } from "use-local-storage-state/src/useLocalStorageState";

export default function useSetting<T>(
    { __KEY__: key, __INITIAL_VALUE__: initialValue }: Setting<T>,
    localStorageOptions: Pick<LocalStorageOptions<T>, "storageSync"> = {}
) {
    const [setting, setSetting] = useLocalStorageState<T>(key, { ssr: true, defaultValue: initialValue, ...localStorageOptions });

    return [setting, setSetting] as const;
}
