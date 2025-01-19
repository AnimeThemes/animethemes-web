import type { ReactNode } from "react";

import { faShare } from "@fortawesome/free-solid-svg-icons";

import { IconTextButton } from "@/components/button/IconTextButton";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/menu/Menu";
import { Toast } from "@/components/toast/Toast";
import { useToasts } from "@/context/toastContext";
import useSetting from "@/hooks/useSetting";
import { BASE_PATH } from "@/utils/config";
import { AudioMode } from "@/utils/settings";

interface ShareMenuProps {
    pagePath: string;
    videoUrl: string;
    audioUrl: string;
    trigger?: ReactNode;
}

export function ShareMenu({ pagePath, videoUrl, audioUrl, trigger }: ShareMenuProps) {
    const { dispatchToast } = useToasts();
    const [audioMode] = useSetting(AudioMode, { storageSync: false });

    function saveToClipboard(url: string) {
        navigator.clipboard.writeText(url).then(() => dispatchToast("clipboard", <Toast>Copied to clipboard!</Toast>));
    }

    return (
        <Menu modal={false}>
            <MenuTrigger asChild>
                {trigger ?? (
                    <IconTextButton icon={faShare} variant="solid" collapsible="socialListMax">
                        Share
                    </IconTextButton>
                )}
            </MenuTrigger>
            <MenuContent>
                <MenuItem onSelect={() => saveToClipboard(location.origin + BASE_PATH + pagePath)}>
                    Copy URL to this Page
                </MenuItem>
                {audioMode === AudioMode.ENABLED ? (
                    <>
                        <MenuItem onSelect={() => saveToClipboard(audioUrl)}>Copy URL to Embeddable Audio</MenuItem>
                        <a href={`${audioUrl}?download`}>
                            <MenuItem>Download Audio</MenuItem>
                        </a>
                    </>
                ) : (
                    <>
                        <MenuItem onSelect={() => saveToClipboard(videoUrl)}>Copy URL to Embeddable Video</MenuItem>
                        <a href={`${videoUrl}?download`}>
                            <MenuItem>Download Video</MenuItem>
                        </a>
                    </>
                )}
            </MenuContent>
        </Menu>
    );
}
