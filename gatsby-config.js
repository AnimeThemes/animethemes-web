const fs = require("fs");
const path = require("path");
const siteConfig = require("./site-config")

// Load environment configuration
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

// Map every path in "src" to its directory name so we can import files like this:
//
// import Button from "components/button";
//
// Otherwise we would have to provide relative paths which makes refactoring harder.
const aliases = fs.readdirSync(path.join(__dirname, "src")).reduce((obj, directory) => {
    obj[directory] = path.join(__dirname, "src", directory);
    return obj;
}, {});

// If Gatsby already set up a path prefix, use that instead
const pathPrefix = process.env.GATSBY_PATH_PREFIX || siteConfig.pathPrefix;

module.exports = {
    pathPrefix: pathPrefix,
    siteMetadata: {
        lang: siteConfig.siteLanguage,
        siteName: siteConfig.siteName,
        description: siteConfig.description,
        titleTemplate: `%s · ${siteConfig.siteName}`,
        siteUrl: path.posix.join((process.env.SITE_URL || siteConfig.rootUrl), pathPrefix)
    },
    plugins: [
        "gatsby-source-animethemes",
        "gatsby-plugin-styled-components",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-root-import",
            options: aliases
        },
        {
            resolve: "gatsby-plugin-layout",
            options: {
                component: require.resolve("./src/components/layout/index.js"),
            }
        },
        {
            resolve: "gatsby-plugin-create-client-paths",
            options: { prefixes: [ "/search/*" ] },
        },
        "gatsby-plugin-fontawesome-css",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png"
            }
        }
    ]
};
