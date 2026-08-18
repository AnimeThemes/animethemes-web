import type { VariablesOf } from "@graphql-typed-document-node/core";

import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { AnimeFormat, ThemeType } from "@/graphql/generated/graphql";

const RANDOM_THEME = graphql(`
    query RandomTheme($input: AnimeThemeShuffleInput) {
        animethemeShuffle(
            input: $input,
            first: 10
        ) {
            ...ThemeSummaryCardTheme
            ...ThemeSummaryCardThemeExpandable
            animethemeentries {
                ...VideoSummaryCardEntry
                videos {
                    nodes {
                        ...VideoSummaryCardVideo
                    }
                }
            }
        }
    }
`);

export interface RandomThemesOptions {
    input?: {
        type?: ThemeType;
        format?: AnimeFormat;
        yearGte?: number;
        yearLte?: number;
    }
}

export async function fetchRandomThemes(options?: RandomThemesOptions) {
    const { data } = await client.query({
        query: RANDOM_THEME,
        variables: options?.input,
    });

    return data.animethemeShuffle;
}
