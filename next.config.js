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
        cpus: 1,
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on"
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload"
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block"
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN"
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff"
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin"
                    }
                ]
            }
        ];
    }
};

module.exports = withBundleAnalyzer(nextConfig);
