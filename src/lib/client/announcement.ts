import { CLIENT_API_URL } from "utils/config";

export interface Announcement {
    id: number
    content: string
}

export async function fetchAnnouncements(): Promise<Array<Announcement>> {
    const res = await fetch(`${CLIENT_API_URL}/announcement`);
    const json = await res.json();

    return json.announcements as Array<Announcement>;
}
