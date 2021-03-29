const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    theme:    [ "id", "slug", "group" ],
    anime:    [ "id" ],
    song:     [ "id" ],
    entry:    [ "id" ]
});

async function fetchThemeList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching theme list");
    activity.start();

    const themeList = await fetchJsonPaginated(
        `${baseUrl}/api/theme?page[size]=100&${fields}&include=anime,song,entries&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.themes,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} themes fetched`)
        }
    );

    activity.end();

    return themeList;
}

module.exports = {
    fetchThemeList
};
