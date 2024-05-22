import { useState } from "react";
import styled from "styled-components";
import type { GetStaticProps } from "next";

import gql from "graphql-tag";

import { Button } from "@/components/button/Button";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import type { GalleryPageQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
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

interface GalleryPageProps extends SharedPageProps, GalleryPageQuery {}

export default function GalleryPage({ grills }: GalleryPageProps) {
    return (
        <>
            <SEO title="Grill Gallery"/>
            <Text variant="h1">Grill Gallery</Text>
            <StyledGrid>
                {grills?.map((grill) => (
                    <Grill key={grill.id} grill={grill}/>
                ))}
            </StyledGrid>
        </>
    );
}

interface GrillProps {
    grill: GalleryPageProps["grills"][number]
}

function Grill({ grill }: GrillProps) {
    const [isPushed, setPushed] = useState(false);

    return (
        <StyledCell key={grill.id} onMouseDown={() => setPushed(true)} onMouseUp={() => setPushed(false)}>
            <StyledImageContainer $isPushed={isPushed}>
                <img src={grill.link} alt="Grill"/>
            </StyledImageContainer>
            <Button>Pat Head</Button>
        </StyledCell>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const { data, apiRequests } = await fetchData<GalleryPageQuery>(gql`
        query GalleryPage {
            grills: imageAll(facet: "Grill") {
                id
                link
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            grills: data.grills
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
};
