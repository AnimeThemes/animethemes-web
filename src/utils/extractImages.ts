import type { ASTNode } from "graphql";
import gql from "graphql-tag";

import type { ExtractImagesResourceWithImagesFragment } from "@/generated/graphql";

interface ExtractImages {
    (resourcesWithImages?: ExtractImagesResourceWithImagesFragment | null): ExtractImagesResult;
    fragments: {
        resourceWithImages: ASTNode;
    };
}

interface ExtractImagesResult {
    smallCover?: string;
    largeCover?: string;
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

interface ExtractMultiplesImagesResult {
    link: string;
    depth: number | null;
    facet: string | null;
}

interface ExtractMultipleImages {
    (resourceWithImages?: ExtractImagesResourceWithImagesFragment | null): Array<ExtractMultiplesImagesResult>;
}

export const extractMultipleImages: ExtractMultipleImages = (resourceWithImages) => {
    if (resourceWithImages) {
        const largeCovers = resourceWithImages.images.filter((image) => image.facet === "Large Cover");

        const sorted = largeCovers.sort((a, b) => {
            if (a.depth && b.depth) {
                return a.depth - b.depth;
            }
            if (a.depth) {
                return -1;
            }
            if (b.depth) {
                return 1;
            }
            return 0;
          });

        return sorted;
    }

    return [];
};

extractImages.fragments = {
    resourceWithImages: gql`
        fragment extractImagesResourceWithImages on ResourceWithImages {
            images {
                link
                depth
                facet
            }
        }
    `,
};
