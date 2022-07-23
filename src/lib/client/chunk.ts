import { makeExecutableSchema } from "@graphql-tools/schema";
import { buildFetchData } from "lib/common";
import typeDefsAnimeThemes from "lib/common/animethemes/type-defs";
import resolversAnimeThemes from "lib/common/animethemes/resolvers";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { searchResolvers, searchTypeDefs } from "lib/client/search";

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        typeDefsAnimeThemes,
        searchTypeDefs,
    ]),
    resolvers: mergeResolvers([
        resolversAnimeThemes,
        searchResolvers,
    ])
});

export const fetchDataClient = buildFetchData(schema);
