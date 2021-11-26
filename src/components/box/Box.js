import styled from "styled-components";
import { color, compose, flexbox, grid, layout, space, typography, position, border, shadow } from "styled-system";
import { gaps, gapsModern } from "utils/gaps";

export const Box = styled.div`
    ${compose(color, space, layout, typography, position, flexbox, grid, border, shadow)}
    ${gaps}
    ${gapsModern}
`;
