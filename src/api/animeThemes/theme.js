const { baseUrl, fetchJsonCached } = require("./index");

export function fetchTheme(id) {
    return fetchJsonCached(`${baseUrl}/api/theme/${id}`);
}

export function fetchThemeSearch(query = "") {
    return fetchJsonCached(`${baseUrl}/api/search?fields=themes&q=${query}`)
        .then((json) => json.themes);
}
