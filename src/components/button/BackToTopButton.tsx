import styled, { keyframes } from "styled-components";
import { Button } from "./Button";
import { Icon } from "components/icon";
import { faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { useState, useEffect } from "react";
import theme from "theme";
import { withHover } from "styles/mixins";
import { fadeIn } from "styles/animations";

const ScrollButton = styled(Button)`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 1rem;

  display: ${(props) => props.isVisible ? "" : "none"};
  animation: ${fadeIn} 200ms both;
  
  ${withHover`
    background-color: ${theme.colors["solid-on-card"]}; 
    color: ${theme.colors["text-primary"]}; 
  `}
`;

export function BackToTopButton() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 2000) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    });
  }, []);

  const scrollUp = () => {
        
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <ScrollButton
      variant="primary"
      isCircle={true}
      onClick={scrollUp}
      isVisible={isButtonVisible}
      
    >
      <Icon icon={faChevronUp} />
    </ScrollButton>
  );
}
