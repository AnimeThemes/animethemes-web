import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    prettier,
    globalIgnores(["src/graphql/generated", ".next/**", "out/**", "build/**", "next-env.d.ts", "next.config.mjs"]),
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        languageOptions: {
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
        settings: {
            // Avoids auto-detection crash
            // See: https://github.com/vercel/next.js/issues/89764#issuecomment-3928272828
            react: { version: "19" },
        },
        rules: {
            // Sort imports
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        // Packages that are used in almost all files.
                        ["^react$", "^react\\u0000$", "^styled-components", "^next"],
                        // All other packages.
                        ["^@?\\w"],
                        // Absolute imports and other imports such as Vue-style `@/foo`.
                        // Anything not matched in another group.
                        ["^"],
                        // Side effect imports.
                        ["^\\u0000"],
                    ],
                },
            ],
            "simple-import-sort/exports": "error",

            // TypeScript rules
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-empty-interface": [
                "error",
                {
                    allowSingleExtends: true,
                },
            ],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    fixStyle: "inline-type-imports",
                },
            ],
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/array-type": [
                "error",
                {
                    default: "generic",
                },
            ],
        },
    },
]);
