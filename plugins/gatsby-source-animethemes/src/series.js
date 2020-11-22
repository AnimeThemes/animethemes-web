const { baseUrl, fetchJsonCached, createFieldParams } = require("./index");

const fields = createFieldParams({
    series:   [ "id", "slug", "name" ],
    anime:     [ "id" ]
});

async function fetchSeriesList({ reporter }) {
    const activity = reporter.activityTimer("Fetching series list");
    activity.start();

    const seriesList = [];

    let nextUrl = `${baseUrl}/api/series?page[size]=100&sort=name&${fields}&include=anime`;
    while (nextUrl) {
        const page = await fetchJsonCached(nextUrl);

        seriesList.push(...page.series);

        nextUrl = page.links.next;

        activity.setStatus(`${seriesList.length} series fetched`);
    }

    activity.end();

    return seriesList;
}

module.exports = {
    fetchSeriesList
};
