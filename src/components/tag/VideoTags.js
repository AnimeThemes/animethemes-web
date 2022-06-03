import {
    faAlignSlash,
    faBringForward,
    faCommentLines,
    faCommentMusic,
    faCompactDisc,
    faEyes
} from "@fortawesome/pro-solid-svg-icons";
import { Tag } from "components/tag";
import { Row } from "components/box";
import styled from "styled-components";
import gql from "graphql-tag";

const StyledVideoTags = styled(Row)`
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
`;

export function VideoTags({ video, hideTextOnMobile }) {
    return (
        <StyledVideoTags>
            <Tag title="Resolution">
                {video.resolution}p
            </Tag>

            {!!video.nc && (
                <Tag icon={faAlignSlash} title="No Credits"/>
            )}

            {!!video.subbed && (
                <Tag icon={faCommentLines} title="With Subtitles"/>
            )}

            {!!video.lyrics && (
                <Tag icon={faCommentMusic} title="With Lyrics"/>
            )}

            {!!video.uncen && (
                <Tag icon={faEyes} title="Uncensored"/>
            )}

            {!!video.source && (
                <Tag icon={faCompactDisc} title="Source">
                    {video.source.toUpperCase()}
                </Tag>
            )}

            {video.overlap !== "None" && (
                <Tag icon={faBringForward} title="Overlap" hideTextOnMobile={hideTextOnMobile}>
                    {video.overlap.toUpperCase().replace("TRANSITION", "TRANS")}
                </Tag>
            )}
        </StyledVideoTags>
    );
}

VideoTags.fragment = gql`
    fragment VideoTags_video on Video {
        resolution
        nc
        subbed
        lyrics
        uncen
        source
        overlap
    }
`;
