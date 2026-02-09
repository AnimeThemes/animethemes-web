import {
    ApolloClient,
    type ApolloClientOptions,
    HttpLink,
    InMemoryCache,
    type NormalizedCacheObject,
} from "@apollo/client";
import type { IncomingMessage } from "node:http";

/**
 * This function is for server-side use only! For client side queries use ./client.ts instead.
 */
const createApolloClient = (
    req?: IncomingMessage,
    options: Omit<ApolloClientOptions<NormalizedCacheObject>, "uri" | "cache"> = {},
) => {
    return new ApolloClient({
        ...options,
        link: new HttpLink({
            uri: "http://graphql.animethemes.test",
            headers: req && {
                referer: req.headers.referer ?? "",
                cookie: req.headers.cookie ?? "",
            },
        }),
        cache: new InMemoryCache(),
        queryDeduplication: false,
        defaultOptions: {
            query: {
                fetchPolicy: "no-cache",
            },
        },
    });
};

export default createApolloClient;
