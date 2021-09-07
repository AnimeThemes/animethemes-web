import styled from "styled-components";
import { color, compose, flexbox, grid, layout, space, typography, position, border } from "styled-system";
import { gaps } from "utils/gaps";

export const Box = styled.div`
    ${compose(color, space, layout, typography, position, flexbox, grid, border)}
    ${gaps}
`;
