import { graphql, print } from "graphql";

export function buildFetchData(schema) {
    return async (query, args = {}, context = {}) => {
        const result = await graphql(schema, typeof query === "string" ? query : print(query), null, context, args);

        if (result.errors) {
            console.error(JSON.stringify(result.errors, null, 2));
        }

        result.apiRequests = context.apiRequests ?? 0;

        return result;
    };
}
