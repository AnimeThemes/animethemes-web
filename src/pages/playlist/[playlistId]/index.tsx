import type { GetServerSideProps } from "next";
import { Text } from "components/text";
import { fetchData } from "lib/server";
import type {
    PlaylistDetailPageMeQuery,
    PlaylistDetailPagePlaylistQuery,
    PlaylistDetailPagePlaylistQueryVariables,
    PlaylistDetailPageQuery,
    PlaylistDetailPageQueryVariables, VideoSummaryCardVideoFragment
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
import PlayerContext from "context/playerContext";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "components/menu/Menu";

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

interface PlaylistDetailPageProps extends SharedPageProps, RequiredNonNullable<PlaylistDetailPageQuery> {}

interface PlaylistDetailPageParams extends ParsedUrlQuery {
    playlistId: string
}

export default function PlaylistDetailPage({ playlist: initialPlaylist, me: initialMe }: PlaylistDetailPageProps) {
    const { setWatchList, setCurrentWatchListItem, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);

    const { data: playlist } = useSWR(
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

    const tracks = [...playlist.forward].sort(
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

    function playAll(initiatingVideo: VideoSummaryCardVideoFragment) {
        setWatchList(tracks.map((track) => track.video));
        setCurrentWatchListItem(initiatingVideo);
    }

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
                                <SearchFilterSortBy.Option value={UNSORTED}>Recently Added</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_A_Z}>A ➜ Z (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A}>Z ➜ A (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_A_Z}>A ➜ Z (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_Z_A}>Z ➜ A (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
                        </SearchFilterGroup>
                    </Collapse>
                    <Column style={{ "--gap": "16px" }}>
                        {tracks.map((track) => (
                            <VideoSummaryCard
                                key={track.id}
                                video={track.video}
                                onPlay={() => playAll(track.video)}
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
                                            {me.user?.name === playlist.user.name ? (
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
                        ))}
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

PlaylistDetailPage.fragments = {
    playlist: gql`
        ${VideoSummaryCard.fragments.video}
        
        fragment PlaylistDetailPagePlaylist on Playlist {
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
