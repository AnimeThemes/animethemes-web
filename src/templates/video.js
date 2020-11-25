import {graphql, Link} from "gatsby";
import Flex, {FlexItem} from "components/flex";
import styled from "styled-components";
import Text from "components/text";
import useAniList from "hooks/useAniList";
import useSiteMeta from "hooks/useSiteMeta";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import VideoTags from "components/utils/videoTags";
import ThemeEntryTags from "components/utils/themeEntryTags";
import React, {useEffect} from "react";
import Title from "components/text/title";
import VideoButton from "components/button/video";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import ArtistSearchResultCard from "components/card/searchResult/artist";
import SEO from "components/seo";

const StyledVideoInfo = styled(Flex).attrs({
    gapsColumn: "2rem"
})`
    padding: 0 1rem;
`;

export default function VideoPage({ data: { video } }) {
    const entry = video.entries[0]; // TODO: What about the other entries?
    const theme = entry.theme;
    const anime = theme.anime;

    const { siteName } = useSiteMeta();
    const { image } = useAniList(anime);

    useEffect(() => {
        if (theme && image) {
            // eslint-disable-next-line no-undef
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${theme.slug} • ${theme.song.title}`,
                artist: theme.song.performances ? theme.song.performances.map((performance) => performance.as || performance.artist.name).join(", ") : undefined,
                album: anime.name,
                artwork: [
                    { src: image, sizes: "512x512", type: "image/jpeg" }
                ]
            });
        }
    }, [ anime, theme, image ]);

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
            artistStr = " by ";
            song.performances.map((performance, index) => {
                artistStr += performance.as || performance.artist.name;
                if (index < song.performances.length - 1) {
                    artistStr += (index === song.performances.length - 2 ? ", and " : ", ");
                }
            });
        }
        return `Watch ${anime.name} ${theme.slug}${version}: ${song.title}${artistStr} on ${siteName}`;
    })();

    return (
        <StyledVideoInfo>
            <SEO title={pageTitle} description={pageDesc} />
            <Flex row alignItems="center" gapsRow="1rem">
                <FlexItem flex={1}>
                    <Flex justifyContent="center" gapsColumn="0.25rem">
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
                </FlexItem>
                <Flex row alignItems="center" gapsRow="0.5rem">
                    <Text small>Version {entry.version || 1}</Text>
                    <ThemeEntryTags entry={entry}/>
                    <Text link>&bull;</Text>
                    <VideoTags video={video}/>
                </Flex>
            </Flex>
            <Flex row gapsRow="2rem">
                <FlexItem flex={2}>
                    <Flex gapsColumn="1rem">
                        <Title variant="section">Related entries</Title>
                        <Flex row gapsRow="1rem">
                            <FlexItem flex={1}>
                                <AnimeSearchResultCard anime={anime} hideThemes/>
                            </FlexItem>
                            <FlexItem flex={1}>
                                <Flex gapsColumn="1rem">
                                    {!!theme.song.performances && theme.song.performances.map((performance) => (
                                        <ArtistSearchResultCard key={performance.artist.name} artist={performance.artist}/>
                                    ))}
                                </Flex>
                            </FlexItem>
                        </Flex>
                    </Flex>
                </FlexItem>
                <FlexItem flex={1}>
                    {!!otherEntries.length && (
                        <Flex gapsColumn="1rem" alignItems="flex-end">
                            <Title variant="section">Other versions</Title>
                            {otherEntries.map((otherEntry) => (
                                <React.Fragment key={otherEntry.version}>
                                    <Flex row alignItems="center" gapsRow="0.5rem">
                                        <Text small>Version {otherEntry.version || 1}</Text>
                                        <ThemeEntryTags entry={entry}/>
                                    </Flex>
                                    {otherEntry.videos.map((video, index) => (
                                        <VideoButton key={index} video={video}/>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Flex>
                    )}
                </FlexItem>
            </Flex>
        </StyledVideoInfo>
    );
}

export const query = graphql`
    query($filename: String!) {
        video(filename: { eq: $filename }) {
            filename
            link
            lyrics
            nc
            overlap
            resolution
            source
            subbed
            uncen
            entries {
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
                }
            }
        }
    }
`
