import { fetchRandomTheme } from "lib/randomTheme";
import createVideoSlug from "utils/createVideoSlug";
import { navigate } from "gatsby";

export default function navigateToRandomTheme() {
    fetchRandomTheme()
        .then((randomTheme) => (
            !!randomTheme?.anime?.slug &&
            !!randomTheme?.entries[0]?.videos?.length &&
            `/anime/${randomTheme.anime.slug}/${createVideoSlug(randomTheme, randomTheme.entries[0], randomTheme.entries[0].videos[0])}`
        ))
        .then((randomVideoPath) => {
            if (randomVideoPath) {
                navigate(randomVideoPath);
            }
        });
}
