import type { NextApiRequest, NextApiResponse } from "next";

import gql from "graphql-tag";

import type { RevalidateAnimeQuery, RevalidateApiQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import { BASE_PATH } from "@/utils/config";
import createVideoSlug from "@/utils/createVideoSlug";

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
    const { id, resource, mode = "page" } = req.query as RevalidateQuery;
    const { data: { me } } = await fetchData<RevalidateApiQuery>(gql`
        query RevalidateApi {
            me {
                user {
                    permissions {
                        name
                    }
                    roles {
                        permissions {
                            name
                        }
                    }
                }
            }
        }
    `, undefined, { req });
    const canRevalidate = (() => {
        const userPermissions = me.user?.permissions ?? [];
        const rolePermissions = me.user?.roles.flatMap((role) => role.permissions) ?? [];
        for (const permission of [...userPermissions, ...rolePermissions]) {
            if (permission.name === "revalidate pages") {
                return true;
            }
        }
        return false;
    })();

    if (!canRevalidate) {
        return res.status(403).json({ message: "Forbidden." });
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
