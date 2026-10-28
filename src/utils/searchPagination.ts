import { NetworkStatus } from "@apollo/client";

interface SearchQueryResult {
    data?: unknown;
    previousData?: unknown;
    error?: unknown;
    loading: boolean;
    networkStatus: NetworkStatus;
}

interface SearchPageInfo {
    offset: number;
    first: number;
}

export function getSearchStatus({ data, previousData, error, loading, networkStatus }: SearchQueryResult) {
    return {
        error,
        isError: !!error,
        isLoading: loading && !data && !previousData,
        isFetching: loading,
        isFetchingNextPage: networkStatus === NetworkStatus.fetchMore,
        isPlaceholderData: !data && !!previousData,
    };
}

export function getNextPage({ offset, first }: SearchPageInfo) {
    return offset / first + 1;
}
