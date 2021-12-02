const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");

module.exports = withPWA(withBundleAnalyzer({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    reactStrictMode: true,
    experimental: {
        styledComponents: true
    },
    pwa: {
        dest: "public"
    }
}));
