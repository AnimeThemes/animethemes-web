import { Fragment, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { Flex, Box } from "components/flex";
import styled from "styled-components";
import Text from "components/text";
import useSiteMeta from "hooks/useSiteMeta";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import VideoTags from "components/utils/videoTags";
import ThemeEntryTags from "components/utils/themeEntryTags";
import Title from "components/text/title";
import VideoButton from "components/button/video";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import ArtistSearchResultCard from "components/card/searchResult/artist";
import SEO from "components/seo";
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
                        <Text bold>
                            <SongTitleWithArtists song={theme.song}/>
                        </Text>
                        <Text small maxLines={1}>
                            <Text>{theme.slug} from </Text>
                            <Link to={`/anime/${anime.slug}`}>
                                <Text link>{anime.name}</Text>
                            </Link>
                        </Text>
                    </Flex>
                </Box>
                <Flex alignItems="center" gapsRow="0.5rem">
                    <Text small>Version {entry.version || 1}</Text>
                    <ThemeEntryTags entry={entry}/>
                    <Text link>&bull;</Text>
                    <VideoTags video={video}/>
                </Flex>
            </Flex>
            <Flex flexDirection={["column", "row"]} gapsColumn={["2rem", 0]} gapsRow={[0, "2rem"]}>
                <Box flex="2">
                    <Box gapsColumn="1rem">
                        <Title variant="section">Related entries</Title>
                        <Flex flexDirection={["column", "row"]} gapsColumn={["1rem", 0]} gapsRow={[0, "1rem"]}>
                            <Box flex="1">
                                <AnimeSearchResultCard anime={anime} hideThemes/>
                            </Box>
                            <Box flex="1">
                                <Box gapsColumn="1rem">
                                    {!!theme.song.performances && theme.song.performances.map((performance) => (
                                        <ArtistSearchResultCard key={performance.artist.name} artist={performance.artist}/>
                                    ))}
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
                <Box flex="1">
                    {!!otherEntries.length && (
                        <Flex flexDirection="column" gapsColumn="1rem" alignItems={["flex-start", "flex-end"]}>
                            <Title variant="section">Other versions</Title>
                            {otherEntries.map((otherEntry) => (
                                <Fragment key={otherEntry.version}>
                                    <Flex alignItems="center" gapsRow="0.5rem">
                                        <Text small>Version {otherEntry.version || 1}</Text>
                                        <ThemeEntryTags entry={otherEntry}/>
                                    </Flex>
                                    {otherEntry.videos.map((video, index) => (
                                        <VideoButton
                                            key={index}
                                            anime={anime}
                                            theme={theme}
                                            entry={entry}
                                            video={video}
                                        />
                                    ))}
                                </Fragment>
                            ))}
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
