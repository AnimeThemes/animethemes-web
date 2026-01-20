import { useState } from "react";
import styled from "styled-components";
import type { GetStaticProps } from "next";

import type { ResultOf } from "@graphql-typed-document-node/core";

import { Button } from "@/components/button/Button";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 64px;
    align-items: flex-end;
`;

const StyledCell = styled.div`
    display: flex;
    flex-direction: column;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;

const StyledImageContainer = styled.div<{ $isPushed: boolean }>`
    align-self: center;
    padding: 16px 16px 0 16px;

    transform: ${(props) => props.$isPushed && "scale(1.1, 0.9)"};
    transform-origin: bottom;
    will-change: transform;
    transition: transform 250ms;
`;

const propsQuery = graphql(`
    query GalleryPage($first: Int!) {
        grills: imagePagination(facet_in: [GRILL], first: $first) {
            data {
                id
                link
            }
        }
    }
`);

interface GalleryPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function GalleryPage({ grills }: GalleryPageProps) {
    return (
        <>
            <SEO title="Grill Gallery" />
            <Text variant="h1">Grill Gallery</Text>
            <StyledGrid>
                {grills.data.map((grill) => (
                    <Grill key={grill.id} grill={grill} />
                ))}
            </StyledGrid>
        </>
    );
}

interface GrillProps {
    grill: GalleryPageProps["grills"]["data"][number];
}

function Grill({ grill }: GrillProps) {
    const [isPushed, setPushed] = useState(false);

    return (
        <StyledCell key={grill.id} onMouseDown={() => setPushed(true)} onMouseUp={() => setPushed(false)}>
            <StyledImageContainer $isPushed={isPushed}>
                <img src={grill.link} alt="Grill" />
            </StyledImageContainer>
            <Button>Pat Head</Button>
        </StyledCell>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
        variables: {
            first: Math.pow(2, 16) - 1,
        },
    });

    return {
        props: {
            ...getSharedPageProps(),
            ...data,
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
