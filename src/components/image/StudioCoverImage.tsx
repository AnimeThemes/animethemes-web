import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import gql from "graphql-tag";

import { FullWidthImage } from "@/components/image/FullWidthImage";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { AspectRatio } from "@/components/utils/AspectRatio";
import type { StudioCoverImageStudioFragment } from "@/generated/graphql";
import extractImages from "@/utils/extractImages";

const StyledImage = styled(FullWidthImage)`
    object-fit: contain;
    background-size: contain;
`;

interface StudioCoverImageProps extends ComponentPropsWithoutRef<typeof FullWidthImage> {
    studio: StudioCoverImageStudioFragment
}

export function StudioCoverImage({ studio, ...props }: StudioCoverImageProps) {
    const { largeCover } = extractImages(studio);

    const [ imageNotFound, setImageNotFound ] = useState(!largeCover);

    return (
        <AspectRatio ratio={2 / 3}>
            {!imageNotFound ? (
                <StyledImage
                    key={largeCover}
                    src={largeCover}
                    style={{ background: `url(${largeCover})`, backgroundSize: "10000%" }}
                    onError={() => setImageNotFound(true)}
                    {...props}
                />
            ) : (
                <MultiCoverImage resourcesWithImages={studio.anime} {...props}/>
            )}
        </AspectRatio>
    );
}

StudioCoverImage.fragments = {
    studio: gql`
        fragment StudioCoverImageStudio on Studio {
            images {
                link
                facet
            }
            anime {
                name
                images {
                    link
                    facet
                }
            }
        }
    `
};
