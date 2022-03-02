import styled from "styled-components";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import theme from "theme";
import { Icon } from "components/icon";
import { Button } from "components/button";

const StyledSearchInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0.5rem 1rem;
    border-radius: 2rem;
    gap: 8px;
    
    background-color: ${theme.colors["solid-on-card"]};
    color: ${theme.colors["text-muted"]};
    
    &:focus-within {
        box-shadow: ${theme.shadows.low};

        [theme="dark"] & {
            box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
        }
    }
`;
const StyledForm = styled.form`
    flex: 1;
`;
const StyledInput = styled.input`
    width: 100%;
`;
const StyledResetButton = styled(Button).attrs({ variant: "silent", isCircle: true })`
    margin: -8px;
    
    &:hover {
        background-color: transparent;
        box-shadow: none;
    }
`;

export function SearchInput({ query, setQuery, onSubmit, inputProps = {}, ...props }) {
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
                    value={query}
                    onChange={(e) => setQuery && setQuery(e.target.value)}
                    {...inputProps}
                />
            </StyledForm>
            {!!query && (
                <StyledResetButton>
                    <Icon icon={faTimes} onClick={() => setQuery && setQuery("")}/>
                </StyledResetButton>
            )}
        </StyledSearchInput>
    );
}
