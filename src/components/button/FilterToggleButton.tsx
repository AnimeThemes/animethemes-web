import type { ComponentPropsWithoutRef } from "react";

import { faFilter } from "@fortawesome/pro-solid-svg-icons";

import { IconTextButton } from "@/components/button/IconTextButton";

export function FilterToggleButton(props: Partial<ComponentPropsWithoutRef<typeof IconTextButton>>) {
    return (
        <IconTextButton icon={faFilter} collapsible {...props}>
            Filter
        </IconTextButton>
    );
}
