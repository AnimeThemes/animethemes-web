import { memo, startTransition, useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { useMutation, useQuery } from "@apollo/client/react";
import {
    faArrowTurnDown,
    faArrowTurnUp,
    faEllipsisVertical,
    faGripVertical,
    faPlus,
    faShuffle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";
import { shuffle } from "lodash-es";
import { Reorder, useDragControls } from "motion/react";
import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { IconTextButton } from "@/components/button/IconTextButton";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import PlayerContext, {
    createWatchListItem,
    WATCH_LIST_ITEM_ENTRY,
    WATCH_LIST_ITEM_THEME,
    WATCH_LIST_ITEM_VIDEO,
} from "@/context/playerContext";
import createApolloClient from "@/graphql/createApolloClient";
import { getFragmentData, graphql } from "@/graphql/generated";
import useToggle from "@/hooks/useToggle";
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

const comparators = {
    [UNSORTED]: () => 0,
    [SONG_A_Z]: sortTransformed(getComparator(SONG_A_Z), (favorite) => favorite.entry.theme),
    [SONG_Z_A]: sortTransformed(getComparator(SONG_Z_A), (favorite) => favorite.entry.theme),
    [ANIME_A_Z]: sortTransformed(getComparator(ANIME_A_Z), (favorite) => favorite.entry.theme?.anime),
    [ANIME_Z_A]: sortTransformed(getComparator(ANIME_Z_A), (favorite) => favorite.entry.theme?.anime),
    [ANIME_OLD_NEW]: sortTransformed(getComparator(ANIME_OLD_NEW), (favorite) => favorite.entry.theme?.anime),
    [ANIME_NEW_OLD]: sortTransformed(getComparator(ANIME_NEW_OLD), (favorite) => favorite.entry.theme?.anime),
} satisfies Record<string, Comparator<ResultOf<typeof FAVORITES_PAGE_FAVORITE>>>;

export const FAVORITES_PAGE_FAVORITE = graphql(`
    fragment FavoritesPageFavorite on Favorite {
        id
        position
        entry: favoriteable {
            __typename
            ... on Entry {
                id
                ...VideoSummaryCardEntry
                ...WatchListItemEntry
                ...FeaturedThemeEntry
                ...PlaylistTrackAddDialogEntry
                ...PlaylistTrackRemoveDialogEntry
                theme {
                    ...VideoSummaryCardTheme
                    ...WatchListItemTheme
                    anime {
                        id
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
                        id
                        title {
                            romaji
                        }
                    }
                }
                videos {
                    nodes {
                        ...VideoSummaryCardVideo
                        ...WatchListItemVideo
                        ...PlaylistTrackAddDialogVideo
                        ...PlaylistTrackRemoveDialogVideo
                        id
                    }
                }
            }
        }
    }
`);

export const FAVORITES_PAGE_QUERY = graphql(`
    query FavoritesPagePlaylist {
        me {
            id
            favorites(sort: POSITION) {
                id
                ...FavoritesPageFavorite
            }
        }
    }
`);

interface FavoritesPageProps extends SharedPageProps {
    favorites: Array<ResultOf<typeof FAVORITES_PAGE_FAVORITE>>;
}

type FavoritesPageParams = ParsedUrlQuery;

export default function FavoritesPage({ favorites: favoriteFragments }: FavoritesPageProps) {
    const { data } = useQuery(FAVORITES_PAGE_QUERY);

    const favorites = data ? extractValidFavorites(data) : favoriteFragments;

    if (!favorites) {
        location.reload();
        throw new Error("User lost auth.");
    }

    const { setWatchList, setWatchListFactory, setCurrentWatchListItem } = useContext(PlayerContext);
    const router = useRouter();

    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<keyof typeof comparators>(UNSORTED);

    const [favoritesPrevious, setFavoritesPrevious] = useState(favorites);
    const [favoritesSortedByUser, setFavoritesSortedByUser] = useState(favorites);    
    const favoritesSorted = useMemo(() => [...favoritesSortedByUser].sort(comparators[sortBy]), [sortBy, favoritesSortedByUser]);

    const playAll = useCallback(
        (initiatingVideoIndex: number) => {
            const watchList = favoritesSorted.map((favorite) =>
                createWatchListItem(
                    getFragmentData(WATCH_LIST_ITEM_VIDEO, favorite.entry.videos.nodes[0]),
                    getFragmentData(WATCH_LIST_ITEM_ENTRY, favorite.entry),
                    getFragmentData(WATCH_LIST_ITEM_THEME, favorite.entry.theme),
                ),
            );
            setWatchList(watchList, true);
            setWatchListFactory(null);
            setCurrentWatchListItem(watchList[initiatingVideoIndex]);
        },
        [setCurrentWatchListItem, setWatchList, setWatchListFactory, favoritesSorted],
    );

    const shuffleAll = useCallback(() => {
        if (favoritesSorted.length === 0) {
            return;
        }
        const watchList = shuffle(
            favoritesSorted.map((favorite) =>
                createWatchListItem(
                    getFragmentData(WATCH_LIST_ITEM_VIDEO, favorite.entry.videos.nodes[0]),
                    getFragmentData(WATCH_LIST_ITEM_ENTRY, favorite.entry),
                    getFragmentData(WATCH_LIST_ITEM_THEME, favorite.entry.theme),
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
    }, [router, setCurrentWatchListItem, setWatchList, setWatchListFactory, favoritesSorted]);

    const [updateFavoriteMutation] = useMutation(
        graphql(`
            mutation UpdateFavorite($id: Int!, $input: UpdateFavoriteInput!) {
                updateFavorite(id: $id, input: $input) {
                    id
                }
            }
        `),
    );

    const updateFavoriteOrderRemote = useCallback(
        async (favoriteId: number) => {
            const position = favoritesSortedByUser.findIndex((favorite) => favorite.id === favoriteId) + 1;

            await updateFavoriteMutation({
                variables: {
                    id: favoriteId,
                    input: {
                        position: position,
                    },
                },
            });
        },
        [favoritesSortedByUser, updateFavoriteMutation],
    );

    const coverImageItems = useMemo(
        () =>
            favorites.flatMap((favorite) => {
                const anime = favorite.entry.theme?.anime;

                return anime ? [{ ...extractImages(anime.images.nodes), name: anime.title.romaji }] : [];
            }),
        [favorites],
    );

    if (favorites !== favoritesPrevious) {
        setFavoritesPrevious(favorites);
        setFavoritesSortedByUser(favorites);
        return null;
    }

    return (
        <>
            <SEO title="Favorites" />
            <Text variant="h1">Your Favorites</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <MultiCoverImage key={JSON.stringify(coverImageItems)} items={coverImageItems} />
                    </StyledDesktopOnly>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    <StyledHeader>
                        <Text variant="h2">
                            Themes
                            <Text color="text-disabled"> ({favorites.length})</Text>
                        </Text>
                        {favorites.length > 0 && (
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
                                <SearchFilterSortBy.Option value={UNSORTED}>Unsorted</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_A_Z}>A ➜ Z (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A}>Z ➜ A (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_A_Z}>A ➜ Z (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_Z_A}>Z ➜ A (Anime)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
                        </SearchFilterGroup>
                    </Collapse>
                    <FavoritesEntryList
                        favorites={favoritesSorted}
                        isReorderable={sortBy === UNSORTED}
                        playAll={playAll}
                        updateFavoriteOrderRemote={updateFavoriteOrderRemote}
                        updateFavoriteOrder={setFavoritesSortedByUser}
                    />
                </Column>
            </SidebarContainer>
        </>
    );
}

interface FavoritesEntryListProps {
    favorites: Array<ResultOf<typeof FAVORITES_PAGE_FAVORITE>>;
    isReorderable: boolean;
    playAll: (index: number) => void;
    updateFavoriteOrderRemote: (favoriteId: number) => void;
    updateFavoriteOrder: (favorites: Array<ResultOf<typeof FAVORITES_PAGE_FAVORITE>>) => void;
}

const FavoritesEntryList = memo(function FavoritesEntryList({
    favorites,
    isReorderable,
    playAll,
    updateFavoriteOrderRemote,
    updateFavoriteOrder,
}: FavoritesEntryListProps) {
    return (
        <StyledReorderContainer>
            {isReorderable ? (
                <Reorder.Group as="div" axis="y" values={favorites} onReorder={updateFavoriteOrder}>
                    {favorites.map((favorite, index) => (
                        <FavoritesEntry
                            key={favorite.id}
                            favorite={favorite}
                            isDraggable
                            onPlay={() => playAll(index)}
                            onDragEnd={() => updateFavoriteOrderRemote(favorite.id)}
                        />
                    ))}
                </Reorder.Group>
            ) : (
                <div>
                    {favorites.map((favorite, index) => (
                        <FavoritesEntry
                            key={favorite.id}
                            favorite={favorite}
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

interface FavoritesEntryProps {
    favorite: ResultOf<typeof FAVORITES_PAGE_FAVORITE>;
    isDraggable?: boolean;
    onPlay: () => void;
    onDragEnd?: () => void;
}

function FavoritesEntry({ favorite, isDraggable, onPlay, onDragEnd }: FavoritesEntryProps) {
    const { watchList, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);
    const controls = useDragControls();

    const entry = favorite.entry;
    const video = entry.videos.nodes[0];
    const theme = entry.theme;

    const [toggleFavorite] = useMutation(
        graphql(`
            mutation ToggleFavorite($entryId: Int!) {
                toggleFavorite(favorite: { entry: $entryId }) {
                    id
                }
            }
        `),
        {
            variables: { entryId: entry.id },
            update: (cache) => {
                const meData = cache.readQuery({
                    query: graphql(`
                        query FavoritesPageReadMe {
                            me {
                                id
                            }
                        }
                    `),
                });

                if (!meData?.me) {
                    return;
                }

                cache.updateFragment(
                    {
                        id: cache.identify(meData.me),
                        fragment: graphql(`
                            fragment FavoritesPageUpdateMe on Me {
                                id
                                favorites {
                                    id
                                    favoriteable {
                                        __typename
                                        ... on Entry {
                                            id
                                        }
                                    }
                                }
                            }
                        `),
                    },
                    (me) =>
                        me
                            ? {
                                  ...me,
                                  favorites: me.favorites.filter((favorite) => favorite.favoriteable.__typename === "Entry" && favorite.favoriteable.id !== entry.id),
                              }
                            : undefined,
                );
            },
            optimisticResponse: {
                toggleFavorite: null,
            },
            refetchQueries: [FAVORITES_PAGE_QUERY],
        },
    );

    const element = (
        <VideoSummaryCard
            video={video}
            entry={entry}
            theme={theme}
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
                            video={video}
                            entry={entry}
                            trigger={
                                <MenuItem onSelect={(event) => event.preventDefault()}>
                                    <Icon icon={faPlus} color="text-disabled" />
                                    <Text>Add to Playlist</Text>
                                </MenuItem>
                            }
                        />
                        {watchList.length ? (
                            <>
                                <MenuSeparator />
                                <MenuItem
                                    onSelect={() =>
                                        addWatchListItem(
                                            getFragmentData(WATCH_LIST_ITEM_VIDEO, video),
                                            getFragmentData(WATCH_LIST_ITEM_ENTRY, entry),
                                            getFragmentData(WATCH_LIST_ITEM_THEME, theme),
                                        )
                                    }
                                >
                                    <Icon icon={faArrowTurnDown} color="text-disabled" />
                                    <Text>Add to Watch List</Text>
                                </MenuItem>
                                <MenuItem
                                    onSelect={() =>
                                        addWatchListItemNext(
                                            getFragmentData(WATCH_LIST_ITEM_VIDEO, video),
                                            getFragmentData(WATCH_LIST_ITEM_ENTRY, entry),
                                            getFragmentData(WATCH_LIST_ITEM_THEME, theme),
                                        )
                                    }
                                >
                                    <Icon icon={faArrowTurnUp} color="text-disabled" />
                                    <Text>Play Next</Text>
                                </MenuItem>
                            </>
                        ) : null}
                        <MenuSeparator />
                        <MenuItem onSelect={() => toggleFavorite()}>
                            <Icon icon={faTrash} color="text-disabled" />
                            <Text>Remove from Favorites</Text>
                        </MenuItem>
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
    );

    if (isDraggable) {
        return (
            <Reorder.Item
                as="div"
                value={favorite}
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

export const getServerSideProps: GetServerSideProps<FavoritesPageProps, FavoritesPageParams> = async ({ req }) => {
    const client = createApolloClient(req);

    const { data } = await client.query({
        query: FAVORITES_PAGE_QUERY,
    });

    const favorites = extractValidFavorites(data);

    if (!favorites) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(),
            favorites: favorites,
        },
    };
};

function extractValidFavorites(data: ResultOf<typeof FAVORITES_PAGE_QUERY> | null | undefined) {
    const favorites = getFragmentData(FAVORITES_PAGE_FAVORITE, data?.me?.favorites);

    if (!favorites) {
        return null;
    }

    return (
        favorites.flatMap((favorite) => {
            if (favorite.entry.__typename !== "Entry") {
                return [];
            }
            if (favorite.entry.videos.nodes.length === 0) {
                return [];
            }
            return [favorite];
        }) ?? null
    );
}
