import styled from "styled-components";
import { Button } from "./Button";
import { Icon } from "components/icon";
import { faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import React, { useState, useEffect } from "react";
import theme from "theme";
import { withHover } from "styles/mixins";
import { slideIn, slideOut } from "styles/animations";

const ScrollButton = styled(Button)`
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 16px;

  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  animation: ${(props) => props.animation} 200ms both;
  transition: all 200ms;

  ${withHover`
    background-color: ${theme.colors["solid-on-card"]}; 
    color: ${theme.colors["text-primary"]}; 
  `}
`;

export function BackToTopButton() {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [animation, setAnimation] = useState(slideIn());

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 2000) {
                setIsButtonVisible(true);
                setAnimation(slideIn());
            } else {
                setIsButtonVisible(false);
                setAnimation(slideOut("150%", "0"));
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function scrollUp() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <ScrollButton
            variant="primary"
            isCircle={true}
            onClick={scrollUp}
            isVisible={isButtonVisible}
            animation={animation}
            onMouseDown={(event:React.PointerEvent) => event.preventDefault()}
        >
            <Icon icon={faChevronUp} />
        </ScrollButton>
    );
}
