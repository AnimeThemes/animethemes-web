// @ts-check

import { ANALYZE, BASE_PATH, STAGING, validateConfig } from "./src/utils/config.mjs";
import { error, info } from "./src/utils/log.mjs";

import NextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: ANALYZE,
});

if (!validateConfig()) {
    error("Shutting down because of invalid configuration...");
    process.exit(1);
}

if (STAGING) {
    info("Running animethemes-web in staging mode!");
}

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
        // We don't want to multi-thread page building
        // to make use of caching between page builds.
        workerThreads: false,
        cpus: 1,
    },
    transpilePackages: [
        "ahooks"
    ],
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
    },
    async redirects() {
        return [
            {
                source: "/wiki/blog/:slug*",
                destination: "/blog/:slug*",
                permanent: true,
            },
            {
                source: "/wiki/status/:slug*",
                destination: "/blog/status_:slug*",
                permanent: true,
            },
        ];
    }
};

export default withBundleAnalyzer(nextConfig);
