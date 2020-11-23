const { baseUrl, fetchJsonCached } = require("./index");

export function fetchSearch(query = "", fields = [ "anime", "themes", "artists" ]) {
    return fetchJsonCached(`${baseUrl}/api/search?fields=${fields.join()}&q=${query}`);
}
