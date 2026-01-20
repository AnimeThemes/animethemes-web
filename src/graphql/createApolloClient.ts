import { ApolloClient, type ApolloClientOptions, InMemoryCache, type NormalizedCacheObject } from "@apollo/client";

const createApolloClient = (options: Omit<ApolloClientOptions<NormalizedCacheObject>, "uri" | "cache"> = {}) => {
    return new ApolloClient({
        ...options,
        uri: "http://graphql.animethemes.test",
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
