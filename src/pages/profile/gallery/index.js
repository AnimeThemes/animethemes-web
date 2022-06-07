import { Text } from "components/text";
import styled from "styled-components";
import { Button } from "components/button";
import { useState } from "react";
import { API_URL } from "lib/common/animethemes/api";
import { SEO } from "components/seo";
import getSharedPageProps from "utils/getSharedPageProps";

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

const StyledImageContainer = styled.div`
    align-self: center;
    padding: 16px 16px 0 16px;
    
    transform: ${(props) => props.$isPushed && "scale(1.1, 0.9)"};
    transform-origin: bottom;
    will-change: transform;
    transition: transform 250ms;
`;

export default function GalleryPage({ grills }) {
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

function Grill({ grill }) {
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

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/image?filter[facet]=Grill&page[size]=100`);
    const json = await res.json();

    return {
        props: {
            ...getSharedPageProps(1),
            grills: json?.images ?? null
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
}
