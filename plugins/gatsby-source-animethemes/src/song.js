const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    song:     [ "id", "title" ],
    theme:    [ "id" ],
    artist:   [ "id", "as" ]
});

async function fetchSongList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching song list");
    activity.start();

    const songList = await fetchJsonPaginated(
        `${baseUrl}/api/song?page[size]=100&${fields}&include=themes,artists&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.songs,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} songs fetched`)
        }
    );

    activity.end();

    return songList;
}

module.exports = {
    fetchSongList
};
