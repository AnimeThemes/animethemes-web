import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { faChevronCircleRight } from "@fortawesome/pro-solid-svg-icons";

import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";

interface ExternalLinkProps extends ComponentPropsWithoutRef<typeof Text> {
    href?: string | null;
    children: ReactNode;
}

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
    return (
        <Text as="a" link href={href} target="_blank" rel="noopener" {...props}>
            <Text>{children}</Text>
            <Text noWrap>
                &nbsp;
                <Icon icon={faChevronCircleRight} />
            </Text>
        </Text>
    );
}
