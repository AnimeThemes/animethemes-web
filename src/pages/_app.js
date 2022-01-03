import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/global";
import theme from "theme";
import { Box, Flex } from "components/box";
import { Container } from "components/container";
import { Footer } from "components/footer";
import { Navigation, SearchNavigation, SeasonNavigation, YearNavigation } from "components/navigation";
import ColorThemeContext from "context/colorThemeContext";
import useColorTheme from "hooks/useColorTheme";
import { VideoPlayer } from "components/video-player";
import PlayerContext from "context/playerContext";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "styles/prism.scss";
import Head from "next/head";
import withBasePath from "utils/withBasePath";
import { SEO } from "components/seo";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AnnouncementToast } from "components/toast";
import { WatchHistoryProvider } from "context/watchHistoryContext";
import { LocalPlaylistProvider } from "context/localPlaylistContext";

config.autoAddCss = false;

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
    const [colorTheme, toggleColorTheme] = useColorTheme();

    const { video, entry, theme: animeTheme, anime } = pageProps;

    const [ currentVideo, setCurrentVideo ] = useState(video);
    const [ currentEntry, setCurrentEntry ] = useState(entry);

    useEffect(() => {
        if (video && entry) {
            setCurrentVideo(video);
            setCurrentEntry({
                ...entry,
                // FIXME: Horrible hack
                theme: {
                    ...animeTheme,
                    anime
                }
            });
        }
    }, [ video, entry, animeTheme, anime ]);

    return (
        <MultiContextProvider providers={[
            [ ThemeProvider, { theme } ],
            [ ColorThemeContext.Provider, { value: { colorTheme, toggleColorTheme } } ],
            [ PlayerContext.Provider, { value: { currentVideo, setCurrentVideo } } ],
            [ QueryClientProvider, { client: queryClient } ],
            [ WatchHistoryProvider ],
            [ LocalPlaylistProvider ]
        ]}>
            <GlobalStyle/>
            <SEO/>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href={withBasePath("/apple-touch-icon.png")}/>
                <link rel="icon" type="image/png" sizes="32x32" href={withBasePath("/favicon-32x32.png")}/>
                <link rel="icon" type="image/png" sizes="16x16" href={withBasePath("/favicon-16x16.png")}/>
                <link rel="manifest" href={withBasePath("/site.webmanifest")}/>
                <link rel="mask-icon" href={withBasePath("/safari-pinned-tab.svg")} color="#ffffff"/>
                <meta name="msapplication-TileColor" content="#ffffff"/>
                <meta name="theme-color" content="#1c1823"/>
            </Head>
            <Flex flexDirection="column" minHeight="100%">
                <Navigation offsetToggleButton={!!currentVideo && !video}/>
                {currentVideo && (
                    <VideoPlayer
                        video={currentVideo}
                        entry={currentEntry}
                        background={!video}
                    />
                )}
                <Container mb="2rem">
                    {!!pageProps.year && (
                        <Box gapsColumn="1rem" mb="1.5rem">
                            <YearNavigation year={pageProps.year} yearList={pageProps.yearList} />
                            <SeasonNavigation year={pageProps.year} season={pageProps.season} seasonList={pageProps.seasonList} />
                        </Box>
                    )}
                    {pageProps.isSearch && (
                        <Box mb="1.5rem">
                            <SearchNavigation/>
                        </Box>
                    )}
                    <Component {...pageProps}/>
                </Container>
                <Footer/>
            </Flex>
            <AnnouncementToast/>
        </MultiContextProvider>
    );
}

function MultiContextProvider({ providers = [], children }) {
    return providers.reduce((previousValue, [ Provider, props = {} ]) => (
        <Provider {...props}>
            {previousValue}
        </Provider>
    ), children);
}
