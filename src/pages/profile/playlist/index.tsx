import { useState } from "react";
import styled from "styled-components";

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Reorder } from "motion/react";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { Card } from "@/components/card/Card";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { fetchThemeSummaryCardData } from "@/components/card/ThemeSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { Icon } from "@/components/icon/Icon";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import useLocalPlaylist from "@/hooks/useLocalPlaylist";
import useToggle from "@/hooks/useToggle";
import theme from "@/theme";
import {
    getComparator,
    SONG_A_Z,
    SONG_A_Z_ANIME,
    SONG_NEW_OLD,
    SONG_OLD_NEW,
    SONG_Z_A,
    SONG_Z_A_ANIME,
    UNSORTED,
} from "@/utils/comparators";

const StyledDesktopOnly = styled.div`
    gap: 24px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
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
        gap: 1rem;
    }
`;

export default function PlaylistPage() {
    const { localPlaylist, setPlaylist } = useLocalPlaylist();

    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<
        | typeof UNSORTED
        | typeof SONG_A_Z
        | typeof SONG_Z_A
        | typeof SONG_A_Z_ANIME
        | typeof SONG_Z_A_ANIME
        | typeof SONG_OLD_NEW
        | typeof SONG_NEW_OLD
    >(UNSORTED);

    const themes = [...localPlaylist].sort(getComparator(sortBy));

    const [refreshProgress, setRefreshProgess] = useState<number | null>(null);
    const [refreshError, setRefreshError] = useState(null);

    function refreshPlaylist() {
        if (refreshProgress !== null) {
            return;
        }

        setRefreshProgess(0);
        setRefreshError(null);

        refreshPlaylistAsync()
            .catch((error) => setRefreshError(error.toString()))
            .finally(() => setRefreshProgess(null));
    }

    async function refreshPlaylistAsync() {
        const localPlaylistRefreshed = [];

        for (const theme of localPlaylist) {
            const themeRefreshed = await fetchThemeSummaryCardData(theme.id);

            if (!themeRefreshed) {
                throw new Error(`Theme could not be refreshed: ${theme.id}`);
            }

            localPlaylistRefreshed.push(themeRefreshed);

            setRefreshProgess((refreshProgress) => (refreshProgress ? refreshProgress + 1 : 1));

            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        setPlaylist(localPlaylistRefreshed);
    }

    return (
        <>
            <SEO title="Local Playlist" />
            <Text variant="h1">Local Playlist</Text>
            <SidebarContainer>
                <StyledDesktopOnly>
                    <MultiCoverImage
                        key={JSON.stringify(localPlaylist)}
                        resourcesWithImages={localPlaylist
                            .filter((theme) => theme?.anime)
                            .map((theme) => theme.anime as NonNullable<typeof theme.anime>)}
                    />
                </StyledDesktopOnly>
                <Column style={{ "--gap": "24px" }}>
                    <StyledHeader>
                        <Text variant="h2">
                            Themes
                            <Text color="text-disabled"> ({themes.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter} />
                    </StyledHeader>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                                <SearchFilterSortBy.Option value={UNSORTED}>Recently Added</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_A_Z}>A ➜ Z (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A}>Z ➜ A (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_A_Z_ANIME}>
                                    A ➜ Z (Anime)
                                </SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A_ANIME}>
                                    Z ➜ A (Anime)
                                </SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
                        </SearchFilterGroup>
                    </Collapse>
                    <Row style={{ "--gap": "16px", "--align-items": "center" }}>
                        <Button disabled={refreshProgress !== null} onClick={refreshPlaylist}>
                            Refresh
                        </Button>
                        {refreshProgress !== null && (
                            <Text color="text-muted">
                                {refreshProgress} / {localPlaylist.length} themes refreshed.
                            </Text>
                        )}
                        {refreshError !== null && <Text color="text-warning">{refreshError}</Text>}
                    </Row>
                    <Card $color="text-warning">
                        <Text color="text-warning" weight="bold">
                            <Icon icon={faCircleExclamation} /> Read this before using the local playlist:
                        </Text>
                        <Text as="p">
                            The local playlist is only saved in your browser&apos;s storage. You can&apos;t share it
                            between devices and it will be deleted if you clear your browser&apos;s storage (e.g.
                            cookies). We can&apos;t retrieve a deleted playlist for you.
                        </Text>
                    </Card>
                    <StyledReorderContainer>
                        {sortBy === UNSORTED ? (
                            <Reorder.Group as="div" axis="y" values={themes} onReorder={setPlaylist}>
                                {themes.map((theme) => (
                                    <Reorder.Item as="div" key={`${theme.anime?.slug}-${theme.id}`} value={theme}>
                                        <ThemeSummaryCard theme={theme} />
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        ) : (
                            <div>
                                {themes.map((theme) => (
                                    <ThemeSummaryCard key={`${theme.anime?.slug}-${theme.id}`} theme={theme} />
                                ))}
                            </div>
                        )}
                    </StyledReorderContainer>
                </Column>
            </SidebarContainer>
        </>
    );
}
