import type { GetServerSideProps } from "next";
import { Text } from "components/text";
import { fetchData } from "lib/server";
import type {
    PlaylistDetailPageMeQuery,
    PlaylistDetailPagePlaylistQuery,
    PlaylistDetailPagePlaylistQueryVariables,
    PlaylistDetailPageQuery,
    PlaylistDetailPageQueryVariables
} from "generated/graphql";
import gql from "graphql-tag";
import { VideoSummaryCard, VideoSummaryCardFragmentVideo } from "components/card/VideoSummaryCard";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { Comparator, RequiredNonNullable } from "utils/types";
import type { ParsedUrlQuery } from "querystring";
import useToggle from "hooks/useToggle";
import { useContext, useState } from "react";
import {
    ANIME_A_Z,
    ANIME_NEW_OLD,
    ANIME_OLD_NEW,
    ANIME_Z_A,
    getComparator,
    SONG_A_Z,
    SONG_Z_A,
    sortTransformed,
    UNSORTED
} from "utils/comparators";
import { SEO } from "components/seo";
import { SidebarContainer } from "components/container";
import { MultiCoverImage } from "components/image";
import { Column } from "components/box";
import { Button, FilterToggleButton, IconTextButton } from "components/button";
import { Collapse } from "components/utils";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import styled from "styled-components";
import theme from "theme";
import { DescriptionList } from "components/description-list";
import { Icon } from "components/icon";
import { faEllipsisV, faListMusic, faMinus, faPlus, faShuffle, faTrophy } from "@fortawesome/pro-solid-svg-icons";
import { PlaylistTrackAddDialog } from "components/dialog/PlaylistTrackAddDialog";
import { PlaylistTrackRemoveDialog } from "components/dialog/PlaylistTrackRemoveDialog";
import useSWR from "swr";
import { fetchDataClient } from "lib/client";
import PlayerContext, { createWatchListItem } from "context/playerContext";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "components/menu/Menu";
import { PlaylistEditDialog } from "components/dialog/PlaylistEditDialog";
import { Reorder } from "framer-motion";
import axios from "lib/client/axios";
import { FeaturedTheme } from "components/featured-theme";
import { shuffle } from "lodash-es";
import createVideoSlug from "../../../utils/createVideoSlug";
import { useRouter } from "next/router";

const StyledDesktopOnly = styled.div`
    gap: 24px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;
const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    
    & > :last-child {
        margin-inline-start: auto;
    }
`;
const StyledReorderContainer = styled.div`
    // Hack to style the framer motion reorder component
    & > div {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;
const StyledSummaryCardWrapper = styled.div`
    position: relative;
`;
const StyledRank = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 16px;
    color: ${theme.colors["text-primary"]};
    background-color: ${theme.colors["solid-on-card"]};
    transform: translate(-50%, -33%) rotate(-10deg);
`;

const RANK_ASC = "rank-asc";
const RANK_DESC = "rank-desc";

function getRankComparator(name: string): Comparator<number> {
    switch (name) {
        case RANK_ASC:
            return (a, b) => a - b;
        case RANK_DESC:
            return (a, b) => b - a;
        default:
            return () => 0;
    }
}

interface PlaylistDetailPageProps extends SharedPageProps, RequiredNonNullable<PlaylistDetailPageQuery> {}

interface PlaylistDetailPageParams extends ParsedUrlQuery {
    playlistId: string
}

