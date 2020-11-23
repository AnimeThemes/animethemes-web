const { pathPrefix } = require("./gatsby-config");

module.exports =  {
    // Basic site metadata
    siteName: "AnimeThemes",
    description: "AnimeThemes is a simple and consistent repository of anime opening and ending themes.",
    siteLanguage: "en",

    // Prefix for all links (for production builds)
    pathPrefix: "/animethemes",

    // Site URL without pathPrefix
    rootUrl: "https://animethemes.github.io"
}