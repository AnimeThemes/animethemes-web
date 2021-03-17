import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledCollapse = styled.div`
    height: ${(props) => props.height};
    overflow: hidden;
    transition: height 250ms;
`;

export function Collapse({ collapse, children }) {
    const [height, setHeight] = useState(collapse ? 0 : -1);
    const ref = useRef(null);

    useEffect(() => {
        if (collapse) {
            setHeight(0);
        } else {
            setHeight(ref.current.children[0].offsetHeight);
        }
    }, [collapse, children]);

    return (
        <StyledCollapse ref={ref} height={height < 0 ? "auto" : `${height}px`}>
            {children}
        </StyledCollapse>
    );
}
