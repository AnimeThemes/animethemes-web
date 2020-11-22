// TODO: This will be obsolete when cover images are provided with anime.

import useSWR from "swr";
import {baseUrl} from "../../plugins/gatsby-source-animethemes/src/index";

export default function useAnime(slug) {
    const { data: anime } = useSWR(
        `${baseUrl}/api/anime/${slug}`,
        (url) => fetch(url).then((res) => res.json())
    );

    return anime;
}
