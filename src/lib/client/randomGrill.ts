import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";

const RANDOM_GRILL = graphql(`
    query RandomGrill {
        imageConnection(filter: { facet: GRILL }, sort: [RANDOM], pagination: { first: 1 }) {
            nodes {
                link
            }
        }
    }
`);

export async function fetchRandomGrill(): Promise<string> {
    const { data } = await client.query({
        query: RANDOM_GRILL,
    });

    return data.imageConnection.nodes[0].link;
}
