import { type ForwardedRef, forwardRef, type ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";

import { faPlay } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";

import { SummaryCard } from "@/components/card/SummaryCard2";
import { Icon } from "@/components/icon/Icon";
import { TextLink } from "@/components/text/TextLink";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import type { VideoSummaryCardEntryFragment, VideoSummaryCardVideoFragment } from "@/generated/graphql";
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

interface VideoSummaryCardProps {
    video: VideoSummaryCardVideoFragment;
    entry: VideoSummaryCardEntryFragment;
    menu?: ReactNode;
    append?: ReactNode;
    onPlay?(): void;
    isPlaying?: boolean;
}

export const VideoSummaryCard = forwardRef(function VideoSummaryCard(
    { video, entry, menu, append, onPlay, isPlaying, ...props }: VideoSummaryCardProps,
    ref: ForwardedRef<HTMLDivElement>,
) {
    const theme = entry.theme;
    const anime = theme?.anime;

    if (!entry || !theme || !anime) {
        return null;
    }

    const { smallCover } = extractImages(anime);
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
                        <SongTitle song={theme.song} as={Link} href={href} onClick={onPlay} />
                        <Performances song={theme.song} />
                    </SummaryCard.Title>
                    <SummaryCard.Description>
                        <span>
                            {videoSlug}
                            {theme.group && ` (${theme.group.name})`}
                        </span>
                        <TextLink href={`/anime/${anime.slug}`}>{anime.name}</TextLink>
                    </SummaryCard.Description>
                </SummaryCard.Body>
                {menu ? (
                    <StyledOverlayButtons onClick={(event) => event.stopPropagation()}>{menu}</StyledOverlayButtons>
                ) : null}
                {append}
            </SummaryCard>
        </StyledWrapper>
    );
});

export const VideoSummaryCardFragmentVideo = gql`
    ${createVideoSlug.fragments.video}

    fragment VideoSummaryCardVideo on Video {
        id
        basename
        ...createVideoSlugVideo
        audio {
            basename
        }
    }
`;

export const VideoSummaryCardFragmentEntry = gql`
    ${SongTitleWithArtists.fragments.song}
    ${extractImages.fragments.resourceWithImages}
    ${createVideoSlug.fragments.theme}
    ${createVideoSlug.fragments.entry}

    fragment VideoSummaryCardEntry on Entry {
        ...createVideoSlugEntry
        id
        theme {
            ...createVideoSlugTheme
            id
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
        }
    }
`;
