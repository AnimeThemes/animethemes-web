import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: [
        "src/lib/common/animethemes/type-defs.ts",
        "src/lib/server/animebracket/type-defs.ts",
        "src/lib/client/search.ts",
    ],
    documents: [
        "src/**/*.js",
        "src/**/*.ts",
        "src/**/*.tsx",
    ],
    generates: {
        "src/generated/graphql.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
            ],
            config: {
                avoidOptionals: {
                    object: true,
                    field: true,
                    inputValue: false,
                },
                enumsAsTypes: true,
                skipTypename: true,
            },
        },
    },
};

export default config;
