import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://graphql.animethemes.test",
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
                avoidOptionals: {
                    field: true,
                    inputValue: false,
                },
                enumsAsTypes: true,
                skipTypename: true,
                useTypeImports: true,
            },
        },
    },
};

export default config;
