import { useEffect, useState } from "react";
import { Toast } from "components/toast";
import { Text } from "components/text";
import { fetchAnnouncements } from "lib/client/announcement";
import { Box, Flex } from "components/box";

export function AnnouncementToast() {
    const [ announcements, setAnnouncements ] = useState([]);

    useEffect(() => {
        fetchAnnouncements()
            .then(setAnnouncements);
    }, []);

    if (!announcements.length) {
        return null;
    }

    return (
        <Toast hoverable onClick={() => setAnnouncements([])}>
            <Flex flexDirection={[ "column", "row" ]} gap="0.5rem">
                <Box flex="1">
                    {announcements.map((announcement) => (
                        <Text key={announcement.id} as="p" dangerouslySetInnerHTML={{ __html: announcement.content }}/>
                    ))}
                </Box>
                <Text color="text-disabled">(Click to dismiss.)</Text>
            </Flex>
        </Toast>
    );
}
