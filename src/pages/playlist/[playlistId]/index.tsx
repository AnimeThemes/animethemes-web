import { memo, startTransition, useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import {
    faArrowTurnDownRight,
    faArrowTurnRight,
    faCheck,
    faEllipsisV,
    faGripVertical,
    faPen,
    faPlus,
    faShuffle,
    faTrash,
    faTrophy,
    faXmark,
} from "@fortawesome/pro-solid-svg-icons";
import { isAxiosError } from "axios";
import { Reorder, useDragControls } from "framer-motion";
import gql from "graphql-tag";
import { shuffle } from "lodash-es";
import type { ParsedUrlQuery } from "querystring";
import useSWR, { mutate } from "swr";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { IconTextButton } from "@/components/button/IconTextButton";
import { Card } from "@/components/card/Card";
import {
    VideoSummaryCard,
    VideoSummaryCardFragmentEntry,
    VideoSummaryCardFragmentVideo,
} from "@/components/card/VideoSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { PlaylistEditDialog } from "@/components/dialog/PlaylistEditDialog";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { PlaylistTrackRemoveDialog } from "@/components/dialog/PlaylistTrackRemoveDialog";
import { FeaturedTheme } from "@/components/featured-theme/FeaturedTheme";
import { TextArea } from "@/components/form/TextArea";
import { Icon } from "@/components/icon/Icon";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Busy } from "@/components/utils/Busy";
import { Collapse } from "@/components/utils/Collapse";
import { HeightTransition } from "@/components/utils/HeightTransition";
import PlayerContext, { createWatchListItem } from "@/context/playerContext";
import type {
    PlaylistDetailPageMeQuery,
    PlaylistDetailPagePlaylistQuery,
    PlaylistDetailPagePlaylistQueryVariables,
    PlaylistDetailPageQuery,
    PlaylistDetailPageQueryVariables,
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
    UNSORTED,
} from "@/utils/comparators";
import createVideoSlug from "@/utils/createVideoSlug";
import devLog from "@/utils/devLog";
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

    & > :last-child:not(:first-child) {
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

const comparators = {
    [UNSORTED]: () => 0,
    [SONG_A_Z]: sortTransformed(getComparator(SONG_A_Z), (track) => track.entry.theme),
    [SONG_Z_A]: sortTransformed(getComparator(SONG_Z_A), (track) => track.entry.theme),
    [ANIME_A_Z]: sortTransformed(getComparator(ANIME_A_Z), (track) => track.entry.theme?.anime),
    [ANIME_Z_A]: sortTransformed(getComparator(ANIME_Z_A), (track) => track.entry.theme?.anime),
    [ANIME_OLD_NEW]: sortTransformed(getComparator(ANIME_OLD_NEW), (track) => track.entry.theme?.anime),
    [ANIME_NEW_OLD]: sortTransformed(getComparator(ANIME_NEW_OLD), (track) => track.entry.theme?.anime),
    [RANK_ASC]: (a, b) => a.rank - b.rank,
    [RANK_DESC]: (a, b) => a.rank - b.rank,
} satisfies Record<
    string,
    Comparator<NonNullable<PlaylistDetailPageQuery["playlist"]>["tracks"][number] & { rank: number }>
>;

type LinkedList<T> = Array<
    {
        id: string;
        previous?: { id: string } | null;
        next?: { id: string } | null;
    } & T
>;

function sortLinkedList<T>(list: LinkedList<T>) {
    const lookUp = list.reduce(
        (prev, curr) => {
            prev[curr.id] = curr;
            return prev;
        },
        {} as Record<string, (typeof list)[number]>,
    );

    let next = list.find((item) => !item.previous);
    const sortedList = [];

    while (next) {
        delete lookUp[next.id];
        sortedList.push(next);
        next = next.next ? lookUp[next.next.id] : undefined;
    }

    if (sortedList.length !== list.length) {
        devLog.error("The sorted linked list has a different size as the original list. It probably has broken links!");
    }

    return sortedList;
}

interface PlaylistDetailPageProps extends SharedPageProps, RequiredNonNullable<PlaylistDetailPageQuery> {}

interface PlaylistDetailPageParams extends ParsedUrlQuery {
    playlistId: string;
}

export default function PlaylistDetailPage({ playlist: initialPlaylist, me: initialMe }: PlaylistDetailPageProps) {
    const { setWatchList, setWatchListFactory, setCurrentWatchListItem } = useContext(PlayerContext);
    const router = useRouter();

    const { data: playlist, mutate } = useSWR(
        ["PlaylistDetailPagePlaylist", `/api/playlist/${initialPlaylist.id}`],
        async () => {
            const { data } = await fetchDataClient<
                PlaylistDetailPagePlaylistQuery,
                PlaylistDetailPagePlaylistQueryVariables
            >(
                gql`
                    ${PlaylistDetailPage.fragments.playlist}

                    query PlaylistDetailPagePlaylist($playlistId: String!) {
                        playlist(id: $playlistId) {
                            ...PlaylistDetailPagePlaylist
                        }
                    }
                `,
                { playlistId: initialPlaylist.id },
            );

            if (!data.playlist) {
                location.reload();
                throw new Error("Playlist was removed or user lost auth.");
            }

            data.playlist.tracks = sortLinkedList(data.playlist.tracks);

            return data.playlist;
        },
        { fallbackData: initialPlaylist },
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
        { fallbackData: initialMe },
    );

    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<keyof typeof comparators>(UNSORTED);

    const [isDescriptionEditable, setDescriptionEditable] = useState(false);
    const [description, setDescription] = useState(playlist.description ?? "");

    const isOwner = me.user?.name === playlist.user.name;
    const isRanking = playlist.name.startsWith("[#] ");

    const tracks = useMemo(
        () => [...playlist.tracks].map((track, index) => ({ ...track, rank: index + 1 })),
        [playlist.tracks],
    );
    const tracksSorted = useMemo(() => [...tracks].sort(comparators[sortBy]), [sortBy, tracks]);

    const playAll = useCallback(
        (initiatingVideoIndex: number) => {
            const watchList = tracksSorted.map((track) => createWatchListItem(track.video, track.entry));
            setWatchList(watchList, true);
            setWatchListFactory(null);
            setCurrentWatchListItem(watchList[initiatingVideoIndex]);
        },
        [setCurrentWatchListItem, setWatchList, setWatchListFactory, tracksSorted],
    );

    const shuffleAll = useCallback(() => {
        if (tracksSorted.length === 0) {
            return;
        }
        const watchList = shuffle(tracksSorted.map((track) => createWatchListItem(track.video, track.entry)));
        setWatchList(watchList, true);
        setWatchListFactory(null);
        setCurrentWatchListItem(watchList[0]);

        const { video, entry } = watchList[0];
        const theme = entry.theme;
        const anime = theme?.anime;

        if (anime && entry && video) {
            const videoSlug = createVideoSlug(theme, entry, video);
            void router.push(`/anime/${anime.slug}/${videoSlug}`);
        }
    }, [router, setCurrentWatchListItem, setWatchList, setWatchListFactory, tracksSorted]);

    const updateTrackOrder = useCallback(
        async (newTracks: typeof tracks) => {
            await mutate(
                {
                    ...playlist,
                    tracks: newTracks,
                },
                { revalidate: false },
            );
        },
        [mutate, playlist],
    );

    const updateTrackOrderRemote = useCallback(
        async (trackId: string) => {
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
        },
        [mutate, playlist.id, tracks],
    );

    const coverImageResources = useMemo(
        () =>
            playlist.tracks.flatMap((track) => {
                const anime = track.entry.theme?.anime;

                return anime ? [anime] : [];
            }),
        [playlist.tracks],
    );

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
                    {isOwner && (
                        <Column style={{ "--gap": "16px" }}>
                            <PlaylistEditDialog playlist={playlist} />
                            {!isDescriptionEditable && !description && (
                                <IconTextButton
                                    icon={faPlus}
                                    variant="solid"
                                    onClick={() => setDescriptionEditable(true)}
                                >
                                    Add Description
                                </IconTextButton>
                            )}
                        </Column>
                    )}
                    <DescriptionList>
                        <DescriptionList.Item title="Playlist by">
                            <Text link>{playlist.user.name}</Text>
                        </DescriptionList.Item>
                    </DescriptionList>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    {isDescriptionEditable || description ? (
                        <Description
                            playlist={playlist}
                            description={description}
                            setDescription={setDescription}
                            isEditable={isDescriptionEditable}
                            setEditable={setDescriptionEditable}
                            isOwner={isOwner}
                        />
                    ) : null}
                    {isRanking && topRankedTrack ? (
                        <FeaturedTheme
                            theme={{
                                ...tracks[0].entry.theme,
                                entries: [
                                    {
                                        ...tracks[0].entry,
                                        videos: [tracks[0].video],
                                    },
                                ],
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
                            <IconTextButton icon={faShuffle} collapsible onClick={shuffleAll}>
                                Shuffle All
                            </IconTextButton>
                        )}
                        <FilterToggleButton onClick={toggleShowFilter} />
                    </StyledHeader>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy
                                value={sortBy}
                                setValue={(sortBy) => startTransition(() => setSortBy(sortBy))}
                            >
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
                    <PlaylistTrackList
                        playlist={playlist}
                        tracks={tracksSorted}
                        isReorderable={sortBy === UNSORTED && isOwner}
                        isOwner={isOwner}
                        isRanking={isRanking}
                        playAll={playAll}
                        updateTrackOrderRemote={updateTrackOrderRemote}
                        updateTrackOrder={updateTrackOrder}
                    />
                </Column>
            </SidebarContainer>
        </>
    );
}

interface DescriptionProps {
    playlist: PlaylistDetailPageProps["playlist"];
    description: string;
    setDescription: (newValue: string) => void;
    isEditable: boolean;
    setEditable: (newIsEditable: boolean) => void;
    isOwner: boolean;
}

function Description({ playlist, description, setDescription, isEditable, setEditable, isOwner }: DescriptionProps) {
    const [isCollapsed, setCollapsed] = useState(true);

    const [isBusy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function submit() {
        setBusy(true);
        setError("");

        try {
            await axios.put(`/playlist/${playlist.id}`, {
                description,
            });
            await mutate((key) =>
                [key].flat().some((key) => key === `/api/playlist/${playlist.id}` || key === "/api/me/playlist"),
            );
        } catch (error: unknown) {
            if (isAxiosError(error) && error.response) {
                setError(error.response.data.message ?? "An unknown error occured!");
            }

            return;
        } finally {
            setBusy(false);
        }

        setEditable(false);
    }

    function cancel() {
        setDescription(playlist.description ?? "");
        setEditable(false);
    }

    return (
        <>
            <StyledHeader>
                <Text variant="h2">Description</Text>
                {isOwner ? (
                    isEditable ? (
                        <Row>
                            {!isBusy && (
                                <IconTextButton icon={faXmark} collapsible onClick={() => cancel()}>
                                    Cancel
                                </IconTextButton>
                            )}
                            <Busy isBusy={isBusy}>
                                <IconTextButton icon={faCheck} collapsible onClick={() => submit()}>
                                    Save
                                </IconTextButton>
                            </Busy>
                        </Row>
                    ) : (
                        <IconTextButton icon={faPen} collapsible onClick={() => setEditable(!isEditable)}>
                            Edit
                        </IconTextButton>
                    )
                ) : null}
            </StyledHeader>
            {isOwner && isEditable ? (
                <div>
                    <TextArea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={5}
                        maxLength={1000}
                        placeholder="Write your description here"
                    />
                    <Text variant="small" color="text-muted">
                        {description.length} / 1000
                    </Text>
                </div>
            ) : (
                <Card hoverable onClick={() => setCollapsed(!isCollapsed)}>
                    <HeightTransition>
                        <Text as="p" maxLines={isCollapsed ? 2 : null}>
                            {description}
                        </Text>
                    </HeightTransition>
                </Card>
            )}
            {error ? (
                <Text color="text-warning">
                    <strong>The playlist could not be updated: </strong>
                    {error}
                </Text>
            ) : null}
        </>
    );
}

interface PlaylistTrackListProps {
    playlist: PlaylistDetailPageProps["playlist"];
    tracks: Array<PlaylistDetailPageProps["playlist"]["tracks"][number] & { rank: number }>;
    isReorderable: boolean;
    isOwner: boolean;
    isRanking: boolean;
    playAll: (index: number) => void;
    updateTrackOrderRemote: (trackId: string) => void;
    updateTrackOrder: (tracks: Array<PlaylistDetailPageProps["playlist"]["tracks"][number] & { rank: number }>) => void;
}

const PlaylistTrackList = memo(function PlaylistTrackList({
    playlist,
    tracks,
    isReorderable,
    isOwner,
    isRanking,
    playAll,
    updateTrackOrderRemote,
    updateTrackOrder,
}: PlaylistTrackListProps) {
    return (
        <StyledReorderContainer>
            {isReorderable ? (
                <Reorder.Group as="div" axis="y" values={tracks} onReorder={updateTrackOrder}>
                    {tracks.map((track, index) => (
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
                    {tracks.map((track, index) => (
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
    );
});

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
    const { watchList, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);
    const controls = useDragControls();

    const element = (
        <StyledSummaryCardWrapper key={track.id}>
            <VideoSummaryCard
                video={track.video}
                entry={track.entry}
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
                                entry={track.entry}
                                trigger={
                                    <MenuItem onSelect={(event) => event.preventDefault()}>
                                        <Icon icon={faPlus} color="text-disabled" />
                                        <Text>Add to another Playlist</Text>
                                    </MenuItem>
                                }
                            />
                            {watchList.length ? (
                                <>
                                    <MenuSeparator />
                                    <MenuItem onSelect={() => addWatchListItem(track.video, track.entry)}>
                                        <Icon icon={faArrowTurnDownRight} color="text-disabled" />
                                        <Text>Add to Watch List</Text>
                                    </MenuItem>
                                    <MenuItem onSelect={() => addWatchListItemNext(track.video, track.entry)}>
                                        <Icon icon={faArrowTurnRight} color="text-disabled" />
                                        <Text>Play Next</Text>
                                    </MenuItem>
                                </>
                            ) : null}
                            {isOwner ? (
                                <>
                                    <MenuSeparator />
                                    <PlaylistTrackRemoveDialog
                                        playlist={playlist}
                                        trackId={track.id}
                                        video={track.video}
                                        entry={track.entry}
                                        trigger={
                                            <MenuItem onSelect={(event) => event.preventDefault()}>
                                                <Icon icon={faTrash} color="text-disabled" />
                                                <Text>Remove from Playlist</Text>
                                            </MenuItem>
                                        }
                                    />
                                </>
                            ) : null}
                        </MenuContent>
                    </Menu>
                }
                append={
                    isDraggable ? (
                        <StyledDragHandle
                            icon={faGripVertical}
                            color="text-disabled"
                            onPointerDown={(event) => controls.start(event)}
                        />
                    ) : null
                }
            />
            {isRanking ? (
                <StyledRank>{track.rank === 1 ? <Icon icon={faTrophy} color="gold" /> : `#${track.rank}`}</StyledRank>
            ) : null}
        </StyledSummaryCardWrapper>
    );

    if (isDraggable) {
        return (
            <Reorder.Item
                as="div"
                value={track}
                dragListener={false}
                dragControls={controls}
                onDragEnd={() => onDragEnd?.()}
            >
                {element}
            </Reorder.Item>
        );
    }

    return element;
}

PlaylistDetailPage.fragments = {
    playlist: gql`
        ${VideoSummaryCardFragmentVideo}
        ${VideoSummaryCardFragmentEntry}
        ${PlaylistEditDialog.fragments.playlist}
        ${PlaylistTrackRemoveDialog.fragments.playlist}

        fragment PlaylistDetailPagePlaylist on Playlist {
            ...PlaylistEditDialogPlaylist
            ...PlaylistTrackRemoveDialogPlaylist
            id
            name
            description
            visibility
            tracks_count
            tracks {
                id
                video {
                    ...VideoSummaryCardVideo
                    id
                }
                entry {
                    ...VideoSummaryCardEntry
                    theme {
                        anime {
                            year
                            season
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

export const getServerSideProps: GetServerSideProps<PlaylistDetailPageProps, PlaylistDetailPageParams> = async ({
    params,
    req,
}) => {
    if (!params) {
        return { notFound: true };
    }

    const { data, apiRequests } = await fetchData<PlaylistDetailPageQuery, PlaylistDetailPageQueryVariables>(
        gql`
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
        `,
        { playlistId: params.playlistId },
        { req },
    );

    if (!data.playlist) {
        return {
            notFound: true,
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
