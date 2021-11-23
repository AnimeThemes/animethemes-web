import { baseUrl } from "lib/client/api";

export async function fetchCurrentSeason() {
    const res = await fetch(`${baseUrl}/api/anime?sort=-year,-season&page[size]=1&fields[anime]=year,season`);
    const json = await res.json();

    return json.anime[0];
}
