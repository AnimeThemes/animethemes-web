import extractImages from "utils/extractImages";
import { AspectRatio } from "components/utils";
import { FullWidthImage, MultiCoverImage } from "components/image";
import gql from "graphql-tag";
import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import type { StudioCoverImageStudioFragment } from "generated/graphql";
import styled from "styled-components";

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
