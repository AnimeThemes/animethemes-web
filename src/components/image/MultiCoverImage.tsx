import type { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";

import gql from "graphql-tag";

import { LogoPlaceholder } from "@/components/image/LogoPlaceholder";
import { AspectRatio } from "@/components/utils/AspectRatio";
import type { MultiCoverImageResourceWithImagesFragment } from "@/generated/graphql";
import extractImages from "@/utils/extractImages";

function getTranslationX(item: number, itemCount: number) {
    switch (itemCount) {
        case 4:
            switch (item) {
                case 1: return -33;
                case 2: return -16.5;
                case 3: return 16.5;
                case 4: return 33;
            }
            break;
        case 3:
            switch (item) {
                case 1: return -25;
                case 2: return 0;
                case 3: return 25;
            }
            break;
    }
    return 0;
}

const StyledCoverContainer = styled.div`
    position: relative;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
    isolation: isolate;
`;
const StyledCoverItemContainer = styled.div<{ $itemCount: number }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    ${(props) => props.$itemCount > 1 && css`
        &:nth-child(1) {
            --translate-x: ${getTranslationX(1, props.$itemCount)}%;
            clip-path: polygon(
                0 0, 
                calc(100% / (${props.$itemCount} - 1)) 0, 
                0 100%, 
                0 100%
            );
        }

        &:nth-child(2) {
            --translate-x: ${getTranslationX(2, props.$itemCount)}%;
            clip-path: polygon(
                calc(100% / (${props.$itemCount} - 1)) 0, 
                calc(100% / (${props.$itemCount} - 1) * 2) 0, 
                calc(100% / (${props.$itemCount} - 1)) 100%, 
                0 100%
            );
        }

        &:nth-child(3) {
            --translate-x: ${getTranslationX(3, props.$itemCount)}%;
            clip-path: polygon(
                calc(100% / (${props.$itemCount} - 1) * 2) 0, 
                100% 0, 
                calc(100% / (${props.$itemCount} - 1) * 2) 100%, 
                calc(100% / (${props.$itemCount} - 1)) 100%
            );
        }

        &:nth-child(4) {
            --translate-x: ${getTranslationX(4, props.$itemCount)}%;
            clip-path: polygon(
                100% 0, 
                100% 0, 
                100% 100%, 
                calc(100% / (${props.$itemCount} - 1) * 2) 100%
            );
        }

        &:hover {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transition: clip-path 250ms;
            z-index: 2;
        }

        &:not(:hover) {
            transition: clip-path 500ms, z-index 1000ms;
            z-index: 0;
        }
    `}
`;
const StyledCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background-size: cover;
    background-position: center;
    transition: transform 500ms;
    transform: translateX(var(--translate-x));
    
    &:hover {
        transition: transform 250ms;
        transform: scale(1.1);
    }
`;

interface MultiCoverImageProps extends ComponentPropsWithoutRef<typeof StyledCover> {
    resourcesWithImages: Array<MultiCoverImageResourceWithImagesFragment>
}

export function MultiCoverImage({ resourcesWithImages, ...props }: MultiCoverImageProps) {
    const images = resourcesWithImages
        .filter((resource, index, list) =>
            list.findIndex((r) => r.name === resource.name) === index
        )
        .map((resource) => {
            const { largeCover, smallCover } = extractImages(resource);

            return {
                largeCover,
                smallCover,
                resource,
            };
        })
        .filter(({ largeCover }) => !!largeCover)
        .slice(0, 4);

    return (
        <AspectRatio ratio={2 / 3}>
            <StyledCoverContainer>
                {images.length ? images.map(({ largeCover, smallCover, resource }) => (
                    <StyledCoverItemContainer key={largeCover} $itemCount={images.length}>
                        <StyledCover
                            loading="lazy"
                            src={largeCover}
                            alt={`Cover image of ${resource.name}`}
                            title={resource.name}
                            style={{ backgroundImage: `url(${smallCover})` }}
                            {...props}
                        />
                    </StyledCoverItemContainer>
                )) : (
                    <LogoPlaceholder {...props}/>
                )}
            </StyledCoverContainer>
        </AspectRatio>
    );
}

MultiCoverImage.fragments = {
    resourceWithImages: gql`
        ${extractImages.fragments.resourceWithImages}

        fragment MultiCoverImageResourceWithImages on ResourceWithImages {
            ... on Anime {
                name
            }
            ... on Artist {
                name
            }
            ... on Studio {
                name
            }
            ...extractImagesResourceWithImages
        }
    `,
};
