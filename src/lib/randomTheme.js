import { baseUrl } from "gatsby-source-animethemes/src";

const backLog = [];

export async function fetchRandomTheme() {
    if (!backLog.length) {
        const res = await fetch(`${baseUrl}/api/animetheme?sort=random&include=anime,animethemeentries.videos`);
        const json = await res.json();

        backLog.push(...json.animethemes.map((theme) => ({
            ...theme,
            entries: theme.animethemeentries
        })));
    }

    return backLog.pop();
}
