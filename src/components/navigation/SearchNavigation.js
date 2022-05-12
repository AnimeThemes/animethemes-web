import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Text } from "components/text";
import { Input } from "components/input";
import { HorizontalScroll } from "components/utils";
import { Switcher } from "components/switcher";
import styled from "styled-components";
import theme from "theme";
import { useRouter } from "next/router";
import { capitalize, debounce } from "lodash-es";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StyledSearchOptions = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    grid-gap: 1rem;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
        align-items: stretch;
    }
`;

const updateSearchQuery = debounce((router, newSearchQuery) => {
    // Update URL to maintain the searchQuery on page navigation.
    const newUrlParams = {
        ...router.query,
        q: newSearchQuery
    };

    if (!newUrlParams.q) {
        delete newUrlParams.q;
    }

    router.replace({
        pathname: router.pathname,
        query: newUrlParams
    }, null, {
        shallow: true
    });
}, 500);

export function SearchNavigation() {
    const router = useRouter();
    const { entity, ...query } = router.query;
    const { q: initialSearchQuery = "" } = query;

    const isReady = useRef(false);
    const [inputSearchQuery, setInputSearchQuery] = useState("");

    const updateInputSearchQuery = (newInputSearchQuery) => {
        setInputSearchQuery(newInputSearchQuery);
        updateSearchQuery(router, newInputSearchQuery);
    };

    useEffect(() => {
        if (isReady.current) {
            setInputSearchQuery(initialSearchQuery);
        } else {
            isReady.current = true;
        }
    }, [initialSearchQuery]);

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
        <>
            <Text variant="h1">Search</Text>
            <StyledSearchOptions>
                <Input
                    value={inputSearchQuery}
                    onChange={updateInputSearchQuery}
                    inputProps={{
                        ref: inputRef,
                        spellCheck: false,
                        placeholder: "Search"
                    }}
                    resettable
                    icon={faSearch}
                />
                <HorizontalScroll fixShadows>
                    <Switcher selectedItem={entity || null}>
                        <Link href={{ pathname: "/search", query }} passHref prefetch={false}>
                            <Switcher.Reset as="a"/>
                        </Link>
                        {[ "anime", "theme", "artist", "series", "studio" ].map((entity) => (
                            <Link key={entity} href={{ pathname: `/search/${entity}`, query }} passHref prefetch={false}>
                                <Switcher.Option as="a" value={entity}>
                                    {capitalize(entity)}
                                </Switcher.Option>
                            </Link>
                        ))}
                    </Switcher>
                </HorizontalScroll>
            </StyledSearchOptions>
        </>
    );
}
