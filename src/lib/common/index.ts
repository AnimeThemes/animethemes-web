import type { ASTNode, GraphQLSchema } from "graphql";
import { graphql, print } from "graphql";
import type { ApiResolverContext } from "lib/common/animethemes/api";

export interface ApiExecutionResult<T> {
    data: T
    apiRequests: number
}

export function buildFetchData(schema: GraphQLSchema) {
    async function fetchData<T>(
        query: string | ASTNode
    ): Promise<ApiExecutionResult<T>>;
    async function fetchData<T, P extends Record<string, unknown> = Record<string, unknown>>(
        query: string | ASTNode,
        args?: P,
        context?: Partial<ApiResolverContext>,
        root?: Record<string, unknown>
    ): Promise<ApiExecutionResult<T>>;
    async function fetchData<T, P extends Record<string, unknown> = Record<string, unknown>>(
        query: string | ASTNode,
        args?: P,
        context: Partial<ApiResolverContext> = {},
        root?: Record<string, unknown>
    ): Promise<ApiExecutionResult<T>> {
        const result = await graphql({
            schema,
            source: typeof query === "string" ? query : print(query),
            contextValue: {
                apiRequests: 0,
                ...context
            },
            variableValues: args ?? {},
            rootValue: root ?? {},
        });

        if (result.errors) {
            throw new Error(`Failed to execute GraphQL query: ${JSON.stringify(result.errors, null, 2)}`);
        }

        if (!result.data) {
            throw new Error("Empty data on GraphQL result without any error message.");
        }

        return {
            data: result.data as T,
            apiRequests: context.apiRequests ?? 0,
        };
    }

    return fetchData;
}
