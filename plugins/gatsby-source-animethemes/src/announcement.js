const { baseUrl, fetchJsonCached } = require("./index");

function fetchAnnouncements() {
    return fetchJsonCached(`${baseUrl}/api/announcement`)
        .then((json) => json.announcements);
}

module.exports = {
    fetchAnnouncements
};
