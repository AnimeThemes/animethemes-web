import { fetchDataClient } from "lib/client/index";
import type { SearchThemeQuery } from "generated/graphql";
import gql from "graphql-tag";
import { ThemeSummaryCard } from "components/card";

const backLog: SearchThemeQuery["searchTheme"]["data"] = [];

export async function fetchRandomTheme() {
    if (!backLog.length) {
        const { data } = await fetchDataClient<SearchThemeQuery>(gql`
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
                    }
                }
            }
        `);

        backLog.push(...data.searchTheme.data.map((theme) => {
            // Remove all entries which have spoilers (the filter parameter guarantees at least one spoiler-free entry)
            while (theme.entries[0].spoiler) {
                theme.entries.shift();
            }

            return theme;
        }));
    }

    return backLog.pop();
}
