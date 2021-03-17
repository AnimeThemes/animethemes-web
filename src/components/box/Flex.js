import styled from "styled-components";
import { Box } from "components/box";

export const Flex = styled(Box)`
    display: ${(props) => props.flexInline ? "inline-flex" : "flex"};
`;
