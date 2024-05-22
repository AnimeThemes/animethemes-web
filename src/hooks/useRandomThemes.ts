import { useContext } from "react";
import { useRouter } from "next/router";

import PlayerContext, { createWatchListItem } from "@/context/playerContext";
import { fetchRandomThemes, type RandomThemesOptions } from "@/lib/client/randomTheme";
import createVideoSlug from "@/utils/createVideoSlug";

export default function useRandomThemes() {
    const router = useRouter();
    const { setWatchList, setWatchListFactory, setCurrentWatchListItem } = useContext(PlayerContext);

    async function playRandomThemes(options: RandomThemesOptions) {
        const factory = async () => {
            const themes = await fetchRandomThemes(options);

            return themes.map((theme) => {
                const entry = theme.entries[0];
                const video = entry.videos[0];

                return createWatchListItem({
                    ...video,
                    entries: [{
                        ...entry,
                        theme,
                    }],
                });
            });
        };

        setWatchListFactory(factory);

        const watchList = await factory();

        setWatchList(watchList, true);
        setCurrentWatchListItem(watchList[0]);

        const video = watchList[0];
        const entry = video.entries[0];
        const theme = entry.theme;
        const anime = theme?.anime;

        if (anime && entry && video) {
            const videoSlug = createVideoSlug(theme, entry, video);
            await router.push(`/anime/${anime.slug}/${videoSlug}`);
        }
    }

    return {
        playRandomThemes
    };
}
