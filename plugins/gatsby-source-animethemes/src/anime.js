const { baseUrl, fetchJsonCached, createFieldParams } = require("./index");

const fields = createFieldParams({
    anime:    [ "id", "name", "slug", "year", "season" ],
    synonym:  [ "text" ],
    theme:    [ "id", "slug", "group" ],
    song:     [ "id", "title" ],
    artist:   [ "id", "slug", "name", "as" ],
    entry:    [ "id", "version", "episodes", "nsfw", "spoiler" ],
    video:    [ "id", "filename", "link", "resolution", "nc", "subbed", "lyrics", "uncen", "source", "overlap" ],
    series:   [ "id", "name", "slug" ],
    resource: [ "link", "site" ]
});

function fetchAnime(slug) {
    return fetchJsonCached(`${baseUrl}/api/anime/${slug}`);
}

async function fetchAnimeList({ reporter }) {
    const activity = reporter.activityTimer("Fetching anime list");
    activity.start();

    const animeList = [];

    let nextUrl = `${baseUrl}/api/anime?page[size]=100&sort=year,season,name&${fields}`;
    while (nextUrl) {
        const page = await fetchJsonCached(nextUrl);

        animeList.push(...page.anime);

        nextUrl = page.links.next;

        activity.setStatus(`${animeList.length} anime fetched`);
    }

    activity.end();

    return animeList;
}

function fetchAnimeSearch(query = "") {
    return fetchJsonCached(`${baseUrl}/api/search?${fields}&q=${query}`)
        .then((json) => json.anime);
}

function fetchAnimeSlugs() {
    return fetchAnimeList()
        .then((animeList) => animeList.map((anime) => anime.slug));
}

function fetchAnimeByYear(year) {
    return fetchJsonCached(`${baseUrl}/api/year/${year}`);
}

function fetchAvailableYears() {
    return fetchJsonCached(`${baseUrl}/api/year`);
}

module.exports = {
    fetchAnime,
    fetchAnimeList,
    fetchAnimeSearch,
    fetchAnimeSlugs,
    fetchAnimeByYear,
    fetchAvailableYears
};
