import styled from "styled-components";
import { Text } from "components/text";
import { Column } from "components/box";
import { SidebarContainer } from "components/container";
import { ThemeSummaryCard } from "components/card";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import { FilterToggleButton } from "components/button";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { Collapse } from "components/utils";
import { animeNameComparator, animePremiereComparator, chain, reverse, songTitleComparator } from "utils/comparators";
import { SEO } from "components/seo";
import { Reorder } from "framer-motion";
import { useLocalPlaylist } from "context/localPlaylistContext";
import theme from "theme";
import { MultiCoverImage } from "components/image";

const StyledDesktopOnly = styled.div`
    gap: 24px;
    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        display: none;
    }
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledReorderContainer = styled.div`
    // Hack to style the framer motion reorder component
    & > div {
        display: flex;
        flex-direction: column;
        gap: 1rem
    }
`;

const toAnime = (comparator) => (a, b) => comparator(a.anime, b.anime);
const sortByComparators = new Map([
    [ "Recently added", () => 0 ],
    [ "A ➜ Z (Song)", songTitleComparator ],
    [ "Z ➜ A (Song)", reverse(songTitleComparator) ],
    [ "A ➜ Z (Anime)", chain(toAnime(animeNameComparator), songTitleComparator) ],
    [ "Z ➜ A (Anime)", chain(reverse(toAnime(animeNameComparator)), songTitleComparator) ],
    [ "Old ➜ New", chain(toAnime(animePremiereComparator), toAnime(animeNameComparator), songTitleComparator) ],
    [ "New ➜ Old", chain(reverse(toAnime(animePremiereComparator)), toAnime(animeNameComparator), songTitleComparator) ]
]);
const sortByOptions = [ ...sortByComparators.keys() ];

export default function PlaylistPage() {
    const { localPlaylist, setPlaylist } = useLocalPlaylist();

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const themes = localPlaylist.sort(sortByComparators.get(sortBy));

    return (
        <>
            <SEO title="Local Playlist"/>
            <Text variant="h1">Local Playlist</Text>
            <SidebarContainer>
                <StyledDesktopOnly>
                    <MultiCoverImage resourcesWithImages={localPlaylist.map((theme) => theme?.anime)}/>
                </StyledDesktopOnly>
                <Column style={{ "--gap": "24px" }}>
                    <StyledHeader>
                        <Text variant="h2">
                            Themes
                            <Text color="text-disabled"> ({themes.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter}/>
                    </StyledHeader>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy
                                options={sortByOptions}
                                value={sortBy}
                                setValue={setSortBy}
                            />
                        </SearchFilterGroup>
                    </Collapse>
                    <StyledReorderContainer>
                        <Reorder.Group as="div" axis="y" values={themes} onReorder={setPlaylist}>
                            {themes.map((theme) => (
                                <Reorder.Item as="div" key={theme.anime.slug + theme.slug + theme.group} value={theme}>
                                    <ThemeSummaryCard theme={theme}/>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </StyledReorderContainer>
                </Column>
            </SidebarContainer>
        </>
    );
}
