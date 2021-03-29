import fs from "fs";
import path from "path";
import siteConfig from "./site-config";
import dotenv from "dotenv";

// Load environment configuration
dotenv.config({
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

const config = {
    pathPrefix: pathPrefix,
    siteMetadata: {
        lang: siteConfig.siteLanguage,
        siteName: siteConfig.siteName,
        description: siteConfig.description,
        titleTemplate: `%s · ${siteConfig.siteName}`,
        siteUrl: path.posix.join((process.env.SITE_URL || siteConfig.rootUrl), pathPrefix)
    },
    plugins: [
        process.env.SOURCE_PLUGIN === "DB"
            ? "gatsby-source-animethemes-db"
            : "gatsby-source-animethemes",
        "gatsby-plugin-styled-components",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-root-import",
            options: aliases
        },
        {
            resolve: "gatsby-plugin-layout",
            options: {
                component: require.resolve("./src/layout/index.js"),
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
        },
        "gatsby-plugin-eslint",
        "gatsby-plugin-sass",
        "gatsby-plugin-extract-schema"
    ]
};

export default config;
