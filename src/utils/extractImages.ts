import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    image: graphql(`
        fragment extractImagesImage on Image {
            link
            facet
        }
    `),
};

interface ExtractImagesResult {
    smallCover?: string;
    largeCover?: string;
}

export default function extractImages(
    imageFragments: Array<FragmentType<typeof fragments.image>> | null,
): ExtractImagesResult {
    const images = imageFragments ? getFragmentData(fragments.image, imageFragments) : [];
    const extractedImages: ExtractImagesResult = {};

    for (const image of images) {
        switch (image.facet) {
            case "SMALL_COVER":
                extractedImages.smallCover = image.link;
                break;
            case "LARGE_COVER":
                extractedImages.largeCover = image.link;
                break;
            default:
            // Ignore
        }
    }

    return extractedImages;
}
