import { makeExecutableSchema } from "@graphql-tools/schema";

import { buildFetchData } from "lib/common";

import typeDefsAnimeThemes from "lib/common/animethemes/type-defs";

import resolversAnimeThemes from "lib/common/animethemes/resolvers";

const schema = makeExecutableSchema({
    typeDefs: typeDefsAnimeThemes,
    resolvers: resolversAnimeThemes
});

export const fetchDataClient = buildFetchData(schema);
