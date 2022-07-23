import useSessionStorageState from "use-session-storage-state";

export default function useFilterStorage<T>(key: string, defaultValue: T): {
    filter: T
    updateFilter(key: keyof T, value: T[typeof key]): void
    bindUpdateFilter(key: keyof T): (value: T[typeof key]) => void
} {
    const [filter, setFilter] = useSessionStorageState(key, {
        ssr: true,
        defaultValue,
    });

    return {
        filter,
        updateFilter: (key, value) => setFilter({ ...filter, [key]: value }),
        bindUpdateFilter: (key) => (value) => setFilter({ ...filter, [key]: value }),
    };
}
