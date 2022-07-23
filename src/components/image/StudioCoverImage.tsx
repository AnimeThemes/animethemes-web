import extractImages from "utils/extractImages";
import { AspectRatio } from "components/utils";
import { FullWidthImage, MultiCoverImage } from "components/image";
import gql from "graphql-tag";
import { ComponentPropsWithoutRef, SyntheticEvent, useState } from "react";
import { StudioCoverImageStudioFragment } from "generated/graphql";
import styled from "styled-components";
import extractBackgroundColor from "utils/extractBackgroundColor";

const StyledImage = styled(FullWidthImage)`
    object-fit: contain;
    background-size: contain;
`;

interface StudioCoverImageProps extends ComponentPropsWithoutRef<typeof FullWidthImage> {
    studio: StudioCoverImageStudioFragment
}

export function StudioCoverImage({ studio, ...props }: StudioCoverImageProps) {
    const { smallCover, largeCover } = extractImages(studio);

    const [ imageNotFound, setImageNotFound ] = useState(!largeCover);

    function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
        const image = event.currentTarget;
        const color = extractBackgroundColor(image);
        if (color) {
            image.style.background = color;
            image.style.backgroundSize = "10000%";
        }
    }

    return (
        <AspectRatio ratio={2 / 3}>
            {!imageNotFound ? (
                <StyledImage
                    key={largeCover}
                    src={largeCover}
                    style={{ background: `url(${smallCover})` }}
                    onLoad={handleLoad}
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
