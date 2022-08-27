import type { ASTNode } from "graphql";
import type { ApiExecutionResult } from "lib/common";

export async function fetchDataClient<T>(
    query: string | ASTNode
): Promise<ApiExecutionResult<T>>;
export async function fetchDataClient<T, P extends Record<string, unknown>>(
    query: string | ASTNode,
    args: P,
    context?: { apiRequests?: number },
    root?: Record<string, unknown>
): Promise<ApiExecutionResult<T>>;
export async function fetchDataClient<T, P extends Record<string, unknown>>(
    query: string | ASTNode,
    args?: P,
    context?: { apiRequests?: number },
    root?: Record<string, unknown>
): Promise<ApiExecutionResult<T>> {
    // Code-split anything GraphQL related to reduce initial bundle size.
    const { fetchDataClient } = await import("./chunk");

    if (!args) {
        return fetchDataClient<T>(query);
    }

    return fetchDataClient<T, P>(query, args, context, root);
}
