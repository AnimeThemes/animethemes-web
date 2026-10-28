import type { FieldPolicy } from "@apollo/client";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { print } from "@apollo/client/utilities";

import { CLIENT_GRAPHQL_URL } from "@/utils/config";

const httpLink = new BatchHttpLink({
    uri: CLIENT_GRAPHQL_URL,
    credentials: "include",
    batchMax: 5,
    batchInterval: 200,
});

// const httpLink = new HttpLink({
//     uri: CLIENT_GRAPHQL_URL,
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

interface SearchResults {
    data: Array<unknown>;
    pageInfo?: {
        offset: number;
        first: number;
    };
}

const searchResultsPolicy: FieldPolicy<SearchResults> = {
    merge(existing, incoming) {
        if (!existing?.pageInfo || !incoming.pageInfo) {
            return incoming;
        }

        const data = [...existing.data];
        data.splice(incoming.pageInfo.offset - incoming.pageInfo.first, incoming.data.length, ...incoming.data);

        return {
            ...incoming,
            data,
            pageInfo: incoming.pageInfo.offset > existing.pageInfo.offset ? incoming.pageInfo : existing.pageInfo,
        };
    },
};

export const client = new ApolloClient({
    link: ApolloLink.from([logLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    search: {
                        keyArgs: ["search", "first"],
                    },
                },
            },
            Search: {
                merge: true,
                fields: {
                    anime: searchResultsPolicy,
                    artists: searchResultsPolicy,
                    playlists: searchResultsPolicy,
                    series: searchResultsPolicy,
                    studios: searchResultsPolicy,
                    themes: searchResultsPolicy,
                },
            },
        },
    }),
    defaultOptions: {
        query: {
            errorPolicy: "none",
        },
        watchQuery: {
            errorPolicy: "none",
        },
    },
});
