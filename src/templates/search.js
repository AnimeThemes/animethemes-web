import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, navigate } from "gatsby";
import { useDebounce } from "use-debounce";
import { SearchInput } from "components/input";
import { EntitySearch, GlobalSearch } from "components/search";
import { gapsColumn, gapsRow } from "styles/mixins";
import { Box, Flex } from "components/box";
import { Switcher } from "components/switcher";
import { SEO } from "components/seo";
import { faCompass, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Icon } from "components/icon";

const StyledSearchOptions = styled(Flex)`
    align-items: center;
    @media (min-width: 721px) {
        flex-direction: row;
        ${gapsRow("1rem")}
    }
    @media (max-width: 720px) {
        flex-direction: column;
        ${gapsColumn("1rem")}
    }
`;

export default function SearchPage({ pageContext: { entity }, location: { search, hash, state } }) {
    const urlParams = useMemo(() => new URLSearchParams(search), [ search ]);
    const urlSuffix = search + hash;

    const [ searchQuery, setSearchQuery ] = useState(urlParams.get("q") || "");
    const [ debouncedSearchQuery ] = useDebounce(searchQuery, 500);

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
                        inputProps={{
                            autoFocus: !state?.noAutoFocus,
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
                            <Link key={null} to={`/search${urlSuffix}`} state={{ noAutoFocus: true }}>
                                <Button>
                                    <Icon icon={faTimes}/>
                                </Button>
                            </Link>
                        ) : null
                    ) : (
                        <Link key={item.value} to={`/search/${item.value}${urlSuffix}`} state={{ noAutoFocus: true }}>
                            <Button variant={selected && "primary"}>
                                {content}
                            </Button>
                        </Link>
                    )}
                </Switcher>
            </StyledSearchOptions>
            <Search searchEntity={entity} searchQuery={debouncedSearchQuery}/>
        </Box>
    );
}

function Search({ searchQuery, searchEntity }) {
    if (searchEntity) {
        return <EntitySearch searchQuery={searchQuery} searchEntity={searchEntity}/>;
    } else if (searchQuery) {
        return <GlobalSearch searchQuery={searchQuery}/>;
    } else {
        return (
            <Box gapsColumn="1rem">
                <Box gapsRow="1rem">
                    <Icon icon={faSearch} color="text-primary"/>
                    <Text color="text-muted">Looking for something specific? Use the search bar on the left!</Text>
                </Box>
                <Box gapsRow="1rem">
                    <Icon icon={faCompass} color="text-primary"/>
                    <Text color="text-muted">Feeling adventurous? Explore the database by choosing a category on the right!</Text>
                </Box>
            </Box>
        );
    }
}
