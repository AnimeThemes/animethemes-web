const { baseUrl, fetchJsonCached } = require("./index");

export function fetchArtistSearch(query = "") {
    return fetchJsonCached(`${baseUrl}/api/search?fields=themes&q=${query}`)
        .then((json) => json.artists);
}
