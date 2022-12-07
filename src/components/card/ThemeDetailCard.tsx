import { VideoButton } from "components/button";
import { Performances, SongTitle } from "components/utils";
import { Text } from "components/text";
import { ThemeMenu } from "components/menu";
import { ThemeEntryTags } from "components/tag/ThemeEntryTags";
import { VideoTags } from "components/tag/VideoTags";
import gql from "graphql-tag";
import type { ThemeDetailCardThemeFragment } from "generated/graphql";
import styled from "styled-components";
import { Card } from "components/card/Card";
import theme from "theme";
import { Row } from "components/box";
import { entryVersionComparator } from "utils/comparators";

const StyledThemeCard = styled(Card)`
    display: flex;
    flex-direction: column;
    
    gap: 1rem;
`;

const StyledRow = styled.div`
    display: grid;
    grid-template-columns: 2rem 1fr auto;
    align-items: baseline;
    
    grid-gap: 1rem;
`;

const StyledVideoListContainer = styled.div`
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-column: 1 / -1;
    }
`;

const StyledVideoList = styled(Row)`
    flex-wrap: wrap;
    gap: 0.75rem;
    
    @media (min-width: 721px) {
        justify-content: flex-end;
    }
`;

interface ThemeDetailCardProps {
    theme: ThemeDetailCardThemeFragment
}

export function ThemeDetailCard({ theme }: ThemeDetailCardProps) {
    const { anime } = theme;

    if (!anime) {
        return null;
    }

    return (
        <StyledThemeCard>
            <StyledRow>
                <Text variant="small" color="text">{theme.type}{theme.sequence || null}</Text>
                <Text>
                    <SongTitle song={theme.song}/>
                    <Performances song={theme.song} expandable/>
                </Text>
                <ThemeMenu theme={theme}/>
            </StyledRow>
            {theme.entries.sort(entryVersionComparator).map(entry => (
                <StyledRow key={entry.version || 0}>
                    <Text variant="small" color="text-muted">{!!entry.version && `v${entry.version}`}</Text>
                    <Text color="text-muted">
                        <ThemeEntryTags entry={entry}/>
                    </Text>
                    <StyledVideoListContainer>
                        {!!entry.videos && (
                            <StyledVideoList>
                                {entry.videos.map((video, index) => (
                                    <VideoButton
                                        key={index}
                                        anime={anime}
                                        theme={theme}
                                        entry={entry}
                                        video={video}
                                    />
                                ))}
                            </StyledVideoList>
                        )}
                    </StyledVideoListContainer>
                </StyledRow>
            ))}
        </StyledThemeCard>
    );
}

ThemeDetailCard.fragments = {
    theme: gql`
        ${ThemeMenu.fragments.theme}
        ${VideoTags.fragments.video}
        
        fragment ThemeDetailCardTheme on Theme {
            ...ThemeMenuTheme
            slug
            type
            sequence
            group
            anime {
                slug
                name
            }
            song {
                title
                performances {
                    as
                    artist {
                        slug
                        name
                    }
                }
            }
            entries {
                version
                episodes
                spoiler
                nsfw
                videos {
                    ...VideoTagsVideo
                    filename
                    tags
                }
            }
        }
    `
};
