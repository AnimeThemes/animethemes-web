import { useEffect } from "react";
import Link from "next/link";
import { Box, Flex } from "components/box";
import { Text } from "components/text";
import { SongTitleWithArtists, ThemeEntryTags, VideoTags } from "components/utils";
import { Button, VideoButton } from "components/button";
import { AnimeSummaryCard, ArtistSummaryCard, SummaryCard } from "components/card";
import useImage from "hooks/useImage";
import { fetchData } from "lib/server";
import createVideoSlug from "utils/createVideoSlug";
import { SEO } from "components/seo";
import { videoBaseUrl } from "lib/client/api";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import useLocalPlaylist from "hooks/useLocalPlaylist";
import useHistory from "hooks/useHistory";

export default function VideoPage({ anime, theme, entry, video }) {
    const { smallCover, largeCover } = useImage(anime);
    const videoUrl = `${videoBaseUrl}/video/${video.basename}`;
    const { addToPlaylist, removeFromPlaylist, isInPlaylist } = useLocalPlaylist();
    const { addToHistory } = useHistory();

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
        let song = theme.song,
            artistStr = "",
            version = entry.version ? ` Version ${entry.version}` : "";
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

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={pageTitle} description={pageDesc} image={largeCover}>
                <meta name="og:video" content={videoUrl}/>
                <meta name="og:video:url" content={videoUrl}/>
                <meta name="og:video:secure_url" content={videoUrl}/>
                <meta name="og:video:type" content="video/webm"/>
                <meta name="og:video:width" content="1280"/>
                <meta name="og:video:height" content="720"/>
            </SEO>
            <Flex flexDirection={["column", "row"]} alignItems={["stretch", "center"]} gapsRow={[0, "1rem"]} gapsColumn={["1rem", 0]}>
                <Box flex="1">
                    <Flex flexDirection="column" justifyContent="center" gapsColumn="0.25rem">
                        <Text fontWeight="700">
                            <SongTitleWithArtists song={theme.song}/>
                        </Text>
                        <Text variant="small" color="text-muted" maxLines={1}>
                            <Text>{theme.slug} from </Text>
                            <Link href={`/anime/${anime.slug}`} passHref>
                                <Text as="a" link>{anime.name}</Text>
                            </Link>
                        </Text>
                    </Flex>
                </Box>
                <Text variant="small" color="text-muted">
                    <Flex flexDirection="column" gapsColumn="0.25rem">
                        <Flex alignItems="center" justifyContent={["space-between", "flex-end"]} gapsRow="1rem">
                            <Text>Version {entry.version || 1}</Text>
                            <ThemeEntryTags entry={entry}/>
                        </Flex>
                        <Box alignSelf="flex-end">
                            <VideoTags video={video}/>
                        </Box>
                    </Flex>
                </Text>
            </Flex>
            <Flex>
                {isInPlaylist(theme) ? (
                    <Button variant="primary" gapsRow="0.5rem" onClick={() => removeFromPlaylist(theme)}>
                        <Icon icon={faMinus}/>
                        <Text>Remove from Playlist</Text>
                    </Button>
                ) : (
                    <Button gapsRow="0.5rem" onClick={() => addToPlaylist({ ...theme, anime })}>
                        <Icon icon={faPlus}/>
                        <Text>Add to Playlist</Text>
                    </Button>
                )}
            </Flex>
            <Flex flexDirection={["column", "row"]} gapsColumn={["2rem", 0]} gapsRow={[0, "2rem"]}>
                <Box flex="2">
                    <Box gapsColumn="1rem">
                        <Text variant="h2">Related entries</Text>
                        <Flex flexDirection={["column", "row"]} gapsColumn={["1rem", 0]} gapsRow={[0, "1rem"]}>
                            <Box flex="1" gapsColumn="1rem">
                                <AnimeSummaryCard anime={anime} hideThemes/>
                                {!!anime.series?.length && anime.series.map((series) => (
                                    <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />
                                ))}
                                {!!anime.studios?.length && anime.studios.map((studio) => (
                                    <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />
                                ))}
                            </Box>
                            <Box flex="1">
                                <Box gapsColumn="1rem">
                                    {!!theme.song.performances && theme.song.performances.map((performance) => (
                                        <ArtistSummaryCard key={performance.artist.name} artist={performance.artist} as={performance.as}/>
                                    ))}
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
                <Box flex="1">
                    {!!otherEntries.length && (
                        <Flex flexDirection="column" gapsColumn="1rem" alignItems={["flex-start", "flex-end"]}>
                            <Text variant="h2">Other versions</Text>
                            <Box gapsColumn="2rem">
                                {otherEntries.map((otherEntry) => (
                                    <Flex key={otherEntry.version} flexDirection="column" gapsColumn="1rem" alignItems={["flex-start", "flex-end"]}>
                                        <Text variant="small" color="text-muted">
                                            <Flex alignItems="center" gapsRow="0.5rem">
                                                <Text>Version {otherEntry.version || 1}</Text>
                                                <ThemeEntryTags entry={otherEntry}/>
                                            </Flex>
                                        </Text>
                                        <div>
                                            <Flex flexWrap="wrap" gapsBoth="1rem">
                                                {otherEntry.videos.map((video, index) => (
                                                    <VideoButton
                                                        key={index}
                                                        anime={anime}
                                                        theme={theme}
                                                        entry={otherEntry}
                                                        video={video}
                                                    />
                                                ))}
                                            </Flex>
                                        </div>
                                    </Flex>
                                ))}
                            </Box>
                        </Flex>
                    )}
                </Box>
            </Flex>
        </Box>
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

    if (!data.anime) {
        return {
            notFound: true
        };
    }

    const pageAnime = data.anime;
    let pageTheme = null;
    let pageEntry = null;
    let pageVideo = null;

    themeLoop: for (const theme of pageAnime.themes) {
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
            anime: pageAnime,
            theme: pageTheme,
            video: pageVideo,
            entry: pageEntry
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
