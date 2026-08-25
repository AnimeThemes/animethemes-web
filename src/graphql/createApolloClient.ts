import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import type { IncomingMessage } from "node:http";

let totalOperations = 0;

const logLink = new ApolloLink((operation, forward) => {
    console.log("Operation:", operation.operationName, "Total:", ++totalOperations);
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
                errorPolicy: "none",
            },
            watchQuery: {
                errorPolicy: "none",
            },
        },
    });
};

export default createApolloClient;
