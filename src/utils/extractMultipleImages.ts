import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const EXTRACT_MULTIPLE_IMAGES_IMAGE_ARTIST_EDGE = graphql(`
    fragment extractMultipleImagesImageArtistEdge on ArtistImageEdge {
        depth
        node {
            link
            facet
        }
    }
`);

interface ExtractMultipleImagesResult {
    link: string;
    depth: number | null;
    facet: string | null;
}

export default function extractMultipleImages(
    imageEdgeFragments: Array<FragmentType<typeof EXTRACT_MULTIPLE_IMAGES_IMAGE_ARTIST_EDGE>> | null,
): Array<ExtractMultipleImagesResult> {
    const imageEdges = imageEdgeFragments
        ? getFragmentData(EXTRACT_MULTIPLE_IMAGES_IMAGE_ARTIST_EDGE, imageEdgeFragments)
        : [];

    if (imageEdges?.length > 0) {
        const largeCovers = imageEdges.filter((edge) => edge.node.facet === "LARGE_COVER");

        return largeCovers
            .sort((a, b) => {
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
            })
            .map((edge) => ({ depth: edge.depth, facet: edge.node.facet, link: edge.node.link }));
    }

    return [];
}
