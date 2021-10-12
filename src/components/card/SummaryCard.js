import { Link, withPrefix } from "gatsby";
import { Text } from "components/text";
import styled, { css, keyframes } from "styled-components";
import { Card } from "components/card";
import { Flex } from "components/box";

const loadingAnimation = keyframes`
    0% { background-position: 0 0; }
    100% { background-position: 100% 100%; }
`;

const StyledCover = styled.img.attrs({
    loading: "lazy"
})`
    width: 48px;
    height: 64px;
    object-fit: cover;

    background: radial-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.25)) no-repeat;
    background-size: 500% 500%;
    
    @media (prefers-reduced-motion: no-preference) {
        animation: ${loadingAnimation} 2s infinite alternate linear;
    }

    ${(props) => props.placeholder && css`
        padding: 0.5rem;
        object-fit: contain;
        background: white;
    `}
`;

export function SummaryCard({ title, description, image, to, children, ...props }) {
    return (
        <Card display="flex" flexDirection="row" alignItems="center" p={0} pr="1rem" height="64px" {...props}>
            <Link to={to}>
                <StyledCover alt="Cover" src={image || withPrefix("/img/logo.svg")} placeholder={!image} loading="lazy"/>
            </Link>
            <Flex flex={1} flexDirection="column" justifyContent="center" gapsColumn="0.25rem" px="1rem">
                <Text fontWeight="600" maxLines={1}>
                    {typeof title === "string" ? (
                        <Link to={to}>
                            <Text link>{title}</Text>
                        </Link>
                    ) : title}
                </Text>
                <Text variant="small" maxLines={1}>
                    {typeof description === "string" ? (
                        <SummaryCard.Description>
                            {[ description ]}
                        </SummaryCard.Description>
                    ) : description}
                </Text>
            </Flex>
            {children}
        </Card>
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
}
