import Flex from "components/flex";
import Switcher from "components/switcher";
import Button from "components/button";
import React from "react";

export default function SeasonNavigation({ year, season, seasonList }) {
    return (
        <Flex row justifyContent="center">
            <Switcher>
                {seasonList.map((availableSeason) => (
                    <Button key={availableSeason} to={`/year/${year}/${availableSeason.toLowerCase()}`} active={availableSeason === season}>{availableSeason}</Button>
                ))}
            </Switcher>
        </Flex>
    );
}
