const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    reactStrictMode: true,
    experimental: {
        styledComponents: true
    },
});
