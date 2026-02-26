import { useContext } from "react";
import { useRouter } from "next/router";

import { VIDEO_SUMMARY_CARD_ENTRY, VIDEO_SUMMARY_CARD_VIDEO } from "@/components/card/VideoSummaryCard";
import PlayerContext, { createWatchListItem } from "@/context/playerContext";
import { getFragmentData } from "@/graphql/generated";
import { fetchRandomThemes, type RandomThemesOptions } from "@/lib/client/randomTheme";
import createVideoSlug from "@/utils/createVideoSlug";

export default function useRandomThemes() {
    const router = useRouter();
    const { setWatchList, setWatchListFactory, setCurrentWatchListItem } = useContext(PlayerContext);

    async function playRandomThemes(options: RandomThemesOptions) {
        const factory = async () => {
            const themes = await fetchRandomThemes(options);

            return themes.map((theme) => {
                const entry = getFragmentData(VIDEO_SUMMARY_CARD_ENTRY, theme.animethemeentries[0]);
                const video = getFragmentData(VIDEO_SUMMARY_CARD_VIDEO, theme.animethemeentries[0].videos.nodes[0]);

                return createWatchListItem(video, entry);
            });
        };

        setWatchListFactory(factory);

        const watchList = await factory();

        setWatchList(watchList, true);
        setCurrentWatchListItem(watchList[0]);

        const { video, entry } = watchList[0];
        const theme = entry.animetheme;
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
