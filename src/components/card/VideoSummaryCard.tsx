import { SongTitleWithArtists } from "components/utils";
import extractImages from "utils/extractImages";
import createVideoSlug from "utils/createVideoSlug";
import { SummaryCard } from "components/card";
import gql from "graphql-tag";
import styled from "styled-components";
import theme from "theme";
import type { VideoSummaryCardVideoFragment } from "generated/graphql";
import type { ReactNode } from "react";
import { TextLink } from "components/text/TextLink";

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

interface VideoSummaryCardProps {
    video: VideoSummaryCardVideoFragment;
    children?: ReactNode;
    menu?: ReactNode;
}

export function VideoSummaryCard({ video, children, menu, ...props }: VideoSummaryCardProps) {
    const entry = video.entries[0];
    const theme = entry.theme;
    const anime = theme?.anime;

    if (!entry || !theme || !anime) {
        return null;
    }

    const { smallCover } = extractImages(anime);
    const videoSlug = createVideoSlug(theme, entry, video);
    const to = `/anime/${anime.slug}/${videoSlug}`;

    const description = (
        <SummaryCard.Description>
            <span>Video</span>
            <span>{videoSlug}{theme.group && ` (${theme.group})`}</span>
            <TextLink href={`/anime/${anime.slug}`}>{anime.name}</TextLink>
        </SummaryCard.Description>
    );

    return (
        <StyledWrapper>
            <SummaryCard
                title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to} />}
                description={description}
                image={smallCover}
                to={to}
                {...props}
            >
                {children}
                {menu ? (
                    <StyledOverlayButtons onClick={(event) => event.stopPropagation()}>
                        {menu}
                    </StyledOverlayButtons>
                ) : null}
            </SummaryCard>
        </StyledWrapper>
    );
}

VideoSummaryCard.fragments = {
    video: gql`
        ${SongTitleWithArtists.fragments.song}
        ${extractImages.fragments.resourceWithImages}
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}

        fragment VideoSummaryCardVideo on Video {
            ...createVideoSlugVideo
            entries {
                ...createVideoSlugEntry
                theme {
                    ...createVideoSlugTheme
                    slug
                    type
                    sequence
                    group
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
        }
    `,
};
