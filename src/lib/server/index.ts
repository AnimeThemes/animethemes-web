import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { buildFetchData } from "@/lib/common";
import resolversAnimeThemes from "@/lib/common/animethemes/resolvers";
import typeDefsAnimeThemes from "@/lib/common/animethemes/type-defs";
import resolversAnimeBracket from "@/lib/server/animebracket/resolvers";
import typeDefsAnimeBracket from "@/lib/server/animebracket/type-defs";

export const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefsAnimeThemes, typeDefsAnimeBracket]),
    resolvers: mergeResolvers([resolversAnimeThemes, resolversAnimeBracket]),
});

export const fetchData = buildFetchData(schema);
