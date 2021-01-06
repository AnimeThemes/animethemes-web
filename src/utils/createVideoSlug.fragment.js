import { graphql } from "gatsby";

export const query = graphql`
    fragment VideoSlug on Theme {
        slug
        entries {
            version
            videos {
                nc
                source
                lyrics
                subbed
                uncen
                overlap
                resolution
            }
        }
    }
`;
