import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefsAnimeThemes from "lib/common/animethemes/type-defs";
import resolversAnimeThemes from "lib/common/animethemes/resolvers";
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

const apolloServer = new ApolloServer({ schema, introspection: true });

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }

    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
