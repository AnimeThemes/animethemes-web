import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { buildFetchData } from "lib/common";

import typeDefsAnimeThemes from "lib/common/animethemes/type-defs";
import typeDefsAnimeBracket from "lib/server/animebracket/type-defs";

import resolversAnimeThemes from "lib/common/animethemes/resolvers";
import resolversAnimeBracket from "lib/server/animebracket/resolvers";

export const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        typeDefsAnimeThemes,
        typeDefsAnimeBracket,
    ]),
    resolvers: mergeResolvers([
        resolversAnimeThemes,
        resolversAnimeBracket,
    ])
});

export const fetchData = buildFetchData(schema);
