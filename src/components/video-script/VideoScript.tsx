import { useState } from "react";
import styled from "styled-components";

import { Column } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const StyledCodeBlock = styled.pre`
    overflow-x: auto;

    & > code {
        display: block;
        min-width: 100%;
        width: max-content;
        padding: 16px;
    }
`;

const fragments = {
    video: graphql(`
        fragment VideoScriptVideo on Video {
            videoscript {
                link
            }
        }
    `),
};

interface Props {
    video: FragmentType<typeof fragments.video>;
}

export default function VideoScript({ video: videoFragment }: Props) {
    const video = getFragmentData(fragments.video, videoFragment);

    const [isLoading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState<string>();

    const videoFilter = videoScript?.match(/(-vf [^ ]+)/)?.[1];
    const audioFilter = videoScript?.match(/(-af [^ ]+)/)?.[1];
    const filter = [videoFilter, audioFilter].filter((f) => f).join(" ");

    async function downloadVideoScript() {
        const url = video.videoscript?.link;

        if (!url) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(url);
            const text = await res.text();

            setVideoScript(text);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {isLoading ? (
                <Text variant="small" color="text-disabled">
                    Downloading encoding script...
                </Text>
            ) : videoScript ? (
                <>
                    {videoScript ? (
                        <Column style={{ "--gap": "8px" }}>
                            <StyledCodeBlock>
                                <Text variant="code">{videoScript}</Text>
                            </StyledCodeBlock>
                            <Text
                                variant="small"
                                link
                                color="text-disabled"
                                onClick={() => navigator.clipboard.writeText(videoScript)}
                            >
                                Click to copy to clipboard.
                            </Text>
                        </Column>
                    ) : null}
                    {videoFilter || audioFilter ? (
                        <Column style={{ "--gap": "8px" }}>
                            <StyledCodeBlock>
                                <Text variant="code">{filter}</Text>
                            </StyledCodeBlock>
                            <Text
                                variant="small"
                                link
                                color="text-disabled"
                                onClick={() => navigator.clipboard.writeText(filter)}
                            >
                                Click to copy to clipboard.
                            </Text>
                        </Column>
                    ) : null}
                </>
            ) : video.videoscript ? (
                <Text variant="small" link color="text-disabled" onClick={downloadVideoScript}>
                    Click to download encoding script.
                </Text>
            ) : (
                <Text variant="small" color="text-disabled">
                    No encoding script available.
                </Text>
            )}
        </>
    );
}
