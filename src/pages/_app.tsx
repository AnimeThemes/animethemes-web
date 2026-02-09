import { useCallback, useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { ApolloProvider } from "@apollo/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFullscreen } from "ahooks";
import { LazyMotion } from "motion/react";
import useLocalStorageState from "use-local-storage-state";

import { Column } from "@/components/box/Flex";
import { Card } from "@/components/card/Card";
import { Container } from "@/components/container/Container";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { Footer } from "@/components/footer/Footer";
import { Navigation } from "@/components/navigation/Navigation";
import { SearchNavigation } from "@/components/navigation/SearchNavigation";
import { SeasonNavigation } from "@/components/navigation/SeasonNavigation";
import { YearNavigation } from "@/components/navigation/YearNavigation";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { ToastHub } from "@/components/toast/ToastHub";
import { ErrorBoundary } from "@/components/utils/ErrorBoundary";
import { PageRevalidation } from "@/components/utils/PageRevalidation";
import ColorThemeContext from "@/context/colorThemeContext";
import FullscreenContext from "@/context/fullscreenContext";
import type { WatchListItem } from "@/context/playerContext";
import PlayerContext, { createWatchListItem } from "@/context/playerContext";
import { ToastProvider } from "@/context/toastContext";
import { client } from "@/graphql/client";
import useColorTheme from "@/hooks/useColorTheme";
import type { VideoPageProps } from "@/pages/anime/[animeSlug]/[videoSlug]";
import GlobalStyle from "@/styles/global";
import theme from "@/theme";
import { either, sortTransformed, themeIndexComparator, themeTypeComparator } from "@/utils/comparators";
import { STAGING } from "@/utils/config";
import { getVideoSlugByProps, getVideoSlugByWatchListItem } from "@/utils/createVideoSlug";
import withBasePath from "@/utils/withBasePath";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "styles/prism.scss";

config.autoAddCss = false;

const queryClient = new QueryClient();

const StyledWrapper = styled(Column)`
    isolation: isolate;
    min-height: 100vh;
    min-height: 100dvh;
`;

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;

    margin-bottom: 32px;
    gap: 24px;
`;

const StyledFullWidthContainer = styled(Container)`
    margin: 0;
    padding: 0;
    max-width: none;
`;

// TODO: Add proper type checking, also extract layout modes out of _app.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [colorTheme, setColorTheme] = useColorTheme();

    const { lastBuildAt, apiRequests, isVideoPage = false, isFullWidthPage = false } = pageProps;

    const [watchList, setWatchList] = useState<WatchListItem[]>(() => {
        if (isVideoPage) {
            return createDefaultWatchList(pageProps);
        }
        return [];
    });
    const [watchListFactory, setWatchListFactory] = useState<(() => Promise<WatchListItem[]>) | null>(null);
    const [currentWatchListItemId, setCurrentWatchListItemId] = useState<number | null>(() => {
        if (watchList.length) {
            const { anime, themeIndex, entryIndex, videoIndex }: VideoPageProps = pageProps;
            const video = anime.themes[themeIndex].entries[entryIndex].videos[videoIndex];
            return watchList.find((item) => item.video.id === video.id)?.watchListId ?? null;
        }
        return null;
    });
    const currentWatchListItem = watchList.find((item) => item.watchListId === currentWatchListItemId) ?? null;

    const [isWaitingForVideoPage, setWaitingForVideoPage] = useState(!isVideoPage);

    const [isGlobalAutoPlay, setGlobalAutoPlay] = useLocalStorageState("auto-play", { defaultValue: false });
    const [isLocalAutoPlay, setLocalAutoPlay] = useState(true);
    const [isWatchListUsingLocalAutoPlay, setIsWatchListUsingLocalAutoPlay] = useState(false);
    const [isRepeat, setRepeat] = useState(false);

    const currentVideoSlug = getVideoSlugByProps(pageProps);
    const [previousVideoSlug, setPreviousVideoSlug] = useState<string | null>(() => getVideoSlugByProps(pageProps));

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

    const [isFullscreen, { toggleFullscreen: nativeToggleFullscreen }] = useFullscreen(() => document.documentElement, {
        onEnter() {
            document.documentElement.dataset.fullscreen = "true";
        },
        onExit() {
            delete document.documentElement.dataset.fullscreen;
        },
    });

    const toggleFullscreen = useCallback(() => {
        if (isIOS) {
            // iOS does not support the Fullscreen API, so it's handled differently
            const videoElement = document.querySelector("video");
            if (videoElement && "webkitEnterFullscreen" in videoElement) {
                (videoElement as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
            }
        } else {
            nativeToggleFullscreen();
        }
    }, [isIOS, nativeToggleFullscreen]);

    useEffect(() => {
        if (!isVideoPage && isFullscreen) {
            toggleFullscreen();
        }
    }, [isFullscreen, isVideoPage, toggleFullscreen]);

    useEffect(() => {
        const hotkeyListener = (event: KeyboardEvent) => {
            if (
                !pageProps.isSearch &&
                !(event.target instanceof HTMLInputElement) &&
                !(event.target instanceof HTMLTextAreaElement) &&
                ((event.key === "s" && event.ctrlKey) || event.key === "/")
            ) {
                event.preventDefault();
                router.push("/search");
            }
        };

        window.addEventListener("keydown", hotkeyListener);

        return () => window.removeEventListener("keydown", hotkeyListener);
    }, [pageProps.isSearch, router]);

    // Prevent the video player from opening in the background while the video page is still loading.
    // This should only happen if the video player is opening for the first time and not on
    // subsequent page transitions.
    if (isVideoPage && currentWatchListItem && isWaitingForVideoPage) {
        setWaitingForVideoPage(false);

        return null;
    } else if (currentWatchListItem === null && !isWaitingForVideoPage) {
        setWaitingForVideoPage(true);

        return null;
    }

    if (isVideoPage && currentVideoSlug !== previousVideoSlug) {
        setPreviousVideoSlug(currentVideoSlug);
        const watchListVideoSlug = currentWatchListItem ? getVideoSlugByWatchListItem(currentWatchListItem) : null;
        if (currentVideoSlug !== watchListVideoSlug) {
            const { anime, themeIndex, entryIndex, videoIndex }: VideoPageProps = pageProps;
            const video = anime.themes[themeIndex].entries[entryIndex].videos[videoIndex];

            const watchList: WatchListItem[] = createDefaultWatchList(pageProps);
            setWatchList(watchList);
            setWatchListFactory(null);
            setCurrentWatchListItemId(watchList.find((item) => item.video.id === video.id)?.watchListId ?? null);
            setIsWatchListUsingLocalAutoPlay(false);
        }

        return null;
    }

    const Container = isFullWidthPage ? StyledFullWidthContainer : StyledContainer;

    return (
        <MultiContextProvider
            providers={[
                stackContext(ThemeProvider, { theme }),
                stackContext(FullscreenContext.Provider, { value: { isFullscreen, toggleFullscreen } }),
                stackContext(ColorThemeContext.Provider, { value: { colorTheme, setColorTheme } }),
                stackContext(PlayerContext.Provider, {
                    value: {
                        watchList,
                        setWatchList: (watchList, useLocalAutoPlay = false) => {
                            setWatchList(watchList);
                            setIsWatchListUsingLocalAutoPlay(useLocalAutoPlay);
                            if (useLocalAutoPlay) {
                                setLocalAutoPlay(true);
                            }
                        },
                        watchListFactory,
                        setWatchListFactory: (factory) => setWatchListFactory(() => factory),
                        currentWatchListItem,
                        setCurrentWatchListItem: (watchListItem) => {
                            setCurrentWatchListItemId(watchListItem?.watchListId ?? null);
                            if (
                                watchListFactory &&
                                watchList.findIndex((item) => item.watchListId === watchListItem?.watchListId) ===
                                    watchList.length - 1
                            ) {
                                watchListFactory().then((nextWatchList) => {
                                    setWatchList([...watchList, ...nextWatchList]);
                                });
                            }
                        },
                        addWatchListItem: (video, entry) => {
                            setWatchList((watchList) => [...watchList, createWatchListItem(video, entry)]);
                        },
                        addWatchListItemNext: (video, entry) => {
                            const currentIndex = currentWatchListItem
                                ? watchList.findIndex((item) => item.watchListId === currentWatchListItem.watchListId)
                                : 0;

                            setWatchList((watchList) => [
                                ...watchList.slice(0, currentIndex + 1),
                                createWatchListItem(video, entry),
                                ...watchList.slice(currentIndex + 1),
                            ]);
                        },
                        clearWatchList: () => {
                            setWatchList([]);
                            setWatchListFactory(null);
                            setCurrentWatchListItemId(null);
                            setIsWatchListUsingLocalAutoPlay(false);
                            setPreviousVideoSlug(null);
                        },
                        isGlobalAutoPlay,
                        setGlobalAutoPlay,
                        isLocalAutoPlay,
                        setLocalAutoPlay,
                        isWatchListUsingLocalAutoPlay,
                        isRepeat,
                        setRepeat,
                    },
                }),
                stackContext(QueryClientProvider, { client: queryClient }),
                stackContext(ApolloProvider, { client }),
                stackContext(ToastProvider, {}),
                stackContext(LazyMotion, { features: () => import("utils/motionFeatures").then((res) => res.default) }),
                stackContext(ErrorBoundary, {}),
            ]}
        >
            <GlobalStyle />
            <SEO />
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href={withBasePath("/apple-touch-icon.png")} />
                <link rel="icon" type="image/png" sizes="32x32" href={withBasePath("/favicon-32x32.png")} />
                <link rel="icon" type="image/png" sizes="16x16" href={withBasePath("/favicon-16x16.png")} />
                <link rel="mask-icon" href={withBasePath("/safari-pinned-tab.svg")} color="#ffffff" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="theme-color" content="#1c1823" />
            </Head>
            <StyledWrapper>
                {!isFullWidthPage ? <Navigation /> : null}
                {!isVideoPage ? (
                    <>
                        <Container>
                            {!!pageProps.year && (
                                <Column style={{ "--gap": "16px" }}>
                                    <YearNavigation {...pageProps} />
                                    <SeasonNavigation {...pageProps} />
                                </Column>
                            )}
                            {pageProps.isSearch && <SearchNavigation />}
                            {STAGING ? (
                                <Card $color="text-warning">
                                    <Text as="p">
                                        <strong>WARNING</strong>: This version of the website is for testing purposes
                                        only. Some pages or functions might not work.
                                    </Text>
                                    <Text as="p">
                                        <ExternalLink href={`https://animethemes.moe${router.asPath}`}>
                                            CLICK HERE TO GO BACK TO THE NORMAL SITE
                                        </ExternalLink>
                                    </Text>
                                </Card>
                            ) : null}
                            <Component {...pageProps} />
                            {lastBuildAt && <PageRevalidation lastBuildAt={lastBuildAt} apiRequests={apiRequests} />}
                        </Container>
                        <Footer />
                    </>
                ) : null}
                {/*{currentWatchListItem && !isWaitingForVideoPage && (*/}
                {/*    <VideoPlayer*/}
                {/*        watchListItem={currentWatchListItem}*/}
                {/*        background={!isVideoPage}*/}
                {/*        overlay={isVideoPage ? <VideoPlayerOverlay {...pageProps} /> : null}*/}
                {/*    >*/}
                {/*        {isVideoPage ? <Component {...pageProps} /> : null}*/}
                {/*    </VideoPlayer>*/}
                {/*)}*/}
            </StyledWrapper>
            <ToastHub />
        </MultiContextProvider>
    );
}

