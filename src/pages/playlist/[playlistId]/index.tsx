import { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { faEllipsisV, faGrid, faListMusic, faMinus, faPlus, faShuffle, faTrophy } from "@fortawesome/pro-solid-svg-icons";
import { Reorder, useDragControls } from "framer-motion";
import gql from "graphql-tag";
import { shuffle } from "lodash-es";
import type { ParsedUrlQuery } from "querystring";
import useSWR from "swr";

import { Column } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { IconTextButton } from "@/components/button/IconTextButton";
import { VideoSummaryCard, VideoSummaryCardFragmentVideo } from "@/components/card/VideoSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { PlaylistEditDialog } from "@/components/dialog/PlaylistEditDialog";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { PlaylistTrackRemoveDialog } from "@/components/dialog/PlaylistTrackRemoveDialog";
import { FeaturedTheme } from "@/components/featured-theme/FeaturedTheme";
import { Icon } from "@/components/icon/Icon";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/menu/Menu";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import PlayerContext, { createWatchListItem } from "@/context/playerContext";
import type {
    PlaylistDetailPageMeQuery,
    PlaylistDetailPagePlaylistQuery,
    PlaylistDetailPagePlaylistQueryVariables,
    PlaylistDetailPageQuery,
    PlaylistDetailPageQueryVariables
} from "@/generated/graphql";
import useToggle from "@/hooks/useToggle";
import { fetchDataClient } from "@/lib/client";
import axios from "@/lib/client/axios";
import { fetchData } from "@/lib/server";
import theme from "@/theme";
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
} from "@/utils/comparators";
import createVideoSlug from "@/utils/createVideoSlug";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import type { Comparator, RequiredNonNullable } from "@/utils/types";

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

type LinkedList<T> = Array<{
    id: string;
    previous?: { id: string } | null;
    next?: { id: string } | null;
} & T>;

function sortLinkedList<T>(list: LinkedList<T>) {
    const lookUp = list.reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
    }, {} as Record<string, typeof list[number]>);

    let next = list.find((item) => !item.previous);
    const sortedList = [];

    while (next) {
        sortedList.push(next);
        next = next.next ? lookUp[next.next.id] : undefined;
    }

    return sortedList;
}

interface PlaylistDetailPageProps extends SharedPageProps, RequiredNonNullable<PlaylistDetailPageQuery> {}

interface PlaylistDetailPageParams extends ParsedUrlQuery {
    playlistId: string
}

export default function PlaylistDetailPage({ playlist: initialPlaylist, me: initialMe }: PlaylistDetailPageProps) {
    const { setWatchList, setWatchListFactory, setCurrentWatchListItem } = useContext(PlayerContext);
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

            data.playlist.tracks = sortLinkedList(data.playlist.tracks);

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

    const tracks = [...playlist.tracks].map((track, index) => ({ ...track, rank: index + 1 }));
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
            tracks: newTracks,
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

    const coverImageResources = useMemo(() => playlist.tracks.flatMap((track) => {
        const anime = track.video.entries[0].theme?.anime;

        return anime ? [anime] : [];
    }), [playlist.tracks]);

    const topRankedTrack = tracks.find((track) => track.rank === 1);

    return (
        <>
            <SEO title={playlist.name} />
            <Text variant="h1">{playlist.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <MultiCoverImage
                            key={JSON.stringify(coverImageResources)}
                            resourcesWithImages={coverImageResources}
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
                    {(isRanking && topRankedTrack) ? (
                        <FeaturedTheme
                            theme={{
                                ...tracks[0].video.entries[0].theme,
                                entries: [{
                                    ...tracks[0].video.entries[0],
                                    videos: [tracks[0].video],
                                }],
                            }}
                            hasGrill={false}
                            card={
                                <PlaylistTrack
                                    playlist={playlist}
                                    track={topRankedTrack}
                                    isOwner={isOwner}
                                    isRanking={isRanking}
                                    onPlay={() => playAll(0)}
                                />
                            }
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
                                <SearchFilterSortBy.Option value={RANK_DESC}>Reversed</SearchFilterSortBy.Option>
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
                                {tracksSorted.map((track, index) => (
                                    <PlaylistTrack
                                        key={track.id}
                                        playlist={playlist}
                                        track={track}
                                        isOwner={isOwner}
                                        isRanking={isRanking}
                                        isDraggable
                                        onPlay={() => playAll(index)}
                                        onDragEnd={() => updateTrackOrderRemote(track.id)}
                                    />
                                ))}
                            </Reorder.Group>
                        ) : (
                            <div>
                                {tracksSorted.map((track, index) => (
                                    <PlaylistTrack
                                        key={track.id}
                                        playlist={playlist}
                                        track={track}
                                        isOwner={isOwner}
                                        isRanking={isRanking}
                                        onPlay={() => playAll(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </StyledReorderContainer>
                </Column>
            </SidebarContainer>
        </>
    );
}

const StyledDragHandle = styled(Icon)`
    cursor: grab;
    user-select: none;
    touch-action: none;
    
    &:active:hover {
        cursor: grabbing;
    }
`;

interface PlaylistTrackProps {
    playlist: PlaylistDetailPageProps["playlist"];
    track: PlaylistDetailPageProps["playlist"]["tracks"][number] & { rank: number };
    isOwner: boolean;
    isRanking: boolean;
    isDraggable?: boolean;
    onPlay: () => void;
    onDragEnd?: () => void;
}

function PlaylistTrack({ playlist, track, isOwner, isRanking, isDraggable, onPlay, onDragEnd }: PlaylistTrackProps) {
    const { addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);
    const controls = useDragControls();

    const element = (
        <StyledSummaryCardWrapper key={track.id}>
            <VideoSummaryCard
                video={track.video}
                onPlay={() => onPlay()}
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
                append={isDraggable ? <StyledDragHandle icon={faGrid} color="text-disabled" onPointerDown={(event) => controls.start(event)} /> : null}
            />
            {isRanking ? (
                <StyledRank>{track.rank === 1 ? (
                    <Icon icon={faTrophy} color="gold" />
                ) : `#${track.rank}`}</StyledRank>
            ) : null}
        </StyledSummaryCardWrapper>
    );

    if (isDraggable) {
        return (
            <Reorder.Item as="div" value={track} dragListener={false} dragControls={controls} onDragEnd={() => onDragEnd?.()}>
                {element}
            </Reorder.Item>
        );
    }

    return element;
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
            tracks {
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
                previous {
                    id
                }
                next {
                    id
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

    data.playlist.tracks = sortLinkedList(data.playlist.tracks);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            playlist: data.playlist,
            me: data.me,
        },
    };
};
