import { useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styled, { css } from "styled-components";

import type { Property } from "csstype";

import { Column } from "@/components/box/Flex";
import { Card } from "@/components/card/Card";
import { Text } from "@/components/text/Text";
import { loadingAnimation } from "@/styles/mixins";
import withBasePath from "@/utils/withBasePath";

const StyledSummaryCard = styled(Card)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    height: 64px;
    padding: 0 1rem 0 4px;
`;

const StyledCover = styled.img.attrs({
    loading: "lazy"
})<{
    objectFit?: Property.ObjectFit
    backgroundColor?: Property.Background
    isLoading?: boolean
    isPlaceholder?: boolean
}>`
    width: 48px;
    height: 64px;
    object-fit: ${(props) => props.objectFit ?? "cover"};
    background: ${(props) => props.backgroundColor};
    
    ${(props) => props.isPlaceholder ? css`
        padding: 0.5rem;
        object-fit: contain;
        background-color: white;
    ` : (props.isLoading ? loadingAnimation : null)}
`;

const StyledBody = styled(Column)`
    flex: 1;
    justify-content: center;
    gap: 0.25rem;
    
    word-break: break-all;
`;

type SummaryCardProps = ComponentPropsWithoutRef<typeof StyledSummaryCard> & {
    children?: ReactNode
};

export function SummaryCard({ children, ...props }: SummaryCardProps) {
    return (
        <StyledSummaryCard {...props}>
            {children}
        </StyledSummaryCard>
    );
}

SummaryCard.Body = StyledBody;

interface SummaryCardTitleProps extends ComponentPropsWithoutRef<typeof Text> {
    children: ReactNode;
}

SummaryCard.Title = function SummaryCardTitle({ children, ...props }: SummaryCardTitleProps) {
    return (
        <Text maxLines={1} {...props}>
            {children}
        </Text>
    );
};

interface SummaryCardDescriptionProps {
    children: string | Array<ReactNode>
}

SummaryCard.Description = function SummaryCardDescription({ children }: SummaryCardDescriptionProps) {
    return (
        <Text variant="small" maxLines={1} color="text-muted">
            {typeof children === "string" ? children : children.filter((child) => child).map((child, index, { length }) => (
                <>
                    {child}
                    {index < length - 1 && (
                        <span> &bull; </span>
                    )}
                </>
            ))}
        </Text>
    );
};

interface SummaryCardCoverProps extends ComponentPropsWithoutRef<typeof StyledCover> {
    src?: string;
}

SummaryCard.Cover = function SummaryCardCover({ src, ...props }: SummaryCardCoverProps) {
    const [ imageNotFound, setImageNotFound ] = useState(false);
    const [ imageLoading, setImageLoading ] = useState(true);

    return (
        <StyledCover
            alt="Cover"
            src={(!imageNotFound && src) || withBasePath("/img/logo.svg")}
            isLoading={imageLoading}
            isPlaceholder={!src || imageNotFound}
            loading="lazy"
            {...props}
            onLoad={(event) => {
                setImageLoading(false);
                if (props?.onLoad) {
                    props.onLoad(event);
                }
            }}
            onError={() => {
                setImageNotFound(true);
                setImageLoading(false);
                if (props?.onError) {
                    props.onError();
                }
            }}
        />
    );
};
