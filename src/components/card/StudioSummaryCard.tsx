import { type SyntheticEvent, useState } from "react";

import type { Property } from "csstype";
import gql from "graphql-tag";

import { SummaryCard } from "@/components/card/SummaryCard";
import type { StudioSummaryCardStudioFragment } from "@/generated/graphql";
import extractBackgroundColor from "@/utils/extractBackgroundColor";
import extractImages from "@/utils/extractImages";

interface StudioSummaryCardProps {
    studio: StudioSummaryCardStudioFragment;
}

export function StudioSummaryCard({ studio }: StudioSummaryCardProps) {
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
            image={extractImages(studio).largeCover}
            imageProps={{
                $objectFit: "contain",
                $backgroundColor: backgroundColor,
                onLoad: handleLoad,
            }}
        />
    );
}

StudioSummaryCard.fragments = {
    studio: gql`
        ${extractImages.fragments.resourceWithImages}

        fragment StudioSummaryCardStudio on Studio {
            slug
            name
            ...extractImagesResourceWithImages
        }
    `,
};
