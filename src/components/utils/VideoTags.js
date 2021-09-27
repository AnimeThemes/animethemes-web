import {
    faClosedCaptioning,
    faComment,
    faCompactDisc,
    faEye,
    faNotEqual,
    faStream
} from "@fortawesome/free-solid-svg-icons";
import { Tag } from "components/tag";
import { Flex } from "components/box";

export function VideoTags({ video, hideTextOnMobile }) {
    return (
        <div>
            <Flex flexWrap="wrap" gapsBoth="0.5rem">
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
            </Flex>
        </div>
    );
}
