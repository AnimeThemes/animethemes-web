import { graphql, print } from "graphql";

export function buildFetchData(schema) {
    return async (query, args = {}) => {
        const result = await graphql(schema, typeof query === "string" ? query : print(query), null, {}, args);

        if (result.errors) {
            console.error(JSON.stringify(result.errors, null, 2));
        }

        return result;
    };
}
