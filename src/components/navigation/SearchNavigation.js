import { useEffect, useRef } from "react";
import Link from "next/link";
import { Box, Flex } from "components/box";
import { Text } from "components/text";
import { SearchInput } from "components/input";
import { HorizontalScroll } from "components/utils";
import { Switcher } from "components/switcher";
import { Icon } from "components/icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import theme from "theme";
import { useRouter } from "next/router";

const StyledSearchOptions = styled(Flex)`
    flex-wrap: wrap;
    gap: 1rem;
    
    @media (min-width: ${theme.breakpoints[0]}) {
        align-items: center;
    }
`;

export function SearchNavigation() {
    const router = useRouter();
    const { entity, ...urlParams } = router.query;
    const searchQuery = urlParams.q || "";

    // Generates page title based on search query
    const pageTitle = searchQuery && searchQuery.trim()
        ? `${searchQuery} - Search`
        : "Search";

    const updateSearchQuery = (newSearchQuery) => {
        // Update URL to maintain the searchQuery on page navigation.
        const newUrlParams = {
            ...urlParams
        };

        if (newSearchQuery) {
            newUrlParams.q = newSearchQuery;
        } else {
            delete newUrlParams.q;
        }

        let url = "/search";
        if (entity) {
            url += `/${entity}`;
        }

        router.replace({
            pathname: url,
            query: newUrlParams
        }, null, {
            shallow: true
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const inputRef = useRef();

    useEffect(() => {
        // Only focus the input on desktop devices
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            inputRef.current?.focus({
                preventScroll: true
            });
        }
    }, []);

    return (
        <Box gapsColumn="1.5rem">
            <Text variant="h1">Search</Text>
            <StyledSearchOptions>
                <Box flex="1" minWidth="33%">
                    <SearchInput
                        query={searchQuery}
                        setQuery={updateSearchQuery}
                        inputProps={{
                            ref: inputRef,
                            spellCheck: false
                        }}
                    />
                </Box>
                <HorizontalScroll fixShadows>
                    <Switcher
                        items={[ null, "anime", "theme", "artist", "series", "studio" ]}
                        selectedItem={entity}
                    >
                        {({ Button, item, selected, content }) => item.value === null ? (
                            !!entity ? (
                                <Link key={null} href={{ pathname: "/search", query: urlParams }} passHref>
                                    <Button as="a">
                                        <Icon icon={faTimes}/>
                                    </Button>
                                </Link>
                            ) : null
                        ) : (
                            <Link key={item.value} href={{ pathname: `/search/${item.value}`, query: urlParams }} passHref>
                                <Button as="a" variant={selected && "primary"}>
                                    {content}
                                </Button>
                            </Link>
                        )}
                    </Switcher>
                </HorizontalScroll>
            </StyledSearchOptions>
        </Box>
    );
}
