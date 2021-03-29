const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    series:   [ "id", "slug", "name" ],
    anime:    [ "id" ]
});

async function fetchSeriesList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching series list");
    activity.start();

    const seriesList = await fetchJsonPaginated(
        `${baseUrl}/api/series?page[size]=100&sort=name&${fields}&include=anime&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.series,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} series fetched`)
        }
    );

    activity.end();

    return seriesList;
}

module.exports = {
    fetchSeriesList
};
