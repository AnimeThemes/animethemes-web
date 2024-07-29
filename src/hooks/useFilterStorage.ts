import { useCallback } from "react";

import useSessionStorageState from "use-session-storage-state";

export default function useFilterStorage<T>(
    key: string,
    defaultValue: T,
): {
    filter: T;
    updateFilter(key: keyof T, value: T[typeof key]): void;
    bindUpdateFilter(key: keyof T): (value: T[typeof key]) => void;
} {
    const [filter, setFilter] = useSessionStorageState(key, { defaultValue });

    return {
        filter,
        updateFilter: useCallback((key, value) => setFilter((filter) => ({ ...filter, [key]: value })), [setFilter]),
        bindUpdateFilter: useCallback(
            (key) => (value) => setFilter((filter) => ({ ...filter, [key]: value })),
            [setFilter],
        ),
    };
}
