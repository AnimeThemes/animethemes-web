import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import Button from "components/button";
import Flex from "components/flex";
import Text from "components/text";
import useAniList from "hooks/useAniList";
import SearchResultCard from "components/card/searchResult";
import Elevator from "components/elevator";
import ButtonPlay from "components/button/play";

export default function AnimeSearchResultCard({ anime }) {
    const { image } = useAniList(anime);

    let premiere = anime.year;
    if (anime.season) {
        premiere = anime.season + " " + premiere;
    }

    return (
        <SearchResultCard
            title={anime.name}
            description={`Anime • ${premiere} • ${anime.themes.length} themes`}
            image={image}
            to={`/anime/${anime.alias}`}
        >
            <Elevator>
                <Flex row wrap gapsBoth="0.75rem">
                    {anime.themes.slice(0, 4).filter((theme) => {
                        return theme.entries.length && theme.entries[0].videos.length;
                    }).map((theme) => (
                        <ButtonPlay key={theme.id} to={`/video/${theme.entries[0].videos[0].filename}`}>
                            <Text small block>{theme.slug}</Text>
                        </ButtonPlay>
                    ))}
                    {anime.themes.length > 4 && (
                        <Button icon title="Show all themes">
                            <FontAwesomeIcon icon={faEllipsisH} fixedWidth/>
                        </Button>
                    )}
                </Flex>
            </Elevator>
        </SearchResultCard>
    );
}
