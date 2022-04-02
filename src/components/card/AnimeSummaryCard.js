import { Fragment } from "react";
import Link from "next/link";
import { faChevronDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { Icon } from "components/icon";
import { SummaryCard } from "components/card";
import { chain, themeIndexComparator, themeTypeComparator } from "utils/comparators";
import styled, { css } from "styled-components";
import useToggle from "hooks/useToggle";
import theme from "theme";
import gql from "graphql-tag";
import { uniq } from "lodash-es";
import { Collapse, ThemeEntryTags, VideoTags } from "components/utils";
import { withHover } from "styles/mixins";

const StyledThemeContainerInline = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    user-select: none;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

const StyledThemeGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
`;

const StyledThemeRow = styled.a`
    display: grid;
    grid-template-columns: 56px 2fr 1fr 1fr;
    grid-gap: 8px;
    align-items: baseline;
    padding: 8px 4px;
    
    &:not(:last-of-type) {
        border-bottom: 1px solid ${theme.colors["text-disabled"]};   
    }
    
    ${withHover(css`
        background-color: ${theme.colors["solid"]};
    `)}
`;

export function AnimeSummaryCard({ anime, previewThemes = false, expandable = false, ...props }) {
    const { smallCover } = useImage(anime);
    const [ showAllThemes, toggleShowAllThemes ] = useToggle();

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
                <Link href={premiereLink} passHref>
                    <Text as="a" link>{premiere}</Text>
                </Link>
            )}
            <span>{anime.themes.length} themes</span>
        </SummaryCard.Description>
    );

    return (
        <div>
            <SummaryCard
                title={anime.name}
                description={description}
                image={smallCover}
                to={animeLink}
                {...props}
            >
                {(previewThemes || expandable) && (
                    <StyledThemeContainerInline>
                        {previewThemes && !showAllThemes && (
                            <ThemesInline anime={anime} maxThemes={previewThemes === true ? 2 : previewThemes}/>
                        )}
                        {expandable && (
                            <Button as="a" variant="silent" isCircle title="Show all themes" onClick={toggleShowAllThemes}>
                                <Icon icon={faChevronDown} rotation={showAllThemes ? 180 : 0} transition="transform 400ms"/>
                            </Button>
                        )}
                    </StyledThemeContainerInline>
                )}
            </SummaryCard>
            {expandable && (
                <Collapse collapse={!showAllThemes}>
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
        </div>
    );
}

function ThemesInline({ anime, maxThemes }) {
    return anime.themes
        .filter((theme) => "entries" in theme && theme.entries.length && theme.entries[0].videos.length)
        .sort(chain(themeIndexComparator, themeTypeComparator))
        .slice(0, maxThemes)
        .map((theme) => {
            const entry = theme.entries[0];
            const video = entry.videos[0];
            const videoSlug = createVideoSlug(theme, entry, video);

            return (
                <Link key={theme.slug + theme.group} href={`/anime/${anime.slug}/${videoSlug}`} passHref>
                    <Button as="a">
                        <Button as="span" variant="primary" isCircle>
                            <Icon icon={faPlay}/>
                        </Button>
                        {theme.slug}
                    </Button>
                </Link>
            );
        });
}

function ThemesTable({ anime, group = null }) {
    const rows = anime.themes
        .filter((theme) => theme.group === group && "entries" in theme && theme.entries.length && theme.entries[0].videos.length)
        .sort(chain(themeTypeComparator, themeIndexComparator))
        .map((theme) => theme.entries.map((entry, entryIndex) => entry.videos.map((video, videoIndex) => {
            const videoSlug = createVideoSlug(theme, entry, video);

            return (
                <Link key={theme.slug + theme.group} href={`/anime/${anime.slug}/${videoSlug}`} passHref>
                    <StyledThemeRow>
                        {!videoIndex ? (
                            entry.version > 1 ? (
                                <Text variant="small" color="text-muted">{theme.type}{theme.sequence || null} v{entry.version}</Text>
                            ) : (
                                <Text variant="small">{theme.type}{theme.sequence || null}</Text>
                            )
                        ) : (
                            <span/>
                        )}
                        {(!entryIndex && !videoIndex) ? (
                            <Text link>{!entryIndex && !videoIndex && theme.song.title}</Text>
                        ) : (
                            <span/>
                        )}
                        {!videoIndex ? (
                            <ThemeEntryTags entry={entry}/>
                        ) : (
                            <span/>
                        )}
                        <VideoTags video={video}/>
                    </StyledThemeRow>
                </Link>
            );
        })));

    return (
        <div>
            {rows}
        </div>
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
