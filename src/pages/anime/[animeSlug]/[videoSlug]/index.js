import { useEffect } from "react";
import Link from "next/link";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { SongTitleWithArtists, ThemeEntryTags, VideoTags } from "components/utils";
import { Button, VideoButton } from "components/button";
import { AnimeSummaryCard, ArtistSummaryCard, SummaryCard } from "components/card";
import useImage from "hooks/useImage";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { videoBaseUrl } from "lib/client/api";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import { useWatchHistory } from "context/watchHistoryContext";
import { useLocalPlaylist } from "context/localPlaylistContext";
import styled from "styled-components";
import theme from "theme";
import createVideoSlug from "utils/createVideoSlug";

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
    justify-content: flex-end;
    gap: 16px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        justify-content: space-between;
    }
`;

const StyledVideoTagsInfo = styled(Row)`
    justify-content: flex-end;
`;

const StyledRelatedGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 32px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
    }
`;

const StyledSummaryCardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;

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
    const { smallCover, largeCover } = useImage(anime);
    const { addToPlaylist, removeFromPlaylist, isInPlaylist } = useLocalPlaylist();
    const { addToHistory } = useWatchHistory();

    useEffect(() => addToHistory({ ...theme, anime }), [ addToHistory, anime, theme ]);

    useEffect(() => {
        if (theme && smallCover && navigator.mediaSession) {
            // eslint-disable-next-line no-undef
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${theme.slug} • ${theme.song.title}`,
                artist: theme.song.performances ? theme.song.performances.map((performance) => performance.as || performance.artist.name).join(", ") : undefined,
                album: anime.name,
                artwork: [
                    { src: smallCover, sizes: "512x512", type: "image/jpeg" }
                ]
            });
        }
    }, [ anime, theme, smallCover ]);

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
        ? `${theme.song.title} (${anime.name} ${theme.slug} v${entry.version})`
        : `${theme.song.title} (${anime.name} ${theme.slug})`;

    const pageDesc = (() => {
        // Generates and returns page description for SEO
        const song = theme.song;
        const version = entry.version ? ` Version ${entry.version}` : "";
        let artistStr = "";
        if (song.performances && song.performances.length) {
            artistStr = song.performances.reduce((str, performance, index, { length }) => {
                str += performance.as || performance.artist.name;
                if (index < length - 1) {
                    str += (index === length - 2 ? " & " : ", ");
                }
                return str;
            }, " by ");
        }
        return `Watch ${anime.name} ${theme.slug}${version}: ${song.title}${artistStr} on AnimeThemes.`;
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
                        <Text>{theme.slug} from </Text>
                        <Link href={`/anime/${anime.slug}`} passHref>
                            <Text as="a" link>{anime.name}</Text>
                        </Link>
                    </Text>
                </Column>
                <Text variant="small" color="text-muted">
                    <Column style={{ "--gap": "4px" }}>
                        <StyledVideoEntryInfo>
                            <Text>Version {entry.version || 1}</Text>
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
                    <Text variant="h2">Related entries</Text>
                    <StyledSummaryCardGrid>
                        <Column style={{ "--gap": "16px" }}>
                            <AnimeSummaryCard anime={anime} hideThemes/>
                            {!!anime.series?.length && anime.series.map((series) => (
                                <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />
                            ))}
                            {!!anime.studios?.length && anime.studios.map((studio) => (
                                <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />
                            ))}
                        </Column>
                        <Column style={{ "--gap": "16px" }}>
                            {!!theme.song.performances && theme.song.performances.map((performance) => (
                                <ArtistSummaryCard key={performance.artist.name} artist={performance.artist} as={performance.as}/>
                            ))}
                        </Column>
                    </StyledSummaryCardGrid>
                </Column>
                {!!otherEntries.length && (
                    <StyledRelatedEntries>
                        <Text variant="h2">Other versions</Text>
                        <Column style={{ "--gap": "32px" }}>
                            {otherEntries.map((otherEntry) => (
                                <StyledRelatedEntries key={otherEntry.version}>
                                    <Text variant="small" color="text-muted">
                                        <Row style={{ "--gap": "8px" }}>
                                            <Text>Version {otherEntry.version || 1}</Text>
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
    const { data } = await fetchData(`
        #graphql

        query($animeSlug: String!) {
            anime(slug: $animeSlug) {
                name
                slug
                year
                season
                themes {
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
    const { data } = await fetchData(`
        #graphql

        query {
            animeAll {
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

    const paths = data.animeAll.flatMap(
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

    return {
        paths,
        fallback: "blocking"
    };
}
