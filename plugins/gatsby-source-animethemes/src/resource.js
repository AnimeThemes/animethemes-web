const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    resource: [ "id", "link", "site" ],
    anime:    [ "id" ],
    artist:   [ "id" ]
});

async function fetchResourceList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching resource list");
    activity.start();

    const resourceList = await fetchJsonPaginated(
        `${baseUrl}/api/resource?page[size]=100&${fields}&include=anime,artists&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.resources,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} resources fetched`)
        }
    );

    activity.end();

    return resourceList;
}

module.exports = {
    fetchResourceList
};
