const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    artist:   [ "id", "slug", "name" ],
    song:     [ "id" ],
    resource: [ "id" ],
    image:    [ "id" ]
});

async function fetchArtistList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching artist list");
    activity.start();

    const artistList = await fetchJsonPaginated(
        `${baseUrl}/api/artist?page[size]=100&sort=name&${fields}&include=songs,externalResources,images&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.artists,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} artists fetched`)
        }
    );

    activity.end();

    return artistList;
}

module.exports = {
    fetchArtistList
};
