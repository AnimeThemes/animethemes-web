import { ApolloClient, ApolloLink, CombinedGraphQLErrors, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
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

const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );
    } else {
        console.error("[Network error]:", error);
    }
});

/**
 * This function is for server-side use only! For client side queries use ./client.ts instead.
 */
const createApolloClient = (req?: IncomingMessage) => {
    return new ApolloClient({
        link: ApolloLink.from([
            logLink,
            errorLink,
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
