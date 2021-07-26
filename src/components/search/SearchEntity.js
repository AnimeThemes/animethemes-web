import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { Icon } from "components/icon";
import { SearchResultList } from "components/search";
import { SearchFilterGroup } from "components/search-filter";

export function SearchEntity({
    searchQuery,
    searchEntity,
    filters,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPlaceholderData
}) {
    return (
        <Box gapsColumn="1.5rem">
            {!!filters && (
                <SearchFilterGroup>
                    {filters}
                </SearchFilterGroup>
            )}
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
