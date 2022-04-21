import { useEffect, useState } from "react";
import Link from "next/link";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { SongTitleWithArtists, ThemeEntryTags, VideoTags } from "components/utils";
import { Button, VideoButton } from "components/button";
import { AnimeSummaryCard, ArtistSummaryCard, SummaryCard, ThemeSummaryCard } from "components/card";
import useImage from "hooks/useImage";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { videoBaseUrl } from "lib/client/api";
import { faChevronDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import { useWatchHistory } from "context/watchHistoryContext";
import { useLocalPlaylist } from "context/localPlaylistContext";
import styled from "styled-components";
import theme from "theme";
import createVideoSlug from "utils/createVideoSlug";
import gql from "graphql-tag";
import fetchStaticPaths from "utils/fetchStaticPaths";

const StyledVideoInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 16px;
    align-items: center;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
        align-items: stretch;
    }
`;

const StyledVideoEntryInfo = styled(Row)`
    align-items: baseline;
    justify-content: flex-end;
    gap: 16px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        justify-content: space-between;
    }
`;

const StyledVideoTagsInfo = styled(Row)`
    align-items: baseline;
    justify-content: flex-end;
`;

const StyledRelatedGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px 32px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
    }
`;

const StyledRelatedEntries = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        align-items: flex-start;
    }
`;

const StyledVideoList = styled(Row)`
    flex-wrap: wrap;
    justify-content: flex-end;
    
    gap: 16px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        justify-content: flex-start;
    }
`;

export default function VideoPage({ anime, theme, entry, video }) {
    const songTitle = theme.song?.title || "T.B.A.";
    const { smallCover, largeCover } = useImage(anime);
    const { addToPlaylist, removeFromPlaylist, isInPlaylist } = useLocalPlaylist();
    const { addToHistory } = useWatchHistory();
    const [ showMoreRelatedThemes, setShowMoreRelatedThemes ] = useState(false);

    const relatedThemes = anime.themes
        .filter((relatedTheme) => relatedTheme.slug !== theme.slug)
        .slice(0, showMoreRelatedThemes ? undefined : 6);

    const usedAlsoAs = video.entries
        .map((entry) => entry.theme)
        .filter((otherTheme) => otherTheme.anime.slug !== anime.slug);

    useEffect(() => addToHistory({ ...theme, anime }), [ addToHistory, anime, theme ]);

    useEffect(() => {
        if (theme && smallCover && navigator.mediaSession) {
            // eslint-disable-next-line no-undef
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${theme.slug} • ${songTitle}`,
                artist: theme.song?.performances ? theme.song.performances.map((performance) => performance.as || performance.artist.name).join(", ") : undefined,
                album: anime.name,
                artwork: [
                    { src: smallCover, sizes: "512x512", type: "image/jpeg" }
                ]
            });
        }
    }, [ anime, theme, smallCover, songTitle ]);

    const otherEntries = theme.entries.map(otherEntry => {
        const videos = otherEntry.videos.filter((otherVideo) => otherVideo.filename !== video.filename);

        if (!videos.length) {
            return null;
        }

        return {
            ...otherEntry,
            videos
        };
    }).filter((otherEntry) => !!otherEntry);

    const pageTitle = entry.version
        ? `${songTitle} (${anime.name} ${theme.slug} v${entry.version})`
        : `${songTitle} (${anime.name} ${theme.slug})`;

    const pageDesc = (() => {
        // Generates and returns page description for SEO
        const song = theme.song;
        const version = entry.version ? ` Version ${entry.version}` : "";
        let artistStr = "";
        if (song?.performances?.length) {
            artistStr = song.performances.reduce((str, performance, index, { length }) => {
                str += performance.as || performance.artist.name;
                if (index < length - 1) {
                    str += (index === length - 2 ? " & " : ", ");
                }
                return str;
            }, " by ");
        }
        return `Watch ${anime.name} ${theme.slug}${version}: ${songTitle}${artistStr} on AnimeThemes.`;
    })();

    const videoUrl = `${videoBaseUrl}/video/${video.basename}`;

    return (
        <>
            <SEO title={pageTitle} description={pageDesc} image={largeCover}>
                <meta name="og:video" content={videoUrl}/>
                <meta name="og:video:url" content={videoUrl}/>
                <meta name="og:video:secure_url" content={videoUrl}/>
                <meta name="og:video:type" content="video/webm"/>
                <meta name="og:video:width" content="1280"/>
                <meta name="og:video:height" content="720"/>
            </SEO>
            <StyledVideoInfo>
                <Column style={{ "--gap": "4px" }}>
                    <SongTitleWithArtists song={theme.song}/>
                    <Text variant="small" color="text-muted" maxLines={1}>
                        <Text>{theme.type}{theme.sequence || null}{theme.group && ` (${theme.group})`} from </Text>
                        <Link href={`/anime/${anime.slug}`} passHref>
                            <Text as="a" link>{anime.name}</Text>
                        </Link>
                    </Text>
                </Column>
                <Text color="text-muted">
                    <Column style={{ "--gap": "4px" }}>
                        <StyledVideoEntryInfo>
                            <Text variant="small">Version {entry.version || 1}</Text>
                            <ThemeEntryTags entry={entry}/>
                        </StyledVideoEntryInfo>
                        <StyledVideoTagsInfo>
                            <VideoTags video={video}/>
                        </StyledVideoTagsInfo>
                    </Column>
                </Text>
            </StyledVideoInfo>
            <Row>
                {isInPlaylist(theme) ? (
                    <Button variant="primary" style={{ "--gap": "8px" }} onClick={() => removeFromPlaylist(theme)}>
                        <Icon icon={faMinus}/>
                        <Text>Remove from Playlist</Text>
                    </Button>
                ) : (
                    <Button style={{ "--gap": "8px" }} onClick={() => addToPlaylist({ ...theme, anime })}>
                        <Icon icon={faPlus}/>
                        <Text>Add to Playlist</Text>
                    </Button>
                )}
            </Row>
            <StyledRelatedGrid>
                <Column style={{ "--gap": "16px" }}>
                    <Text variant="h2">Information</Text>
                    <AnimeSummaryCard anime={anime}/>
                    {!!anime.series?.length && anime.series.map((series) => (
                        <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />
                    ))}
                    {!!anime.studios?.length && anime.studios.map((studio) => (
                        <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />
                    ))}
                    {!!theme.song?.performances?.length && (
                        <>
                            <Text variant="h2">Artists</Text>
                            {theme.song.performances.map((performance) => (
                                <ArtistSummaryCard
                                    key={performance.artist.name}
                                    artist={performance.artist}
                                    as={performance.as}
                                />
                            ))}
                        </>
                    )}
                    {!!usedAlsoAs.length && (
                        <>
                            <Text variant="h2">Also Used As</Text>
                            {usedAlsoAs.map((theme) => (
                                <ThemeSummaryCard key={theme.anime.slug} theme={theme}/>
                            ))}
                        </>
                    )}
                </Column>
                <Column style={{ "--gap": "16px" }}>
                    {!!relatedThemes.length && (
                        <>
                            <Text variant="h2">Related themes</Text>
                            {relatedThemes.map((theme) => (
                                <ThemeSummaryCard key={theme.slug} theme={theme}/>
                            ))}
                            {!showMoreRelatedThemes && anime.themes.length > 7 && (
                                <Row style={{ "--justify-content": "center" }}>
                                    <Button variant="silent" isCircle onClick={() => setShowMoreRelatedThemes(true)}>
                                        <Icon icon={faChevronDown}/>
                                    </Button>
                                </Row>
                            )}
                        </>
                    )}
                </Column>
                {!!otherEntries.length && (
                    <StyledRelatedEntries>
                        <Text variant="h2">Other versions</Text>
                        <Column style={{ "--gap": "32px" }}>
                            {otherEntries.map((otherEntry) => (
                                <StyledRelatedEntries key={otherEntry.version}>
                                    <Text color="text-muted">
                                        <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
                                            <Text variant="small">Version {otherEntry.version || 1}</Text>
                                            <ThemeEntryTags entry={otherEntry}/>
                                        </Row>
                                    </Text>
                                    <StyledVideoList>
                                        {otherEntry.videos.map((video, index) => (
                                            <VideoButton
                                                key={index}
                                                anime={anime}
                                                theme={theme}
                                                entry={otherEntry}
                                                video={video}
                                            />
                                        ))}
                                    </StyledVideoList>
                                </StyledRelatedEntries>
                            ))}
                        </Column>
                    </StyledRelatedEntries>
                )}
            </StyledRelatedGrid>
        </>
    );
}

