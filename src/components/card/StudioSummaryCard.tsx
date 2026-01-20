import { type SyntheticEvent, useState } from "react";

import type { Property } from "csstype";

import { SummaryCard } from "@/components/card/SummaryCard";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import extractBackgroundColor from "@/utils/extractBackgroundColor";
import extractImages from "@/utils/extractImages";

const fragments = {
    studio: graphql(`
        fragment StudioSummaryCardStudio on Studio {
            slug
            name
            images {
                nodes {
                    ...extractImagesImage
                }
            }
        }
    `),
};

interface StudioSummaryCardProps {
    studio: FragmentType<typeof fragments.studio>;
}

export function StudioSummaryCard({ studio: studioFragment }: StudioSummaryCardProps) {
    const studio = getFragmentData(fragments.studio, studioFragment);

    const [backgroundColor, setBackgroundColor] = useState<Property.Background>();

    function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
        const image = event.currentTarget;
        const color = extractBackgroundColor(image);
        if (color) {
            setBackgroundColor(color);
        }
    }

    return (
        <SummaryCard
            key={studio.slug}
            title={studio.name}
            description="Studio"
            to={`/studio/${studio.slug}`}
            image={extractImages(studio.images.nodes).largeCover}
            imageProps={{
                $objectFit: "contain",
                $backgroundColor: backgroundColor,
                onLoad: handleLoad,
            }}
        />
    );
}
