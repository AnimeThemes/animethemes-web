import { createContext } from "react";

import type { ResultOf } from "@graphql-typed-document-node/core";

import { graphql } from "@/graphql/generated";

export const WATCH_LIST_ITEM_VIDEO = graphql(`
    fragment WatchListItemVideo on Video {
        ...VideoPlayerVideo
        ...VideoSummaryCardVideo
        ...createVideoSlugVideo
        id
    }
`);

export const WATCH_LIST_ITEM_ENTRY = graphql(`
    fragment WatchListItemEntry on AnimeThemeEntry {
        ...VideoPlayerEntry
        ...VideoSummaryCardEntry
        ...createVideoSlugEntry
    }
`);

export const WATCH_LIST_ITEM_THEME = graphql(`
    fragment WatchListItemTheme on AnimeTheme {
        ...VideoSummaryCardTheme
        ...createVideoSlugTheme
        type
        sequence
        anime {
            slug
        }
        group {
            slug
        }
    }
`);

export interface WatchListItem {
    watchListId: number;
    video: ResultOf<typeof WATCH_LIST_ITEM_VIDEO>;
    entry: ResultOf<typeof WATCH_LIST_ITEM_ENTRY>;
    theme: ResultOf<typeof WATCH_LIST_ITEM_THEME>;
}

interface PlayerContextInterface {
    watchList: WatchListItem[];
    setWatchList: (watchList: WatchListItem[], forceAutoPlay?: boolean) => void;
    watchListFactory: (() => Promise<WatchListItem[]>) | null;
    setWatchListFactory: (factory: (() => Promise<WatchListItem[]>) | null) => void;
    currentWatchListItem: WatchListItem | null;
    setCurrentWatchListItem: (watchListItem: WatchListItem | null) => void;
    addWatchListItem: (
        video: ResultOf<typeof WATCH_LIST_ITEM_VIDEO>,
        entry: ResultOf<typeof WATCH_LIST_ITEM_ENTRY>,
        theme: ResultOf<typeof WATCH_LIST_ITEM_THEME>,
    ) => void;
    addWatchListItemNext: (
        video: ResultOf<typeof WATCH_LIST_ITEM_VIDEO>,
        entry: ResultOf<typeof WATCH_LIST_ITEM_ENTRY>,
        theme: ResultOf<typeof WATCH_LIST_ITEM_THEME>,
    ) => void;
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
    video: ResultOf<typeof WATCH_LIST_ITEM_VIDEO>,
    entry: ResultOf<typeof WATCH_LIST_ITEM_ENTRY>,
    theme: ResultOf<typeof WATCH_LIST_ITEM_THEME>,
): WatchListItem {
    return {
        watchListId: nextWatchListId++,
        video,
        entry,
        theme,
    };
}
