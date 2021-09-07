import useImage from "hooks/useImage";
import { AspectRatio } from "components/utils";
import { FullWidthImage } from "components/image";

export function CoverImage({ resourceWithImages }) {
    const { smallCover, largeCover } = useImage(resourceWithImages);

    return (
        <AspectRatio ratio={2 / 3}>
            <FullWidthImage src={largeCover} style={{ backgroundImage: `url(${smallCover})` }} alt="Cover"/>
        </AspectRatio>
    );
}
