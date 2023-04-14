import { fetchDataClient } from "lib/client/index";
import type { RandomThemeQuery } from "generated/graphql";
import gql from "graphql-tag";
import { ThemeSummaryCard } from "components/card";

export async function fetchRandomThemes() {
    const { data } = await fetchDataClient<RandomThemeQuery>(gql`
        ${ThemeSummaryCard.fragments.theme}
        ${ThemeSummaryCard.fragments.expandable}

        query RandomTheme {
            searchTheme(args: { 
                sortBy: "random"
                filters: [
                    { key: "has" value: "animethemeentries" }
                    { key: "spoiler" value: "false" }
                ]
            }) {
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
    `);

    return data.searchTheme.data.map((theme) => {
        // Remove all entries which have spoilers (the filter parameter guarantees at least one spoiler-free entry)
        while (theme.entries[0].spoiler) {
            theme.entries.shift();
        }

        return theme;
    });
}
