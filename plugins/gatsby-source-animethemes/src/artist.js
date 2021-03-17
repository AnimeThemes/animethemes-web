const { baseUrl, fetchJson, createFieldParams } = require("./index");

const fields = createFieldParams({
    artist:   [ "id", "slug", "name" ],
    song:     [ "id" ],
    resource: [ "link", "site" ],
    image:    [ "facet", "link" ]
});

async function fetchArtistList({ reporter }) {
    const activity = reporter.activityTimer("Fetching artist list");
    activity.start();

    const artistList = [];

    let nextUrl = `${baseUrl}/api/artist?page[size]=100&sort=name&${fields}`;
    while (nextUrl) {
        const page = await fetchJson(nextUrl);

        artistList.push(...page.artists);

        nextUrl = page.links.next;

        activity.setStatus(`${artistList.length} artists fetched`);
    }

    activity.end();

    return artistList;
}

module.exports = {
    fetchArtistList
};
