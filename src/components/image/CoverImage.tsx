import extractImages from "utils/extractImages";
import { AspectRatio } from "components/utils";
import { FullWidthImage } from "components/image";
import gql from "graphql-tag";
import type { CoverImageResourceWithImagesFragment } from "generated/graphql";
import type { ComponentPropsWithoutRef } from "react";

interface CoverImageProps extends ComponentPropsWithoutRef<typeof FullWidthImage> {
    resourceWithImages: CoverImageResourceWithImagesFragment
}

export function CoverImage({ resourceWithImages, ...props }: CoverImageProps) {
    const { smallCover, largeCover } = extractImages(resourceWithImages);

    return (
        <AspectRatio ratio={2 / 3}>
            <FullWidthImage key={largeCover} src={largeCover} style={{ backgroundImage: `url(${smallCover})` }} {...props}/>
        </AspectRatio>
    );
}

CoverImage.fragments = {
    resourceWithImages: gql`
        ${extractImages.fragments.resourceWithImages}
        
        fragment CoverImageResourceWithImages on ResourceWithImages {
            ...extractImagesResourceWithImages
        }
    `,
};
