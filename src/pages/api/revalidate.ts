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
        data: { permissions },
    } = await client.query({
        query: graphql(`
            query RevalidateApi {
                permissions {
                    canRevalidatePages
                }
            }
        `),
    });

    if (!permissions.canRevalidatePages) {
        return res.status(403).json({ message: "Forbidden." });
    }

    if (!id) {
        return res.status(400).json({ message: "Invalid id." });
    }

    await res.revalidate(`${BASE_PATH}${id}`);

    return res.json({ revalidated: true });
}
