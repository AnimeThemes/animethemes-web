import type { MouseEvent, PropsWithChildren } from "react";
import styled from "styled-components";
import Link from "next/link";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";

import { Button } from "@/components/button/Button";
import { SummaryCard } from "@/components/card/SummaryCard2";
import { Icon } from "@/components/icon/Icon";
import { ThemeMenu } from "@/components/menu/ThemeMenu";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/table/Table";
import { ThemeTable } from "@/components/table/ThemeTable";
import { Text } from "@/components/text/Text";
import { TextLink } from "@/components/text/TextLink";
import { Collapse } from "@/components/utils/Collapse";
import { getDisplayedArtistName, Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import type {
    ThemeSummaryCardArtistFragment,
    ThemeSummaryCardQuery,
    ThemeSummaryCardThemeExpandableFragment,
    ThemeSummaryCardThemeFragment,
} from "@/generated/graphql";
import useMediaQuery from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";
import { fetchDataClient } from "@/lib/client";
import theme from "@/theme";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";

const StyledWrapper = styled.div`
    position: relative;
`;

const StyledOverlayButtons = styled.div`
    position: absolute;
    right: 16px;
    opacity: 0;
    transition-property: opacity;

    ${StyledWrapper}:hover &, &:has([data-state="open"]) {
        position: static;
        opacity: 1;
        transition-duration: 250ms;
    }

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        position: static;
        opacity: 1;
    }
`;

const StyledExpandButton = styled(Button)`
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

const StyledPerformedWith = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`;

const useIsMobile = () => useMediaQuery(`(max-width: ${theme.breakpoints.mobileMax})`);

type ThemeSummaryCardProps =
    | {
          theme: ThemeSummaryCardThemeFragment;
          artist?: ThemeSummaryCardArtistFragment;
          expandable?: false;
          onPlay?(entryIndex?: number, videoIndex?: number): void;
      }
    | {
          theme: ThemeSummaryCardThemeFragment & ThemeSummaryCardThemeExpandableFragment;
          artist?: ThemeSummaryCardArtistFragment;
          expandable: true;
          onPlay?(entryIndex?: number, videoIndex?: number): void;
      };

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function ThemeSummaryCard({
    theme,
    artist,
    children,
    expandable,
    onPlay,
    ...props
}: PropsWithChildren<ThemeSummaryCardProps>) {
    const [isExpanded, toggleExpanded] = useToggle();
    const isMobile = useIsMobile();

    const anime = theme.anime;
    const entry = theme.entries[0];
    const video = entry?.videos[0];

    if (!anime || !entry || !video) {
        return null;
    }

    const { smallCover } = extractImages(anime);
    const videoSlug = createVideoSlug(theme, entry, video);
    const href = `/anime/${anime.slug}/${videoSlug}`;

    function handleToggleExpand(event: MouseEvent) {
        if (isLink(event.target)) {
            event.stopPropagation();
        } else if (expandable && !isMobile) {
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
            <SummaryCard onClick={handleToggleExpand} {...props}>
                <Link href={href} onClick={() => onPlay?.()}>
                    <SummaryCard.Cover src={smallCover} />
                </Link>
                <SummaryCard.Body>
                    <SummaryCard.Title>
                        <SongTitle song={theme.song} href={href} onClick={() => onPlay?.()} />
                        <Performances song={theme.song} artist={artist} />
                    </SummaryCard.Title>
                    <SummaryCard.Description>
                        <span>
                            {theme.type}
                            {theme.sequence || null}
                            {theme.group && ` (${theme.group.name})`}
                        </span>
                        <TextLink href={`/anime/${anime.slug}`}>{anime.name}</TextLink>
                    </SummaryCard.Description>
                </SummaryCard.Body>
                {children}
                <StyledOverlayButtons onClick={(event) => event.stopPropagation()}>
                    <ThemeMenu theme={theme} />
                    {expandable && (
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
                </StyledOverlayButtons>
            </SummaryCard>
            {expandable && (
                <Collapse collapse={!isExpanded}>
                    <StyledPerformedWith>
                        <ThemeTable
                            themes={[theme]}
                            onPlay={(_, entryIndex, videoIndex) => onPlay?.(entryIndex, videoIndex)}
                        />
                        {(theme.song?.performances.length ?? 0) > (artist ? 1 : 0) && (
                            <Table style={{ "--columns": "1fr" }}>
                                <TableHead>
                                    <TableHeadCell>Performed {artist ? "With" : "By"}</TableHeadCell>
                                </TableHead>
                                <TableBody>
                                    {theme.song?.performances
                                        ?.filter((performance) => performance.artist.slug !== artist?.slug)
                                        .sort((a, b) => a.artist.name.localeCompare(b.artist.name))
                                        .map((performance) => (
                                            <TableRow
                                                key={performance.artist.slug}
                                                as={Link}
                                                href={`/artist/${performance.artist.slug}`}
                                            >
                                                <TableCell>
                                                    <Text color="text-primary" weight="600">
                                                        {getDisplayedArtistName(performance)}
                                                    </Text>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        )}
                    </StyledPerformedWith>
                </Collapse>
            )}
        </StyledWrapper>
    );
}

ThemeSummaryCard.fragments = {
    theme: gql`
        ${SongTitleWithArtists.fragments.song}
        ${extractImages.fragments.resourceWithImages}
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        ${ThemeMenu.fragments.theme}

        fragment ThemeSummaryCardTheme on Theme {
            ...createVideoSlugTheme
            ...ThemeMenuTheme
            type
            sequence
            group {
                name
                slug
            }
            anime {
                ...extractImagesResourceWithImages
                slug
                name
            }
            song {
                ...SongTitleWithArtistsSong
            }
            entries {
                ...createVideoSlugEntry
                videos {
                    ...createVideoSlugVideo
                }
            }
        }
    `,
    artist: gql`
        ${SongTitleWithArtists.fragments.artist}

        fragment ThemeSummaryCardArtist on Artist {
            ...SongTitleWithArtistsArtist
        }
    `,
    expandable: gql`
        ${ThemeTable.fragments.theme}

        fragment ThemeSummaryCardThemeExpandable on Theme {
            ...ThemeTableTheme
        }
    `,
};

export type FetchThemeSummaryCardData = ThemeSummaryCardQuery["theme"] | null;

export const fetchThemeSummaryCardData = async function (id: number): Promise<FetchThemeSummaryCardData> {
    return fetchDataClient<ThemeSummaryCardQuery, { themeId: number }>(
        gql`
            ${ThemeSummaryCard.fragments.theme}

            query ThemeSummaryCard($themeId: Int!) {
                theme(id: $themeId) {
                    ...ThemeSummaryCardTheme
                    anime {
                        year
                        season
                    }
                }
            }
        `,
        { themeId: id },
    ).then((result) => result.data?.theme ?? null);
};
