import { useCallback } from "react";

import type { ResultOf } from "@graphql-typed-document-node/core";
import useLocalStorageState from "use-local-storage-state";

import type { THEME_SUMMARY_CARD_THEME } from "@/components/card/ThemeSummaryCard";

interface WatchHistoryTheme extends ResultOf<typeof THEME_SUMMARY_CARD_THEME> {
    id: number;
}

export type WatchHistory = Array<WatchHistoryTheme>;

export default function useWatchHistory() {
    const [history, setHistory] = useLocalStorageState<WatchHistory>("history", { defaultValue: [] });

    const addToHistory = useCallback(
        (theme: WatchHistoryTheme) => {
            setHistory((history) => {
                // Don't add if the most recent entry is the same as the new one
                if (history[history.length - 1]?.id === theme.id) {
                    return history;
                }
                // Remove all previous occurences of the theme to avoid duplicates
                const newHistory = history.filter((t) => t.id !== theme.id);

                newHistory.push(theme);

                // Keep history below 100 entries
                if (newHistory.length > 100) {
                    newHistory.shift();
                }

                return newHistory;
            });
        },
        [setHistory],
    );

    function clearHistory() {
        setHistory([]);
    }

    return {
        history,
        addToHistory,
        clearHistory,
    };
}
