import { CLIENT_API_URL } from "utils/config.mjs";

export async function fetchRandomGrill(): Promise<string> {
    const res = await fetch(`${CLIENT_API_URL}/image?filter[facet]=Grill&sort=random&page[size]=1`);
    const json = await res.json();

    return json.images[0].link as string;
}
