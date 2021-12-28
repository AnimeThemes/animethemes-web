import styled from "styled-components";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { SidebarContainer } from "components/container";
import { ThemeSummaryCard } from "components/card";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import { Button, FilterToggleButton } from "components/button";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { AspectRatio, Collapse } from "components/utils";
import { animeNameComparator, animePremiereComparator, chain, reverse, songTitleComparator } from "utils/comparators";
import { SEO } from "components/seo";
import useImage from "hooks/useImage";
import useLocalPlaylist from "hooks/useLocalPlaylist";
import { Reorder } from "framer-motion";
import { Icon } from "components/icon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const StyledCoverContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
`;
const StyledCoverItemContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;
const StyledCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    const { localPlaylist, removeFromPlaylist, setPlaylist } = useLocalPlaylist();

    const images = [
        useImage(localPlaylist[0]?.anime),
        useImage(localPlaylist[1]?.anime),
        useImage(localPlaylist[2]?.anime),
        useImage(localPlaylist[3]?.anime)
    ].map((images) => images.largeCover).filter((image) => !!image);

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const themes = localPlaylist.sort(sortByComparators.get(sortBy));

    return (
        <Box gapsColumn="1.5rem">
            <SEO title="Local Playlist"/>
            <Text variant="h1">Local Playlist</Text>
            <SidebarContainer>
                <Box gapsColumn="1.5rem">
                    <AspectRatio display={[ "none", "block" ]} mb="1.5rem" ratio={2 / 3}>
                        <StyledCoverContainer>
                            {images.map((image) => (
                                <StyledCoverItemContainer key={image}>
                                    <StyledCover loading="lazy" src={image}/>
                                </StyledCoverItemContainer>
                            ))}
                        </StyledCoverContainer>
                    </AspectRatio>
                </Box>
                <Box gapsColumn="1.5rem">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text variant="h2">
                            Themes
                            <Text color="text-disabled"> ({themes.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter}/>
                    </Flex>
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
                                    <ThemeSummaryCard theme={theme}>
                                        <Button variant="on-card" silent circle onClick={() => removeFromPlaylist(theme)}>
                                            <Icon icon={faTrash}/>
                                        </Button>
                                    </ThemeSummaryCard>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </StyledReorderContainer>
                </Box>
            </SidebarContainer>
        </Box>
    );
}
