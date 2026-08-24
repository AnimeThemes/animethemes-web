import {
    ApolloClient,
    type ApolloClientOptions,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    type NormalizedCacheObject,
} from "@apollo/client";
import { print } from "@apollo/client/utilities";
import type { IncomingMessage } from "node:http";

const logLink = new ApolloLink((operation, forward) => {
    console.log("Operation:", operation.operationName);
    console.log("---------------------------------------");
    console.log(print(operation.query));
    console.log("---------------------------------------");
    return forward(operation);
});

/**
 * This function is for server-side use only! For client side queries use ./client.ts instead.
 */
const createApolloClient = (
    req?: IncomingMessage,
    options: Omit<ApolloClientOptions<NormalizedCacheObject>, "uri" | "cache"> = {},
) => {
    return new ApolloClient({
        ...options,
        link: ApolloLink.from([
            logLink,
            new HttpLink({
                uri: "http://animethemes-rust.test/graphql",
                headers: req && {
                    referer: req.headers.referer ?? "",
                    cookie: req.headers.cookie ?? "",
                },
            }),
        ]),
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
