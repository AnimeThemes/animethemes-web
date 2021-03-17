const { baseUrl, fetchJson } = require("./index");

function fetchAnnouncements() {
    return fetchJson(`${baseUrl}/api/announcement`)
        .then((json) => json.announcements);
}

module.exports = {
    fetchAnnouncements
};
