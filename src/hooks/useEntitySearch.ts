import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export interface CommonSearchArgs {
    query: string;
    page: number;
}

export default function useEntitySearch<Data, Args>(
    entity: string,
    fetchResults: (searchArgs: NoInfer<Args> & CommonSearchArgs) => Promise<{
        data: Array<Data>;
        nextPage: number | null;
    }>,
    searchArgs: Args & Omit<CommonSearchArgs, "page">,
) {
    const fetchEntityPage = ({ pageParam }: { pageParam: number }) =>
        fetchResults({
            ...searchArgs,
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
