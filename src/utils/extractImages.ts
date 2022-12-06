import gql from "graphql-tag";
import type { ASTNode } from "graphql";
import type { ExtractImagesResourceWithImagesFragment } from "generated/graphql";

interface ExtractImages {
    (resourcesWithImages?: ExtractImagesResourceWithImagesFragment | null): ExtractImagesResult
    fragments: {
        resourceWithImages: ASTNode
    }
}

interface ExtractImagesResult {
    smallCover?: string
    largeCover?: string
}

const extractImages: ExtractImages = (resourceWithImages) => {
    const images: ExtractImagesResult = {};

    if (resourceWithImages) {
        for (const image of resourceWithImages.images) {
            switch (image.facet) {
                case "Small Cover":
                    images.smallCover = image.link;
                    break;
                case "Large Cover":
                    images.largeCover = image.link;
                    break;
                default:
                // Ignore
            }
        }
    }

    return images;
};

export default extractImages;

extractImages.fragments = {
    resourceWithImages: gql`
        fragment extractImagesResourceWithImages on ResourceWithImages {
            images {
                link
                facet
            }
        }
    `
};
