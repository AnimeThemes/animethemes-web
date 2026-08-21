import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { print } from "@apollo/client/utilities";

const httpLink = new BatchHttpLink({
    uri: "http://animethemes-rust.test/graphql",
    credentials: "include",
    batchMax: 5,
    batchInterval: 200,
});

// const httpLink = new HttpLink({
//     uri: "http://animethemes-rust.test/graphql",
//     credentials: "include",
// });

const logLink = new ApolloLink((operation, forward) => {
    console.groupCollapsed("Operation:", operation.operationName);
    console.log(print(operation.query));
    console.groupCollapsed("Stack Trace:");
    console.trace();
    console.groupEnd();
    console.groupEnd();
    return forward(operation);
});

export const client = new ApolloClient({
    link: ApolloLink.from([logLink, httpLink]),
    cache: new InMemoryCache(),
});
