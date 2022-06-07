import { STAGING } from "utils/config";

export default async function fetchStaticPaths(fetchPaths, allPathsInStaging = false) {
    // In development and staging all pages should be fetched on-demand. This speeds up page generation a lot.
    if (process.env.NODE_ENV === "development" || (STAGING && !allPathsInStaging)) {
        return {
            paths: [],
            fallback: "blocking"
        };
    }

    const paths = await fetchPaths();

    return {
        paths,
        fallback: "blocking"
    };
}
