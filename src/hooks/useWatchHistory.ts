import useLocalStorageState from "use-local-storage-state";
import type { FetchThemeSummaryCardData } from "components/card/ThemeSummaryCard";
import { fetchThemeSummaryCardData } from "components/card/ThemeSummaryCard";

interface WatchHistoryTheme {
    id: number
}

export type WatchHistory = Array<NonNullable<FetchThemeSummaryCardData> & WatchHistoryTheme>;

export default function useWatchHistory() {
    const [ history, setHistory ] = useLocalStorageState<WatchHistory>("history", { ssr: true, defaultValue: [] });

    function addToHistory(theme: WatchHistoryTheme) {
        // Don't add if the most recent entry is the same as the new one
        if (history[history.length - 1]?.id === theme.id) {
            return;
        }

        fetchThemeSummaryCardData(theme.id).then((themeFresh) => {
            if (themeFresh) {
                setHistory((history) => {
                    // Remove all previous occurences of the theme to avoid duplicates
                    const newHistory = history.filter((t) => t.id !== theme.id);

                    newHistory.push(themeFresh);

                    // Keep history below 100 entries
                    if (newHistory.length > 100) {
                        newHistory.shift();
                    }

                    return newHistory;
                });
            }
        });
    }

    function clearHistory() {
        setHistory([]);
    }

    return {
        history,
        addToHistory,
        clearHistory,
    };
}
