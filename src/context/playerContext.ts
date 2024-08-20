import { createContext } from "react";

import type { VideoSummaryCardEntryFragment, VideoSummaryCardVideoFragment } from "@/generated/graphql";

export interface WatchListItem {
    watchListId: number;
    video: VideoSummaryCardVideoFragment;
    entry: VideoSummaryCardEntryFragment;
}

interface PlayerContextInterface {
    watchList: WatchListItem[];
    setWatchList: (watchList: WatchListItem[], forceAutoPlay?: boolean) => void;
    watchListFactory: (() => Promise<WatchListItem[]>) | null;
    setWatchListFactory: (factory: (() => Promise<WatchListItem[]>) | null) => void;
    currentWatchListItem: WatchListItem | null;
    setCurrentWatchListItem: (watchListItem: WatchListItem | null) => void;
    addWatchListItem: (video: VideoSummaryCardVideoFragment, entry: VideoSummaryCardEntryFragment) => void;
    addWatchListItemNext: (video: VideoSummaryCardVideoFragment, entry: VideoSummaryCardEntryFragment) => void;
    clearWatchList: () => void;
    isGlobalAutoPlay: boolean;
    setGlobalAutoPlay: (autoPlay: boolean) => void;
    isLocalAutoPlay: boolean;
    setLocalAutoPlay: (autoPlay: boolean) => void;
    isWatchListUsingLocalAutoPlay: boolean;
    isRepeat: boolean;
    setRepeat: (repeat: boolean) => void;
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
    isRepeat: false,
    setRepeat: () => {
        // Do nothing
    },
});

export default PlayerContext;

let nextWatchListId = 1;

export function createWatchListItem(
    video: VideoSummaryCardVideoFragment,
    entry: VideoSummaryCardEntryFragment,
): WatchListItem {
    return {
        watchListId: nextWatchListId++,
        video,
        entry,
    };
}
