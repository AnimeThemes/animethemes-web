import { FeaturedThemePreview } from "utils/settings";
import styled, { keyframes } from "styled-components";
import theme from "theme";
import { ThemeSummaryCard } from "components/card";
import extractImages from "utils/extractImages";
import { useEffect, useState } from "react";
import useSetting from "hooks/useSetting";
import useCompatability from "hooks/useCompatability";
import { fetchRandomGrill } from "lib/client/randomGrill";
import createVideoSlug from "utils/createVideoSlug";
import Link from "next/link";
import { VIDEO_URL } from "utils/config";
import gql from "graphql-tag";
import type { FeaturedThemeThemeFragment } from "generated/graphql";

const slowPan = keyframes`
    from {
        object-position: top;
    }
    50% {
        object-position: bottom;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(10%);
    }
`;

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 200px;
    
    position: relative;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        margin-inline-start: -16px;
        margin-inline-end: -16px;
        margin-bottom: 32px;
    }
`;

const StyledOverflowHidden = styled.a`
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        border-radius: 0;
    }
`;

const StyledCenter = styled.div`
    position: absolute;
    
    width: 400px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        width: auto;
        left: 16px;
        right: 16px;
        bottom: 0;
        transform: translateY(50%);
    }
`;

const StyledVideo = styled.video`
    width: 100%;
    filter: blur(5px);
    background-color: ${theme.colors["solid-on-card"]};
`;

const StyledCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    animation: ${slowPan} 60s ease-in-out infinite;
`;

const StyledGrillContainer = styled.div`
    position: absolute;
    
    height: 130%;
    bottom: 0;
    right: 32px;
    overflow: hidden;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        right: 0;
    }
`;

const StyledGrill = styled.img`
    max-width: 300px;
    height: 100%;
    object-fit: contain;
    object-position: bottom;
    animation: ${slideIn} 2s 2s backwards cubic-bezier(0.34, 1.56, 0.64, 1);
    
    transition: transform 1s;
    transform: translateY(10%);
    
    &:hover {
        transform: none;
    }
`;

const Box = styled.div``;

interface FeaturedThemeProps {
    theme: FeaturedThemeThemeFragment
}

export function FeaturedTheme({ theme }: FeaturedThemeProps) {
    const [ grill, setGrill ] = useState<string | null>(null);
    const [ featuredThemePreview ] = useSetting(FeaturedThemePreview);

    useEffect(() => {
        fetchRandomGrill().then(setGrill);
    }, []);

    const FeaturedThemeWrapper = featuredThemePreview !== FeaturedThemePreview.DISABLED
        ? StyledWrapper
        : Box;

    const featuredThemeSummaryCard = featuredThemePreview !== FeaturedThemePreview.DISABLED
        ? (
            <StyledCenter>
                <ThemeSummaryCard theme={theme}/>
            </StyledCenter>
        )
        : (
            <ThemeSummaryCard theme={theme}/>
        );

    return (
        <FeaturedThemeWrapper>
            <FeaturedThemeBackground theme={theme}/>
            {featuredThemePreview !== FeaturedThemePreview.DISABLED && grill && (
                <StyledGrillContainer>
                    <StyledGrill src={grill}/>
                </StyledGrillContainer>
            )}
            {featuredThemeSummaryCard}
        </FeaturedThemeWrapper>
    );
}

function FeaturedThemeBackground({ theme }: FeaturedThemeProps) {
    const [ featuredThemePreview ] = useSetting(FeaturedThemePreview);
    const { canPlayVideo } = useCompatability();
    const [ fallbackToCover, setFallbackToCover ] = useState(false);
    const { smallCover: featuredCover } = extractImages(theme.anime);

    if (!theme.anime || !theme.entries.length) {
        return null;
    }

    const entry = theme.entries[0];

    if (!entry.videos.length) {
        return null;
    }

    const video = entry.videos[0];
    const videoSlug = createVideoSlug(theme, entry, video);

    const linkProps = {
        href: `/anime/${theme.anime.slug}/${videoSlug}`,
        passHref: true,
    };

    if (featuredThemePreview === FeaturedThemePreview.VIDEO && canPlayVideo && !fallbackToCover) {
        return (
            <Link {...linkProps} legacyBehavior>
                <StyledOverflowHidden>
                    <StyledVideo
                        autoPlay
                        muted
                        loop
                        onError={() => setFallbackToCover(true)}
                    >
                        <source
                            src={`${VIDEO_URL}/${video.basename}`}
                            type={`video/webm; codecs="vp8, vp9, opus`}
                        />
                    </StyledVideo>
                </StyledOverflowHidden>
            </Link>
        );
    } else if (featuredThemePreview !== FeaturedThemePreview.DISABLED) {
        return (
            <Link {...linkProps} legacyBehavior>
                <StyledOverflowHidden>
                    <StyledCover src={featuredCover}/>
                </StyledOverflowHidden>
            </Link>
        );
    }

    return null;
}

FeaturedTheme.fragments = {
    theme: gql`
        ${ThemeSummaryCard.fragments.theme}
        ${extractImages.fragments.resourceWithImages}
        
        fragment FeaturedThemeTheme on Theme {
            ...ThemeSummaryCardTheme
            anime {
                ...extractImagesResourceWithImages
            }
            entries {
                videos {
                    basename
                }
            }
        }
    `
};
