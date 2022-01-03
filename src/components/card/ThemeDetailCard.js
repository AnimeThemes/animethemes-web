import {
    StyledHeader,
    StyledRow,
    StyledSequence,
    StyledThemeCard,
    StyledVersion,
    StyledVideoList,
    StyledVideoListContainer
} from "./ThemeDetailCard.style";
import { VideoButton } from "components/button";
import { SongTitleWithArtists, ThemeEntryTags } from "components/utils";
import { Text } from "components/text";
import { ThemeMenu } from "components/menu";

export function ThemeDetailCard({ theme }) {
    return (
        <StyledThemeCard>
            <StyledRow>
                <StyledSequence>{theme.slug}</StyledSequence>
                <StyledHeader>
                    <SongTitleWithArtists song={theme.song}/>
                </StyledHeader>
                <ThemeMenu theme={theme}/>
            </StyledRow>
            {theme.entries.map(entry => (
                <StyledVersion key={entry.version || 0}>
                    <StyledRow>
                        <StyledSequence secondary>{!!entry.version && `v${entry.version}`}</StyledSequence>
                        <Text color="text-muted">
                            <ThemeEntryTags entry={entry}/>
                        </Text>
                    </StyledRow>
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
                                        variant="on-card"
                                    />
                                ))}
                            </StyledVideoList>
                        </StyledVideoListContainer>
                    )}
                </StyledVersion>
            ))}
        </StyledThemeCard>
    );
}
