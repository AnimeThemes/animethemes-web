import { type FormEvent, type ReactNode, useState } from "react";
import styled from "styled-components";

import { Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Input } from "@/components/form/Input";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterMediaFormat } from "@/components/search-filter/SearchFilterMediaFormat";
import { Switcher, SwitcherOption } from "@/components/switcher/Switcher";
import { Text } from "@/components/text/Text";
import { Busy } from "@/components/utils/Busy";
import useRandomThemes from "@/hooks/useRandomThemes";

interface ShuffleDialogProps {
    trigger: ReactNode;
}

export function ShuffleDialog({ trigger }: ShuffleDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent title="Shuffle">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? <ShuffleForm onCancel={() => setOpen(false)} onSuccess={() => setOpen(false)} /> : null}
            </DialogContent>
        </Dialog>
    );
}

const StyledForm = styled.form`
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 32px;
`;

interface ShuffleFormProps {
    onSuccess(): void;
    onCancel(): void;
}

function ShuffleForm({ onSuccess, onCancel }: ShuffleFormProps) {
    const [isBusy, setBusy] = useState(false);
    const [filterThemeType, setFilterThemeType] = useState("");
    const [filterMediaFormat, setFilterMediaFormat] = useState<string | null>(null);
    const [filterAnimeYearMin, setFilterAnimeYearMin] = useState("");
    const [filterAnimeYearMax, setFilterAnimeYearMax] = useState("");

    const { playRandomThemes } = useRandomThemes();

    async function submit(event: FormEvent) {
        event.preventDefault();

        setBusy(true);

        try {
            await playRandomThemes({
                themeType: filterThemeType,
                mediaFormat: filterMediaFormat ?? undefined,
                animeYearMin: parseInt(filterAnimeYearMin),
                animeYearMax: parseInt(filterAnimeYearMax),
            });
        } finally {
            setBusy(false);
        }

        onSuccess();
    }

    return (
        <StyledForm onSubmit={submit}>
            <SearchFilterGroup>
                <SearchFilter>
                    <Text variant="h2">Theme Type</Text>
                    <Switcher selectedItem={filterThemeType} onChange={setFilterThemeType}>
                        <SwitcherOption value="">Any</SwitcherOption>
                        <SwitcherOption value="OP">Openings</SwitcherOption>
                        <SwitcherOption value="ED">Endings</SwitcherOption>
                    </Switcher>
                </SearchFilter>
                <SearchFilter>
                    <Text variant="h2">Premiered After</Text>
                    <Input
                        value={filterAnimeYearMin}
                        onChange={setFilterAnimeYearMin}
                        inputProps={{ type: "number", placeholder: "1900" }}
                    />
                </SearchFilter>
                <SearchFilter>
                    <Text variant="h2">Premiered Before</Text>
                    <Input
                        value={filterAnimeYearMax}
                        onChange={setFilterAnimeYearMax}
                        inputProps={{ type: "number", placeholder: "2100" }}
                    />
                </SearchFilter>
                <SearchFilterMediaFormat value={filterMediaFormat} setValue={setFilterMediaFormat} />
            </SearchFilterGroup>
            <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                <Button type="button" variant="silent" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isBusy}>
                    <Busy isBusy={isBusy}>Start Shuffle</Busy>
                </Button>
            </Row>
        </StyledForm>
    );
}
