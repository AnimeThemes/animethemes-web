import type { ASTNode } from "graphql/index";
import gql from "graphql-tag";

import type { ExtractMultipleImagesResourceWithImagesFragment } from "@/generated/graphql";

interface ExtractMultiplesImagesResult {
    link: string;
    depth: number | null;
    facet: string | null;
}

interface ExtractMultipleImages {
    (resourceWithImages?: ExtractMultipleImagesResourceWithImagesFragment | null): Array<ExtractMultiplesImagesResult>;
    fragments: {
        resourceWithImages: ASTNode;
    };
}

const extractMultipleImages: ExtractMultipleImages = (resourceWithImages) => {
    if (resourceWithImages) {
        const largeCovers = resourceWithImages.images.filter((image) => image.facet === "Large Cover");

        return largeCovers.sort((a, b) => {
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
    }

    return [];
};

export default extractMultipleImages;

extractMultipleImages.fragments = {
    resourceWithImages: gql`
        fragment extractMultipleImagesResourceWithImages on ResourceWithImages {
            images {
                link
                depth
                facet
            }
        }
    `,
};
