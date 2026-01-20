import styled from "styled-components";

import { Row } from "@/components/box/Flex";
import { BorderTag } from "@/components/tag/BorderTag";
import { Tag } from "@/components/tag/Tag";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const StyledVideoTags = styled(Row)`
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

const fragments = {
    video: graphql(`
        fragment VideoTagsVideo on Video {
            resolution
            nc
            subbed
            lyrics
            uncen
            source
            overlap
        }
    `),
};

interface VideoTagsProps {
    video: FragmentType<typeof fragments.video>;
}

export function VideoTags(props: VideoTagsProps) {
    const video = getFragmentData(fragments.video, props.video);

    return (
        <StyledVideoTags>
            <Tag title="Resolution">{video.resolution}p</Tag>

            {video.nc && <BorderTag title="No Credits">NC</BorderTag>}

            {video.subbed && <BorderTag title="With Subtitles">Subs</BorderTag>}

            {video.lyrics && <BorderTag title="With Lyrics">Lyrics</BorderTag>}

            {video.uncen && <BorderTag title="Uncensored">Uncen</BorderTag>}

            {!!video.source && <BorderTag title="Source">{video.source.toUpperCase()}</BorderTag>}

            {!!video.overlap && video.overlap !== "NONE" && (
                <BorderTag title="Overlap">{video.overlap.toUpperCase().replace("TRANSITION", "TRANS")}</BorderTag>
            )}
        </StyledVideoTags>
    );
}
