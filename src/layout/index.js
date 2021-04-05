import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import GlobalStyle from "styles/global";
import theme from "theme";
import { Navigation, SeasonNavigation, YearNavigation } from "components/navigation";
import { Container } from "components/container";
import { VideoPlayer } from "components/video-player";
import PlayerContext from "context/playerContext";
import { SEO } from "components/seo";
import ColorThemeContext from "context/colorThemeContext";
import useColorTheme from "hooks/useColorTheme";
import { Box, Flex } from "components/box";
import { darkColors } from "theme/colors/dark";
import { Footer } from "components/footer";

export default function Layout({ children, data, pageContext }) {
    const video = data ? data.video : null;
    const entry = data ? data.entry : null;

    const [ currentVideo, setCurrentVideo ] = useState(video);
    const [ currentEntry, setCurrentEntry ] = useState(entry);
    const [ colorTheme, toggleColorTheme ] = useColorTheme();

    useEffect(() => {
        if (video && entry) {
            setCurrentVideo(video);
            setCurrentEntry(entry);
        }
    }, [ video, entry ]);

    return (
        <ThemeProvider theme={theme}>
            <ColorThemeContext.Provider value={{ colorTheme, toggleColorTheme }}>
                <PlayerContext.Provider value={{ currentVideo, setCurrentVideo }}>
                    <SEO />
                    <Helmet>
                        <meta name="theme-color" content={darkColors["background"]}/>
                        <link rel="preconnect" href="https://fonts.gstatic.com"/>
                        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>
                    </Helmet>
                    <GlobalStyle/>
                    <Flex flexDirection="column" minHeight="100vh">
                        <Navigation/>
                        {currentVideo && (
                            <VideoPlayer
                                video={currentVideo}
                                entry={currentEntry}
                                background={!video}
                            />
                        )}
                        <Container mb="2rem">
                            {!!pageContext.year && (
                                <Box gapsColumn="1rem" mb="1.5rem">
                                    <YearNavigation year={pageContext.year} />
                                    <SeasonNavigation year={pageContext.year} season={pageContext.season} seasonList={pageContext.seasonList} />
                                </Box>
                            )}
                            {children}
                        </Container>
                        <Footer/>
                    </Flex>
                </PlayerContext.Provider>
            </ColorThemeContext.Provider>
        </ThemeProvider>
    );
}
