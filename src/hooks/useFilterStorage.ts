import { useCallback } from "react";

import { useSessionStorageState } from "ahooks";

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
        filter: filter ?? defaultValue,
        updateFilter: useCallback(
            (key, value) =>
                setFilter((filter) => {
                    if (!filter) {
                        filter = {} as T;
                    }
                    return { ...filter, [key]: value };
                }),
            [setFilter],
        ),
        bindUpdateFilter: useCallback(
            (key) => (value) =>
                setFilter((filter) => {
                    if (!filter) {
                        filter = {} as T;
                    }
                    return { ...filter, [key]: value };
                }),
            [setFilter],
        ),
    };
}
