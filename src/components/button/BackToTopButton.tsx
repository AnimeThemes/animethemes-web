import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, m } from "motion/react";

import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import PlayerContext from "@/context/playerContext";
import { withHover } from "@/styles/mixins";
import theme from "@/theme";

const ScrollButton = styled(m(Button))<{ $bottomOffset: number }>`
    position: fixed;
    right: 16px;
    bottom: ${(props) => 16 + props.$bottomOffset}px;
    padding: 16px;

    ${withHover`
      background-color: ${theme.colors["solid-on-card"]}; 
      color: ${theme.colors["text-primary"]}; 
    `}
`;

export function BackToTopButton() {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
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
            } else {
                setIsButtonVisible(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <AnimatePresence>
            {isButtonVisible ? (
                <ScrollButton
                    key={"scrollButton"}
                    initial={{ y: "150%" }}
                    animate={{ y: "0" }}
                    exit={{ y: "450%" }}
                    variant="primary"
                    isCircle={true}
                    onClick={scrollUp}
                    onMouseDown={(event) => event.preventDefault()}
                    $bottomOffset={currentWatchListItem ? 76 : 0}
                >
                    <Icon icon={faChevronUp} />
                </ScrollButton>
            ) : null}
        </AnimatePresence>
    );
}
