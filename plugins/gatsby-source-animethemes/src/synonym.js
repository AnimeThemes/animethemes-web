const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    synonym:  [ "id", "text" ],
    anime:    [ "id" ]
});

async function fetchSynonymList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching synonym list");
    activity.start();

    const synonymList = await fetchJsonPaginated(
        `${baseUrl}/api/synonym?page[size]=100&${fields}&include=anime&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.synonyms,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} synonyms fetched`)
        }
    );

    activity.end();

    return synonymList;
}

module.exports = {
    fetchSynonymList
};
