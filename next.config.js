const { info, error } = require("next/dist/build/output/log");
const { ANALYZE, STAGING, BASE_PATH, validateConfig } = require("./src/utils/config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: ANALYZE,
});

if (!validateConfig()) {
    error("Shutting down because of invalid configuration...");
    return process.exit(1);
}

if (STAGING) {
    info("Running animethemes-web in staging mode!");
}

module.exports = withBundleAnalyzer({
    basePath: BASE_PATH,
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    staticPageGenerationTimeout: 3600
});
