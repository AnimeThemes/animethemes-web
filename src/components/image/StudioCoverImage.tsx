import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import { FullWidthImage } from "@/components/image/FullWidthImage";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { AspectRatio } from "@/components/utils/AspectRatio";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import extractImages from "@/utils/extractImages";

const StyledImage = styled(FullWidthImage)`
    object-fit: contain;
    background-size: contain;
`;

const fragments = {
    studio: graphql(`
        fragment StudioCoverImageStudio on Studio {
            images {
                nodes {
                    ...extractImagesImage
                }
            }
            anime {
                nodes {
                    name
                    images {
                        nodes {
                            ...extractImagesImage
                        }
                    }
                }
            }
        }
    `),
};

interface StudioCoverImageProps extends ComponentPropsWithoutRef<typeof FullWidthImage> {
    studio: FragmentType<typeof fragments.studio>;
}

export function StudioCoverImage({ studio: studioFragment, ...props }: StudioCoverImageProps) {
    const studio = getFragmentData(fragments.studio, studioFragment);
    const { largeCover } = extractImages(studio.images.nodes);

    const [imageNotFound, setImageNotFound] = useState(!largeCover);

    return (
        <AspectRatio $ratio={2 / 3}>
            {!imageNotFound ? (
                <StyledImage
                    key={largeCover}
                    src={largeCover}
                    style={{ background: `url(${largeCover})`, backgroundSize: "10000%" }}
                    onError={() => setImageNotFound(true)}
                    {...props}
                />
            ) : (
                <MultiCoverImage
                    items={studio.anime.nodes.map((anime) => ({
                        ...extractImages(anime.images.nodes),
                        name: anime.name,
                    }))}
                    {...props}
                />
            )}
        </AspectRatio>
    );
}
