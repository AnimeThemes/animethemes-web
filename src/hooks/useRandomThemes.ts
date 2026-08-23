import { useContext } from "react";
import { useRouter } from "next/router";

import PlayerContext, {
    createWatchListItem,
    WATCH_LIST_ITEM_ENTRY,
    WATCH_LIST_ITEM_THEME,
    WATCH_LIST_ITEM_VIDEO,
} from "@/context/playerContext";
import { getFragmentData } from "@/graphql/generated";
import { fetchRandomThemes, type RandomThemesOptions } from "@/lib/client/randomTheme";
import createVideoSlug from "@/utils/createVideoSlug";

export default function useRandomThemes() {
    const router = useRouter();
    const { setWatchList, setWatchListFactory, setCurrentWatchListItem } = useContext(PlayerContext);

    async function playRandomThemes(options: RandomThemesOptions) {
        const factory = async () => {
            const themes = await fetchRandomThemes(options);

            return themes.map((themeFragment) => {
                const theme = getFragmentData(WATCH_LIST_ITEM_THEME, themeFragment);
                const entry = getFragmentData(WATCH_LIST_ITEM_ENTRY, themeFragment.animethemeentries[0]);
                const video = getFragmentData(
                    WATCH_LIST_ITEM_VIDEO,
                    themeFragment.animethemeentries[0].videos.nodes[0],
                );

                return createWatchListItem(video, entry, theme);
            });
        };

        setWatchListFactory(factory);

        const watchList = await factory();

        setWatchList(watchList, true);
        setCurrentWatchListItem(watchList[0]);

        const { video, entry, theme } = watchList[0];
        const anime = theme?.anime;

        if (anime && entry && video) {
            const videoSlug = createVideoSlug(theme, entry, video);
            await router.push(`/anime/${anime.slug}/${videoSlug}`);
        }
    }

    return {
        playRandomThemes,
    };
}
