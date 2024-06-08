import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { searchResolvers, searchTypeDefs } from "@/lib/client/search";
import { buildFetchData } from "@/lib/common";
import resolversAnimeThemes from "@/lib/common/animethemes/resolvers";
import typeDefsAnimeThemes from "@/lib/common/animethemes/type-defs";

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefsAnimeThemes, searchTypeDefs]),
    resolvers: mergeResolvers([resolversAnimeThemes, searchResolvers]),
});

export const fetchDataClient = buildFetchData(schema);
