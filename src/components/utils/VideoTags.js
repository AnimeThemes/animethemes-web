import {
    faClosedCaptioning,
    faComment,
    faCompactDisc,
    faEye,
    faNotEqual,
    faStream
} from "@fortawesome/free-solid-svg-icons";
import { Tag } from "components/tag";
import { Row } from "components/box";
import styled from "styled-components";

const StyledVideoTags = styled(Row)`
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
                <Tag icon={faNotEqual} title="No Credits"/>
            )}

            {!!video.subbed && (
                <Tag icon={faClosedCaptioning} title="With Subtitles"/>
            )}

            {!!video.lyrics && (
                <Tag icon={faComment} title="With Lyrics"/>
            )}

            {!!video.uncen && (
                <Tag icon={faEye} title="Uncensored" variant="warning"/>
            )}

            {!!video.source && (
                <Tag icon={faCompactDisc} title="Source">
                    {video.source.toUpperCase()}
                </Tag>
            )}

            {video.overlap !== "None" && (
                <Tag icon={faStream} title="Overlap" hideTextOnMobile={hideTextOnMobile}>
                    {video.overlap.toUpperCase()}
                </Tag>
            )}
        </StyledVideoTags>
    );
}
