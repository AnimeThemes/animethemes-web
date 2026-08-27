import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { AnimeFormat, ThemeType } from "@/graphql/generated/graphql";

const RANDOM_THEME = graphql(`
    query RandomTheme($input: AnimeThemeShuffleInput) {
        animethemeShuffle(input: $input, first: 10) {
            ...WatchListItemTheme
            animethemeentries {
                ...WatchListItemEntry
                videos {
                    nodes {
                        ...WatchListItemVideo
                    }
                }
            }
        }
    }
`);

export interface RandomThemesOptions {
    input?: {
        type?: Array<ThemeType>;
        format?: AnimeFormat;
        yearGte?: number;
        yearLte?: number;
    };
}

export async function fetchRandomThemes(options?: RandomThemesOptions) {
    const { data } = await client.query({
        query: RANDOM_THEME,
        variables: {
            input: options?.input,
        },
    });

    return data.animethemeShuffle;
}
