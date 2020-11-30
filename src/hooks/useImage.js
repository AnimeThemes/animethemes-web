export default function useImage(resourceWithImages) {
    const images = {};

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
}
