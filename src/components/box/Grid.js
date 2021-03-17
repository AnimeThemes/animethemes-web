import styled from "styled-components";
import { Box } from "components/box";

export const Grid = styled(Box)`
    display: ${(props) => props.gridInline ? "inline-grid" : "grid"};
`;
