import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { Icon } from "components/icon";
import { SearchResultList } from "components/search";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { fetchEntitySearchResults } from "lib/search";
import { FilterGroup, SeasonFilter, SortBy, YearFilter } from "components/search-filter";
import { useState } from "react";

const sortByFields = new Map([
    [ "Relevance", null ],
    [ "A ➜ Z", "name" ],
    [ "Z ➜ A", "-name" ],
    [ "Old ➜ New", "year,season,name" ],
    [ "New ➜ Old", "-year,-season,name" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

export function EntitySearch({ searchQuery, searchEntity }) {
    const [ filterSeason, setFilterSeason ] = useState(null);
    const [ filterYear, setFilterYear ] = useState(null);
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const fetchEntityPage = ({ pageParam = 1 }) =>
        fetchEntitySearchResults({
            query: searchQuery,
            entity: searchEntity,
            page: pageParam,
            filters: {
                season: filterSeason,
                year: filterYear
            },
            sortBy: sortByFields.get(sortBy)
        });

    const queryClient = useQueryClient();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isPlaceholderData
    } = useInfiniteQuery(
        [
            "searchEntity",
            searchQuery,
            searchEntity,
            filterSeason,
            filterYear,
            sortBy
        ],
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

    return (
        <Box gapsColumn="1.5rem">
            <FilterGroup>
                <SeasonFilter value={filterSeason} setValue={setFilterSeason}/>
                <YearFilter value={filterYear} setValue={setFilterYear}/>
                <SortBy options={sortByOptions} value={sortBy} setValue={setSortBy}/>
            </FilterGroup>
            {(() => {
                if (isLoading) {
                    return (
                        <Text block>Searching...</Text>
                    );
                }

                const results = data.pages.flatMap((page) => page.data);

                if (!results.length) {
                    if (searchQuery) {
                        return (
                            <Text block>No results found for query &quot;{searchQuery}&quot;. Did you spell it correctly?</Text>
                        );
                    } else {
                        return (
                            <Text block>No results found for your current filter settings.</Text>
                        );
                    }
                }

                const isLoadingMore = isFetchingNextPage || isPlaceholderData;

                return (
                    <>
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
                    </>
                );
            })()}
        </Box>
    );
}
