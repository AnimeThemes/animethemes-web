import { type ReactNode, type Ref } from "react";
import styled from "styled-components";
import Link from "next/link";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { SummaryCard } from "@/components/card/SummaryCard2";
import { Icon } from "@/components/icon/Icon";
import { TextLink } from "@/components/text/TextLink";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
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

const StyledCoverLink = styled(Link)`
    position: relative;
`;

const StyledCoverOverlay = styled.div`
    position: absolute;
    inset: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.5);
`;

export const VIDEO_SUMMARY_CARD_VIDEO = graphql(`
    fragment VideoSummaryCardVideo on Video {
        id
        basename
        ...createVideoSlugVideo
    }
`);

export const VIDEO_SUMMARY_CARD_ENTRY = graphql(`
    fragment VideoSummaryCardEntry on Entry {
        ...createVideoSlugEntry
        id
    }
`);

export const VIDEO_SUMMARY_CARD_THEME = graphql(`
    fragment VideoSummaryCardTheme on Theme {
        ...createVideoSlugTheme
        id
        type
        sequence
        group {
            name
            slug
        }
        anime {
            slug
            title {
                romaji
            }
            images {
                nodes {
                    ...extractImagesImage
                }
            }
        }
        song {
            ...SongTitleSong
            ...PerformancesSong
        }
    }
`);

interface VideoSummaryCardProps {
    ref?: Ref<HTMLDivElement>;
    video: FragmentType<typeof VIDEO_SUMMARY_CARD_VIDEO>;
    entry: FragmentType<typeof VIDEO_SUMMARY_CARD_ENTRY>;
    theme: FragmentType<typeof VIDEO_SUMMARY_CARD_THEME>;
    menu?: ReactNode;
    append?: ReactNode;
    onPlay?(): void;
    isPlaying?: boolean;
}

export function VideoSummaryCard({
    ref,
    video: videoFragment,
    entry: entryFragment,
    theme: themeFragment,
    menu,
    append,
    onPlay,
    isPlaying,
    ...props
}: VideoSummaryCardProps) {
    const video = getFragmentData(VIDEO_SUMMARY_CARD_VIDEO, videoFragment);
    const entry = getFragmentData(VIDEO_SUMMARY_CARD_ENTRY, entryFragment);
    const theme = getFragmentData(VIDEO_SUMMARY_CARD_THEME, themeFragment);
    const anime = theme.anime;

    const { smallCover } = extractImages(anime.images.nodes);
    const videoSlug = createVideoSlug(theme, entry, video);
    const href = `/anime/${anime.slug}/${videoSlug}`;

    return (
        <StyledWrapper ref={ref}>
            <SummaryCard {...props}>
                <StyledCoverLink href={href} onClick={onPlay}>
                    <SummaryCard.Cover src={smallCover} />
                    {isPlaying ? (
                        <StyledCoverOverlay>
                            <Icon icon={faPlay} />
                        </StyledCoverOverlay>
                    ) : null}
                </StyledCoverLink>
                <SummaryCard.Body>
                    <SummaryCard.Title>
                        <SongTitle song={theme.song} href={href} onClick={onPlay} />
                        <Performances song={theme.song} />
                    </SummaryCard.Title>
                    <SummaryCard.Description>
                        <span>
                            {videoSlug}
                            {theme.group && ` (${theme.group.name})`}
                        </span>
                        <TextLink href={`/anime/${anime.slug}`}>{anime.title.romaji}</TextLink>
                    </SummaryCard.Description>
                </SummaryCard.Body>
                {menu !== null ? <StyledOverlayButtons>{menu}</StyledOverlayButtons> : null}
                {append}
            </SummaryCard>
        </StyledWrapper>
    );
}
