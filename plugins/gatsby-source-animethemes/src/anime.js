const { baseUrl, fetchJson, createFieldParams } = require("./index");

const fields = createFieldParams({
    anime:    [ "id", "name", "slug", "year", "season", "synopsis" ],
    synonym:  [ "text" ],
    image:    [ "facet", "link" ],
    theme:    [ "id", "slug", "group" ],
    song:     [ "id", "title" ],
    artist:   [ "id", "slug", "name", "as" ],
    entry:    [ "id", "version", "episodes", "nsfw", "spoiler" ],
    video:    [ "id", "filename", "basename", "link", "resolution", "nc", "subbed", "lyrics", "uncen", "source", "overlap", "tags" ],
    series:   [ "id", "name", "slug" ],
    resource: [ "link", "site" ]
});

async function fetchAnimeList({ reporter }) {
    const activity = reporter.activityTimer("Fetching anime list");
    activity.start();

    const animeList = [];

    let nextUrl = `${baseUrl}/api/anime?page[size]=100&sort=year,season,name&${fields}`;
    while (nextUrl) {
        const page = await fetchJson(nextUrl);

        animeList.push(...page.anime);

        nextUrl = page.links.next;

        activity.setStatus(`${animeList.length} anime fetched`);
    }

    activity.end();

    return animeList;
}

module.exports = {
    fetchAnimeList
};
