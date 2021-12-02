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
export const songTitleComparator = (a, b) => a.song.title.localeCompare(b.song.title);
export const themeTypeComparator = (a, b) => themeTypeOrder.indexOf(a.type.toLowerCase()) - themeTypeOrder.indexOf(b.type.toLowerCase());
export const themeIndexComparator = (a, b) => a.sequence - b.sequence;
