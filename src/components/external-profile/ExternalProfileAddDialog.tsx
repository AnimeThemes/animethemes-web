import { type ReactNode, useState } from "react";
import styled from "styled-components";

import { Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { Switcher, SwitcherOption } from "@/components/switcher/Switcher";
import { Text } from "@/components/text/Text";
import type { ExternalProfileSite } from "@/generated/graphql";
import { CLIENT_API_URL } from "@/utils/config";

interface ExternalProfileAddProps {
    trigger: ReactNode;
    preselectedSite?: ExternalProfileSite;
}

export function ExternalProfileAddDialog({ trigger, preselectedSite }: ExternalProfileAddProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent title="Add External Profile">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <ExternalProfileAddForm preselectedSite={preselectedSite} onCancel={() => setOpen(false)} />
                ) : null}
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
const StyledSwitcher = styled(Switcher)`
    width: 100%;

    & > * {
        flex: 1;
    }
`;

interface ExternalProfileAddFormProps {
    preselectedSite?: ExternalProfileSite;
    onCancel(): void;
}

function ExternalProfileAddForm({ preselectedSite, onCancel }: ExternalProfileAddFormProps) {
    const [site, setSite] = useState<ExternalProfileSite | "">(preselectedSite ?? "");

    return (
        <StyledForm action={site ? getAuthUrl(site) : undefined}>
            <SearchFilterGroup>
                <SearchFilter>
                    <Text variant="h2">External Site</Text>
                    <StyledSwitcher selectedItem={site} onChange={setSite}>
                        <SwitcherOption value="AniList">AniList</SwitcherOption>
                        <SwitcherOption value="MyAnimeList">MyAnimeList</SwitcherOption>
                    </StyledSwitcher>
                </SearchFilter>
            </SearchFilterGroup>
            <Text as="p">
                To add an external profile you need to grant AnimeThemes access to your profile. We will use this access
                only to get the anime from your list.
            </Text>
            <Text as="p">
                By default your external profile will be private, so no one can see your list except yourself.
            </Text>
            <Text as="p">
                Clicking on{" "}
                <Text as="button" type="submit" color="text-primary" link>
                    Authorize
                </Text>{" "}
                will redirect you to {site}, where you can grant us access.
            </Text>
            <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                <Button type="button" variant="silent" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    Authorize
                </Button>
            </Row>
        </StyledForm>
    );
}

function getAuthUrl(site: ExternalProfileSite): string {
    switch (site) {
        case "AniList":
            return `${CLIENT_API_URL}/externaltoken/auth?site=AniList`;
        case "MyAnimeList":
            return `${CLIENT_API_URL}/externaltoken/auth?site=MyAnimeList`;
    }
}
