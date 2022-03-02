import Link from "next/link";
import { Text } from "components/text";
import styled, { css } from "styled-components";
import { Card } from "components/card";
import { Column } from "components/box";
import withBasePath from "utils/withBasePath";
import { useState } from "react";
import { loadingAnimation } from "styles/mixins";

const StyledSummaryCard = styled(Card)`
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 64px;
    padding: 0 1rem 0 0;
`;

const StyledCover = styled.img.attrs({
    loading: "lazy"
})`
  width: 48px;
  height: 64px;
  object-fit: cover;

  ${loadingAnimation}

  ${(props) => props.isPlaceholder && css`
    padding: 0.5rem;
    object-fit: contain;
    background: white;
  `}
`;

const StyledBody = styled(Column)`
    flex: 1;
    justify-content: center;
    
    padding: 0 1rem;
    gap: 0.25rem;
`;

export function SummaryCard({ title, description, image, to, children, ...props }) {
    const [ imageNotFound, setImageNotFound ] = useState(false);

    return (
        <StyledSummaryCard {...props}>
            <Link href={to}>
                <a>
                    <StyledCover
                        alt="Cover"
                        src={(!imageNotFound && image) || withBasePath("/img/logo.svg")}
                        isPlaceholder={!image || imageNotFound}
                        loading="lazy"
                        onError={() => setImageNotFound(true)}
                    />
                </a>
            </Link>
            <StyledBody>
                <Text maxLines={1} title={typeof title === "string" && title}>
                    {typeof title === "string" ? (
                        <Link href={to} passHref>
                            <Text as="a" link>{title}</Text>
                        </Link>
                    ) : title}
                </Text>
                <Text variant="small" maxLines={1}>
                    {typeof description === "string" ? (
                        <SummaryCard.Description>
                            {[description]}
                        </SummaryCard.Description>
                    ) : description}
                </Text>
            </StyledBody>
            {children}
        </StyledSummaryCard>
    );
}

SummaryCard.Description = function SummaryCardDescription({ children }) {
    return (
        <>
            {children.filter((child) => child).map((child, index, { length }) => (
                <Text key={index} color="text-muted">
                    <span>{child}</span>
                    {index < length - 1 && (
                        <span> &bull; </span>
                    )}
                </Text>
            ))}
        </>
    );
};
