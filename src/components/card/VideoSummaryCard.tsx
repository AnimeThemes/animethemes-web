import { type ReactNode, type Ref } from "react";
import styled from "styled-components";
import Link from "next/link";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { SummaryCard } from "@/components/card/SummaryCard2";
import { Icon } from "@/components/icon/Icon";
import { VideoMenu } from "@/components/menu/VideoMenu";
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

const fragments = {
    video: graphql(`
        fragment VideoSummaryCardVideo on Video {
            id
            basename
            ...createVideoSlugVideo
            ...VideoMenuVideo
        }
    `),
    entry: graphql(`
        fragment VideoSummaryCardEntry on AnimeThemeEntry {
            ...createVideoSlugEntry
            ...VideoMenuEntry
            id
            animetheme {
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
                }
            }
        }
    `),
};

interface VideoSummaryCardProps {
    ref?: Ref<HTMLDivElement>;
    video: FragmentType<typeof fragments.video>;
    entry: FragmentType<typeof fragments.entry>;
    menu?: ReactNode;
    append?: ReactNode;
    onPlay?(): void;
    isPlaying?: boolean;
}

export function VideoSummaryCard({
    ref,
    video: videoFragment,
    entry: entryFragment,
    menu,
    append,
    onPlay,
    isPlaying,
    ...props
}: VideoSummaryCardProps) {
    const video = getFragmentData(fragments.video, videoFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);
    const theme = entry.animetheme;
    const anime = theme?.anime;

    if (!entry || !theme || !anime) {
        return null;
    }

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
                        <TextLink href={`/anime/${anime.slug}`}>{anime.name}</TextLink>
                    </SummaryCard.Description>
                </SummaryCard.Body>
                {menu !== null ? (
                    <StyledOverlayButtons>{menu ?? <VideoMenu entry={entry} video={video} />}</StyledOverlayButtons>
                ) : null}
                {append}
            </SummaryCard>
        </StyledWrapper>
    );
}
