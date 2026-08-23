import { memo, startTransition, useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { useMutation, useQuery } from "@apollo/client/react";
import {
    faArrowTurnDown,
    faArrowTurnUp,
    faCheck,
    faEllipsisVertical,
    faGripVertical,
    faPen,
    faPlus,
    faShuffle,
    faTrash,
    faTrophy,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";
import { isAxiosError } from "axios";
import { shuffle } from "lodash-es";
import { Reorder, useDragControls } from "motion/react";
import type { ParsedUrlQuery } from "querystring";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { IconTextButton } from "@/components/button/IconTextButton";
import { Card } from "@/components/card/Card";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
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
import PlayerContext, {
    createWatchListItem,
    WATCH_LIST_ITEM_ENTRY,
    WATCH_LIST_ITEM_THEME,
    WATCH_LIST_ITEM_VIDEO,
} from "@/context/playerContext";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import useToggle from "@/hooks/useToggle";
import axios from "@/lib/client/axios";
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
import extractImages from "@/utils/extractImages";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import type { Comparator } from "@/utils/types";

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
    [SONG_A_Z]: sortTransformed(getComparator(SONG_A_Z), (track) => track.animethemeentry.animetheme),
    [SONG_Z_A]: sortTransformed(getComparator(SONG_Z_A), (track) => track.animethemeentry.animetheme),
    [ANIME_A_Z]: sortTransformed(getComparator(ANIME_A_Z), (track) => track.animethemeentry.animetheme?.anime),
    [ANIME_Z_A]: sortTransformed(getComparator(ANIME_Z_A), (track) => track.animethemeentry.animetheme?.anime),
    [ANIME_OLD_NEW]: sortTransformed(getComparator(ANIME_OLD_NEW), (track) => track.animethemeentry.animetheme?.anime),
    [ANIME_NEW_OLD]: sortTransformed(getComparator(ANIME_NEW_OLD), (track) => track.animethemeentry.animetheme?.anime),
    [RANK_ASC]: (a, b) => a.rank - b.rank,
    [RANK_DESC]: (a, b) => a.rank - b.rank,
} satisfies Record<string, Comparator<ResultOf<typeof PLAYLIST_DETAIL_PAGE_TRACK> & { rank: number }>>;

export const PLAYLIST_DETAIL_PAGE_PLAYLIST = graphql(`
    fragment PlaylistDetailPagePlaylist on Playlist {
        ...PlaylistEditDialogPlaylist
        ...PlaylistTrackRemoveDialogPlaylist
        id
        name
        description
        visibility
        tracksCount
        user {
            name
        }
    }
`);

export const PLAYLIST_DETAIL_PAGE_TRACK = graphql(`
    fragment PlaylistDetailPageTrack on PlaylistTrack {
        id
        video {
            ...VideoSummaryCardVideo
            ...WatchListItemVideo
            ...FeaturedThemeVideo
            ...PlaylistTrackAddDialogVideo
            ...PlaylistTrackRemoveDialogVideo
            id
        }
        animethemeentry {
            ...VideoSummaryCardEntry
            ...WatchListItemEntry
            ...FeaturedThemeEntry
            ...PlaylistTrackAddDialogEntry
            ...PlaylistTrackRemoveDialogEntry
            animetheme {
                ...VideoSummaryCardTheme
                ...WatchListItemTheme
                anime {
                    title {
                        romaji
                    }
                    year
                    season
                    images {
                        nodes {
                            ...extractImagesImage
                        }
                    }
                }
                song {
                    title {
                        romaji
                    }
                }
            }
        }
    }
`);

export const PLAYLIST_DETAIL_PAGE_ME = graphql(`
    fragment PlaylistDetailPageMe on Me {
        name
    }
`);

const PLAYLIST_DETAIL_PAGE_QUERY = graphql(`
    query PlaylistDetailPagePlaylist($playlistId: String!) {
        playlist(id: $playlistId) {
            ...PlaylistDetailPagePlaylist
            tracks(sort: POSITION) {
                ...PlaylistDetailPageTrack
                id
            }
        }
    }
`);
const ME_QUERY = graphql(`
    query PlaylistDetailPageMe {
        me {
            ...PlaylistDetailPageMe
        }
    }
`);

interface PlaylistDetailPageProps extends SharedPageProps {
    playlist: FragmentType<typeof PLAYLIST_DETAIL_PAGE_PLAYLIST>;
    tracks: Array<FragmentType<typeof PLAYLIST_DETAIL_PAGE_TRACK>>;
    me: FragmentType<typeof PLAYLIST_DETAIL_PAGE_ME> | null;
}

interface PlaylistDetailPageParams extends ParsedUrlQuery {
    playlistId: string;
}

export default function PlaylistDetailPage({
    playlist: playlistFragment,
    tracks: tracksFragment,
    me: meFragment,
}: PlaylistDetailPageProps) {
    const initialPlaylist = getFragmentData(PLAYLIST_DETAIL_PAGE_PLAYLIST, playlistFragment);

    const { setWatchList, setWatchListFactory, setCurrentWatchListItem } = useContext(PlayerContext);
    const router = useRouter();

    const { data: playlistData, refetch } = useQuery(PLAYLIST_DETAIL_PAGE_QUERY, {
        variables: { playlistId: initialPlaylist.id },
    });
    const { data: meData } = useQuery(ME_QUERY);

    const playlist = getFragmentData(PLAYLIST_DETAIL_PAGE_PLAYLIST, playlistData?.playlist ?? playlistFragment);
    const tracks = getFragmentData(PLAYLIST_DETAIL_PAGE_TRACK, playlistData?.playlist?.tracks ?? tracksFragment);
    const me = getFragmentData(PLAYLIST_DETAIL_PAGE_ME, meData?.me ?? meFragment);

    if (!playlist) {
        location.reload();
        throw new Error("Playlist was removed or user lost auth.");
    }

    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<keyof typeof comparators>(UNSORTED);

    const [isDescriptionEditable, setDescriptionEditable] = useState(false);
    const [description, setDescription] = useState(playlist.description ?? "");

    const isOwner = me?.name === playlist.user.name;
    const isRanking = playlist.name.startsWith("[#] ");

    const [tracksPrevious, setTracksPrevious] = useState(tracks);
    const [tracksSortedByUser, setTracksSortedByUser] = useState(tracks);
    const tracksRanked = useMemo(
        () => [...tracksSortedByUser].map((track, index) => ({ ...track, rank: index + 1 })),
        [tracksSortedByUser],
    );
    const tracksSorted = useMemo(() => [...tracksRanked].sort(comparators[sortBy]), [sortBy, tracksRanked]);

    const playAll = useCallback(
        (initiatingVideoIndex: number) => {
            const watchList = tracksSorted.map((track) =>
                createWatchListItem(
                    getFragmentData(WATCH_LIST_ITEM_VIDEO, track.video),
                    getFragmentData(WATCH_LIST_ITEM_ENTRY, track.animethemeentry),
                    getFragmentData(WATCH_LIST_ITEM_THEME, track.animethemeentry.animetheme),
                ),
            );
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
        const watchList = shuffle(
            tracksSorted.map((track) =>
                createWatchListItem(
                    getFragmentData(WATCH_LIST_ITEM_VIDEO, track.video),
                    getFragmentData(WATCH_LIST_ITEM_ENTRY, track.animethemeentry),
                    getFragmentData(WATCH_LIST_ITEM_THEME, track.animethemeentry.animetheme),
                ),
            ),
        );
        setWatchList(watchList, true);
        setWatchListFactory(null);
        setCurrentWatchListItem(watchList[0]);

        const { video, entry, theme } = watchList[0];
        const anime = theme?.anime;

        if (anime && entry && video) {
            const videoSlug = createVideoSlug(theme, entry, video);
            void router.push(`/anime/${anime.slug}/${videoSlug}`);
        }
    }, [router, setCurrentWatchListItem, setWatchList, setWatchListFactory, tracksSorted]);

    const [updatePlaylistTrackMutation] = useMutation(
        graphql(`
            mutation UpdatePlaylistTrack($id: String!, $playlist: String!, $input: UpdatePlaylistTrackInput!) {
                updatePlaylistTrack(id: $id, playlist: $playlist, input: $input) {
                    id
                }
            }
        `),
    );

    const updateTrackOrderRemote = useCallback(
        async (trackId: string) => {
            const position = tracksSortedByUser.findIndex((track) => track.id === trackId) + 1;

            await updatePlaylistTrackMutation({
                variables: {
                    id: trackId,
                    playlist: playlist.id,
                    input: {
                        position: position,
                    },
                },
            });

            await refetch();
        },
        [tracksSortedByUser, updatePlaylistTrackMutation, playlist.id, refetch],
    );

    const coverImageItems = useMemo(
        () =>
            tracks.flatMap((track) => {
                const anime = track.animethemeentry.animetheme?.anime;

                return anime ? [{ ...extractImages(anime.images.nodes), name: anime.title.romaji }] : [];
            }),
        [tracks],
    );

    if (tracks !== tracksPrevious) {
        setTracksPrevious(tracks);
        setTracksSortedByUser(tracks);
        return null;
    }

    const topRankedTrack = tracksRanked.find((track) => track.rank === 1);

    return (
        <>
            <SEO title={playlist.name} />
            <Text variant="h1">{playlist.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <MultiCoverImage key={JSON.stringify(coverImageItems)} items={coverImageItems} />
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
                            entry={tracks[0].animethemeentry}
                            video={tracks[0].video}
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
                            <Text color="text-disabled"> ({playlist.tracksCount})</Text>
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
                        updateTrackOrder={setTracksSortedByUser}
                    />
                </Column>
            </SidebarContainer>
        </>
    );
}

interface DescriptionProps {
    playlist: ResultOf<typeof PLAYLIST_DETAIL_PAGE_PLAYLIST>;
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
            // await mutate((key) =>
            //     [key].flat().some((key) => key === `/api/playlist/${playlist.id}` || key === "/api/me/playlist"),
            // );
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
                <Card $hoverable onClick={() => setCollapsed(!isCollapsed)}>
                    <HeightTransition>
                        <Text as="p" maxLines={isCollapsed ? 2 : undefined}>
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
    playlist: ResultOf<typeof PLAYLIST_DETAIL_PAGE_PLAYLIST>;
    tracks: Array<ResultOf<typeof PLAYLIST_DETAIL_PAGE_TRACK> & { rank: number }>;
    isReorderable: boolean;
    isOwner: boolean;
    isRanking: boolean;
    playAll: (index: number) => void;
    updateTrackOrderRemote: (trackId: string) => void;
    updateTrackOrder: (tracks: Array<ResultOf<typeof PLAYLIST_DETAIL_PAGE_TRACK> & { rank: number }>) => void;
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
    playlist: ResultOf<typeof PLAYLIST_DETAIL_PAGE_PLAYLIST>;
    track: ResultOf<typeof PLAYLIST_DETAIL_PAGE_TRACK> & { rank: number };
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
                entry={track.animethemeentry}
                theme={track.animethemeentry.animetheme}
                onPlay={() => onPlay()}
                menu={
                    <Menu modal={false}>
                        <MenuTrigger asChild>
                            <Button variant="silent" isCircle>
                                <Icon icon={faEllipsisVertical} />
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <PlaylistTrackAddDialog
                                video={track.video}
                                entry={track.animethemeentry}
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
                                    <MenuItem
                                        onSelect={() =>
                                            addWatchListItem(
                                                getFragmentData(WATCH_LIST_ITEM_VIDEO, track.video),
                                                getFragmentData(WATCH_LIST_ITEM_ENTRY, track.animethemeentry),
                                                getFragmentData(
                                                    WATCH_LIST_ITEM_THEME,
                                                    track.animethemeentry.animetheme,
                                                ),
                                            )
                                        }
                                    >
                                        <Icon icon={faArrowTurnDown} color="text-disabled" />
                                        <Text>Add to Watch List</Text>
                                    </MenuItem>
                                    <MenuItem
                                        onSelect={() =>
                                            addWatchListItemNext(
                                                getFragmentData(WATCH_LIST_ITEM_VIDEO, track.video),
                                                getFragmentData(WATCH_LIST_ITEM_ENTRY, track.animethemeentry),
                                                getFragmentData(
                                                    WATCH_LIST_ITEM_THEME,
                                                    track.animethemeentry.animetheme,
                                                ),
                                            )
                                        }
                                    >
                                        <Icon icon={faArrowTurnUp} color="text-disabled" />
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
                                        entry={track.animethemeentry}
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

export const getServerSideProps: GetServerSideProps<PlaylistDetailPageProps, PlaylistDetailPageParams> = async ({
    params,
    req,
}) => {
    if (!params) {
        return { notFound: true };
    }

    const client = createApolloClient(req);

    const { data } = await client.query({
        query: graphql(`
            query PlaylistDetailPage($playlistId: String!) {
                playlist(id: $playlistId) {
                    ...PlaylistDetailPagePlaylist
                    tracks(sort: POSITION) {
                        ...PlaylistDetailPageTrack
                        id
                    }
                }
                me {
                    ...PlaylistDetailPageMe
                }
            }
        `),
        variables: { playlistId: params.playlistId },
    });

    if (!data.playlist) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(),
            playlist: data.playlist,
            tracks: data.playlist.tracks,
            me: data.me,
        },
    };
};
