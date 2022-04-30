import { baseUrl } from "lib/client/api";

export async function fetchRandomGrill() {
    const res = await fetch(`${baseUrl}/api/image?filter[facet]=Grill&sort=random&page[size]=1`);
    const json = await res.json();

    return json.images[0].link;
}
