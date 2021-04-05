import { useEffect } from "react";
import { graphql, Link } from "gatsby";
import { Box, Flex } from "components/box";
import styled from "styled-components";
import { Text } from "components/text";
import useSiteMeta from "hooks/useSiteMeta";
import { SongTitleWithArtists, ThemeEntryTags, VideoTags } from "components/utils";
import { VideoButton } from "components/button";
import { AnimeSummaryCard, ArtistSummaryCard } from "components/card";
import { SEO } from "components/seo";
import useImage from "hooks/useImage";

const StyledVideoInfo = styled(Box).attrs({
    gapsColumn: "2rem"
})`
    @media (min-width: 721px) {
        padding: 0 1rem;
    }
`;

export default function VideoPage({ data: { video, entry } }) {
    const theme = entry.theme;
    const anime = theme.anime;

    const { siteName } = useSiteMeta();
    const { smallCover } = useImage(anime);

    useEffect(() => {
        if (theme && smallCover) {
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

    // Generates and returns page title
    const pageTitle = entry.version
        ? `${theme.song.title} (${anime.name} ${theme.slug} V${entry.version})`
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
        return `Watch ${anime.name} ${theme.slug}${version}: ${song.title}${artistStr} on ${siteName}`;
    })();

    return (
        <StyledVideoInfo>
            <SEO title={pageTitle} description={pageDesc} />
            <Flex flexDirection={["column", "row"]} alignItems={["flex-start", "center"]} gapsRow={[0, "1rem"]} gapsColumn={["1rem", 0]}>
                <Box flex="1">
                    <Flex flexDirection="column" justifyContent="center" gapsColumn="0.25rem">
                        <Text fontWeight="700">
                            <SongTitleWithArtists song={theme.song}/>
                        </Text>
                        <Text variant="small" color="text-muted" maxLines={1}>
                            <Text>{theme.slug} from </Text>
                            <Link to={`/anime/${anime.slug}`}>
                                <Text link>{anime.name}</Text>
                            </Link>
                        </Text>
                    </Flex>
                </Box>
                <Text variant="small" color="text-muted">
                    <Flex alignItems="center" gapsRow="1rem">
                        <Text>Version {entry.version || 1}</Text>
                        <ThemeEntryTags entry={entry}/>
                        <Text color="text-primary">&bull;</Text>
                        <VideoTags video={video}/>
                    </Flex>
                </Text>
            </Flex>
            <Flex flexDirection={["column", "row"]} gapsColumn={["2rem", 0]} gapsRow={[0, "2rem"]}>
                <Box flex="2">
                    <Box gapsColumn="1rem">
                        <Text variant="h2">Related entries</Text>
                        <Flex flexDirection={["column", "row"]} gapsColumn={["1rem", 0]} gapsRow={[0, "1rem"]}>
                            <Box flex="1">
                                <AnimeSummaryCard anime={anime} hideThemes/>
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
                                                        entry={entry}
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
        </StyledVideoInfo>
    );
}

export const query = graphql`
    query($id: String!, $entryId: String!) {
        video(id: { eq: $id }) {
            filename
            basename
            link
            lyrics
            nc
            overlap
            resolution
            source
            subbed
            uncen
            tags
        }
        entry(id: { eq: $entryId }) {
            episodes
            nsfw
            spoiler
            version
            theme {
                slug
                anime {
                    name
                    slug
                    year
                    season
                    themes {
                        slug
                    }
                    resources {
                        site
                        link
                    }
                    images {
                        facet
                        link
                    }
                }
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
                        filename
                        lyrics
                        nc
                        overlap
                        resolution
                        source
                        subbed
                        uncen
                    }
                }
                ...VideoSlug
            }
        }
    }
`
