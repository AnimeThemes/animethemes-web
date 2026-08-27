import { CombinedGraphQLErrors } from "@apollo/client";

export type Result<Data, Error> =
    | (Data extends void ? { ok: true } : { ok: true; data: Data })
    | { ok: false; error: Error };

export type ValidationError<Data extends object> = {
    [Key in keyof Data]?: Array<string>;
};

export function parseValidationError<Data extends object>(error: unknown): ValidationError<Data> {
    if (!CombinedGraphQLErrors.is(error)) {
        throw error;
    }

    for (const subError of error.errors) {
        if (subError.extensions?.code !== "VALIDATION") {
            continue;
        }

        return subError.extensions.validation as ValidationError<Data>;
    }

    throw error;
}

export function parseSimpleError(error: unknown): string {
    if (!CombinedGraphQLErrors.is(error)) {
        throw error;
    }

    return error.message;
}
