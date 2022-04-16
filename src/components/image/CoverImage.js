import useImage from "hooks/useImage";
import { AspectRatio } from "components/utils";
import { FullWidthImage } from "components/image";

export function CoverImage({ resourceWithImages, ...props }) {
    const { smallCover, largeCover } = useImage(resourceWithImages);

    return (
        <AspectRatio ratio={2 / 3}>
            <FullWidthImage key={largeCover} src={largeCover} style={{ backgroundImage: `url(${smallCover})` }} {...props}/>
        </AspectRatio>
    );
}
