import { useState } from "react";
import type { ReactNode } from "react";

import { faArrowDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import useSWR, { mutate } from "swr";

import { LoginGate } from "@/components/auth/LoginGate";
import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import {
    VideoSummaryCard,
    VideoSummaryCardFragmentEntry,
    VideoSummaryCardFragmentVideo,
} from "@/components/card/VideoSummaryCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { PlaylistAddDialog } from "@/components/dialog/PlaylistAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { Text } from "@/components/text/Text";
import { PlaylistTrackAddToast } from "@/components/toast/PlaylistTrackAddToast";
import { PlaylistTrackRemoveToast } from "@/components/toast/PlaylistTrackRemoveToast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import type {
    PlaylistTrackAddDialogEntryFragment,
    PlaylistTrackAddDialogVideoFragment,
    PlaylistTrackAddFormPlaylistQuery,
    PlaylistTrackAddFormPlaylistQueryVariables,
} from "@/generated/graphql";
import { fetchDataClient } from "@/lib/client";
import axios from "@/lib/client/axios";

interface PlaylistTrackAddDialogProps {
    video: PlaylistTrackAddDialogVideoFragment;
    entry: PlaylistTrackAddDialogEntryFragment;
    trigger?: ReactNode;
}

export function PlaylistTrackAddDialog({ video, entry, trigger }: PlaylistTrackAddDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <IconTextButton icon={faPlus} variant="solid" collapsible>
                        Add to Playlist
                    </IconTextButton>
                )}
            </DialogTrigger>
            <DialogContent title="Add to playlist">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <LoginGate>
                        <PlaylistTrackAddForm video={video} entry={entry} onCancel={() => setOpen(false)} />
                    </LoginGate>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

PlaylistTrackAddDialog.fragments = {
    video: gql`
        ${VideoSummaryCardFragmentVideo}

        fragment PlaylistTrackAddDialogVideo on Video {
            ...VideoSummaryCardVideo
            id
        }
    `,
    entry: gql`
        ${VideoSummaryCardFragmentEntry}
        ${PlaylistTrackRemoveToast.fragments.entry}

        fragment PlaylistTrackAddDialogEntry on Entry {
            ...VideoSummaryCardEntry
            ...PlaylistTrackRemoveToastEntry
            id
        }
    `,
};

interface PlaylistTrackAddFormProps {
    video: PlaylistTrackAddDialogVideoFragment;
    entry: PlaylistTrackAddDialogEntryFragment;
    onCancel(): void;
}

function PlaylistTrackAddForm({ video, entry, onCancel }: PlaylistTrackAddFormProps) {
    const { data: playlists } = useSWR(["PlaylistTrackAddFormPlaylist", "/api/me/playlist", video.id], async () => {
        const { data } = await fetchDataClient<
            PlaylistTrackAddFormPlaylistQuery,
            PlaylistTrackAddFormPlaylistQueryVariables
        >(
            gql`
                ${PlaylistSummaryCard.fragments.playlist}

                query PlaylistTrackAddFormPlaylist($filterVideoId: Int!) {
                    me {
                        playlistAll {
                            ...PlaylistSummaryCardPlaylist
                            id
                            tracks_count
                        }
                        playlistAllFiltered: playlistAll(filterVideoId: $filterVideoId) {
                            id
                            tracks {
                                id
                            }
                        }
                    }
                }
            `,
            { filterVideoId: video.id },
        );

        const { playlistAll, playlistAllFiltered } = data.me;

        return (
            playlistAll?.map((playlist) => {
                return {
                    ...playlist,
                    ...playlistAllFiltered?.find((p) => p.id === playlist.id),
                };
            }) ?? []
        );
    });

    if (!playlists) {
        return (
            <Column style={{ "--gap": "24px" }}>
                <Skeleton variant="summary-card" />
                <Skeleton variant="summary-card" />
                <Skeleton variant="summary-card" />
                <Skeleton variant="summary-card" />
            </Column>
        );
    }

    return (
        <Column style={{ "--gap": "24px" }}>
            <VideoSummaryCard video={video} entry={entry} />
            <Row style={{ "--justify-content": "center" }}>
                <Icon icon={faArrowDown} color="text-disabled" />
            </Row>
            <Column style={{ "--gap": "16px" }}>
                {playlists?.length ? (
                    playlists.map((playlist) => (
                        <PlaylistTrackAddCard key={playlist.id} playlist={playlist} video={video} entry={entry} />
                    ))
                ) : (
                    <Text>You have not created a playlist, yet.</Text>
                )}
                <PlaylistAddDialog
                    trigger={
                        <Button style={{ "--gap": "8px" }}>
                            <Icon icon={faPlus} />
                            <Text>Create new Playlist</Text>
                        </Button>
                    }
                />
            </Column>
            <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                <Button variant="silent" onClick={onCancel}>
                    Close
                </Button>
            </Row>
        </Column>
    );
}

interface PlaylistTrackAddCardProps {
    playlist: NonNullable<PlaylistTrackAddFormPlaylistQuery["me"]["playlistAll"]>[number] &
        Partial<NonNullable<PlaylistTrackAddFormPlaylistQuery["me"]["playlistAllFiltered"]>[number]>;
    video: PlaylistTrackAddDialogVideoFragment;
    entry: PlaylistTrackAddDialogEntryFragment;
}

function PlaylistTrackAddCard({ playlist, video, entry }: PlaylistTrackAddCardProps) {
    const { dispatchToast } = useToasts();

    const [isBusy, setBusy] = useState(false);

    async function addTrackToPlaylist() {
        setBusy(true);

        try {
            await axios.post(`/playlist/${playlist.id}/track`, { video_id: video.id, entry_id: entry.id });
            await mutate((key) =>
                [key].flat().some((key) => key === `/api/playlist/${playlist.id}` || key === "/api/me/playlist"),
            );
        } finally {
            setBusy(false);
        }

        dispatchToast(
            `playlist-add-track-${playlist.id}-${video.id}`,
            <PlaylistTrackAddToast playlist={playlist} entry={entry} />,
        );
    }

    async function removeTrackFromPlaylist() {
        const track = playlist.tracks?.[0];

        if (!track) {
            return;
        }

        setBusy(true);

        try {
            await axios.delete(`/playlist/${playlist.id}/track/${track.id}`);
            await mutate((key) =>
                [key].flat().some((key) => key === `/api/playlist/${playlist.id}` || key === "/api/me/playlist"),
            );
        } finally {
            setBusy(false);
        }

        dispatchToast(
            `playlist-remove-track-${playlist.id}-${track.id}`,
            <PlaylistTrackRemoveToast playlist={playlist} entry={entry} />,
        );
    }

    return (
        <PlaylistSummaryCard key={playlist.id} playlist={playlist}>
            {!playlist.tracks?.length ? (
                <IconTextButton icon={faPlus} disabled={isBusy} onClick={addTrackToPlaylist}>
                    <Busy isBusy={isBusy}>Add</Busy>
                </IconTextButton>
            ) : (
                <IconTextButton icon={faMinus} disabled={isBusy} onClick={removeTrackFromPlaylist}>
                    <Busy isBusy={isBusy}>Remove</Busy>
                </IconTextButton>
            )}
        </PlaylistSummaryCard>
    );
}
