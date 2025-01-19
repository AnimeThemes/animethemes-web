import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { SearchArgs } from "@/generated/graphql";
import type { SimpleSearchArgs } from "@/lib/client/search";
import { toSearchArgs } from "@/lib/client/search";

export default function useEntitySearch<T>(
    entity: string,
    fetchResults: (searchArgs: SearchArgs) => Promise<{
        data: Array<T>;
        nextPage: number | null;
    }>,
    searchArgs: SimpleSearchArgs,
) {
    const fetchEntityPage = ({ pageParam }: { pageParam: number }) =>
        fetchResults({
            ...toSearchArgs(searchArgs),
            page: pageParam,
        });

    return useInfiniteQuery({
        queryKey: ["searchEntity", entity, searchArgs],
        queryFn: fetchEntityPage,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        placeholderData: keepPreviousData,
    });
}
