import type { ReactNode } from "react";

import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { ErrorCard } from "@/components/card/ErrorCard";
import { Icon } from "@/components/icon/Icon";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { Text } from "@/components/text/Text";
import type { SearchArgs } from "@/generated/graphql";
import useEntitySearch from "@/hooks/useEntitySearch";
import type { SimpleSearchArgs } from "@/lib/client/search";

interface SearchEntityProps<T> {
    entity: string;
    fetchResults: (searchArgs: SearchArgs) => Promise<{
        data: Array<T>;
        nextPage: number | null;
    }>;
    searchArgs: SimpleSearchArgs;
    filters: ReactNode;
    renderResult: (result: T) => ReactNode;
}

export function SearchEntity<T>({ entity, fetchResults, searchArgs, filters, renderResult }: SearchEntityProps<T>) {
    const { data, error, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading, isPlaceholderData } =
        useEntitySearch<T>(entity, fetchResults, searchArgs);

    return (
        <>
            {!!filters && <SearchFilterGroup>{filters}</SearchFilterGroup>}
            {(() => {
                if (isError) {
                    return <ErrorCard error={error} />;
                }

                if (isLoading) {
                    return <Text block>Searching...</Text>;
                }

                const results = data?.pages.flatMap((page) => page.data) ?? [];

                if (!results.length) {
                    if (searchArgs.query) {
                        return (
                            <Text block>
                                No results found for query &quot;{searchArgs.query}&quot;. Did you spell it correctly?
                            </Text>
                        );
                    } else {
                        return <Text block>No results found for your current filter settings.</Text>;
                    }
                }

                const isLoadingMore = isFetchingNextPage || isPlaceholderData;

                return (
                    <>
                        <Column style={{ "--gap": "16px" }}>{results.map(renderResult)}</Column>
                        {(hasNextPage || isPlaceholderData) && (
                            <Row style={{ "--justify-content": "center" }}>
                                <Button
                                    variant="silent"
                                    isCircle
                                    onClick={() => !isLoadingMore && fetchNextPage()}
                                    title="Load more"
                                >
                                    <Icon
                                        icon={isLoadingMore ? faSpinner : faChevronDown}
                                        className={isLoadingMore ? "fa-spin" : undefined}
                                    />
                                </Button>
                            </Row>
                        )}
                    </>
                );
            })()}
        </>
    );
}
