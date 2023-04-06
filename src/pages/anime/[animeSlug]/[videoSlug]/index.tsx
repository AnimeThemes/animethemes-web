import { ArtistSummaryCard, ThemeSummaryCard } from "components/card";
import createVideoSlug from "utils/createVideoSlug";
import fetchStaticPaths from "utils/fetchStaticPaths";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { VideoPageAllQuery, VideoPageQuery, VideoPageQueryVariables } from "generated/graphql";
import type { GetStaticPaths, GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { RequiredNonNullable } from "utils/types";
import { VideoPlayer } from "components/video-player";
import VideoScript from "components/video-script/VideoScript";

export interface VideoPageProps extends SharedPageProps, RequiredNonNullable<VideoPageQuery> {
    themeIndex: number
    entryIndex: number
    videoIndex: number
    isVideoPage: true
}

type VideoPageParams = {
    animeSlug: string
    videoSlug: string
};

export default function VideoPage() {
    return null;
}

// TODO: This page doesn't actually get rendered, it's just here for reference and can be removed later.
// TODO: The data fetching functions below are still needed though, see _app.tsx.
// export default function VideoPage({ anime, themeIndex, entryIndex, videoIndex }: VideoPageProps) {
//     const theme = anime.themes[themeIndex];
//     const entry = theme.entries[entryIndex];
//     const video = entry.videos[videoIndex];
//
//     const songTitle = theme.song?.title || "T.B.A.";
//     const { smallCover, largeCover } = extractImages(anime);
//     const { addToHistory } = useWatchHistory();
//     const [ showMoreRelatedThemes, setShowMoreRelatedThemes ] = useState(false);
//     const { dispatchToast } = useToasts();
//     const [audioMode, setAudioMode] = useSetting(AudioMode, { storageSync: false });
//     const [developerMode] = useSetting(DeveloperMode);
//     const [canRenderPlayer, setCanRenderPlayer] = useState(false);
//
//     useEffect(() => setCanRenderPlayer(true), []);
//
//     const relatedThemes = anime.themes
//         .filter((relatedTheme) => relatedTheme.slug !== theme.slug)
//         .slice(0, showMoreRelatedThemes ? undefined : 6);
//
//     const usedAlsoAs = video.entries
//         .map((entry) => entry.theme)
//         .filter((otherTheme) => otherTheme?.anime && otherTheme.anime.slug !== anime.slug);
//
//     // We don't want to re-add the theme when the history changes, because it can cause
//     // various issues when multiple tabs are open.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     useEffect(() => addToHistory(theme), [ theme ]);
//
//     useEffect(() => {
//         if (theme && smallCover && navigator.mediaSession) {
//             // eslint-disable-next-line no-undef
//             navigator.mediaSession.metadata = new MediaMetadata({
//                 title: `${theme.slug} • ${songTitle}`,
//                 artist: theme.song?.performances ? theme.song.performances.map((performance) => performance.as || performance.artist.name).join(", ") : undefined,
//                 album: anime.name,
//                 artwork: [
//                     { src: smallCover, sizes: "512x512", type: "image/jpeg" }
//                 ]
//             });
//         }
//     }, [ anime, theme, smallCover, songTitle ]);
//
//     const otherEntries = theme.entries.map(otherEntry => {
//         const videos = otherEntry.videos.filter((otherVideo) => otherVideo.filename !== video.filename);
//
//         if (!videos.length) {
//             return null;
//         }
//
//         return {
//             ...otherEntry,
//             videos
//         };
//     }).filter((otherEntry) => !!otherEntry);
//
//     const pageTitle = entry.version
//         ? `${songTitle} (${anime.name} ${theme.slug} v${entry.version})`
//         : `${songTitle} (${anime.name} ${theme.slug})`;
//
//     const pageDesc = (() => {
//         // Generates and returns page description for SEO
//         const song = theme.song;
//         const version = entry.version ? ` Version ${entry.version}` : "";
//         let artistStr = "";
//         if (song?.performances?.length) {
//             artistStr = song.performances.reduce((str, performance, index, { length }) => {
//                 str += performance.as || performance.artist.name;
//                 if (index < length - 1) {
//                     str += (index === length - 2 ? " & " : ", ");
//                 }
//                 return str;
//             }, " by ");
//         }
//         return `Watch ${anime.name} ${theme.slug}${version}: ${songTitle}${artistStr} on AnimeThemes.`;
//     })();
//
//     const saveToClipboard = (url: string) => {
//         navigator.clipboard.writeText(url)
//             .then(() => dispatchToast("clipboard", <Toast>Copied to clipboard!</Toast>));
//     };
//
//     const videoUrl = `${VIDEO_URL}/${video.basename}`;
//     const audioUrl = `${AUDIO_URL}/${video.audio.basename}`;
//
//     const videoHeight = video.resolution ?? 720;
//     const videoWidth = Math.floor(videoHeight / 9 * 16);
//
//     return <>
//         <SEO title={pageTitle} description={pageDesc} image={largeCover}>
//             <meta name="og:video" content={videoUrl}/>
//             <meta name="og:video:url" content={videoUrl}/>
//             <meta name="og:video:secure_url" content={videoUrl}/>
//             <meta name="og:video:type" content="video/webm"/>
//             <meta name="og:video:width" content={String(videoWidth)}/>
//             <meta name="og:video:height" content={String(videoHeight)}/>
//
//             {/* Twitter card support */}
//             {/* See: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card */}
//             <meta name="twitter:card" content="player" />
//             <meta name="twitter:site" content="@AnimeThemesMoe" />
//             <meta name="twitter:title" content={pageTitle} />
//             <meta name="twitter:description" content={pageDesc} />
//             <meta name="twitter:image" content={largeCover} />
//             <meta name="twitter:player" content={videoUrl} />
//             <meta name="twitter:player:width" content={String(videoWidth)} />
//             <meta name="twitter:player:height" content={String(videoHeight)} />
//         </SEO>
//         <StyledVideoInfo>
//             <Column style={{ "--gap": "8px" }}>
//                 <Text color="text-muted">
//                     <SongTitle song={theme.song}/>
//                     <Text variant="small"> - </Text>
//                     <Text weight={600}>{theme.type}{theme.sequence || null}{theme.group && ` (${theme.group})`}</Text>
//                     <Text variant="small"> from </Text>
//                     <Link href={`/anime/${anime.slug}`} passHref legacyBehavior>
//                         <Text as="a" link>{anime.name}</Text>
//                     </Link>
//                 </Text>
//                 {!!theme.song?.performances?.length && (
//                     <Text variant="small" color="text-muted">
//                         <Text>Performed</Text>
//                         <Performances song={theme.song} maxPerformances={null}/>
//                     </Text>
//                 )}
//             </Column>
//             <Text color="text-muted">
//                 <Column style={{ "--gap": "4px" }}>
//                     <StyledVideoEntryInfo>
//                         <Text variant="small">Version {entry.version || 1}</Text>
//                         <ThemeEntryTags entry={entry}/>
//                     </StyledVideoEntryInfo>
//                     <StyledVideoTagsInfo>
//                         <VideoTags video={video}/>
//                     </StyledVideoTagsInfo>
//                 </Column>
//             </Text>
//         </StyledVideoInfo>
//         <HorizontalScroll fixShadows>
//             <Row style={{ "--gap": "16px" }}>
//                 <PlaylistTrackAddDialog
//                     video={{
//                         // Flip the structure on it's head,
//                         // because we need video as the root object here.
//                         ...video,
//                         entries: [{
//                             ...entry,
//                             theme,
//                         }],
//                     }}
//                 />
//                 <Menu button={(MenuButton) => (
//                     <Button as={MenuButton} style={{ "--gap": "8px" }}>
//                         <Icon icon={faShare}/>
//                         <Text>Share</Text>
//                     </Button>
//                 )}>
//                     <Menu.Option onSelect={() => saveToClipboard(location.href)}>Copy URL to this Page</Menu.Option>
//                     {audioMode === AudioMode.ENABLED ? (
//                         <Menu.Option onSelect={() => saveToClipboard(audioUrl)}>Copy URL to Embeddable Audio</Menu.Option>
//                     ) : (
//                         <Menu.Option onSelect={() => saveToClipboard(videoUrl)}>Copy URL to Embeddable Video</Menu.Option>
//                     )}
//                 </Menu>
//                 {canRenderPlayer ? (
//                     <Switcher selectedItem={audioMode} onChange={setAudioMode}>
//                         <SwitcherOption value={AudioMode.DISABLED}>Video</SwitcherOption>
//                         <SwitcherOption value={AudioMode.ENABLED}>Audio</SwitcherOption>
//                     </Switcher>
//                 ) : null}
//             </Row>
//         </HorizontalScroll>
//         <StyledRelatedGrid>
//             <Column style={{ "--gap": "16px" }}>
//                 <Text variant="h2">Information</Text>
//                 <AnimeSummaryCard anime={anime}/>
//                 {anime.series.map((series) => (
//                     <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />
//                 ))}
//                 {anime.studios.map((studio) => (
//                     <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />
//                 ))}
//                 {!!theme.song?.performances?.length && (
//                     <>
//                         <Text variant="h2">Artists</Text>
//                         {theme.song.performances.sort((a, b) => a.artist.name.localeCompare(b.artist.name)).map((performance) => (
//                             <ArtistSummaryCard
//                                 key={performance.artist.name}
//                                 artist={performance.artist}
//                                 as={performance.as}
//                             />
//                         ))}
//                     </>
//                 )}
//                 {!!usedAlsoAs.length && (
//                     <>
//                         <Text variant="h2">Also Used As</Text>
//                         {usedAlsoAs.map((theme) => theme?.anime ? (
//                             <ThemeSummaryCard key={theme.anime.slug} theme={theme}/>
//                         ) : null)}
//                     </>
//                 )}
//             </Column>
//             <Column style={{ "--gap": "16px" }}>
//                 {!!relatedThemes.length && (
//                     <>
//                         <Text variant="h2">Related themes</Text>
//                         {relatedThemes.map((theme) => (
//                             <ThemeSummaryCard key={theme.slug} theme={{ ...theme, anime }}/>
//                         ))}
//                         {!showMoreRelatedThemes && anime.themes.length > 7 && (
//                             <Row style={{ "--justify-content": "center" }}>
//                                 <Button variant="silent" isCircle onClick={() => setShowMoreRelatedThemes(true)}>
//                                     <Icon icon={faChevronDown}/>
//                                 </Button>
//                             </Row>
//                         )}
//                     </>
//                 )}
//             </Column>
//             {!!otherEntries.length && (
//                 <StyledRelatedEntries>
//                     <Text variant="h2">Other versions</Text>
//                     <Column style={{ "--gap": "32px" }}>
//                         {otherEntries.map((otherEntry) => otherEntry ? (
//                             <StyledRelatedEntries key={otherEntry.version ?? 1}>
//                                 <Text color="text-muted">
//                                     <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
//                                         <Text variant="small">Version {otherEntry.version || 1}</Text>
//                                         <ThemeEntryTags entry={otherEntry}/>
//                                     </Row>
//                                 </Text>
//                                 <StyledVideoList>
//                                     {otherEntry.videos.map((video, index) => (
//                                         <VideoButton
//                                             key={index}
//                                             anime={anime}
//                                             theme={theme}
//                                             entry={otherEntry}
//                                             video={video}
//                                         />
//                                     ))}
//                                 </StyledVideoList>
//                             </StyledRelatedEntries>
//                         ) : null)}
//                     </Column>
//                 </StyledRelatedEntries>
//             )}
//         </StyledRelatedGrid>
//         {developerMode === DeveloperMode.ENABLED ? (
//             <VideoScript video={video} />
//         ) : null}
//     </>;
// }

VideoPage.fragments = {
    anime: gql`
        ${ThemeSummaryCard.fragments.theme}
        ${ArtistSummaryCard.fragments.artist}
        ${VideoPlayer.fragments.anime}
        ${VideoPlayer.fragments.theme}
        ${VideoPlayer.fragments.entry}
        ${VideoPlayer.fragments.video}
        ${VideoScript.fragments.video}

        fragment VideoPageAnime on Anime {
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
    `,
};

const buildTimeCache: Map<string, VideoPageQuery> = new Map();

export const getStaticProps: GetStaticProps<VideoPageProps, VideoPageParams> = async ({ params }) => {
    let data = params ? buildTimeCache.get(params.animeSlug) : null;
    let apiRequests = 0;

    if (!data) {
        ({ data, apiRequests } = await fetchData<VideoPageQuery, VideoPageQueryVariables>(gql`
            ${VideoPage.fragments.anime}

            query VideoPage($animeSlug: String!) {
                anime(slug: $animeSlug) {
                    ...VideoPageAnime
                }
            }
        `, params && { animeSlug: params.animeSlug }));
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
            ${VideoPage.fragments.anime}
            
            query VideoPageAll {
                animeAll {
                    ...VideoPageAnime
                }
            }
        `);

        data.animeAll.forEach((anime) => buildTimeCache.set(anime.slug, { anime }));

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
