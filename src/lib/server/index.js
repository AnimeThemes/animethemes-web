import { graphql, print } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import typeDefsAnimeThemes from "lib/server/animethemes/type-defs";
import typeDefsAnimeBracket from "lib/server/animebracket/type-defs";
import typeDefsAnimeList from "lib/server/animelist/type-defs";

import resolversAnimeThemes from "lib/server/animethemes/resolvers";
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

export async function fetchData(query, args = {}) {
    const result = await graphql(schema, typeof query === "string" ? query : print(query), null, {}, args);

    if (result.errors) {
        console.error(JSON.stringify(result.errors, null, 2));
    }

    return result;
}
