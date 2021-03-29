const { baseUrl, fetchJsonPaginated, createFieldParams } = require("./index");

const fields = createFieldParams({
    image:    [ "id", "facet", "link" ],
    anime:    [ "id" ],
    artist:   [ "id" ]
});

async function fetchImageList({ reporter, lastFetched }) {
    const activity = reporter.activityTimer("Fetching image list");
    activity.start();

    const imageList = await fetchJsonPaginated(
        `${baseUrl}/api/image?page[size]=100&${fields}&include=anime,artists&filter[updated_at][gte]=${lastFetched}`,
        {
            reducer: (page) => page.images,
            flatten: true,
            onProgress: (results) => activity.setStatus(`${results.length} images fetched`)
        }
    );

    activity.end();

    return imageList;
}

module.exports = {
    fetchImageList
};
