const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    video:    [ "id", "filename", "basename", "link", "resolution", "nc", "subbed", "lyrics", "uncen", "source", "overlap", "tags" ],
    entry:    [ "id" ]
});

async function fetchVideoList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching video list");
    activity.start();

    const videoList = await fetchJsonPaginated(
        `${baseUrl}/api/video?page[size]=100&${fields}&include=entries&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.videos,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} videos fetched`)
        }
    );

    activity.end();

    return videoList;
}

module.exports = {
    fetchVideoList
};
