import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { buildFetchData } from "@/lib/common";
import resolversAnimeThemes from "@/lib/common/animethemes/resolvers";
import typeDefsAnimeThemes from "@/lib/common/animethemes/type-defs";

export const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefsAnimeThemes]),
    resolvers: mergeResolvers([resolversAnimeThemes]),
});

export const fetchData = buildFetchData(schema);
