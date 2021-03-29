const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    entry:    [ "id", "version", "episodes", "nsfw", "spoiler" ],
    theme:    [ "id" ],
    video:    [ "id" ]
});

async function fetchEntryList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching entry list");
    activity.start();

    const entryList = await fetchJsonPaginated(
        `${baseUrl}/api/entry?page[size]=100&${fields}&include=theme,videos&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.entries,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} entries fetched`)
        }
    );

    activity.end();

    return entryList;
}

module.exports = {
    fetchEntryList
};
