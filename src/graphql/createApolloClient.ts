import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { print } from "@apollo/client/utilities";
import type { IncomingMessage } from "node:http";

import { SERVER_GRAPHQL_URL } from "@/utils/config";
import { info } from "@/utils/log";

let totalOperations = 0;

const logLink = new ApolloLink((operation, forward) => {
    info("Operation:", operation.operationName, "Total:", ++totalOperations);
    if (process.env.NODE_ENV === "development") {
        info(print(operation.query));
    }
    return forward(operation);
});

/**
 * This function is for server-side use only! For client side queries use ./client.ts instead.
 */
const createApolloClient = (req?: IncomingMessage) => {
    return new ApolloClient({
        link: ApolloLink.from([
            logLink,
            new HttpLink({
                uri: SERVER_GRAPHQL_URL,
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
                errorPolicy: "none",
            },
            watchQuery: {
                errorPolicy: "none",
            },
        },
    });
};

export default createApolloClient;
