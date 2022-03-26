const { graphql, print } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        require("lib/server/animethemes/type-defs"),
        require("lib/server/animebracket/type-defs"),
        require("lib/server/animelist/type-defs")
    ]),
    resolvers: mergeResolvers([
        require("lib/server/animethemes/resolvers"),
        require("lib/server/animebracket/resolvers"),
        require("lib/server/animelist/resolvers")
    ])
});

exports.fetchData = async (query, args = {}) => {
    const result = await graphql(schema, typeof query === "string" ? query : print(query), null, {}, args);

    if (result.errors) {
        console.error(JSON.stringify(result.errors, null, 2));
    }

    return result;
};
