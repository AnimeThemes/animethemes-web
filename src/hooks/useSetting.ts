import useLocalStorageState from "use-local-storage-state";
import { Setting } from "utils/settings";

export default function useSetting<T>({ __KEY__: key, __INITIAL_VALUE__: initialValue }: Setting<T>) {
    const [setting, setSetting] = useLocalStorageState(key, { ssr: true, defaultValue: initialValue });

    return [setting, setSetting] as const;
}
