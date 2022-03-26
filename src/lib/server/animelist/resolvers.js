module.exports = {
    Query: {
        animeList: async (_, { username, site }, context) => {
            if (site === "MY_ANIME_LIST") {
                context.externalSite = 7;

                const response = await fetch(
                    `https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status&limit=1000`,
                    { headers: { "X-MAL-CLIENT-ID": process.env.MAL_API_KEY } }
                );
                const json = await response.json();

                if (!json.data) {
                    return null;
                }

                const animeList = json.data;

                return animeList.map(({ node, list_status }) => ({
                    externalId: node.id,
                    externalName: node.title,
                    externalImage: node.main_picture.medium,
                    listStatus: {
                        status: convertMyAnimeListStatusType(list_status.status),
                        score: list_status.score,
                        updatedAt: list_status.updated_at
                    }
                }));
            } else if (site === "ANI_LIST") {
                context.externalSite = 3;

                // language=GraphQL
                const query = `
                    query ($username: String) {
                        MediaListCollection(userName: $username, type: ANIME) {
                            lists {
                                entries {
                                    mediaId
                                    status
                                    score(format: POINT_10)
                                    updatedAt
                                    media {
                                        title {
                                            romaji
                                        }
                                        coverImage {
                                            medium
                                        }
                                    }
                                }
                            }
                        }
                    }
                `;

                const response = await fetch(
                    "https://graphql.anilist.co",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            query,
                            variables: {
                                username
                            }
                        })
                    }
                );
                const json = await response.json();

                if (!json.data) {
                    return null;
                }

                const animeList = json.data.MediaListCollection.lists.flatMap((list) => list.entries);

                return animeList.map((entry) => ({
                    externalId: entry.mediaId,
                    externalName: entry.media.title.romaji,
                    externalImage: entry.media.coverImage.medium,
                    listStatus: {
                        status: convertAniListStatusType(entry.status),
                        score: entry.score,
                        updatedAt: entry.updatedAt
                    }
                }));
            }

            return null;
        }
    }
};

function convertMyAnimeListStatusType(statusType) {
    return statusType.toUpperCase();
}

function convertAniListStatusType(statusType) {
    switch (statusType) {
        case "CURRENT":
            return "WATCHING";
        case "PLANNING":
            return "PLAN_TO_WATCH";
        case "COMPLETED":
        case "REPEATING":
            return "COMPLETED";
        case "DROPPED":
            return "DROPPED";
        case "PAUSED":
            return "ON_HOLD";
        default:
            return null;
    }
}
