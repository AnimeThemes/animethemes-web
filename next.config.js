const { info, error } = require("next/dist/build/output/log");
const { ANALYZE, STAGING, BASE_PATH, validateConfig } = require("./src/utils/config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: ANALYZE,
});

if (!validateConfig()) {
    error("Shutting down because of invalid configuration...");
    process.exit(1);
}

if (STAGING) {
    info("Running animethemes-web in staging mode!");
}

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    basePath: BASE_PATH,
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    staticPageGenerationTimeout: 3600,
    experimental: {
        newNextLinkBehavior: true,
        // We don't want to multi-thread page building
        // to make use of caching between page builds.
        workerThreads: false,
        cpus: 1
    }
};

module.exports = withBundleAnalyzer(nextConfig);
