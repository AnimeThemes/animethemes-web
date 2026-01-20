import { useState } from "react";
import type { ReactNode } from "react";

import { faArrowDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
import useSWR, { mutate } from "swr";

import { LoginGate } from "@/components/auth/LoginGate";
import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
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
import { client } from "@/graphql/client";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import { fetchDataClient } from "@/lib/client";
import axios from "@/lib/client/axios";

const fragments = {
    video: graphql(`
        fragment PlaylistTrackAddDialogVideo on Video {
            ...VideoSummaryCardVideo
            id
        }
    `),
    entry: graphql(`
        fragment PlaylistTrackAddDialogEntry on AnimeThemeEntry {
            ...VideoSummaryCardEntry
            ...PlaylistTrackRemoveToastEntry
            id
        }
    `),
};

interface PlaylistTrackAddDialogProps {
    video: FragmentType<typeof fragments.video>;
    entry: FragmentType<typeof fragments.entry>;
    trigger?: ReactNode;
}

export function PlaylistTrackAddDialog({ trigger, ...props }: PlaylistTrackAddDialogProps) {
    const video = getFragmentData(fragments.video, props.video);
    const entry = getFragmentData(fragments.entry, props.entry);
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

interface PlaylistTrackAddFormProps {
    video: ResultOf<typeof fragments.video>;
    entry: ResultOf<typeof fragments.entry>;
    onCancel(): void;
}

function PlaylistTrackAddForm({ video, entry, onCancel }: PlaylistTrackAddFormProps) {
    const { data: playlists } = useSWR(["PlaylistTrackAddFormPlaylist", "/api/me/playlist", video.id], async () => {
        const { data } = await client.query(
            graphql(`
                query PlaylistTrackAddFormPlaylist {
                    me {
                        playlists {
                            data {
                                ...PlaylistSummaryCardPlaylist
                                id
                                tracksCount
                            }
                        }
                    }
                }
            `),
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
            <VideoSummaryCard video={video} entry={entry} menu={null} />
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
