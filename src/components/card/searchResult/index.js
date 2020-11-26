import React from "react";
import {Link} from "gatsby";
import Text from "components/text";
import styled from "styled-components";
import Card from "components/card/index";
import {gapsColumn} from "styles/mixins";
import theme from "theme";

const StyledSearchResultCard = styled(Card)`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 1rem 0 0;
`;
const StyledCover = styled.img`
    width: 48px;
    height: 64px;
    object-fit: cover;
`;
const StyledBody = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
  
    ${gapsColumn("0.25rem")}  
  
    padding: 0 1rem;
`;
const StyledChildren = styled.div`
    @media (max-width: 720px) {
        display: none;
    }
`;
const StyledLink = styled(Link)`
    display: block;
`;

export default function SearchResultCard({ title, description, image, to, children, ...props }) {
    const card = (
        <StyledSearchResultCard {...props}>
            <StyledCover alt="Cover" src={image}/>
            <StyledBody>
                <Text bold color={theme.colors.secondaryTitle} maxLines={2}>{title}</Text>
                <Text small maxLines={1}>{description}</Text>
            </StyledBody>
            <StyledChildren>
                {children}
            </StyledChildren>
        </StyledSearchResultCard>
    );

    if (to) {
        return (
            <StyledLink to={to}>
                {card}
            </StyledLink>
        );
    }

    return card;
}

export function SearchResultDescription({ children }) {
    return children.filter((child) => !!child).map((child, index, { length }) => (
        <Text color={theme.colors.primaryMediumEmphasis}>
            <span>{child}</span>
            {index < length - 1 && (
                <span color={theme.colors.primaryMediumEmphasis}> &bull; </span>
            )}
        </Text>
    ));
}
