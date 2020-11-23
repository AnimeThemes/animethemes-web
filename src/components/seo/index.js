import React from "react"
import PropTypes from "prop-types";
import {useLocation} from "@reach/router";
import {useStaticQuery, graphql} from "gatsby";
import {Helmet} from "react-helmet";

export default function SEO({title, description, meta, lang}) {
    const {pathname} = useLocation();

    const {
        defaultDescription,
        defaultLanguage,
        titleTemplate,
        siteName,
        siteUrl
    } = siteMetadata();

    const seo = {
        url:         `${siteUrl}${pathname}`,
        lang:        lang || defaultLanguage,
        title:       title || siteName,
        description: description || defaultDescription
    }

    return (
        <Helmet 
            htmlAttributes={{
                lang: seo.lang
            }}

            title={seo.title}
            titleTemplate={title ? titleTemplate : null}
            meta={[
                {
                    name: "description",
                    content: seo.description
                },
                {
                    property: "og:site_name",
                    content: siteName
                },
                {
                    property: "og:title",
                    content: title ? titleTemplate.replace(/%s/g, title) : seo.title
                },
                {
                    property: "og:description",
                    content: seo.description
                }
            ].concat(meta)}
        />
    )
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    lang: PropTypes.string
}

SEO.defaultProps = {
    title: null,
    description: null,
    meta: [],
    lang: null
}

export const siteMetadata = () => {
    const {site} = useStaticQuery(query);
    return site.siteMetadata;
}

export const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultDescription: description
                defaultLanguage: lang
                titleTemplate
                siteName
                siteUrl
            }
        }
    }
`