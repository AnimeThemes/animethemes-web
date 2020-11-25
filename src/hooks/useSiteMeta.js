import {useStaticQuery, graphql} from "gatsby";

export default function useSiteMeta() {
    const {site} = useStaticQuery(query);
    return site.siteMetadata;
}

export const query = graphql`
    query SEO {
        site {
            siteMetadata {
                titleTemplate
                description
                siteName
                siteUrl
                lang
            }
        }
    }
`
