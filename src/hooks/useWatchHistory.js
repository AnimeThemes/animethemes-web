import useLocalStorageState from "use-local-storage-state";
import { ThemeSummaryCard } from "components/card";

export default function useLocalPlaylist() {
    const [ history, setHistory ] = useLocalStorageState("history", { ssr: true, defaultValue: [] });

    function addToHistory(theme) {
        ThemeSummaryCard.fetchData(theme.id).then((themeFiltered) => {
            // Don't add if the most recent entry is the same as the new one
            if (history[history.length - 1]?.id === theme.id) {
                return;
            }

            // Remove all previous occurences of the theme to avoid duplicates
            const newHistory = history.filter((t) => t.id !== theme.id);

            newHistory.push(themeFiltered);

            // Keep history below 100 entries
            if (newHistory.length > 100) {
                newHistory.shift();
            }

            setHistory(newHistory);
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
