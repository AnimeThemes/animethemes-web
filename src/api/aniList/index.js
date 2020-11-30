import {fetchQuery, gql} from "api/graphql";

const url = "https://graphql.anilist.co";

export async function fetchAniListArtist(artistQuery) {
    const aniListArtist = await fetchQuery(url, gql`
        query($query: String) {
            Staff(search: $query) {
                image {
                    large
                }
            }
        }
    `, {
        query: artistQuery
    });

    if (!aniListArtist || !aniListArtist.Staff) {
        return {
            image: ""
        }
    }

    return {
        image: aniListArtist.Staff.image.large
    };
}
