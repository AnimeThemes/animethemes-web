import type { ComponentPropsWithoutRef } from "react";

import { FullWidthImage } from "@/components/image/FullWidthImage";
import { AspectRatio } from "@/components/utils/AspectRatio";

interface CoverImageProps extends ComponentPropsWithoutRef<typeof FullWidthImage> {
    smallCover: string | undefined;
    largeCover: string | undefined;
}

export function CoverImage({ smallCover, largeCover, ...props }: CoverImageProps) {
    return (
        <AspectRatio $ratio={2 / 3}>
            <FullWidthImage
                key={largeCover}
                src={largeCover}
                style={{ backgroundImage: `url(${smallCover})` }}
                {...props}
            />
        </AspectRatio>
    );
}
