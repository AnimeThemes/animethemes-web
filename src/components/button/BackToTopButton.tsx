import styled from "styled-components";
import { Button } from "./Button";
import { Icon } from "components/icon";
import { faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import theme from "theme";
import { withHover } from "styles/mixins";
import { slideIn, slideOut } from "styles/animations";
import PlayerContext from "context/playerContext";

const ScrollButton = styled(Button)<{ $bottomOffset: number }>`
  position: fixed;
  right: 16px;
  bottom: ${(props) => 16 + props.$bottomOffset}px;
  padding: 16px;
  display: ${(props) => (props.isVisible ? "default" : "none")};
  animation: ${(props) => props.animation} 250ms;

  ${withHover`
      background-color: ${theme.colors["solid-on-card"]}; 
      color: ${theme.colors["text-primary"]}; 
    `}
`;

export function BackToTopButton() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [animation, setAnimation] = useState("slideOut");

  const { currentWatchListItem } = useContext(PlayerContext);

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 2000) {
        setIsButtonVisible(true);
        setAnimation("slideIn");
      } else {
        setAnimation("slideOut");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Allow the button to slide out before setting display:none using 'isButtonVisible'
    if (animation === "slideOut") {
      setTimeout(() => {
        setIsButtonVisible(false);
      }, 200);
    }
  }, [animation]);
  return (
    <ScrollButton
      variant="primary"
      isCircle={true}
      onClick={scrollUp}
      isVisible={isButtonVisible}
      animation={animation === "slideIn" ? slideIn() : slideOut("450%", "0%")}
      onMouseDown={(event: React.PointerEvent) => event.preventDefault()}
      $bottomOffset={currentWatchListItem ? 76 : 0}
    >
      <Icon icon={faChevronUp} />
    </ScrollButton>
  );
}
