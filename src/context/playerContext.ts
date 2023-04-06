import { createContext } from "react";
import type { VideoSummaryCardVideoFragment } from "generated/graphql";

interface PlayerContextInterface {
    currentVideo: VideoSummaryCardVideoFragment | null;
    clearCurrentVideo: () => void;
    watchList: VideoSummaryCardVideoFragment[];
    setWatchList: (watchList: VideoSummaryCardVideoFragment[]) => void;
    currentWatchListItem: VideoSummaryCardVideoFragment | null;
    setCurrentWatchListItem: (currentWatchListItem: VideoSummaryCardVideoFragment | null) => void;
    addWatchListItem: (watchListItem: VideoSummaryCardVideoFragment) => void;
    addWatchListItemNext: (watchListItem: VideoSummaryCardVideoFragment) => void;
}

const PlayerContext = createContext<PlayerContextInterface>({
    currentVideo: null,
    clearCurrentVideo: () => {
        // Do nothing
    },
    watchList: [],
    setWatchList: () => {
        // Do nothing
    },
    currentWatchListItem: null,
    setCurrentWatchListItem: () => {
        // Do nothing
    },
    addWatchListItem: () => {
        // Do nothing
    },
    addWatchListItemNext: () => {
        // Do nothing
    },
});

export default PlayerContext;
