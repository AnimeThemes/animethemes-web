import Link from "next/link";
import { Collapse, SongTitleWithArtists } from "components/utils";
import { Text } from "components/text";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { SummaryCard } from "components/card";
import { ThemeMenu } from "components/menu";
import gql from "graphql-tag";
import { fetchDataClient } from "lib/client";
import { Icon } from "components/icon";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import useToggle from "hooks/useToggle";
import styled from "styled-components";
import { Table, ThemeTable } from "components/table";
import theme from "theme";
import useMediaQuery from "hooks/useMediaQuery";

const StyledWrapper = styled.div`
    position: relative
`;

const StyledOverlayButtons = styled.div`
    position: absolute;
    right: 16px;
    opacity: 0;
    transition-property: opacity;

    ${StyledWrapper}:hover & {
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

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function ThemeSummaryCard({ theme, artist, children, expandable = false, ...props }) {
    const [isExpanded, toggleExpanded] = useToggle();
    const { smallCover } = useImage(theme.anime);
    const isMobile = useIsMobile();

    if (!theme.entries.length) {
        return null;
    }

    const entry = theme.entries[0];

    if (!entry.videos.length) {
        return null;
    }

    const video = entry.videos[0];
    const videoSlug = createVideoSlug(theme, entry, video);
    const to = `/anime/${theme.anime.slug}/${videoSlug}`;

    const description = (
        <SummaryCard.Description>
            <span>Theme</span>
            <span>{theme.type}{theme.sequence || null}{theme.group && ` (${theme.group})`}</span>
            <Link href={`/anime/${theme.anime.slug}`} passHref prefetch={false}>
                <Text as="a" link>{theme.anime.name}</Text>
            </Link>
        </SummaryCard.Description>
    );

    function handleToggleExpand(event) {
        if (event.target.href) {
            event.stopPropagation();
        } else if (expandable && !isMobile) {
            toggleExpanded();
        }
    }

    return (
        <StyledWrapper>
            <SummaryCard
                title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to} artist={artist}/>}
                description={description}
                image={smallCover}
                to={to}
                onClick={handleToggleExpand}
                {...props}
            >
                {children}
                <StyledOverlayButtons onClick={(event) => event.stopPropagation()}>
                    <ThemeMenu theme={theme}/>
                    {expandable && (
                        <StyledExpandButton
                            forwardedAs="a"
                            variant="silent"
                            isCircle
                            title={isExpanded ? "Collapse" : "Expand"}
                            onClick={handleToggleExpand}
                        >
                            <Icon icon={faChevronDown} rotation={isExpanded ? 180 : 0} transition="transform 400ms"/>
                        </StyledExpandButton>
                    )}
                </StyledOverlayButtons>
            </SummaryCard>
            {expandable && (
                <Collapse collapse={!isExpanded}>
                    <StyledPerformedWith>
                        <ThemeTable themes={[theme]}/>
                        {theme.song?.performances?.length > (artist ? 1 : 0) && (
                            <Table style={{ "--columns": "1fr" }}>
                                <Table.Head>
                                    <Table.HeadCell>Performed {artist ? "With" : "By"}</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {theme.song?.performances
                                        ?.filter((performance) => performance.artist.slug !== artist?.slug)
                                        .sort((a, b) => a.artist.name.localeCompare(b.artist.name))
                                        .map((performance) => (
                                            <Link key={performance.artist.slug} href={`/artist/${performance.artist.slug}`} passHref prefetch={false}>
                                                <Table.Row as="a">
                                                    <Table.Cell>
                                                        <Text color="text-primary" weight="600">
                                                            {performance.as ? `${performance.as} (CV: ${performance.artist.name})` : performance.artist.name}
                                                        </Text>
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Link>
                                        ))}
                                </Table.Body>
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
        ${useImage.fragment}
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        ${ThemeMenu.fragment}

        fragment ThemeSummaryCard_theme on Theme {
            ...createVideoSlug_theme
            ...ThemeMenu_theme
            slug
            type
            sequence
            group
            anime {
                ...useImage_resourceWithImages
                slug
                name
            }
            song {
                ...SongTitleWithArtists_song
            }
            entries {
                ...createVideoSlug_entry
                videos {
                    ...createVideoSlug_video
                }
            }
        }
    `,
    artist: gql`
        ${SongTitleWithArtists.fragments.artist}
        
        fragment ThemeSummaryCard_artist on Artist {
            ...SongTitleWithArtists_artist
        }
    `,
    expandable: gql`
        ${ThemeTable.fragments.theme}

        fragment ThemeSummaryCard_theme_expandable on Theme {
            ...ThemeTable_theme
        }
    `
};

ThemeSummaryCard.fetchData = async function (id) {
    return fetchDataClient(gql`
        ${ThemeSummaryCard.fragments.theme}

        query($themeId: Int!) {
            theme(id: $themeId) {
                ...ThemeSummaryCard_theme
                anime {
                    year
                    season
                }
            }
        }
    `, { themeId: id }).then((result) => result.data?.theme);
};
