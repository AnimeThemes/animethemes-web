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
import { VideoSummaryCard } from "components/card/VideoSummaryCard";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { RequiredNonNullable } from "utils/types";
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
import { Button, FilterToggleButton } from "components/button";
import { Collapse } from "components/utils";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import styled from "styled-components";
import theme from "theme";
import { DescriptionList } from "components/description-list";
import { Icon } from "components/icon";
import { faEllipsisV, faListMusic, faMinus, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { PlaylistTrackAddDialog } from "components/dialog/PlaylistTrackAddDialog";
import { PlaylistTrackRemoveDialog } from "components/dialog/PlaylistTrackRemoveDialog";
import useSWR from "swr";
import { fetchDataClient } from "lib/client";
import PlayerContext, { createWatchListItem } from "context/playerContext";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "components/menu/Menu";
import { PlaylistEditDialog } from "components/dialog/PlaylistEditDialog";
import { Reorder } from "framer-motion";
import axios from "lib/client/axios";

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
        gap: 16px;
    }
`;

interface PlaylistDetailPageProps extends SharedPageProps, RequiredNonNullable<PlaylistDetailPageQuery> {}

interface PlaylistDetailPageParams extends ParsedUrlQuery {
    playlistId: string
}

export default function PlaylistDetailPage({ playlist: initialPlaylist, me: initialMe }: PlaylistDetailPageProps) {
    const { setWatchList, setWatchListFactory, setCurrentWatchListItem, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);

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

    const tracks = [...playlist.forward];
    const tracksSorted = [...tracks].sort(
        sortTransformed(
            getComparator(sortBy),
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
                }
            }
        )
    );

    function playAll(initiatingVideoIndex: number) {
        const watchList = tracksSorted.map((track) => createWatchListItem(track.video));
        setWatchList(watchList);
        setWatchListFactory(null);
        setCurrentWatchListItem(watchList[initiatingVideoIndex]);
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
            await axios.put(`/api/playlist/${playlist.id}/track/${trackId}`, {
                next: nextId,
                previous: nextId ? undefined : previousId,
            });

            await mutate();
        }
    }

    const trackElements = tracksSorted.map((track, index) => [track, (
        <VideoSummaryCard
            key={track.id}
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
                    <StyledHeader>
                        <Text variant="h2">
                            Themes
                            <Text color="text-disabled"> ({playlist.tracks_count})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter}/>
                    </StyledHeader>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                                <SearchFilterSortBy.Option value={UNSORTED}>Custom</SearchFilterSortBy.Option>
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
        ${VideoSummaryCard.fragments.video}
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
