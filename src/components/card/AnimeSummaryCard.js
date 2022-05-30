import { Fragment } from "react";
import Link from "next/link";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import useImage from "hooks/useImage";
import { Icon } from "components/icon";
import { SummaryCard } from "components/card";
import styled from "styled-components";
import useToggle from "hooks/useToggle";
import theme from "theme";
import gql from "graphql-tag";
import { uniq } from "lodash-es";
import { Collapse } from "components/utils";
import { ThemeTable } from "components/table";
import useMediaQuery from "hooks/useMediaQuery";

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
                                <ThemeTable themes={anime.themes.filter((theme) => theme.group === group)}/>
                            </Fragment>
                        ))}
                    </StyledThemeGroupContainer>
                </Collapse>
            )}
        </StyledWrapper>
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
            themes {
                group
            }
        }
    `,
    expandable: gql`
        ${ThemeTable.fragments.theme}

        fragment AnimeSummaryCard_anime_expandable on Anime {
            themes {
                ...ThemeTable_theme
                group
            }
        }
    `
};
