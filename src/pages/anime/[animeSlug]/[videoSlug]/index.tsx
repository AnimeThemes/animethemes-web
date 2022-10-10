import { useEffect, useState } from "react";
import Link from "next/link";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { HorizontalScroll, Performances, SongTitle } from "components/utils";
import { Button, VideoButton } from "components/button";
import { AnimeSummaryCard, ArtistSummaryCard, SummaryCard, ThemeSummaryCard } from "components/card";
import extractImages from "utils/extractImages";
import { SEO } from "components/seo";
import { faChevronDown, faMinus, faPlus, faShare } from "@fortawesome/pro-solid-svg-icons";
import { Icon } from "components/icon";
import useWatchHistory from "hooks/useWatchHistory";
import useLocalPlaylist from "hooks/useLocalPlaylist";
import styled from "styled-components";
import theme from "theme";
import createVideoSlug from "utils/createVideoSlug";
import fetchStaticPaths from "utils/fetchStaticPaths";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import { Menu } from "components/menu";
import { useToasts } from "context/toastContext";
import { Toast } from "components/toast";
import { ThemeEntryTags, VideoTags } from "components/tag";
import { AUDIO_URL, VIDEO_URL } from "utils/config";
import type { VideoPageAllQuery, VideoPageQuery, VideoPageQueryVariables } from "generated/graphql";
import type { GetStaticPaths, GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { RequiredNonNullable } from "utils/types";
import { Switcher } from "components/switcher";
import useSetting from "hooks/useSetting";
import { AudioMode } from "utils/settings";
import { SwitcherOption } from "components/switcher/Switcher";
import { VideoPlayer } from "components/video-player";

const StyledVideoInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 16px;
    align-items: baseline;

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

const StyledTabletOnly = styled.span`
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

const StyledMobileOnly = styled.span`
    @media (min-width: ${theme.breakpoints.tabletMin}) {
        display: none;
    }
`;

interface VideoPageProps extends SharedPageProps, RequiredNonNullable<VideoPageQuery> {
    themeIndex: number
    entryIndex: number
    videoIndex: number
    isVideoPage: true
}

type VideoPageParams = {
    animeSlug: string
    videoSlug: string
};

export default function VideoPage({ anime, themeIndex, entryIndex, videoIndex }: VideoPageProps) {
    const theme = anime.themes[themeIndex];
    const entry = theme.entries[entryIndex];
    const video = entry.videos[videoIndex];

    const songTitle = theme.song?.title || "T.B.A.";
    const { smallCover, largeCover } = extractImages(anime);
    const { addToPlaylist, removeFromPlaylist, isInPlaylist } = useLocalPlaylist();
    const { addToHistory } = useWatchHistory();
    const [ showMoreRelatedThemes, setShowMoreRelatedThemes ] = useState(false);
    const { dispatchToast } = useToasts();
    const [audioMode, setAudioMode] = useSetting(AudioMode, { storageSync: false });
    const [canRenderPlayer, setCanRenderPlayer] = useState(false);

    useEffect(() => setCanRenderPlayer(true), []);

    const relatedThemes = anime.themes
        .filter((relatedTheme) => relatedTheme.slug !== theme.slug)
        .slice(0, showMoreRelatedThemes ? undefined : 6);

    const usedAlsoAs = video.entries
        .map((entry) => entry.theme)
        .filter((otherTheme) => otherTheme?.anime && otherTheme.anime.slug !== anime.slug);

    useEffect(() => addToHistory(theme), [ addToHistory, theme ]);

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

    const saveToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(() => dispatchToast("clipboard", <Toast>Copied to clipboard!</Toast>));
    };

    const videoUrl = `${VIDEO_URL}/${video.basename}`;
    const audioUrl = `${AUDIO_URL}/${video.audio.basename}`;

    return <>
        <SEO title={pageTitle} description={pageDesc} image={largeCover}>
            <meta name="og:video" content={videoUrl}/>
            <meta name="og:video:url" content={videoUrl}/>
            <meta name="og:video:secure_url" content={videoUrl}/>
            <meta name="og:video:type" content="video/webm"/>
            <meta name="og:video:width" content="1280"/>
            <meta name="og:video:height" content="720"/>
        </SEO>
        <StyledVideoInfo>
            <Column style={{ "--gap": "8px" }}>
                <Text color="text-muted">
                    <SongTitle song={theme.song}/>
                    <Text variant="small"> - </Text>
                    <Text weight={600}>{theme.type}{theme.sequence || null}{theme.group && ` (${theme.group})`}</Text>
                    <Text variant="small"> from </Text>
                    <Link href={`/anime/${anime.slug}`} passHref legacyBehavior>
                        <Text as="a" link>{anime.name}</Text>
                    </Link>
                </Text>
                {!!theme.song?.performances?.length && (
                    <Text variant="small" color="text-muted">
                        <Text>Performed</Text>
                        <Performances song={theme.song} maxPerformances={null}/>
                    </Text>
                )}
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
        <HorizontalScroll fixShadows>
            <Row style={{ "--gap": "16px" }}>
                {isInPlaylist(theme) ? (
                    <Button variant="primary" style={{ "--gap": "8px" }} onClick={() => removeFromPlaylist(theme)}>
                        <Icon icon={faMinus}/>
                        <Text>
                            <StyledTabletOnly>Remove from Playlist</StyledTabletOnly>
                            <StyledMobileOnly>Unsave</StyledMobileOnly>
                        </Text>
                    </Button>
                ) : (
                    <Button style={{ "--gap": "8px" }} onClick={() => addToPlaylist(theme)}>
                        <Icon icon={faPlus}/>
                        <Text>
                            <StyledTabletOnly>Add to Playlist</StyledTabletOnly>
                            <StyledMobileOnly>Save</StyledMobileOnly>
                        </Text>
                    </Button>
                )}
                <Menu button={(MenuButton) => (
                    <Button as={MenuButton} style={{ "--gap": "8px" }}>
                        <Icon icon={faShare}/>
                        <Text>Share</Text>
                    </Button>
                )}>
                    <Menu.Option onSelect={() => saveToClipboard(location.href)}>Copy URL to this Page</Menu.Option>
                    {audioMode === AudioMode.ENABLED ? (
                        <Menu.Option onSelect={() => saveToClipboard(audioUrl)}>Copy URL to Embeddable Audio</Menu.Option>
                    ) : (
                        <Menu.Option onSelect={() => saveToClipboard(videoUrl)}>Copy URL to Embeddable Video</Menu.Option>
                    )}
                </Menu>
                {canRenderPlayer ? (
                    <Switcher selectedItem={audioMode} onChange={setAudioMode}>
                        <SwitcherOption value={AudioMode.DISABLED}>Video</SwitcherOption>
                        <SwitcherOption value={AudioMode.ENABLED}>Audio</SwitcherOption>
                    </Switcher>
                ) : null}
            </Row>
        </HorizontalScroll>
        <StyledRelatedGrid>
            <Column style={{ "--gap": "16px" }}>
                <Text variant="h2">Information</Text>
                <AnimeSummaryCard anime={anime}/>
                {anime.series.map((series) => (
                    <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />
                ))}
                {anime.studios.map((studio) => (
                    <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />
                ))}
                {!!theme.song?.performances?.length && (
                    <>
                        <Text variant="h2">Artists</Text>
                        {theme.song.performances.sort((a, b) => a.artist.name.localeCompare(b.artist.name)).map((performance) => (
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
                        {usedAlsoAs.map((theme) => theme?.anime ? (
                            <ThemeSummaryCard key={theme.anime.slug} theme={theme}/>
                        ) : null)}
                    </>
                )}
            </Column>
            <Column style={{ "--gap": "16px" }}>
                {!!relatedThemes.length && (
                    <>
                        <Text variant="h2">Related themes</Text>
                        {relatedThemes.map((theme) => (
                            <ThemeSummaryCard key={theme.slug} theme={{ ...theme, anime }}/>
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
                        {otherEntries.map((otherEntry) => otherEntry ? (
                            <StyledRelatedEntries key={otherEntry.version ?? 1}>
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
                        ) : null)}
                    </Column>
                </StyledRelatedEntries>
            )}
        </StyledRelatedGrid>
    </>;
}

export const getStaticProps: GetStaticProps<VideoPageProps, VideoPageParams> = async ({ params }) => {
    const { data, apiRequests } = await fetchData<VideoPageQuery, VideoPageQueryVariables>(gql`
        ${ThemeSummaryCard.fragments.theme}
        ${ArtistSummaryCard.fragments.artist}
        ${VideoPlayer.fragments.anime}
        ${VideoPlayer.fragments.theme}
        ${VideoPlayer.fragments.entry}
        ${VideoPlayer.fragments.video}
        
        query VideoPage($animeSlug: String!) {
            anime(slug: $animeSlug) {
                ...VideoPlayerAnime
                name
                slug
                year
                season
                themes {
                    ...VideoPlayerTheme
                    ...ThemeSummaryCardTheme
                    id
                    slug
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
                        ...VideoPlayerEntry
                        episodes
                        nsfw
                        spoiler
                        version
                        videos {
                            ...VideoPlayerVideo
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
                    slug
                    name
                }
            }
        }
    `, params && { animeSlug: params.animeSlug });

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
                                isVideoPage: true
                            },
                            // Revalidate after 1 hour (= 3600 seconds).
                            revalidate: 3600
                        };
                    }
                }
            }
        }
    }

    return {
        notFound: true
    };
};

export const getStaticPaths: GetStaticPaths<VideoPageParams> = () => {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData<VideoPageAllQuery>(gql`
            query VideoPageAll {
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

        return data.animeAll.flatMap(
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
};
