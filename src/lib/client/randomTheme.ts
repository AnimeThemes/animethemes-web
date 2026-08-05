import type { VariablesOf } from "@graphql-typed-document-node/core";

import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { AnimeFormat, ThemeType } from "@/graphql/generated/graphql";

const RANDOM_THEME = graphql(`
    query RandomTheme($type: [ThemeType!], $format: [AnimeFormat!], $animeYearMin: Int, $animeYearMax: Int) {
        animethemeShuffle(
            type: $type
            format: $format
            year_gte: $animeYearMin
            year_lte: $animeYearMax
            spoiler: false
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
    themeType?: ThemeType;
    format?: AnimeFormat;
    animeYearMin?: number;
    animeYearMax?: number;
}

export async function fetchRandomThemes(options?: RandomThemesOptions) {
    const args: VariablesOf<typeof RANDOM_THEME> = {};

    if (options?.themeType) {
        args.type = options.themeType;
    }
    if (options?.format) {
        args.format = options.format;
    }
    if (options?.animeYearMin) {
        args.animeYearMin = options.animeYearMin;
    }
    if (options?.animeYearMax) {
        args.animeYearMax = options.animeYearMax;
    }

    const { data } = await client.query({
        query: RANDOM_THEME,
        variables: args,
    });

    return data.animethemeShuffle;
}
