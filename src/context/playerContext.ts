import { createContext } from "react";
import type { VideoSummaryCardVideoFragment } from "generated/graphql";

export interface WatchListItem extends VideoSummaryCardVideoFragment {
    watchListId: number;
}

interface PlayerContextInterface {
    currentVideo: VideoSummaryCardVideoFragment | null;
    clearCurrentVideo: () => void;
    watchList: WatchListItem[];
    setWatchList: (watchList: WatchListItem[]) => void;
    setWatchListFactory: (factory: (() => Promise<WatchListItem[]>) | null) => void;
    currentWatchListItem: WatchListItem | null;
    setCurrentWatchListItem: (watchListItem: WatchListItem | null) => void;
    addWatchListItem: (video: VideoSummaryCardVideoFragment) => void;
    addWatchListItemNext: (video: VideoSummaryCardVideoFragment) => void;
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
    setWatchListFactory: () => {
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

let nextWatchListId = 1;

export function createWatchListItem(video: VideoSummaryCardVideoFragment): WatchListItem {
    return {
        watchListId: nextWatchListId++,
        ...video,
    };
}
