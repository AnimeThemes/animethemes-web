import type { AnimeSeason } from "@/graphql/generated/graphql";
import type { Comparator } from "@/utils/types";

const seasonOrder: Array<AnimeSeason> = ["WINTER", "SPRING", "SUMMER", "FALL"];
const themeTypeOrder = ["op", "ed"];

interface ComparatorChain<T> {
    chain: () => Comparator<T>;
    or: <K>(or: Comparator<K>) => ComparatorChain<T & K>;
}

export function either<T>(comparator: Comparator<T>): ComparatorChain<T> {
    return {
        chain: () => comparator,
        or: <K>(or: Comparator<K>) => either<T & K>((a, b) => comparator(a, b) || or(a, b)),
    };
}

export function reverse<T>(comparator: Comparator<T>): Comparator<T> {
    return (a, b) => comparator(b, a);
}

function automaticComparator<V>(a: V, b: V): number {
    if (!a && !b) {
        return 0;
    } else if (!a) {
        return -1;
    } else if (!b) {
        return 1;
    }

    if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
    } else if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }

    return 0;
}

function enumComparator<T>(target: Array<T | undefined>): Comparator<T | undefined> {
    return (a, b) => target.indexOf(a) - target.indexOf(b);
}

function nestedComparator<S, V>(
    extractor: (source: S) => V,
    comparator: Comparator<V> = automaticComparator,
): Comparator<S> {
    return (a, b) => comparator(extractor(a), extractor(b));
}

export const animeTitleComparator: Comparator<{ title: { romaji: string } }> = nestedComparator((anime) => anime.title.romaji);
export const animeYearComparator: Comparator<{ year: number | null }> = nestedComparator((anime) => anime.year);
export const animeSeasonComparator: Comparator<{ season: AnimeSeason | null }> = nestedComparator(
    (anime) => anime.season ?? undefined,
    enumComparator(seasonOrder),
);
export const animePremiereComparator = either(animeYearComparator).or(animeSeasonComparator).chain();
export const songTitleComparator: Comparator<{ song: { title: { romaji: string | null } } | null }> = nestedComparator(
    (theme) => theme.song?.title.romaji,
);
export const entryVersionComparator: Comparator<{ version: number | null }> = nestedComparator(
    (entry) => entry.version,
);
export const themeTypeComparator: Comparator<{ type: string }> = nestedComparator(
    (theme) => theme.type.toLowerCase(),
    enumComparator(themeTypeOrder),
);
export const themeIndexComparator: Comparator<{ sequence: number | null }> = nestedComparator(
    (theme) => theme.sequence,
);
export const themeGroupComparator: Comparator<{ group: { name: string } | null }> = nestedComparator(
    (theme) => theme.group?.name,
);
export const studioNameComparator: Comparator<{ name: string }> = nestedComparator((studio) => studio.name);
export const seriesTitleComparator: Comparator<{ title: { romaji: string } }> = nestedComparator((series) => series.title.romaji);
export const resourceSiteComparator: Comparator<{ site: string | null }> = nestedComparator(
    (resource) => resource.site,
);
export const resourceAsComparator: Comparator<{ as: string | null }> = nestedComparator((resource) => resource.as);

export const seasonComparator: Comparator<AnimeSeason> = enumComparator(seasonOrder);

export const UNSORTED = "unsorted";

export const ANIME_A_Z = "anime-a-z";
export const ANIME_Z_A = "anime-z-a";
export const ANIME_OLD_NEW = "anime-old-new";
export const ANIME_NEW_OLD = "anime-new-old";

export const SONG_A_Z = "song-a-z";
export const SONG_Z_A = "song-z-a";
export const SONG_A_Z_ANIME = "song-a-z-anime";
export const SONG_Z_A_ANIME = "song-z-a-anime";
export const SONG_OLD_NEW = "song-old-new";
export const SONG_NEW_OLD = "song-new-old";

const toAnime =
    <T>(comparator: Comparator<T>): Comparator<{ anime: T }> =>
    (a, b) =>
        comparator(a.anime, b.anime);

const comparators = {
    [UNSORTED]: () => 0,
    [ANIME_A_Z]: animeTitleComparator,
    [ANIME_Z_A]: reverse(animeTitleComparator),
    [ANIME_OLD_NEW]: either(animePremiereComparator).or(animeTitleComparator).chain(),
    [ANIME_NEW_OLD]: either(reverse(animePremiereComparator)).or(animeTitleComparator).chain(),
    [SONG_A_Z]: songTitleComparator,
    [SONG_Z_A]: reverse(songTitleComparator),
    [SONG_A_Z_ANIME]: either(toAnime(animeTitleComparator)).or(themeTypeComparator).or(themeIndexComparator).chain(),
    [SONG_Z_A_ANIME]: either(reverse(toAnime(animeTitleComparator)))
        .or(themeTypeComparator)
        .or(themeIndexComparator)
        .chain(),
    [SONG_OLD_NEW]: either(toAnime(animePremiereComparator))
        .or(toAnime(animeTitleComparator))
        .or(songTitleComparator)
        .chain(),
    [SONG_NEW_OLD]: either(reverse(toAnime(animePremiereComparator)))
        .or(toAnime(animeTitleComparator))
        .or(songTitleComparator)
        .chain(),
} as const;

export function getComparator<T extends keyof typeof comparators>(name: T): (typeof comparators)[T] {
    return comparators[name];
}

export function sortTransformed<T, K>(comparator: Comparator<T>, transformator: (from: K) => T): Comparator<K> {
    return (a, b) => comparator(transformator(a), transformator(b));
}

export const compare = automaticComparator;
