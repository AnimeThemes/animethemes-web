import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {gapsRow} from "styles/mixins";

const StyledSearchInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${gapsRow("0.5rem")}

    padding: 0.5rem 1rem;
    border-radius: 2rem;

    background-color: ${(props) => props.theme.colors.primaryBackground[props.theme.elevation]};
    color: ${(props) => props.theme.colors.primaryMediumEmphasis};
`;
const StyledForm = styled.form`
    flex: 1;
`
const StyledInput = styled.input`
    width: 100%;
`;

export default function SearchInput({ query, setQuery, isSearching, onSubmit, ...props }) {
    return (
        <StyledSearchInput {...props}>
            <FontAwesomeIcon icon={faSearch} fixedWidth />
            <StyledForm onSubmit={(event) => {
                event.preventDefault();
                onSubmit(event);
            }}>
                <StyledInput
                    type="text"
                    placeholder="Search"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
            </StyledForm>
            {isSearching && (
                <FontAwesomeIcon icon={faSpinner} fixedWidth spin />
            )}
        </StyledSearchInput>
    );
}
