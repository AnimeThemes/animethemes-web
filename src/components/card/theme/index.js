import React from "react";
import {
    StyledHeader,
    StyledRow,
    StyledSequence,
    StyledThemeCard,
    StyledVersion,
    StyledVideoList,
    StyledVideoListContainer
} from "./style";
import Elevator from "components/elevator";
import VideoButton from "components/button/video";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import ThemeEntryTags from "components/utils/themeEntryTags";
import Text from "components/text";

export default function ThemeCard({ theme }) {
    return (
        <StyledThemeCard>
            <Elevator>
                <StyledRow>
                    <StyledSequence small>{theme.slug}</StyledSequence>
                    <StyledHeader>
                        <Text bold>
                            <SongTitleWithArtists song={theme.song}/>
                        </Text>
                    </StyledHeader>
                </StyledRow>
                {theme.entries.map(entry => (
                    <StyledRow key={entry.version || 0}>
                        <StyledSequence small secondary>{!!entry.version && `v${entry.version}`}</StyledSequence>
                        <StyledVersion>
                            <ThemeEntryTags entry={entry}/>
                            {!!entry.videos && (
                                <StyledVideoListContainer>
                                    <StyledVideoList>
                                        {entry.videos.map((video, index) => (
                                            <VideoButton
                                                key={index}
                                                anime={theme.anime}
                                                theme={theme}
                                                entry={entry}
                                                video={video}
                                            />
                                        ))}
                                    </StyledVideoList>
                                </StyledVideoListContainer>
                            )}
                        </StyledVersion>
                    </StyledRow>
                ))}
            </Elevator>
        </StyledThemeCard>
    );
}
