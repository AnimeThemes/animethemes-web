const seasonOrder = [
    "winter",
    "spring",
    "summer",
    "fall"
];
const themeTypeOrder = [
    "op",
    "ed"
];

export const reverse = (comparator) => (a, b) => comparator(b, a);
export const chain = (...comparators) => (a, b) => {
    for (const comparator of comparators) {
        const delta = comparator(a, b);
        if (delta !== 0) {
            return delta;
        }
    }
    return 0;
};

export const animeNameComparator = (a, b) => a.name.localeCompare(b.name);
export const animeYearComparator = (a, b) => a.year - b.year;
export const animeSeasonComparator = (a, b) => seasonOrder.indexOf(a.season.toLowerCase()) - seasonOrder.indexOf(b.season.toLowerCase());
export const animePremiereComparator = chain(animeYearComparator, animeSeasonComparator);
export const songTitleComparator = (a, b) => a.song?.title?.localeCompare(b.song?.title);
export const themeTypeComparator = (a, b) => themeTypeOrder.indexOf(a.type.toLowerCase()) - themeTypeOrder.indexOf(b.type.toLowerCase());
export const themeIndexComparator = (a, b) => a.sequence - b.sequence;
export const studioNameComparator = (a, b) => a.name.localeCompare(b.name);
export const seriesNameComparator = (a, b) => a.name.localeCompare(b.name);
export const resourceSiteComparator = (a, b) => a.site.localeCompare(b.site);
export const resourceAsComparator = (a, b) => (!a.as && -1) || (!b.as && 1) || a.as.localeCompare(b.as);

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

const toAnime = (comparator) => (a, b) => comparator(a.anime, b.anime);

const comparators = new Map([
    [ UNSORTED, () => 0 ],
    [ ANIME_A_Z, animeNameComparator ],
    [ ANIME_Z_A, reverse(animeNameComparator) ],
    [ ANIME_OLD_NEW, chain(animePremiereComparator, animeNameComparator) ],
    [ ANIME_NEW_OLD, chain(reverse(animePremiereComparator), animeNameComparator) ],
    [ SONG_A_Z, songTitleComparator ],
    [ SONG_Z_A, reverse(songTitleComparator) ],
    [ SONG_A_Z_ANIME, chain(toAnime(animeNameComparator), themeTypeComparator, themeIndexComparator) ],
    [ SONG_Z_A_ANIME, chain(reverse(toAnime(animeNameComparator)), themeTypeComparator, themeIndexComparator) ],
    [ SONG_OLD_NEW, chain(toAnime(animePremiereComparator), toAnime(animeNameComparator), songTitleComparator) ],
    [ SONG_NEW_OLD, chain(reverse(toAnime(animePremiereComparator)), toAnime(animeNameComparator), songTitleComparator) ]
]);

export function getComparator(name) {
    return comparators.get(name);
}
