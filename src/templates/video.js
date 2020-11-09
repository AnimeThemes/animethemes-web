import {Link} from "gatsby";
import Flex, {FlexItem} from "components/flex";
import styled from "styled-components";
import Text from "components/text";
import useAniList from "hooks/useAniList";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import VideoTags from "components/utils/videoTags";
import ThemeEntryTags from "components/utils/themeEntryTags";
import React, {useEffect} from "react";
import Title from "components/text/title";
import VideoButton from "components/button/video";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import ArtistSearchResultCard from "components/card/searchResult/artist";

const StyledCover = styled.img`
    width: 48px;
    height: 64px;
    object-fit: cover;
`;
const StyledVideoInfo = styled(Flex).attrs({
    gapsColumn: "2rem"
})`
    padding: 0 1rem;
`;

export default function VideoPage({ pageContext: { video, anime, theme, entry } }) {
    const { image } = useAniList(anime);

    useEffect(() => {
        if (theme && image) {
            // eslint-disable-next-line no-undef
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${theme.slug} • ${theme.song.title}`,
                artist: theme.song.artists.map((artist) => artist.as || artist.name).join(", "),
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

    return (
        <StyledVideoInfo>
            <Flex row alignItems="center" gapsRow="1rem">
                <StyledCover alt="Cover" src={image}/>
                <FlexItem flex={1}>
                    <Flex justifyContent="center" gapsColumn="0.25rem">
                        <SongTitleWithArtists song={theme.song}/>
                        <Text small maxLines={1}>
                            <Text>{theme.slug} from </Text>
                            <Link to={`/anime/${anime.alias}`}>
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
                                    {theme.song.artists.map((artist) => (
                                        <ArtistSearchResultCard key={artist.name} artist={artist}/>
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
