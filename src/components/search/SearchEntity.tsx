import type { ReactNode } from "react";

import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { ErrorCard } from "@/components/card/ErrorCard";
import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";

interface SearchEntityProps {
    children: ReactNode;
    error: unknown;
    searchQuery?: string;
    isError: boolean;
    isLoading: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    isPlaceholderData: boolean;
    hasResults: boolean;
    hasNextPage: boolean;
    onLoadMore: () => void;
}

export function SearchEntity({
    children,
    error,
    searchQuery,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isPlaceholderData,
    hasResults,
    hasNextPage,
    onLoadMore,
}: SearchEntityProps) {
    if (isError) {
        return <ErrorCard error={error} />;
    }

    if (isLoading) {
        return <Text block>Searching...</Text>;
    }

    if (!hasResults) {
        if (searchQuery) {
            return <Text block>No results found for query &quot;{searchQuery}&quot;. Did you spell it correctly?</Text>;
        } else {
            return <Text block>No results found for your current filter settings.</Text>;
        }
    }

    const isLoadingMore = isFetchingNextPage || isPlaceholderData;

    return (
        <>
            <Column style={{ "--gap": "16px", opacity: isFetching && !isFetchingNextPage ? 0.5 : 1 }}>
                {children}
            </Column>
            {(hasNextPage || isPlaceholderData) && (
                <Row style={{ "--justify-content": "center" }}>
                    <Button
                        variant="silent"
                        isCircle
                        onClick={() => {
                            if (!isLoadingMore) {
                                onLoadMore();
                            }
                        }}
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
}
