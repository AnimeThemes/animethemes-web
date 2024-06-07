import useLocalStorageState from "use-local-storage-state";
import type { LocalStorageOptions } from "use-local-storage-state/src/useLocalStorageState";

import type { Setting } from "@/utils/settings";

export default function useSetting<T>(
    { __KEY__: key, __INITIAL_VALUE__: initialValue }: Setting<T>,
    localStorageOptions: Pick<LocalStorageOptions<T>, "storageSync"> = {},
) {
    const [setting, setSetting] = useLocalStorageState<T>(key, { defaultValue: initialValue, ...localStorageOptions });

    return [setting, setSetting] as const;
}
