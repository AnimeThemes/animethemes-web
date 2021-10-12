import { useEffect, useMemo, useRef, useState } from "react";
import { Link, navigate } from "gatsby";
import { Box, Flex } from "components/box";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { SearchInput } from "components/input";
import { HorizontalScroll } from "components/utils";
import { Switcher } from "components/switcher";
import { Icon } from "components/icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import theme from "theme";

const StyledSearchOptions = styled(Flex)`
    flex-wrap: wrap;
    gap: 1rem;
    
    @media (min-width: ${theme.breakpoints[0]}) {
        align-items: center;
    }
`;

export function SearchNavigation({ entity, location: { search, hash, state } }) {
    const urlParams = useMemo(() => new URLSearchParams(search), [ search ]);
    const urlSuffix = search + hash;

    const [ searchQuery, setSearchQuery ] = useState(urlParams.get("q") || "");

    // Generates page title based on search query
    const pageTitle = searchQuery && searchQuery.trim()
        ? `${searchQuery} - Search`
        : "Search";

    useEffect(() => {
        // Update URL to maintain the searchQuery on page navigation.
        const newUrlParams = new URLSearchParams();
        if (searchQuery) {
            newUrlParams.set("q", searchQuery);
        }
        const params = newUrlParams.toString();

        let url = "/search";
        if (entity) {
            url += `/${entity}`;
        }
        if (params) {
            url += `?${params}`;
        }

        navigate(url, { replace: true, state });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ entity, searchQuery ]);

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
            <SEO title={pageTitle} />
            <Text variant="h1">Search</Text>
            <StyledSearchOptions>
                <Box flex="1" minWidth="33%">
                    <SearchInput
                        query={searchQuery}
                        setQuery={setSearchQuery}
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
                                <Link key={null} to={`/search${urlSuffix}`}>
                                    <Button>
                                        <Icon icon={faTimes}/>
                                    </Button>
                                </Link>
                            ) : null
                        ) : (
                            <Link key={item.value} to={`/search/${item.value}${urlSuffix}`}>
                                <Button variant={selected && "primary"}>
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
