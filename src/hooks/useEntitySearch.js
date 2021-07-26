import { fetchEntitySearchResults } from "lib/search";
import { useInfiniteQuery, useQueryClient } from "react-query";

export default function useEntitySearch(entity, query, params = {}) {
    const fetchEntityPage = ({ pageParam = 1 }) =>
        fetchEntitySearchResults({
            query: query,
            entity: entity,
            page: pageParam,
            ...params
        });

    const queryClient = useQueryClient();

    return useInfiniteQuery(
        [
            "searchEntity",
            query,
            entity,
            params
        ],
        fetchEntityPage,
        {
            getNextPageParam: (lastPage) => lastPage.hasNextPage,
            keepPreviousData: true,
            placeholderData: () => {
                const cachedData = queryClient.getQueryData(["searchGlobal", query])?.[entity];
                if (cachedData) {
                    return {
                        pages: [
                            {
                                data: cachedData,
                                hasNextPage: true
                            }
                        ]
                    };
                }
            }
        }
    );
}
