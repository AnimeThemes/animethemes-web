import { useState } from "react";
import type { ReactNode } from "react";

import { LoginGate } from "@/components/auth/LoginGate";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import useAuth from "@/hooks/useAuth";
import useFavorite from "@/hooks/useFavorite";

interface FavoriteDialogProps {
    entryId: number;
    trigger: ReactNode;
}

// This component is whole purpose is ensuring users are authenticated before attempting to favorite an entry.
// If they are not, a login form is shown and the entry is automatically favorited once they log in.
export function FavoriteDialog({ entryId, trigger }: FavoriteDialogProps) {
    const [open, setOpen] = useState(false);
    const { me } = useAuth();
    const [previousMe, setPreviousMe] = useState(me);
    const { toggleFavorite } = useFavorite(entryId);

    function onOpenChange(open: boolean) {
        if (!open) {
            setOpen(false);
            return;
        }

        if (me) {
            void toggleFavorite();
            return;
        }

        setOpen(true);
    }

    if (previousMe !== me) {
        if (previousMe === null && open) {
            // User just got authenticated, so we can reattempt the favorite
            void toggleFavorite();
            setOpen(false);
        }
        setPreviousMe(me);
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent title="Add to favorites">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? <LoginGate /> : null}
            </DialogContent>
        </Dialog>
    );
}
