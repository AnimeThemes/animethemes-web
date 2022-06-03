import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { buildFetchData } from "lib/common";

import typeDefsAnimeThemes from "lib/common/animethemes/type-defs";
import typeDefsAnimeBracket from "lib/server/animebracket/type-defs";
import typeDefsAnimeList from "lib/server/animelist/type-defs";

import resolversAnimeThemes from "lib/common/animethemes/resolvers";
import resolversAnimeBracket from "lib/server/animebracket/resolvers";
import resolversAnimeList from "lib/server/animelist/resolvers";

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        typeDefsAnimeThemes,
        typeDefsAnimeBracket,
        typeDefsAnimeList
    ]),
    resolvers: mergeResolvers([
        resolversAnimeThemes,
        resolversAnimeBracket,
        resolversAnimeList
    ])
});

export const fetchData = buildFetchData(schema, false);
