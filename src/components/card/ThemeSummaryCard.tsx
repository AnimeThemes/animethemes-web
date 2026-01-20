import type { MouseEvent, PropsWithChildren } from "react";
import styled from "styled-components";
import Link from "next/link";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import useMediaQuery from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";
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

const fragments = {
    theme: graphql(`
        fragment ThemeSummaryCardTheme on AnimeTheme {
            ...createVideoSlugTheme
            ...ThemeMenuTheme
            type
            sequence
            group {
                name
                slug
            }
            anime {
                slug
                name
                images {
                    nodes {
                        ...extractImagesImage
                    }
                }
            }
            song {
                ...SongTitleSong
                ...PerformancesSong
                performances {
                    alias
                    as
                    artist {
                        __typename
                        ... on Artist {
                            slug
                            name
                        }
                        ... on Membership {
                            group {
                                slug
                                name
                            }
                        }
                    }
                }
            }
            animethemeentries {
                ...createVideoSlugEntry
                videos {
                    nodes {
                        ...createVideoSlugVideo
                    }
                }
            }
        }
    `),
    artist: graphql(`
        fragment ThemeSummaryCardArtist on Artist {
            ...PerformancesArtist
            slug
        }
    `),
    expandable: graphql(`
        fragment ThemeSummaryCardThemeExpandable on AnimeTheme {
            ...ThemeTableTheme
        }
    `),
};

const useIsMobile = () => useMediaQuery(`(max-width: ${theme.breakpoints.mobileMax})`);

interface ThemeSummaryCardProps {
    theme: FragmentType<typeof fragments.theme>;
    artist?: FragmentType<typeof fragments.artist>;
    expandable?: FragmentType<typeof fragments.expandable>;
    onPlay?(entryIndex?: number, videoIndex?: number): void;
}

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function ThemeSummaryCard({
    theme: themeFragment,
    artist: artistFragment,
    children,
    expandable: expandableFragment,
    onPlay,
    ...props
}: PropsWithChildren<ThemeSummaryCardProps>) {
    const theme = getFragmentData(fragments.theme, themeFragment);
    const ownerArtist = artistFragment ? getFragmentData(fragments.artist, artistFragment) : undefined;
    const expandable = expandableFragment ? getFragmentData(fragments.expandable, expandableFragment) : undefined;

    const [isExpanded, toggleExpanded] = useToggle();
    const isMobile = useIsMobile();

    const anime = theme.anime;
    const entry = theme.animethemeentries[0];
    const video = entry?.videos.nodes[0];

    if (!anime || !entry || !video) {
        return null;
    }

    const { smallCover } = extractImages(anime.images.nodes);
    const videoSlug = createVideoSlug(theme, entry, video);
    const href = `/anime/${anime.slug}/${videoSlug}`;

    function handleToggleExpand(event: MouseEvent, filterLinks = false) {
        if (filterLinks && isLink(event.target)) {
            return;
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
            <SummaryCard {...props}>
                <Link href={href} onClick={() => onPlay?.()}>
                    <SummaryCard.Cover src={smallCover} />
                </Link>
                <SummaryCard.Body onClick={(event) => handleToggleExpand(event, true)}>
                    <SummaryCard.Title>
                        <SongTitle song={theme.song} href={href} onClick={() => onPlay?.()} />
                        <Performances song={theme.song} artist={ownerArtist} />
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
                <StyledOverlayButtons>
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
                            themes={[expandable]}
                            onPlay={(_, entryIndex, videoIndex) => onPlay?.(entryIndex, videoIndex)}
                        />
                        {(theme.song?.performances.length ?? 0) > (ownerArtist ? 1 : 0) && (
                            <Table style={{ "--columns": "1fr" }}>
                                <TableHead>
                                    <TableHeadCell>Performed {ownerArtist ? "With" : "By"}</TableHeadCell>
                                </TableHead>
                                <TableBody>
                                    {theme.song?.performances
                                        ?.map((performance) => ({
                                            artist:
                                                performance.artist.__typename === "Artist"
                                                    ? performance.artist
                                                    : performance.artist.group,
                                            performance,
                                        }))
                                        .filter(({ artist }) => artist.slug !== ownerArtist?.slug)
                                        .sort(({ artist: a }, { artist: b }) => a.name.localeCompare(b.name))
                                        .map(({ artist, performance }) => (
                                            <TableRow key={artist.slug} as={Link} href={`/artist/${artist.slug}`}>
                                                <TableCell>
                                                    <Text color="text-primary" weight="600">
                                                        {getDisplayedArtistName({ ...performance, artist })}
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