export async function getStaticProps({ params: { animeSlug, videoSlug } }) {
    const { data } = await fetchData(gql`
        ${ThemeSummaryCard.fragments.theme}
        
        query($animeSlug: String!) {
            anime(slug: $animeSlug) {
                name
                slug
                year
                season
                themes {
                    ...ThemeSummaryCard_theme
                    id
                    slug
                    song {
                        title
                        performances {
                            artist {
                                name
                                slug
                                images {
                                    facet
                                    link
                                }
                            }
                            as
                        }
                    }
                    entries {
                        episodes
                        nsfw
                        spoiler
                        version
                        videos {
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
                                    ...ThemeSummaryCard_theme
                                }
                            }
                        }
                    }
                }
                resources {
                    site
                    link
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
                    slug
                    name
                }
            }
        }
    `, {
        animeSlug
    });

    const anime = data.anime;

    if (!anime) {
        return {
            notFound: true
        };
    }

    let pageTheme = null;
    let pageEntry = null;
    let pageVideo = null;

    themeLoop: for (const theme of anime.themes) {
        for (const entry of theme.entries) {
            for (const video of entry.videos) {
                if (createVideoSlug(theme, entry, video) === videoSlug) {
                    pageTheme = theme;
                    pageEntry = entry;
                    pageVideo = video;
                    break themeLoop;
                }
            }
        }
    }

    if (!pageVideo) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            anime,
            theme: pageTheme,
            video: pageVideo,
            entry: pageEntry,
            isVideoPage: true
        },
        revalidate: 5 * 60
    };
}

export async function getStaticPaths() {
    return fetchStaticPaths(async (isStaging) => {
        const { data } = await fetchData(gql`
            query {
                animeAll {
                    id
                    slug
                    themes {
                        slug
                        entries {
                            id
                            version
                            videos {
                                id
                                tags
                            }
                        }
                    }
                }
            }
        `);

        let anime = data.animeAll;

        if (isStaging) {
            // In staging, we only want to pre-render the video pages for the neweset 100 anime.
            anime = anime.sort((a, b) => b.id - a.id).slice(0, 100);
        }

        return anime.flatMap(
            (anime) => anime.themes.flatMap(
                (theme) => theme.entries.flatMap(
                    (entry) => entry.videos.flatMap(
                        (video) => ({
                            params: {
                                animeSlug: anime.slug,
                                videoSlug: createVideoSlug(theme, entry, video)
                            }
                        })
                    )
                )
            )
        );
    });
}
