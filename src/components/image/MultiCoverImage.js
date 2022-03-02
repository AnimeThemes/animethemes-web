import useImage from "hooks/useImage";
import { AspectRatio } from "components/utils";
import styled from "styled-components";

const StyledCoverContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
`;
const StyledCoverItemContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;
const StyledCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    background-position: center;
`;

export function MultiCoverImage({ resourcesWithImages, ...props }) {
    const images = [
        [ useImage(resourcesWithImages[0]), resourcesWithImages[0] ],
        [ useImage(resourcesWithImages[1]), resourcesWithImages[1] ],
        [ useImage(resourcesWithImages[2]), resourcesWithImages[2] ],
        [ useImage(resourcesWithImages[3]), resourcesWithImages[3] ]
    ]
        .map(([ images, resource ]) => ({
            largeCover: images.largeCover,
            smallCover: images.smallCover,
            resource
        }))
        .filter(({ largeCover }) => !!largeCover);

    return (
        <AspectRatio ratio={2 / 3}>
            <StyledCoverContainer>
                {images.map(({ largeCover, smallCover, resource }) => (
                    <StyledCoverItemContainer key={largeCover}>
                        <StyledCover
                            loading="lazy"
                            src={largeCover}
                            alt={`Cover image of ${resource.name}`}
                            title={resource.name}
                            style={{ backgroundImage: `url(${smallCover})` }}
                            {...props}
                        />
                    </StyledCoverItemContainer>
                ))}
            </StyledCoverContainer>
        </AspectRatio>
    );
}
