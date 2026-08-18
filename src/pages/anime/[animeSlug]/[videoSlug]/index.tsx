import { useContext, useEffect, useRef, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { Column, Row } from "@/components/box/Flex";
import { IconTextButton } from "@/components/button/IconTextButton";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { ArtistSummaryCard } from "@/components/card/ArtistSummaryCard";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { StudioSummaryCard } from "@/components/card/StudioSummaryCard";
import { SummaryCard } from "@/components/card/SummaryCard";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import Switch from "@/components/form/Switch";
import { SEO } from "@/components/seo/SEO";
import { SwitcherOption } from "@/components/switcher/Switcher";
import { Text } from "@/components/text/Text";
import { HorizontalScroll } from "@/components/utils/HorizontalScroll";
import { PageRevalidation } from "@/components/utils/PageRevalidation";
import { StyledScrollArea, StyledSwitcher } from "@/components/video-player/VideoPlayer.style";
import VideoScript from "@/components/video-script/VideoScript";
import PlayerContext from "@/context/playerContext";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import styleTheme from "@/theme";
import { VIDEO_URL } from "@/utils/config";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

export const VIDEO_PAGE_ANIME = graphql(`
    fragment VideoPageAnime on Anime {
        ...AnimeSummaryCardAnime
        title {
            romaji
        }
        slug
        year
        season
        animethemes {
            ...ThemeSummaryCardTheme
            ...createVideoSlugTheme
            id
            type
            sequence
            song {
                title {
                    romaji
                }
                performances {
                    artist {
                        id
                        ...ArtistSummaryCardArtist
                    }
                    as
                    relevance
                }
            }
            group {
                slug
            }
            animethemeentries {
                ...VideoPlayerEntry
                ...createVideoSlugEntry
                id
                episodes
                nsfw
                spoiler
                version
                videos {
                    nodes {
                        ...VideoPlayerVideo
                        ...VideoScriptVideo
                        ...createVideoSlugVideo
                        id
                        basename
                        filename
                        lyrics
                        nc
                        overlap
                        resolution
                        source
                        subbed
                        uncen
                        tags
                        animethemeentries {
                            nodes {
                                animetheme {
                                    ...ThemeSummaryCardTheme
                                    anime {
                                        slug
                                    }
                                }
                            }
                        }
                        tracks {
                            playlist {
                                ...PlaylistSummaryCardPlaylist
                                ...PlaylistSummaryCardPlaylistWithOwner
                                id
                            }
                        }
                    }
                }
            }
        }
        images {
            nodes {
                ...extractImagesImage
            }
        }
        series {
            nodes {
                slug
                title {
                    romaji
                }
            }
        }
        studios {
            nodes {
                ...StudioSummaryCardStudio
                slug
            }
        }
    }
`);

const propsQuery = graphql(`
    query VideoPage($animeSlug: String!) {
        anime(slug: $animeSlug) {
            ...VideoPageAnime
        }
    }
`);

const pathsQuery = graphql(`
    query VideoPageAll {
        animeConnection {
            nodes {
                ...VideoPageAnime
                slug
                animethemes {
                    ...createVideoSlugTheme
                    animethemeentries {
                        ...createVideoSlugEntry
                        videos {
                            nodes {
                                ...createVideoSlugVideo
                            }
                        }
                    }
                }
            }
        }
    }
`);

export function getAnimeFromVideoPageFragment(fragment: FragmentType<typeof VIDEO_PAGE_ANIME>) {
    return getFragmentData(VIDEO_PAGE_ANIME, fragment);
}

export interface VideoPageProps extends SharedPageProps {
    anime: FragmentType<typeof VIDEO_PAGE_ANIME>;
    themeIndex: number;
    entryIndex: number;
    videoIndex: number;
    isVideoPage: true;
}

type VideoPageParams = {
    animeSlug: string;
    videoSlug: string;
};

export default function VideoPage({
    anime: animeFragment,
    themeIndex,
    entryIndex,
    videoIndex,
    lastBuildAt,
}: VideoPageProps) {
    const anime = getAnimeFromVideoPageFragment(animeFragment);
    const theme = anime.animethemes[themeIndex];
    const entry = theme.animethemeentries[entryIndex];
    const video = entry.videos.nodes[videoIndex];

    const songTitle = theme.song?.title.romaji || "T.B.A.";

    const { largeCover } = extractImages(anime.images.nodes);
    const {
        watchList,
        currentWatchListItem,
        setCurrentWatchListItem,
        isGlobalAutoPlay,
        setGlobalAutoPlay,
        isLocalAutoPlay,
        setLocalAutoPlay,
        isWatchListUsingLocalAutoPlay,
        isRepeat,
        setRepeat,
    } = useContext(PlayerContext);
    const [selectedTab, setSelectedTab] = useState<"watch-list" | "info" | "related">(() => {
        return watchList.length > 1 ? "watch-list" : "info";
    });
    const [showMoreRelatedThemes, setShowMoreRelatedThemes] = useState(false);
    const [showMoreRelatedPlaylists, setShowMoreRelatedPlaylists] = useState(false);

    const relatedThemes = anime.animethemes
        .filter((relatedTheme) => relatedTheme.id !== theme.id)
        .slice(0, showMoreRelatedThemes ? undefined : 3);
    const relatedPlaylists = video.tracks.map((track) => track.playlist);

    const usedAlsoAs = video.animethemeentries.nodes
        .map((entry) => entry.animetheme)
        .filter((otherTheme) => otherTheme?.anime && otherTheme.anime.slug !== anime.slug);

    const pageTitle = entry.version
        ? `${songTitle} (${anime.title.romaji} ${theme.type + (theme.sequence || "")} v${entry.version})`
        : `${songTitle} (${anime.title.romaji} ${theme.type + (theme.sequence || "")})`;

    const pageDesc = (() => {
        // Generates and returns page description for SEO
        const song = theme.song;
        const version = entry.version ? ` Version ${entry.version}` : "";
        let artistStr = "";
        if (song?.performances?.length) {
            artistStr = song.performances.reduce((str, performance, index, { length }) => {
                str += performance.as || performance.artist.name.main;
                if (index < length - 1) {
                    str += index === length - 2 ? " & " : ", ";
                }
                return str;
            }, " by ");
        }
        return `Watch ${anime.title.romaji} ${theme.type + (theme.sequence || "")}${version}: ${songTitle}${artistStr} on AnimeThemes.`;
    })();

    const videoUrl = `${VIDEO_URL}/${video.basename}`;

    const videoHeight = video.resolution ?? 720;
    const videoWidth = Math.floor((videoHeight / 9) * 16);

    const videoCardMap = useRef<Map<number, HTMLDivElement>>(null);

    function getVideoCardMap() {
        if (!videoCardMap.current) {
            videoCardMap.current = new Map();
        }
        return videoCardMap.current;
    }

    useEffect(() => {
        if (currentWatchListItem === null) {
            return;
        }

        let isCancelled = false;

        setTimeout(() => {
            // We don't want to scroll the watch list item into view
            // if the video is not fixed to the viewport.
            // This affects mobile devices in landscape mode.
            const isMobileInLandscape = matchMedia(
                `(max-width: ${styleTheme.breakpoints.tabletMax}) and (min-aspect-ratio: 1/1)`,
            ).matches;
            if (isCancelled || isMobileInLandscape) {
                return;
            }
            const currentVideoCard = getVideoCardMap().get(currentWatchListItem.watchListId);
            if (!currentVideoCard) {
                return;
            }
            currentVideoCard.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 200);

        return () => {
            isCancelled = true;
        };
    }, [currentWatchListItem]);

    return (
        <>
            <SEO title={pageTitle} description={pageDesc} image={largeCover}>
                <meta name="og:video" content={videoUrl} />
                <meta name="og:video:url" content={videoUrl} />
                <meta name="og:video:secure_url" content={videoUrl} />
                <meta name="og:video:type" content="video/webm" />
                <meta name="og:video:width" content={String(videoWidth)} />
                <meta name="og:video:height" content={String(videoHeight)} />

                {/* Twitter card support */}
                {/* See: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card */}
                <meta name="twitter:card" content="player" />
                <meta name="twitter:site" content="@AnimeThemesMoe" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDesc} />
                <meta name="twitter:image" content={largeCover} />
                <meta name="twitter:player" content={videoUrl} />
                <meta name="twitter:player:width" content={String(videoWidth)} />
                <meta name="twitter:player:height" content={String(videoHeight)} />
            </SEO>
            <HorizontalScroll $fixShadows>
                <StyledSwitcher
                    selectedItem={selectedTab}
                    // Explicit type cast, because StyledSwitcher breaks the generic type of Switcher
                    onChange={(tab) => setSelectedTab(tab as typeof selectedTab)}
                >
                    <SwitcherOption value="watch-list">Next Up</SwitcherOption>
                    <SwitcherOption value="info">Info</SwitcherOption>
                    <SwitcherOption value="related">Related</SwitcherOption>
                </StyledSwitcher>
            </HorizontalScroll>
            {selectedTab === "watch-list" ? (
                <>
                    <Row style={{ "--gap": "16px", "--justify-content": "space-between" }}>
                        <Row style={{ "--gap": "16px" }}>
                            <Text color="text-muted">Auto-play:</Text>
                            {isWatchListUsingLocalAutoPlay ? (
                                <Switch isChecked={isLocalAutoPlay} onCheckedChange={setLocalAutoPlay} />
                            ) : (
                                <Switch isChecked={isGlobalAutoPlay} onCheckedChange={setGlobalAutoPlay} />
                            )}
                        </Row>
                        <Row style={{ "--gap": "16px" }}>
                            <Text color="text-muted">Repeat:</Text>
                            <Switch isChecked={isRepeat} onCheckedChange={setRepeat} />
                        </Row>
                    </Row>
                    <StyledScrollArea>
                        <Column style={{ "--gap": "16px" }}>
                            {watchList.map((watchListItem) => (
                                <VideoSummaryCard
                                    key={watchListItem.watchListId}
                                    ref={(element: HTMLDivElement) => {
                                        const videoCardMap = getVideoCardMap();
                                        videoCardMap.set(watchListItem.watchListId, element);

                                        return () => {
                                            videoCardMap.delete(watchListItem.watchListId);
                                        };
                                    }}
                                    video={watchListItem.video}
                                    entry={watchListItem.entry}
                                    theme={watchListItem.entry.animetheme}
                                    onPlay={() => setCurrentWatchListItem(watchListItem)}
                                    isPlaying={watchListItem.watchListId === currentWatchListItem?.watchListId}
                                />
                            ))}
                        </Column>
                    </StyledScrollArea>
                </>
            ) : null}
            {selectedTab === "info" ? (
                <StyledScrollArea>
                    <Column style={{ "--gap": "16px" }}>
                        <Text variant="h2">Origin</Text>
                        <AnimeSummaryCard anime={anime} />
                        {anime.series.nodes.map((series) => (
                            <SummaryCard
                                key={series.slug}
                                title={series.title.romaji}
                                description="Series"
                                to={`/series/${series.slug}`}
                            />
                        ))}
                        {anime.studios.nodes.map((studio) => (
                            <StudioSummaryCard key={studio.slug} studio={studio} />
                        ))}
                        {!!theme.song?.performances?.length && (
                            <>
                                <Text variant="h2">Artists</Text>
                                {Array.from(
                                    new Map(
                                        theme.song.performances
                                            .sort((a, b) => a.relevance - b.relevance)
                                            .map((p) => [p.artist.id, p]),
                                    ).values(),
                                ).map((performance) => (
                                    <ArtistSummaryCard
                                        key={performance.artist.id}
                                        artist={performance.artist}
                                        as={performance.as}
                                    />
                                ))}
                            </>
                        )}
                        {lastBuildAt && <PageRevalidation lastBuildAt={lastBuildAt} />}
                        <VideoScript key={video.id} video={video} />
                    </Column>
                </StyledScrollArea>
            ) : null}
            {selectedTab === "related" ? (
                <StyledScrollArea>
                    <Column style={{ "--gap": "16px" }}>
                        {!!relatedThemes.length && (
                            <>
                                <Text variant="h2">Related themes</Text>
                                {relatedThemes.map((theme) => (
                                    <ThemeSummaryCard key={theme.id} theme={{ ...theme, anime }} />
                                ))}
                                {anime.animethemes.length > 4 ? (
                                    <Row style={{ "--justify-content": "center" }}>
                                        <IconTextButton
                                            icon={showMoreRelatedThemes ? faChevronUp : faChevronDown}
                                            variant="silent"
                                            isCircle
                                            onClick={() => setShowMoreRelatedThemes(!showMoreRelatedThemes)}
                                        />
                                    </Row>
                                ) : null}
                            </>
                        )}
                        {!!usedAlsoAs.length && (
                            <>
                                <Text variant="h2">Also Used As</Text>
                                {usedAlsoAs.map((theme) =>
                                    theme?.anime ? <ThemeSummaryCard key={theme.anime.slug} theme={theme} /> : null,
                                )}
                            </>
                        )}
                        {!!relatedPlaylists.length && (
                            <>
                                <Text variant="h2">Part of these Playlists</Text>
                                {relatedPlaylists.slice(0, showMoreRelatedPlaylists ? undefined : 3).map((playlist) => (
                                    <PlaylistSummaryCard
                                        key={playlist.id}
                                        playlist={playlist}
                                        playlistWithOwner={playlist}
                                    />
                                ))}
                                {relatedPlaylists.length > 3 ? (
                                    <Row style={{ "--justify-content": "center" }}>
                                        <IconTextButton
                                            icon={showMoreRelatedPlaylists ? faChevronUp : faChevronDown}
                                            variant="silent"
                                            isCircle
                                            onClick={() => setShowMoreRelatedPlaylists(!showMoreRelatedPlaylists)}
                                        />
                                    </Row>
                                ) : null}
                            </>
                        )}
                    </Column>
                </StyledScrollArea>
            ) : null}
        </>
    );
}

const buildTimeCache: Map<string, FragmentType<typeof VIDEO_PAGE_ANIME>> = new Map();

export const getStaticProps: GetStaticProps<VideoPageProps, VideoPageParams> = async ({ params }) => {
    const client = createApolloClient();

    let animeFragment = params ? buildTimeCache.get(params.animeSlug) : null;

    if (!animeFragment) {
        animeFragment = (
            await client.query({
                query: propsQuery,
                variables: params,
            })
        ).data.anime;
    }

    if (!animeFragment) {
        return {
            notFound: true,
        };
    }

    const anime = getFragmentData(VIDEO_PAGE_ANIME, animeFragment);

    if (anime) {
        for (const [themeIndex, theme] of anime.animethemes.entries()) {
            for (const [entryIndex, entry] of theme.animethemeentries.entries()) {
                for (const [videoIndex, video] of entry.videos.nodes.entries()) {
                    if (createVideoSlug(theme, entry, video) === params?.videoSlug) {
                        return {
                            props: {
                                ...getSharedPageProps(),
                                anime: animeFragment,
                                themeIndex,
                                entryIndex,
                                videoIndex,
                                isVideoPage: true,
                            },
                            // Revalidate after 1 hour (= 3600 seconds).
                            revalidate: 3600,
                        };
                    }
                }
            }
        }
    }

    return {
        notFound: true,
    };
};

export const getStaticPaths: GetStaticPaths<VideoPageParams> = () => {
    return fetchStaticPaths(async () => {
        const client = createApolloClient();

        const { data } = await client.query({
            query: pathsQuery,
        });

        for (const anime of data.animeConnection.nodes) {
            buildTimeCache.set(anime.slug, anime);
        }

        for (const anime of data.animeConnection.nodes) {
            buildTimeCache.set(anime.slug, anime);
        }

        return data.animeConnection.nodes.flatMap((anime) =>
            anime.animethemes.flatMap((theme) =>
                theme.animethemeentries.flatMap((entry) =>
                    entry.videos.nodes.flatMap((video) => ({
                        params: {
                            animeSlug: anime.slug,
                            videoSlug: createVideoSlug(theme, entry, video),
                        },
                    })),
                ),
            ),
        );
    });
};
