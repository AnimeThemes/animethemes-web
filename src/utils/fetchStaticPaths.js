export default async function fetchStaticPaths(fetchPaths) {
    // In development all pages should be fetched on-demand. This speeds up page generation a lot.
    if (process.env.NODE_ENV === "development") {
        return {
            paths: [],
            fallback: "blocking"
        };
    }

    const isStaging = !!process.env.NEXT_PUBLIC_STAGING;

    const paths = await fetchPaths(isStaging);

    return {
        paths,
        fallback: "blocking"
    };
}
