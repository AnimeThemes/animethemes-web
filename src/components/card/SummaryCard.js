import { Link } from "gatsby";
import { Text } from "components/text";
import styled from "styled-components";
import { Card } from "components/card";
import { Box, Flex } from "components/box";

const StyledCover = styled.img`
    width: 48px;
    height: 64px;
    object-fit: cover;
`;

export function SummaryCard({ title, description, image, to, children, ...props }) {
    return (
        <Card display="flex" flexDirection="row" alignItems="center" p={0} pr="1rem" {...props}>
            <Link to={to}>
                <StyledCover alt="Cover" src={image}/>
            </Link>
            <Flex flex={1} flexDirection="column" justifyContent="center" gapsColumn="0.25rem" px="1rem">
                <Text fontWeight="500" maxLines={2}>
                    {typeof title === "string" ? (
                        <Link to={to}>
                            <Text link>{title}</Text>
                        </Link>
                    ) : title}
                </Text>
                <Text variant="small" maxLines={1}>{description}</Text>
            </Flex>
            <Box display={[ "none", "block" ]}>
                {children}
            </Box>
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
