import { MINIMAL_BUILD } from "utils/config";
import type { ParsedUrlQuery } from "querystring";

export default async function fetchStaticPaths<T extends ParsedUrlQuery = ParsedUrlQuery>(
    fetchPaths: () => Promise<Array<{ params: T }>>,
    forceFullBuild = false
): Promise<{ paths: Array<{ params: T }>, fallback: "blocking" }> {
    // In development all pages should be fetched on-demand. This speeds up page generation a lot.
    // This can also be enabled via an enviroment variable.
    if (process.env.NODE_ENV === "development" || (MINIMAL_BUILD && !forceFullBuild)) {
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
