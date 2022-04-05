import Link from "next/link";
import { Toast } from "components/toast";
import { Text } from "components/text";
import { Row } from "components/box";
import { SongTitle } from "components/utils";

export function PlaylistAddToast({ theme }) {
    return (
        <Link href="/profile/playlist" passHref>
            <Toast as="a" hoverable>
                <Row wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                    <span><SongTitle song={theme.song}/> was added to the playlist!</span>
                    <Text color="text-disabled">(Click to view playlist.)</Text>
                </Row>
            </Toast>
        </Link>
    );
}
