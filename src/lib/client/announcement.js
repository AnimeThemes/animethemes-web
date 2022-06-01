import { baseUrl } from "lib/client/api";

export async function fetchAnnouncements() {
    const res = await fetch(`${baseUrl}/announcement`);
    const json = await res.json();

    return json.announcements;
}
