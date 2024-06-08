import { useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { useToasts } from "@/context/toastContext";
import useSetting from "@/hooks/useSetting";
import type { Announcement } from "@/lib/client/announcement";
import { fetchAnnouncements } from "@/lib/client/announcement";
import theme from "@/theme";
import { ShowAnnouncements } from "@/utils/settings";

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
    const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
    const [showAnnouncements] = useSetting(ShowAnnouncements);

    useEffect(() => {
        let cancelled = false;

        if (showAnnouncements !== ShowAnnouncements.DISABLED) {
            fetchAnnouncements().then((announcements) => {
                if (!cancelled) {
                    setAnnouncements(announcements);
                }
            });
        }

        return () => {
            cancelled = true;
        };
    }, [showAnnouncements]);

    if (!announcements.length) {
        return null;
    }

    return (
        <Toast hoverable color="text-warning" onClick={() => closeToast("announcement")}>
            <StyledBody>
                <StyledAnnouncements>
                    {announcements.map((announcement) => (
                        <Text key={announcement.id} as="p" dangerouslySetInnerHTML={{ __html: announcement.content }} />
                    ))}
                </StyledAnnouncements>
                <Text color="text-disabled">(Click to dismiss.)</Text>
            </StyledBody>
        </Toast>
    );
}
