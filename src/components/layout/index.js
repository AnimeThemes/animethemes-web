import React, {useEffect, useState} from "react";
import {ThemeProvider} from "styled-components";
import {Helmet} from "react-helmet";
import GlobalStyle from "styles/global";
import theme from "theme";
import Navigation from "components/navigation";
import Container from "components/container";
import VideoPlayer from "components/videoPlayer";
import PlayerContext from "context/playerContext";
import SEO from "components/seo";

export default function Layout({ children, data }) {
    const video = data ? data.video : null;
    const [ currentVideo, setCurrentVideo ] = useState(video);

    useEffect(() => {
        if (video) {
            setCurrentVideo(video);
        }
    }, [ video ]);

    return (
        <ThemeProvider theme={theme}>
            <PlayerContext.Provider value={{ currentVideo, setCurrentVideo }}>
                <SEO />
                <Helmet>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:wght@400,700&display=swap" rel="stylesheet"/>
                </Helmet>
                <GlobalStyle/>
                <Navigation/>
                <Container>
                    {currentVideo && (
                        <VideoPlayer
                            video={currentVideo}
                            background={!video}
                        />
                    )}
                    {children}
                </Container>
            </PlayerContext.Provider>
        </ThemeProvider>
    );
}
