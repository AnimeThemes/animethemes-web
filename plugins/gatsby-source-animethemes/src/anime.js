const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    anime:    [ "id", "name", "slug", "year", "season", "synopsis" ],
    image:    [ "id" ],
    theme:    [ "id" ],
    series:   [ "id" ],
    resource: [ "id" ]
});

async function fetchAnimeList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching anime list");
    activity.start();

    const animeList = await fetchJsonPaginated(
        `${baseUrl}/api/anime?page[size]=100&sort=year,season,name&${fields}&include=images,themes,series,externalResources&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.anime,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} anime fetched`)
        }
    );

    activity.end();

    return animeList;
}

module.exports = {
    fetchAnimeList
};
