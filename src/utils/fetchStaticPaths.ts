import { STAGING } from "utils/config";
import { ParsedUrlQuery } from "querystring";

export default async function fetchStaticPaths<T extends ParsedUrlQuery = ParsedUrlQuery>(
    fetchPaths: () => Promise<Array<{ params: T }>>,
    allPathsInStaging = false
): Promise<{ paths: Array<{ params: T }>, fallback: "blocking" }> {
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
