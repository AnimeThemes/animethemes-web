import {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {navigate} from "gatsby";
import {useDebounce} from "use-debounce";
import SearchInput from "components/input/search";
import GlobalSearch from "components/search/global";
import {gapsColumn, gapsRow} from "styles/mixins";
import Title from "components/text/title";
import { Box, Flex } from "components/flex";
import Switcher from "components/switcher";
import Button from "components/button";
import SEO from "components/seo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const StyledSearchPage = styled.div`
    ${gapsColumn("1.5rem")}
`;
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
    const entity = useMemo(() => pathname.match(/\/search(?:\/(.+))?/)[1], [ pathname ]);
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
        <StyledSearchPage>
            <SEO title={pageTitle} />
            <Title>Search</Title>
            <StyledSearchOptions>
                <Box flex="1">
                    <SearchInput query={searchQuery} setQuery={setSearchQuery} isSearching={false}/>
                </Box>
                <Switcher>
                    {!!entity && (
                        <Button icon to={`/search${urlSuffix}`}>
                            <FontAwesomeIcon icon={faTimes} fixedWidth/>
                        </Button>
                    )}
                    <Button to={`/search/anime${urlSuffix}`} active={entity === "anime"}>Anime</Button>
                    <Button to={`/search/theme${urlSuffix}`} active={entity === "theme"}>Themes</Button>
                    <Button to={`/search/artist${urlSuffix}`} active={entity === "artist"}>Artists</Button>
                </Switcher>
            </StyledSearchOptions>
            <GlobalSearch searchEntity={entity} searchQuery={debouncedSearchQuery}/>
        </StyledSearchPage>
    );
}
