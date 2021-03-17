import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { graphql, Link, navigate } from "gatsby";
import { useDebounce } from "use-debounce";
import { SearchInput } from "components/input";
import { GlobalSearch } from "components/search";
import { gapsColumn, gapsRow } from "styles/mixins";
import { Box, Flex } from "components/box";
import { Switcher } from "components/switcher";
import { SEO } from "components/seo";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Icon } from "components/icon";

const StyledSearchOptions = styled(Flex)`
    @media (min-width: 721px) {
        flex-direction: row;
        ${gapsRow("1rem")}
    }
    @media (max-width: 720px) {
        flex-direction: column;
        align-items: center;
        ${gapsColumn("1rem")}
    }
`;

export default function SearchPage({ location: { pathname, search, hash } }) {
    const entity = useMemo(() => pathname.match(/\/search(?:\/([^/]+))?/)[1], [ pathname ]);
    const urlParams = useMemo(() => new URLSearchParams(search), [ search ]);
    const urlSuffix = search + hash;

    const [ searchQuery, setSearchQuery ] = useState(urlParams.get("q") || "");
    const [ debouncedSearchQuery ] = useDebounce(searchQuery, 500);

    // Generates page title based on search query
    const pageTitle = searchQuery && searchQuery.trim()
        ? `${searchQuery} - Search`
        : "Search";

    // Temporary effect to listen for changes to the search query that may be made by the quick search (WIP)
    useEffect(() => { setSearchQuery(urlParams.get("q")) }, [ urlParams ]);

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

        navigate(url, { replace: true });
    }, [ entity, searchQuery ]);

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={pageTitle} />
            <Text variant="h1">Search</Text>
            <StyledSearchOptions>
                <Box flex="1">
                    <SearchInput
                        query={searchQuery}
                        setQuery={setSearchQuery}
                        isSearching={false}
                        inputProps={{
                            autoFocus: true,
                            spellCheck: false
                        }}
                    />
                </Box>
                <Switcher
                    items={[ null, "anime", "theme", "artist" ]}
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
            </StyledSearchOptions>
            {/*<Collapse collapse={!entity}>*/}
            {/*    <Grid gridTemplateColumns="repeat(6, 1fr)" gridGap="1rem">*/}
            {/*        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">*/}
            {/*            <Text color={theme.colors.primaryMediumEmphasis}>Season</Text>*/}
            {/*            <Listbox defaultValue={null} nullLabel="Any" options={{*/}
            {/*                winter: "Winter",*/}
            {/*                spring: "Spring",*/}
            {/*                summer: "Summer",*/}
            {/*                fall: "Fall"*/}
            {/*            }}/>*/}
            {/*        </Flex>*/}
            {/*        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">*/}
            {/*            <Text color={theme.colors.primaryMediumEmphasis}>Year</Text>*/}
            {/*            <Listbox defaultValue={null} nullLabel="Any" options={*/}
            {/*                allAnime.groupedByYear.reduce((options, { year }) => {*/}
            {/*                    options[year] = year;*/}
            {/*                    return options;*/}
            {/*                }, {})*/}
            {/*            }/>*/}
            {/*        </Flex>*/}
            {/*    </Grid>*/}
            {/*</Collapse>*/}
            <GlobalSearch searchEntity={entity} searchQuery={debouncedSearchQuery}/>
        </Box>
    );
}

export const query = graphql`
    query SearchPageQuery {
        allAnime {
            groupedByYear: group(field: year) {
                year: fieldValue
            }
        }
    }
`;
