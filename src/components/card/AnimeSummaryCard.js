import { Fragment } from "react";
import Link from "next/link";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { Icon } from "components/icon";
import { SummaryCard } from "components/card";
import { chain, themeIndexComparator, themeTypeComparator } from "utils/comparators";
import styled from "styled-components";
import useToggle from "hooks/useToggle";
import theme from "theme";
import gql from "graphql-tag";
import { uniq } from "lodash-es";
import { Collapse, SongTitle, ThemeEntryTags, VideoTags } from "components/utils";
import { Table } from "components/table";
import useMediaQuery from "hooks/useMediaQuery";
import { ContentWarningTags, EpisodeTag } from "components/tag";
import { Row } from "components/box";

const StyledWrapper = styled.div`
    position: relative
`;

const StyledThemeContainerInline = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    position: absolute;
    right: 16px;
    opacity: 0;
    transition-property: opacity;
    
    user-select: none;

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

const StyledThemeGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 8px;
`;

export function AnimeSummaryCard({ anime, previewThemes = false, expandable = false, ...props }) {
    const [isExpanded, toggleExpanded] = useToggle();
    const { smallCover } = useImage(anime);
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.mobileMax})`);

    const groups = uniq(anime.themes.map((theme) => theme.group));

    const animeLink = `/anime/${anime.slug}`;

    let premiere = String(anime.year);
    let premiereLink = `/year/${anime.year}`;
    if (anime.season) {
        premiere = anime.season + " " + premiere;
        premiereLink += `/${anime.season.toLowerCase()}`;
    }

    let description = (
        <SummaryCard.Description>
            <span>Anime</span>
            {!!anime.year && (
                <Link href={premiereLink} passHref prefetch={false}>
                    <Text as="a" link>{premiere}</Text>
                </Link>
            )}
            <span>{anime.themes.length} themes</span>
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
                title={anime.name}
                description={description}
                image={smallCover}
                to={animeLink}
                onClick={handleToggleExpand}
                {...props}
            >
                {/* TODO: Remove the following line once the context menu is there. */}
                {expandable && (
                    <StyledThemeContainerInline onClick={(event) => event.stopPropagation()}>
                        {/* TODO: Context Menu */}
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
                    </StyledThemeContainerInline>
                )}
            </SummaryCard>
            {expandable && (
                <Collapse collapse={!isExpanded}>
                    <StyledThemeGroupContainer>
                        {groups.map((group) => (
                            <Fragment key={group}>
                                {!!group && (
                                    <Text variant="h2">{group}</Text>
                                )}
                                <ThemesTable anime={anime} group={group}/>
                            </Fragment>
                        ))}
                    </StyledThemeGroupContainer>
                </Collapse>
            )}
        </StyledWrapper>
    );
}

function ThemesTable({ anime, group = null }) {
    const rows = anime.themes
        .filter((theme) => theme.group === group && "entries" in theme && theme.entries.length && theme.entries[0].videos.length)
        .sort(chain(themeTypeComparator, themeIndexComparator))
        .map((theme) => theme.entries.map((entry, entryIndex) => entry.videos.map((video, videoIndex) => {
            const videoSlug = createVideoSlug(theme, entry, video);

            return (
                <Link key={anime.slug + videoSlug} href={`/anime/${anime.slug}/${videoSlug}`} passHref prefetch={false}>
                    <Table.Row as="a">
                        <Table.Cell>
                            {!videoIndex && (
                                entry.version > 1 ? (
                                    <Text variant="small" color="text-muted">{theme.type}{theme.sequence || null} v{entry.version}</Text>
                                ) : (
                                    <Text variant="small">{theme.type}{theme.sequence || null}</Text>
                                )
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {(!entryIndex && !videoIndex) && (
                                <SongTitle song={theme.song}/>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {!videoIndex && (
                                <EpisodeTag entry={entry}/>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {!videoIndex && (
                                <Row wrap style={{ "--gap": "8px", "--align-items": "baseline" }}>
                                    <ContentWarningTags entry={entry}/>
                                </Row>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            <VideoTags video={video}/>
                        </Table.Cell>
                    </Table.Row>
                </Link>
            );
        })));

    return (
        <Table style={{ "--columns": "42px 3fr 2fr 2fr 2fr" }}>
            <Table.Head>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Song Title</Table.HeadCell>
                <Table.HeadCell>Episode Count</Table.HeadCell>
                <Table.HeadCell>Content Warning</Table.HeadCell>
                <Table.HeadCell>Notes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    );
}

AnimeSummaryCard.fragments = {
    anime: gql`
        ${useImage.fragment}
        
        fragment AnimeSummaryCard_anime on Anime {
            ...useImage_resourceWithImages
            slug
            name
            year
            season
        }
    `,
    previewThemes: gql`
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}

        fragment AnimeSummaryCard_anime_previewThemes on Anime {
            themes {
                ...createVideoSlug_theme
                slug
                group
                type
                sequence
                entries {
                    ...createVideoSlug_entry
                    videos {
                        ...createVideoSlug_video
                    }
                }
            }
        }
    `,
    expandable: gql`
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        ${VideoTags.fragment}
        ${ThemeEntryTags.fragment}

        fragment AnimeSummaryCard_anime_expandable on Anime {
            themes {
                ...createVideoSlug_theme
                slug
                group
                type
                sequence
                entries {
                    ...createVideoSlug_entry
                    ...ThemeEntryTags_entry
                    version
                    videos {
                        ...createVideoSlug_video
                        ...VideoTags_video
                    }
                }
                song {
                    title
                }
            }
        }
    `
};
