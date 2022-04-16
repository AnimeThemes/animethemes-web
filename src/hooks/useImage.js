import gql from "graphql-tag";

export default function useImage(resourceWithImages) {
    const images = {};

    if (resourceWithImages) {
        for (const image of resourceWithImages.images) {
            switch (image.facet) {
                case "Small Cover":
                    images.smallCover = image.link.replace("localhost", "staging.animethemes.moe");
                    break;
                case "Large Cover":
                    images.largeCover = image.link.replace("localhost", "staging.animethemes.moe");
                    break;
                default:
                // Ignore
            }
        }
    }

    return images;
}

useImage.fragment = gql`
    fragment useImage_resourceWithImages on ResourceWithImages {
        images {
            link
            facet
        }
    }
`;
