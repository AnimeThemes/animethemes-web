import { useContext, useEffect, useRef, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";

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
import type { VideoPageAllQuery, VideoPageQuery, VideoPageQueryVariables } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import { VIDEO_URL } from "@/utils/config";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import type { RequiredNonNullable } from "@/utils/types";

export interface VideoPageProps extends SharedPageProps, RequiredNonNullable<VideoPageQuery> {
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
    anime,
    themeIndex,
    entryIndex,
    videoIndex,
    lastBuildAt,
    apiRequests,
}: VideoPageProps) {
    const theme = anime.themes[themeIndex];
    const entry = theme.entries[entryIndex];
    const video = entry.videos[videoIndex];

    const songTitle = theme.song?.title || "T.B.A.";

    const { largeCover } = extractImages(anime);
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

    const relatedThemes = anime.themes
        .filter((relatedTheme) => relatedTheme.id !== theme.id)
        .slice(0, showMoreRelatedThemes ? undefined : 3);
    const relatedPlaylists = video.tracks.map((track) => track.playlist);

    const usedAlsoAs = video.entries
        .map((entry) => entry.theme)
        .filter((otherTheme) => otherTheme?.anime && otherTheme.anime.slug !== anime.slug);

    const pageTitle = entry.version
        ? `${songTitle} (${anime.name} ${theme.type + (theme.sequence || "")} v${entry.version})`
        : `${songTitle} (${anime.name} ${theme.type + (theme.sequence || "")})`;

    const pageDesc = (() => {
        // Generates and returns page description for SEO
        const song = theme.song;
        const version = entry.version ? ` Version ${entry.version}` : "";
        let artistStr = "";
        if (song?.performances?.length) {
            artistStr = song.performances.reduce((str, performance, index, { length }) => {
                str += performance.as || performance.artist.name;
                if (index < length - 1) {
                    str += index === length - 2 ? " & " : ", ";
                }
                return str;
            }, " by ");
        }
        return `Watch ${anime.name} ${theme.type + (theme.sequence || "")}${version}: ${songTitle}${artistStr} on AnimeThemes.`;
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
            if (isCancelled) {
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
                        {anime.series.map((series) => (
                            <SummaryCard
                                key={series.slug}
                                title={series.name}
                                description="Series"
                                to={`/series/${series.slug}`}
                            />
                        ))}
                        {anime.studios.map((studio) => (
                            <StudioSummaryCard key={studio.slug} studio={studio} />
                        ))}
                        {!!theme.song?.performances?.length && (
                            <>
                                <Text variant="h2">Artists</Text>
                                {theme.song.performances
                                    .sort((a, b) => a.artist.name.localeCompare(b.artist.name))
                                    .map((performance) => (
                                        <ArtistSummaryCard
                                            key={performance.artist.name}
                                            artist={performance.artist}
                                            as={performance.as}
                                        />
                                    ))}
                            </>
                        )}
                        {lastBuildAt && <PageRevalidation lastBuildAt={lastBuildAt} apiRequests={apiRequests} />}
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
                                {anime.themes.length > 4 ? (
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
                                    <PlaylistSummaryCard key={playlist.id} playlist={playlist} showOwner />
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

VideoPage.fragments = {
    anime: gql`
        ${AnimeSummaryCard.fragments.anime}
        ${ThemeSummaryCard.fragments.theme}
        ${ArtistSummaryCard.fragments.artist}
        ${VideoScript.fragments.video}
        ${PlaylistSummaryCard.fragments.playlist}
        ${PlaylistSummaryCard.fragments.showOwner}
        ${StudioSummaryCard.fragments.studio}

        fragment VideoPageAnime on Anime {
            ...AnimeSummaryCardAnime
            name
            slug
            year
            season
            themes {
                ...ThemeSummaryCardTheme
                id
                song {
                    title
                    performances {
                        artist {
                            ...ArtistSummaryCardArtist
                        }
                        as
                    }
                }
                entries {
                    id
                    episodes
                    nsfw
                    spoiler
                    version
                    videos {
                        ...VideoScriptVideo
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
                        entries {
                            theme {
                                ...ThemeSummaryCardTheme
                            }
                        }
                        tracks {
                            playlist {
                                ...PlaylistSummaryCardPlaylist
                                ...PlaylistSummaryCardShowOwner
                            }
                        }
                    }
                }
            }
            images {
                facet
                link
            }
            series {
                slug
                name
            }
            studios {
                ...StudioSummaryCardStudio
            }
        }
    `,
};

const buildTimeCache: Map<string, VideoPageQuery> = new Map();

export const getStaticProps: GetStaticProps<VideoPageProps, VideoPageParams> = async ({ params }) => {
    let data = params ? buildTimeCache.get(params.animeSlug) : null;
    let apiRequests = 0;

    if (!data) {
        ({ data, apiRequests } = await fetchData<VideoPageQuery, VideoPageQueryVariables>(
            gql`
                ${VideoPage.fragments.anime}

                query VideoPage($animeSlug: String!) {
                    anime(slug: $animeSlug) {
                        ...VideoPageAnime
                    }
                }
            `,
            params && { animeSlug: params.animeSlug },
        ));
    }

    const anime = data.anime;

    if (anime) {
        for (const [themeIndex, theme] of anime.themes.entries()) {
            for (const [entryIndex, entry] of theme.entries.entries()) {
                for (const [videoIndex, video] of entry.videos.entries()) {
                    if (createVideoSlug(theme, entry, video) === params?.videoSlug) {
                        return {
                            props: {
                                ...getSharedPageProps(apiRequests),
                                anime,
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
        const { data } = await fetchData<VideoPageAllQuery>(gql`
            ${VideoPage.fragments.anime}

            query VideoPageAll {
                animeAll {
                    ...VideoPageAnime
                }
            }
        `);

        data.animeAll.forEach((anime) => buildTimeCache.set(anime.slug, { anime }));

        return data.animeAll.flatMap((anime) =>
            anime.themes.flatMap((theme) =>
                theme.entries.flatMap((entry) =>
                    entry.videos.flatMap((video) => ({
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