type StackContext = (children: ReactNode) => ReactNode;

function stackContext<P>(Provider: ComponentType<P>, props: Omit<P, "children">): StackContext {
    return function StackContext(children) {
        return <Provider {...(props as P)}>{children}</Provider>;
    };
}

interface MultiContextProviderProps {
    providers: Array<StackContext>;
    children: ReactNode;
}

function MultiContextProvider({ providers = [], children }: MultiContextProviderProps) {
    const stack = providers.reduce((previousValue, stackContext) => stackContext(previousValue), children);

    return <>{stack}</>;
}

function createDefaultWatchList(pageProps: VideoPageProps): WatchListItem[] {
    const { anime, themeIndex, entryIndex, videoIndex }: VideoPageProps = pageProps;

    return anime.themes
        .flatMap((theme, index) => {
            const entry = themeIndex == index ? theme.entries[entryIndex] : theme.entries[0];
            const video = themeIndex == index ? entry?.videos[videoIndex] : entry?.videos[0];

            if (!entry || !video || theme.group?.slug !== anime.themes[themeIndex].group?.slug) {
                return [];
            }

            return [{ theme, entry, video }];
        })
        .sort(sortTransformed(either(themeTypeComparator).or(themeIndexComparator).chain(), (value) => value.theme))
        .map(({ theme, entry, video }) => createWatchListItem(video, { ...entry, theme }));
}
