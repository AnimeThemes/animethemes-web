import PropTypes from "prop-types";
import { useLocation } from "@reach/router";
import { Helmet } from "react-helmet";
import useSiteMeta from "hooks/useSiteMeta";

export function SEO({ title, description, meta = [], lang }) {
    const { pathname } = useLocation();

    const {
        description: defaultDescription,
        lang: defaultLanguage,
        titleTemplate,
        siteName,
        siteUrl
    } = useSiteMeta();

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
