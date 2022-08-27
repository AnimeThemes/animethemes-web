import { useInfiniteQuery } from "react-query";
import type { SimpleSearchArgs } from "lib/client/search";
import { toSearchArgs } from "lib/client/search";
import type { SearchArgs } from "generated/graphql";

export default function useEntitySearch<T>(
    entity: string,
    fetchResults: (searchArgs: SearchArgs) => Promise<{
        data: Array<T>
        nextPage: number | null
    }>,
    searchArgs: SimpleSearchArgs
) {
    const fetchEntityPage = ({ pageParam = 1 }) => fetchResults({
        ...toSearchArgs(searchArgs),
        page: pageParam
    });

    return useInfiniteQuery(
        [
            "searchEntity",
            entity,
            searchArgs,
        ],
        fetchEntityPage,
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
            keepPreviousData: true,
        }
    );
}
