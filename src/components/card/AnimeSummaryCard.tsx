import { Fragment } from "react";
import styled from "styled-components";

import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";
import { uniqBy } from "lodash-es";

import { Button } from "@/components/button/Button";
import { SummaryCard } from "@/components/card/SummaryCard";
import { Icon } from "@/components/icon/Icon";
import { ThemeTable } from "@/components/table/ThemeTable";
import { Text } from "@/components/text/Text";
import { TextLink } from "@/components/text/TextLink";
import { Collapse } from "@/components/utils/Collapse";
import type { AnimeSummaryCardAnimeExpandableFragment, AnimeSummaryCardAnimeFragment } from "@/generated/graphql";
import useMediaQuery from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";
import theme from "@/theme";
import extractImages from "@/utils/extractImages";

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

type AnimeSummaryCardProps = {
    anime: AnimeSummaryCardAnimeFragment
    expandable?: false
} | {
    anime: AnimeSummaryCardAnimeFragment & AnimeSummaryCardAnimeExpandableFragment
    expandable: true
};

export function AnimeSummaryCard({ anime, expandable = false, ...props }: AnimeSummaryCardProps) {
    const [isExpanded, toggleExpanded] = useToggle();
    const { smallCover } = extractImages(anime);
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.mobileMax})`);

    const groups = uniqBy(anime.themes.map((theme) => theme.group), (group) => group?.slug);

    const animeLink = `/anime/${anime.slug}`;

    let premiere = String(anime.year);
    let premiereLink = `/year/${anime.year}`;
    if (anime.season) {
        premiere = anime.season + " " + premiere;
        premiereLink += `/${anime.season.toLowerCase()}`;
    }

    const description = (
        <SummaryCard.Description>
            <span>{anime.media_format ?? "Anime"}</span>
            {!!anime.year && (
                <TextLink href={premiereLink}>
                    {premiere}
                </TextLink>
            )}
            <span>{anime.themes.length} themes</span>
        </SummaryCard.Description>
    );

    function handleToggleExpand(event: MouseEvent) {
        if (event.target instanceof HTMLAnchorElement && event.target.href) {
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
                    </StyledThemeContainerInline>
                )}
            </SummaryCard>
            {expandable ? (
                <Collapse collapse={!isExpanded}>
                    <StyledThemeGroupContainer>
                        {groups.map((group) => (
                            <Fragment key={group?.slug}>
                                {!!group && (
                                    <Text variant="h2">{group.name}</Text>
                                )}
                                <ThemeTable themes={(anime as AnimeSummaryCardAnimeExpandableFragment).themes.filter((theme) => theme.group?.slug === group?.slug)}/>
                            </Fragment>
                        ))}
                    </StyledThemeGroupContainer>
                </Collapse>
            ) : null}
        </StyledWrapper>
    );
}

AnimeSummaryCard.fragments = {
    anime: gql`
        ${extractImages.fragments.resourceWithImages}
        
        fragment AnimeSummaryCardAnime on Anime {
            ...extractImagesResourceWithImages
            slug
            name
            year
            season
            media_format
            themes {
                group {
                    name
                    slug
                }
            }
        }
    `,
    expandable: gql`
        ${ThemeTable.fragments.theme}

        fragment AnimeSummaryCardAnimeExpandable on Anime {
            themes {
                ...ThemeTableTheme
                group {
                    name
                    slug
                }
            }
        }
    `
};
