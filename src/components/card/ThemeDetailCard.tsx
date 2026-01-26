import styled from "styled-components";

import { Row } from "@/components/box/Flex";
import { VideoButton } from "@/components/button/VideoButton";
import { Card } from "@/components/card/Card";
import { ThemeMenu } from "@/components/menu/ThemeMenu";
import { ThemeEntryTags } from "@/components/tag/ThemeEntryTags";
import { Text } from "@/components/text/Text";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import theme from "@/theme";
import { entryVersionComparator } from "@/utils/comparators";

const StyledThemeCard = styled(Card)`
    display: flex;
    flex-direction: column;

    gap: 1rem;
`;

const StyledRow = styled.div`
    display: grid;
    grid-template-columns: 4ch 1fr auto;
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

const fragments = {
    theme: graphql(`
        fragment ThemeDetailCardTheme on AnimeTheme {
            ...ThemeMenuTheme
            ...VideoButtonTheme
            type
            sequence
            group {
                name
                slug
            }
            anime {
                ...VideoButtonAnime
                slug
                name
            }
            song {
                ...SongTitleSong
                ...PerformancesSong
            }
            animethemeentries {
                ...ThemeEntryTagsEntry
                ...VideoButtonEntry
                version
                videos {
                    nodes {
                        ...VideoButtonVideo
                        filename
                        tags
                    }
                }
            }
        }
    `),
};

interface ThemeDetailCardProps {
    theme: FragmentType<typeof fragments.theme>;
}

export function ThemeDetailCard({ theme: themeFragment }: ThemeDetailCardProps) {
    const theme = getFragmentData(fragments.theme, themeFragment);
    const { anime } = theme;

    if (!anime) {
        return null;
    }

    return (
        <StyledThemeCard>
            <StyledRow>
                <Text variant="small" color="text">
                    {theme.type}
                    {theme.sequence || null}
                </Text>
                <Text>
                    <SongTitle song={theme.song} />
                    <Performances song={theme.song} expandable />
                </Text>
                <ThemeMenu theme={theme} />
            </StyledRow>
            {[...theme.animethemeentries].sort(entryVersionComparator).map((entry) => (
                <StyledRow key={entry.version ?? 0}>
                    <Text variant="small" color="text-muted">
                        v{entry.version ?? 1}
                    </Text>
                    <Text color="text-muted">
                        <ThemeEntryTags entry={entry} />
                    </Text>
                    <StyledVideoListContainer>
                        {!!entry.videos && (
                            <StyledVideoList>
                                {entry.videos.nodes.map((video, index) => (
                                    <VideoButton key={index} anime={anime} theme={theme} entry={entry} video={video} />
                                ))}
                            </StyledVideoList>
                        )}
                    </StyledVideoListContainer>
                </StyledRow>
            ))}
        </StyledThemeCard>
    );
}