export default function PlaylistDetailPage({ playlist: initialPlaylist, me: initialMe }: PlaylistDetailPageProps) {
    const { setWatchList, setWatchListFactory, setCurrentWatchListItem, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);
    const router = useRouter();

    const { data: playlist, mutate } = useSWR(
        ["PlaylistDetailPagePlaylist", `/api/playlist/${initialPlaylist.id}`],
        async () => {
            const { data } = await fetchDataClient<PlaylistDetailPagePlaylistQuery, PlaylistDetailPagePlaylistQueryVariables>(gql`
                ${PlaylistDetailPage.fragments.playlist}
                
                query PlaylistDetailPagePlaylist($playlistId: String!) {
                    playlist(id: $playlistId) {
                        ...PlaylistDetailPagePlaylist
                    }
                }
            `, { playlistId: initialPlaylist.id });

            if (!data.playlist) {
                location.reload();
                throw new Error("Playlist was removed or user lost auth.");
            }

            return data.playlist;
        },
        { fallbackData: initialPlaylist }
    );
    const { data: me } = useSWR(
        ["PlaylistDetailPageMe", "/api/me"],
        async () => {
            const { data } = await fetchDataClient<PlaylistDetailPageMeQuery>(gql`
                ${PlaylistDetailPage.fragments.user}

                query PlaylistDetailPageMe {
                    me {
                        user {
                            ...PlaylistDetailPageUser
                        }
                    }
                }
            `);

            return data.me;
        },
        { fallbackData: initialMe }
    );

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(UNSORTED);

    const isOwner = me.user?.name === playlist.user.name;
    const isRanking = playlist.name.startsWith("[#] ");

    const tracks = [...playlist.forward].map((track, index) => ({ ...track, rank: index + 1 }));
    const tracksSorted = [...tracks].sort(
        sortTransformed(
            getComparator(sortBy) ?? getRankComparator(sortBy),
            (track) => {
                switch (sortBy) {
                    case UNSORTED:
                        return track;
                    case SONG_A_Z:
                    case SONG_Z_A:
                        return track.video.entries[0].theme;
                    case ANIME_A_Z:
                    case ANIME_Z_A:
                    case ANIME_OLD_NEW:
                    case ANIME_NEW_OLD:
                        return track.video.entries[0].theme?.anime;
                    case RANK_ASC:
                    case RANK_DESC:
                        return track.rank;
                }
            }
        )
    );

    function playAll(initiatingVideoIndex: number) {
        const watchList = tracksSorted.map((track) => createWatchListItem(track.video));
        setWatchList(watchList, true);
        setWatchListFactory(null);
        setCurrentWatchListItem(watchList[initiatingVideoIndex]);
    }

    function shuffleAll() {
        if (tracksSorted.length === 0) {
            return;
        }
        const watchList = shuffle(tracksSorted.map((track) => createWatchListItem(track.video)));
        setWatchList(watchList, true);
        setWatchListFactory(null);
        setCurrentWatchListItem(watchList[0]);

        const video = watchList[0];
        const entry = video.entries[0];
        const theme = entry.theme;
        const anime = theme?.anime;

        if (anime && entry && video) {
            const videoSlug = createVideoSlug(theme, entry, video);
            void router.push(`/anime/${anime.slug}/${videoSlug}`);
        }
    }

    async function updateTrackOrder(newTracks: typeof tracks) {
        await mutate({
            ...playlist,
            forward: newTracks,
        }, { revalidate: false });
    }

    async function updateTrackOrderRemote(trackId: string) {
        const trackIndex = tracks.findIndex((track) => track.id === trackId);

        const nextId = tracks[trackIndex + 1]?.id;
        const previousId = tracks[trackIndex - 1]?.id;

        if (nextId || previousId) {
            await axios.put(`/playlist/${playlist.id}/track/${trackId}`, {
                next: nextId,
                previous: nextId ? undefined : previousId,
            });

            await mutate();
        }
    }

    const trackElements = tracksSorted.map((track, index) => [track, (
        <StyledSummaryCardWrapper key={track.id}>
            <VideoSummaryCard
                video={track.video}
                onPlay={() => playAll(index)}
                menu={
                    <Menu modal={false}>
                        <MenuTrigger asChild>
                            <Button variant="silent" isCircle>
                                <Icon icon={faEllipsisV} />
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <PlaylistTrackAddDialog
                                video={track.video}
                                trigger={
                                    <MenuItem onSelect={(event) => event.preventDefault()}>
                                        <Icon icon={faListMusic}/>
                                        <Text>Add to Playlist</Text>
                                    </MenuItem>
                                }
                            />
                            {isOwner ? (
                                <PlaylistTrackRemoveDialog
                                    playlist={playlist}
                                    trackId={track.id}
                                    video={track.video}
                                    trigger={
                                        <MenuItem onSelect={(event) => event.preventDefault()}>
                                            <Icon icon={faMinus}/>
                                            <Text>Remove from Playlist</Text>
                                        </MenuItem>
                                    }
                                />
                            ) : null}
                            <MenuItem onSelect={() => addWatchListItem(track.video)}>
                                <Icon icon={faPlus}/>
                                <Text>Add to Watch List</Text>
                            </MenuItem>
                            <MenuItem onSelect={() => addWatchListItemNext(track.video)}>
                                <Icon icon={faPlus}/>
                                <Text>Play Next</Text>
                            </MenuItem>
                        </MenuContent>
                    </Menu>
                }
            />
            {isRanking ? (
                <StyledRank>{track.rank === 1 ? (
                    <Icon icon={faTrophy} color="gold" />
                ) : `#${track.rank}`}</StyledRank>
            ) : null}
        </StyledSummaryCardWrapper>
    )] as const);

    return (
        <>
            <SEO title={playlist.name} />
            <Text variant="h1">{playlist.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <MultiCoverImage
                            key={JSON.stringify(playlist.forward)}
                            resourcesWithImages={playlist.forward.flatMap((track) => {
                                const anime = track.video.entries[0].theme?.anime;

                                return anime ? [anime] : [];
                            })}
                        />
                    </StyledDesktopOnly>
                    {isOwner ? (
                        <PlaylistEditDialog playlist={playlist} />
                    ) : null}
                    <DescriptionList>
                        <DescriptionList.Item title="Playlist by">
                            <Text link>{playlist.user.name}</Text>
                        </DescriptionList.Item>
                    </DescriptionList>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    {isRanking ? (
                        <FeaturedTheme
                            theme={{
                                ...tracks[0].video.entries[0].theme,
                                entries: [{
                                    ...tracks[0].video.entries[0],
                                    videos: [tracks[0].video],
                                }],
                            }}
                            hasGrill={false}
                            card={trackElements.find(([track]) => track.rank === 1)?.[1]}
                            onPlay={() => playAll(0)}
                        />
                    ) : null}
                    <StyledHeader>
                        <Text variant="h2">
                            Themes
                            <Text color="text-disabled"> ({playlist.tracks_count})</Text>
                        </Text>
                        {tracksSorted.length > 0 && (
                            <IconTextButton icon={faShuffle} collapsible onClick={shuffleAll}>Shuffle All</IconTextButton>
                        )}
                        <FilterToggleButton onClick={toggleShowFilter}/>
                    </StyledHeader>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                                <SearchFilterSortBy.Option value={UNSORTED}>Custom</SearchFilterSortBy.Option>
                                {isRanking ? (
                                    <SearchFilterSortBy.Option value={RANK_DESC}>Reversed</SearchFilterSortBy.Option>
                                ) : null}
                                <SearchFilterSortBy.Option value={SONG_A_Z}>A ➜ Z (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A}>Z ➜ A (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_A_Z}>A ➜ Z (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_Z_A}>Z ➜ A (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
                        </SearchFilterGroup>
                    </Collapse>
                    <StyledReorderContainer>
                        {(sortBy === UNSORTED && isOwner) ? (
                            <Reorder.Group as="div" axis="y" values={tracksSorted} onReorder={updateTrackOrder}>
                                {trackElements.map(([track, node]) => (
                                    <Reorder.Item key={track.id} as="div" value={track} onDragEnd={() => updateTrackOrderRemote(track.id)}>
                                        {node}
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        ) : (
                            <div>
                                {trackElements.map(([, node]) => node)}
                            </div>
                        )}
                    </StyledReorderContainer>
                </Column>
            </SidebarContainer>
        </>
    );
}

PlaylistDetailPage.fragments = {
    playlist: gql`
        ${VideoSummaryCardFragmentVideo}
        ${PlaylistEditDialog.fragments.playlist}
        ${PlaylistTrackRemoveDialog.fragments.playlist}
        
        fragment PlaylistDetailPagePlaylist on Playlist {
            ...PlaylistEditDialogPlaylist
            ...PlaylistTrackRemoveDialogPlaylist
            id
            name
            visibility
            tracks_count
            forward {
                id
                video {
                    ...VideoSummaryCardVideo
                    id
                    entries {
                        theme {
                            anime {
                                year
                                season
                            }
                        }
                    }
                }
            }
            user {
                name
            }
        }
    `,
    user: gql`
        fragment PlaylistDetailPageUser on User {
            name
        }
    `,
};

export const getServerSideProps: GetServerSideProps<PlaylistDetailPageProps, PlaylistDetailPageParams> = async ({ params, req }) => {
    if (!params) {
        return { notFound: true };
    }

    const { data, apiRequests } = await fetchData<PlaylistDetailPageQuery, PlaylistDetailPageQueryVariables>(gql`
        ${PlaylistDetailPage.fragments.playlist}
        ${PlaylistDetailPage.fragments.user}
        
        query PlaylistDetailPage($playlistId: String!) {
            playlist(id: $playlistId) {
                ...PlaylistDetailPagePlaylist
            }
            me {
                user {
                    ...PlaylistDetailPageUser
                }
            }
        }
    `, { playlistId: params.playlistId }, { req });

    if (!data.playlist) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            playlist: data.playlist,
            me: data.me,
        },
    };
};
