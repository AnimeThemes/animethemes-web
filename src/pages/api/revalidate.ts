import type { NextApiRequest, NextApiResponse } from "next";

import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import { BASE_PATH } from "@/utils/config";

interface RevalidateQuery {
    secret?: string;
    id?: string;
}

type RevalidateResult =
    | {
          revalidated: true;
      }
    | {
          message: string;
      };

export default async function handler(req: NextApiRequest, res: NextApiResponse<RevalidateResult>) {
    const { id } = req.query as RevalidateQuery;

    const client = createApolloClient(req);

    const {
        data: { me },
    } = await client.query({
        query: graphql(`
            query RevalidateApi {
                me {
                    permissions {
                        nodes {
                            name
                        }
                    }
                    roles {
                        nodes {
                            permissions {
                                nodes {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        `),
    });

    const canRevalidate = (() => {
        const userPermissions = me?.permissions.nodes ?? [];
        const rolePermissions = me?.roles.nodes.flatMap((role) => role.permissions.nodes) ?? [];
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

    await res.revalidate(`${BASE_PATH}${id}`);

    return res.json({ revalidated: true });
}
