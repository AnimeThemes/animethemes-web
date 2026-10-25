import type { MouseEvent } from "react";
import styled from "styled-components";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../icon/Icon";
import { SongStaffTable } from "../table/SongStaffTable";
import { Collapse } from "../utils/Collapse";
import { StyledExpandButton, StyledPerformedWith, StyledWrapper, useIsMobile } from "./ThemeSummaryCard";
import { Row } from "@/components/box/Flex";
import { VideoButton } from "@/components/button/VideoButton";
import { Card } from "@/components/card/Card";
import { ThemeMenu } from "@/components/menu/ThemeMenu";
import { ThemeEntryTags } from "@/components/tag/ThemeEntryTags";
import { Text } from "@/components/text/Text";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import useToggle from "@/hooks/useToggle";
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

const StyledButtons = styled.div`
    position: static;
    opacity: 1;
`;

export const THEME_DETAIL_CARD_THEME = graphql(`
    fragment ThemeDetailCardTheme on Theme {
        ...ThemeMenuTheme
        ...VideoButtonTheme
        id
        type
        sequence
        group {
            id
            name
            slug
        }
        anime {
            ...VideoButtonAnime
            slug
            title {
                romaji
            }
        }
        song {
            ...SongTitleSong
            ...StaffSong
            staff {
                ...SongStaffTableStaff
            }
        }
        entries {
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
`);

interface ThemeDetailCardProps {
    theme: FragmentType<typeof THEME_DETAIL_CARD_THEME>;
}

export function ThemeDetailCard({ theme: themeFragment }: ThemeDetailCardProps) {
    const theme = getFragmentData(THEME_DETAIL_CARD_THEME, themeFragment);
    const { anime } = theme;

    const [isExpanded, toggleExpanded] = useToggle();
    const isMobile = useIsMobile();

    if (!anime) {
        return null;
    }

    const isExpandable = theme.song?.staff !== undefined && theme.song.staff.length > 0;

    function handleToggleExpand(event: MouseEvent, filterLinks = false) {
        if (filterLinks && isLink(event.target)) {
            return;
        } else if (isExpandable && !isMobile) {
            toggleExpanded();
        }
    }

    function isLink(element: EventTarget | null): boolean {
        if (!element || !(element instanceof HTMLElement)) {
            return false;
        } else if (element instanceof HTMLAnchorElement && element.href) {
            return true;
        }
        return isLink(element.parentElement);
    }

    return (
        <StyledWrapper>
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
                    <StyledButtons>
                        <ThemeMenu theme={theme} />
                        {isExpandable && (
                            <StyledExpandButton
                                variant="silent"
                                isCircle
                                title={isExpanded ? "Collapse" : "Expand"}
                                onClick={handleToggleExpand}
                            >
                                <Icon
                                    icon={faChevronDown}
                                    className={isExpanded ? "fa-rotate-180" : undefined}
                                    style={{ transition: "transform 400ms" }}
                                />
                            </StyledExpandButton>
                        )}
                    </StyledButtons>
                </StyledRow>
                {[...theme.entries].sort(entryVersionComparator).map((entry) => (
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
            <Collapse collapse={!isExpanded}>
                <StyledPerformedWith>
                    {theme.song?.staff && (
                        <SongStaffTable staffs={theme.song.staff} />
                    )}
                </StyledPerformedWith>
            </Collapse>
        </StyledWrapper>
    );
}
