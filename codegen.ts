import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: process.env.GRAPHQL_URL,
    documents: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
    ignoreNoDocuments: true,
    verbose: true,
    generates: {
        "src/graphql/generated/": {
            preset: "client",
            presetConfig: {
                fragmentMasking: { unmaskFunctionName: "getFragmentData" },
            },
            config: {
                useTypeImports: true,
                scalars: {
                    DateTime: "string",
                },
                strictScalars: true,
            },
        },
    },
};

export default config;
