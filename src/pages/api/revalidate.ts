import { fetchData } from "lib/server";
import gql from "graphql-tag";
import createVideoSlug from "utils/createVideoSlug";
import { BASE_PATH, REVALIDATE_TOKEN } from "utils/config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RevalidateAnimeQuery } from "generated/graphql";

interface RevalidateQuery {
    secret?: string
    id?: string
    resource?: string
    mode?: "page" | "resource"
}

type RevalidateResult = {
    revalidated: true
    affectedPaths: Array<string>
} | {
    message: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RevalidateResult>) {
    const { secret, id, resource, mode = "page" } = req.query as RevalidateQuery;

    if (secret !== REVALIDATE_TOKEN) {
        return res.status(401).json({ message: "Invalid token." });
    }

    if (!id) {
        return res.status(400).json({ message: "Invalid id." });
    }

    const paths = [];

    if (mode === "page") {
        paths.push(id);
    } else if (mode === "resource") {
        if (resource === "anime") {
            paths.push(...(await getAffectedPathsForAnime(id)));
        } else {
            return res.status(400).json({ message: "Invalid resource." });
        }
    } else {
        return res.status(400).json({ message: "Invalid mode." });
    }

    for (const path of paths) {
        await res.revalidate(`${BASE_PATH}${path}`);
    }

    return res.json({ revalidated: true, affectedPaths: paths });
}

async function getAffectedPathsForAnime(animeSlug: string): Promise<Array<string>> {
    const { data } = await fetchData<RevalidateAnimeQuery>(gql`
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        
        query RevalidateAnime($animeSlug: String!) {
            anime(slug: $animeSlug) {
                year
                season
                series {
                    slug
                }
                studios {
                    slug
                }
                themes {
                    ...createVideoSlugTheme
                    song {
                        performances {
                            artist {
                                slug
                            }
                        }
                    }
                    entries {
                        ...createVideoSlugEntry
                        videos {
                            ...createVideoSlugVideo
                        }
                    }
                }
            }
        }
    `, { animeSlug });

    if (!data.anime) {
        return [];
    }

    return [
        `/anime/${animeSlug}`,
        `/year/${data.anime.year}`,
        `/year/${data.anime.year}/${data.anime.season}`,
        data.anime.series.map((series) => `/series/${series.slug}`),
        data.anime.studios.map((studio) => `/studio/${studio.slug}`),
        data.anime.themes.flatMap((theme) => [
            theme.song?.performances.flatMap((performance) => `/artist/${performance.artist.slug}`) ?? [],
            theme.entries.flatMap((entry) => entry.videos.map((video) => `/anime/${animeSlug}/${createVideoSlug(theme, entry, video)}`)),
        ].flat()),
    ].flat().filter((e) => e);
}
