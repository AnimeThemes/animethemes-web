const { info } = require("next/dist/build/output/log");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

if (process.env.NEXT_PUBLIC_STAGING) {
    info("Running animethemes-web in staging mode!");
}

module.exports = withBundleAnalyzer({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    swcMinify: true,
    staticPageGenerationTimeout: 3600
});
