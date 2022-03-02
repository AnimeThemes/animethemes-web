import { useEffect, useState } from "react";
import styled from "styled-components";
import { Toast } from "components/toast";
import { Text } from "components/text";
import { fetchAnnouncements } from "lib/client/announcement";
import { showAnnouncementsSetting } from "utils/settings";
import theme from "theme";
import { useToasts } from "context/toastContext";

const StyledBody = styled.div`
    display: flex;
    gap: 8px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        flex-direction: column;
    }
`;

const StyledAnnouncements = styled.div`
    flex: 1;
`;

export function AnnouncementToast() {
    const { closeToast } = useToasts();
    const [ announcements, setAnnouncements ] = useState([]);

    useEffect(() => {
        if (window.localStorage.getItem(showAnnouncementsSetting.key) !== "disabled") {
            fetchAnnouncements()
                .then(setAnnouncements);
        }
    }, []);

    if (!announcements.length) {
        return null;
    }

    return (
        <Toast hoverable color="text-warning" onClick={() => closeToast("announcement")}>
            <StyledBody>
                <StyledAnnouncements>
                    {announcements.map((announcement) => (
                        <Text key={announcement.id} as="p" dangerouslySetInnerHTML={{ __html: announcement.content }}/>
                    ))}
                </StyledAnnouncements>
                <Text color="text-disabled">(Click to dismiss.)</Text>
            </StyledBody>
        </Toast>
    );
}
