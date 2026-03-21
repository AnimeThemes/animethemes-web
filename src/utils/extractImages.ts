import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const EXTRACT_IMAGES_IMAGE = graphql(`
    fragment extractImagesImage on Image {
        link
        facet
    }
`);

interface ExtractImagesResult {
    smallCover?: string;
    largeCover?: string;
}

export default function extractImages(
    imageFragments: Array<FragmentType<typeof EXTRACT_IMAGES_IMAGE>> | null,
): ExtractImagesResult {
    const images = imageFragments ? getFragmentData(EXTRACT_IMAGES_IMAGE, imageFragments) : [];
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
