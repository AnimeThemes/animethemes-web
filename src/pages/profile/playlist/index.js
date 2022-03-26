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
import {
    getComparator,
    SONG_A_Z,
    SONG_A_Z_ANIME,
    SONG_NEW_OLD,
    SONG_OLD_NEW,
    SONG_Z_A,
    SONG_Z_A_ANIME,
    UNSORTED
} from "utils/comparators";
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

export default function PlaylistPage() {
    const { localPlaylist, setPlaylist } = useLocalPlaylist();

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(UNSORTED);

    const themes = localPlaylist.sort(getComparator(sortBy));

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
                            <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                                <SearchFilterSortBy.Option value={UNSORTED}>Recently Added</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_A_Z}>A ➜ Z (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A}>Z ➜ A (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_A_Z_ANIME}>A ➜ Z (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A_ANIME}>Z ➜ A (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
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
