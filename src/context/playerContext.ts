import { createContext } from "react";
import type { VideoSummaryCardVideoFragment } from "generated/graphql";

export interface WatchListItem extends VideoSummaryCardVideoFragment {
    watchListId: number;
}

interface PlayerContextInterface {
    currentVideo: VideoSummaryCardVideoFragment | null;
    clearCurrentVideo: () => void;
    watchList: WatchListItem[];
    setWatchList: (watchList: WatchListItem[], forceAutoPlay?: boolean) => void;
    watchListFactory: (() => Promise<WatchListItem[]>) | null;
    setWatchListFactory: (factory: (() => Promise<WatchListItem[]>) | null) => void;
    currentWatchListItem: WatchListItem | null;
    setCurrentWatchListItem: (watchListItem: WatchListItem | null) => void;
    addWatchListItem: (video: VideoSummaryCardVideoFragment) => void;
    addWatchListItemNext: (video: VideoSummaryCardVideoFragment) => void;
    isGlobalAutoPlay: boolean;
    setGlobalAutoPlay: (autoPlay: boolean) => void;
    isLocalAutoPlay: boolean;
    setLocalAutoPlay: (autoPlay: boolean) => void;
    isWatchListUsingLocalAutoPlay: boolean;
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
