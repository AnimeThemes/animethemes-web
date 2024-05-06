import { createContext } from "react";
import type { VideoSummaryCardVideoFragment } from "generated/graphql";

export interface WatchListItem extends VideoSummaryCardVideoFragment {
    watchListId: number;
}

interface PlayerContextInterface {
    watchList: WatchListItem[];
    setWatchList: (watchList: WatchListItem[], forceAutoPlay?: boolean) => void;
    watchListFactory: (() => Promise<WatchListItem[]>) | null;
    setWatchListFactory: (factory: (() => Promise<WatchListItem[]>) | null) => void;
    currentWatchListItem: WatchListItem | null;
    setCurrentWatchListItem: (watchListItem: WatchListItem | null) => void;
    addWatchListItem: (video: VideoSummaryCardVideoFragment) => void;
    addWatchListItemNext: (video: VideoSummaryCardVideoFragment) => void;
    clearWatchList: () => void;
    isGlobalAutoPlay: boolean;
    setGlobalAutoPlay: (autoPlay: boolean) => void;
    isLocalAutoPlay: boolean;
    setLocalAutoPlay: (autoPlay: boolean) => void;
    isWatchListUsingLocalAutoPlay: boolean;
}

const PlayerContext = createContext<PlayerContextInterface>({
    watchList: [],
    setWatchList: () => {
        // Do nothing
    },
    watchListFactory: null,
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
    clearWatchList: () => {
        // Do nothing
    },
    isGlobalAutoPlay: false,
    setGlobalAutoPlay: () => {
        // Do nothing
    },
    isLocalAutoPlay: false,
    setLocalAutoPlay: () => {
        // Do nothing
    },
    isWatchListUsingLocalAutoPlay: false,
});

export default PlayerContext;

let nextWatchListId = 1;

export function createWatchListItem(video: VideoSummaryCardVideoFragment): WatchListItem {
    return {
        watchListId: nextWatchListId++,
        ...video,
    };
}
