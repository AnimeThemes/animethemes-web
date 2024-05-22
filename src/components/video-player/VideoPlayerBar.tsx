import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";

import { faBackwardStep, faForwardStep, faListMusic, faPause, faPlay, faXmark } from "@fortawesome/pro-solid-svg-icons";

import { Column } from "@/components/box/Flex";
import { Solid } from "@/components/box/Solid";
import { IconTextButton } from "@/components/button/IconTextButton";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { ShareMenu } from "@/components/menu/ShareMenu";
import { Text } from "@/components/text/Text";
import { ConditionalWrapper } from "@/components/utils/ConditionalWrapper";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { ProgressBar } from "@/components/video-player/ProgressBar";
import { VideoPlayerContext } from "@/components/video-player/VideoPlayer";
import { VolumeControl } from "@/components/video-player/VolumeControl";
import PlayerContext from "@/context/playerContext";
import theme from "@/theme";

const StyledPlayerBar = styled(Solid)`
    position: relative;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 16px;
    align-items: center;

    padding: 10px 32px;

    transition: opacity 100ms;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        grid-template-columns: 1fr auto;

        padding: 8px 16px;
    }

    [data-fullscreen] & {
        position: fixed;
        inset: auto 0 0 0;
        background-color: rgba(46, 41, 58, 0.8);
    }

    [data-fullscreen] [data-relaxed] & {
        opacity: 0;
        transition: opacity 500ms;
    }
`;

const StyledPlayerBarControls = styled.div`
    display: flex;
    gap: 16px;
    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        & > :first-child, & > :last-child {
            display: none;
        }
    }
`;

const StyledPlayerBarControl = styled(IconTextButton)`
    font-size: 2rem;
`;

const StyledPlayerBarActions = styled.div`
    align-self: stretch;
    
    display: flex;
    gap: 16px;
    align-items: center;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        display: none;
    }
`;

const StyledVolumeControl = styled(VolumeControl)`
    margin-right: auto;
`;

export function VideoPlayerBar() {
    const context = useContext(VideoPlayerContext);

    if (!context) {
        throw new Error("VideoPlayerBar needs to be inside VideoPlayer!");
    }

    const {
        video,
        background,
        videoPagePath,
        previousVideoPath,
        playPreviousTrack,
        nextVideoPath,
        playNextTrack,
        isPlaying,
        togglePlay,
        videoUrl,
        audioUrl,
    } = context;

    const entry = video.entries[0];
    const theme = entry.theme;
    const anime = theme.anime;

    const { clearWatchList } = useContext(PlayerContext);

    return (
        <StyledPlayerBar>
            <Column style={{ "--gap": "8px" }}>
                <Text color="text-muted" maxLines={1}>
                    <SongTitle song={theme.song} href={videoPagePath} />
                    <Text variant="small"> - </Text>
                    <Text weight={600}>{theme.type}{theme.sequence || null}{theme.group && ` (${theme.group.name})`}</Text>
                    <Text variant="small"> from </Text>
                    <Link href={`/anime/${anime.slug}`} passHref legacyBehavior>
                        <Text as="a" link>{anime.name}</Text>
                    </Link>
                </Text>
                {!!theme.song?.performances?.length && (
                    <Text variant="small" color="text-muted" maxLines={1}>
                        <Text>Performed</Text>
                        <Performances song={theme.song} maxPerformances={3} />
                    </Text>
                )}
            </Column>
            <StyledPlayerBarControls>
                {previousVideoPath ? (
                    <ConditionalWrapper
                        condition={!background}
                        wrap={(children) => <Link href={previousVideoPath}>{children}</Link>}
                    >
                        <StyledPlayerBarControl
                            icon={faBackwardStep}
                            isCircle
                            onClick={() => playPreviousTrack(!background)}
                        />
                    </ConditionalWrapper>
                ) : (
                    <StyledPlayerBarControl
                        icon={faBackwardStep}
                        isCircle
                        disabled
                    />
                )}
                <StyledPlayerBarControl
                    icon={isPlaying ? faPause :  <Icon icon={faPlay} color="text-disabled" style={{ transform: "translateX(2px)" }} />}
                    isCircle
                    onClick={togglePlay}
                />
                {nextVideoPath ? (
                    <ConditionalWrapper
                        condition={!background}
                        wrap={(children) => <Link href={nextVideoPath}>{children}</Link>}
                    >
                        <StyledPlayerBarControl
                            icon={faForwardStep}
                            isCircle
                            onClick={() => playNextTrack(!background)}
                        />
                    </ConditionalWrapper>
                ) : (
                    <StyledPlayerBarControl
                        icon={faForwardStep}
                        isCircle
                        disabled
                    />
                )}
            </StyledPlayerBarControls>
            <StyledPlayerBarActions>
                <StyledVolumeControl />
                <PlaylistTrackAddDialog
                    video={{
                        // Flip the structure on it's head,
                        // because we need video as the root object here.
                        ...video,
                        entries: [{
                            ...entry,
                            theme,
                        }],
                    }}
                    trigger={
                        <IconTextButton icon={faListMusic} variant="solid" collapsible="socialListMax">Add to Playlist</IconTextButton>
                    }
                />
                <ShareMenu pagePath={videoPagePath} videoUrl={videoUrl} audioUrl={audioUrl} />
                <IconTextButton
                    icon={faXmark}
                    isCircle
                    disabled={!background}
                    onClick={() => clearWatchList()}
                />
            </StyledPlayerBarActions>
            <ProgressBar />
        </StyledPlayerBar>
    );
}