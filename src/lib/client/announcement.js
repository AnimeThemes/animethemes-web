import { CLIENT_API_URL } from "utils/config";

export async function fetchAnnouncements() {
    const res = await fetch(`${CLIENT_API_URL}/announcement`);
    const json = await res.json();

    return json.announcements;
}
