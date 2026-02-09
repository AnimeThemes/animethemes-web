import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";

const httpLink = new BatchHttpLink({
    uri: "http://graphql.animethemes.test",
    credentials: "include",
    batchMax: 5,
    batchInterval: 200,
});

// const httpLink = new HttpLink({
//     uri: "http://graphql.animethemes.test",
//     credentials: "include",
// });

const logLink = new ApolloLink((operation, forward) => {
    console.error("Operation:", operation.operationName);
    return forward(operation);
});

export const client = new ApolloClient({
    link: ApolloLink.from([logLink, httpLink]),
    cache: new InMemoryCache(),
});
