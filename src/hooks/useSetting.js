import useLocalStorageState from "use-local-storage-state";

export default function useSetting({ __KEY__: key, __INITIAL_VALUE__: initialValue }) {
    const [setting, setSetting] = useLocalStorageState(key, { ssr: true, defaultValue: initialValue });

    return [setting, setSetting];
}
