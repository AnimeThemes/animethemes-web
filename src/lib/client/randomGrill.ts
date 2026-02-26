import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";

const RANDOM_GRILL = graphql(`
    query RandomGrill {
        imagePagination(facet: GRILL, sort: [RANDOM], first: 1) {
            data {
                link
            }
        }
    }
`);

export async function fetchRandomGrill(): Promise<string> {
    const { data } = await client.query({
        query: RANDOM_GRILL,
    });

    return data.imagePagination.data[0].link;
}
