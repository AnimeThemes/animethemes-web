import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { Icon } from "components/icon";
import { SearchResultList } from "components/search";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { fetchEntitySearchResults } from "lib/search";

export function EntitySearch({ searchQuery, searchEntity }) {
    const fetchEntityPage = ({ pageParam = 1 }) =>
        fetchEntitySearchResults(searchQuery, 15, pageParam, searchEntity);

    const queryClient = useQueryClient();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isPlaceholderData
    } = useInfiniteQuery(
        [ "searchEntity", searchQuery, searchEntity ],
        fetchEntityPage,
        {
            getNextPageParam: (lastPage) => lastPage.hasNextPage,
            keepPreviousData: true,
            placeholderData: () => {
                const cachedData = queryClient.getQueryData(["searchGlobal", searchQuery])?.[searchEntity];
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

    if (isLoading) {
        return (
            <Text block>Searching...</Text>
        );
    }

    const results = data.pages.flatMap((page) => page.data);

    if (!results.length) {
        return (
            <Text block>No results found for query &quot;{searchQuery}&quot;. Did you spell it correctly?</Text>
        );
    }

    const isLoadingMore = isFetchingNextPage || isPlaceholderData;

    return (
        <Box gapsColumn="1.5rem">
            <Box gapsColumn="1rem">
                <SearchResultList results={results} entity={searchEntity}/>
            </Box>
            {(hasNextPage || isPlaceholderData) && (
                <Flex justifyContent="center">
                    <Button silent onClick={() => !isLoadingMore && fetchNextPage()} title="Load more">
                        <Icon icon={isLoadingMore ? faSpinner : faChevronDown} spin={isLoadingMore}/>
                    </Button>
                </Flex>
            )}
        </Box>
    );
}
