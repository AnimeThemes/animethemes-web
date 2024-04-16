import { fetchDataClient } from "lib/client/index";
import type { RandomThemeQuery, RandomThemeQueryVariables } from "generated/graphql";
import gql from "graphql-tag";
import { ThemeSummaryCard } from "components/card";

export interface RandomThemesOptions {
    themeType?: string;
    animeYearMin?: number;
    animeYearMax?: number;
}

export async function fetchRandomThemes(options?: RandomThemesOptions) {
    const args = {
        sortBy: "random",
        filters: [
            { key: "has", value: "anime,animethemeentries" },
            { key: "spoiler", value: "false" },
        ],
    } satisfies RandomThemeQueryVariables["args"];

    if (options?.themeType) {
        args.filters.push({ key: "type", value: options.themeType });
    }
    if (options?.animeYearMin) {
        args.filters.push({ key: "anime][year-gte", value: String(options.animeYearMin) });
    }
    if (options?.animeYearMax) {
        args.filters.push({ key: "anime][year-lte", value: String(options.animeYearMax) });
    }

    const { data } = await fetchDataClient<RandomThemeQuery, RandomThemeQueryVariables>(gql`
        ${ThemeSummaryCard.fragments.theme}
        ${ThemeSummaryCard.fragments.expandable}

        query RandomTheme($args: SearchArgs!) {
            searchTheme(args: $args) {
                data {
                    ...ThemeSummaryCardTheme
                    ...ThemeSummaryCardThemeExpandable
                    entries {
                        videos {
                            basename
                            audio {
                                basename
                            }
                        }
                    }
                }
            }
        }
    `, { args });

    return data.searchTheme.data.map((theme) => {
        // Remove all entries which have spoilers (the filter parameter guarantees at least one spoiler-free entry)
        while (theme.entries[0].spoiler) {
            theme.entries.shift();
        }

        return theme;
    });
}
