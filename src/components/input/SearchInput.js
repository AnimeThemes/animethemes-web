import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { gapsRow } from "styles/mixins";
import theme from "theme";
import { Icon } from "components/icon";

const StyledSearchInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${gapsRow("0.5rem")}

    padding: 0.5rem 1rem;
    border-radius: 2rem;
    
    background-color: ${theme.colors["solid-on-card"]};
    color: ${theme.colors["text-muted"]};
    
    &:focus-within {
        box-shadow: inset ${theme.shadows.low};
    }
`;
const StyledForm = styled.form`
    flex: 1;
`
const StyledInput = styled.input`
    width: 100%;
`;

export function SearchInput({ query, setQuery, isSearching, onSubmit, inputProps = {}, ...props }) {
    return (
        <StyledSearchInput {...props}>
            <Icon icon={faSearch} color="text-disabled"/>
            <StyledForm onSubmit={(event) => {
                event.preventDefault();
                if (onSubmit) {
                    onSubmit(event);
                }
            }}>
                <StyledInput
                    type="text"
                    placeholder="Search"
                    value={query} onChange={(e) => setQuery && setQuery(e.target.value)}
                    {...inputProps}
                />
            </StyledForm>
            {isSearching && (
                <FontAwesomeIcon icon={faSpinner} fixedWidth spin />
            )}
        </StyledSearchInput>
    );
}
