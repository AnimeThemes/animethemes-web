import { useMutation, useQuery } from "@apollo/client/react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { IconTextButton } from "@/components/button/IconTextButton";
import { graphql } from "@/graphql/generated";
import { FAVORITES_PAGE_QUERY } from "@/pages/profile/favorites";

interface FavoriteButtonProps {
    entryId: number;
}

const FAVORITE_BUTTON_QUERY = graphql(`
    query FavoriteButton($entryId: Int!) {
        me {
            id
            favorites(filter: { entryId: $entryId }) {
                id
            }
        }
    }
`);

export function FavoriteButton({ entryId }: FavoriteButtonProps) {
    const { data } = useQuery(FAVORITE_BUTTON_QUERY, {
        variables: { entryId },
    });

    const isFavorite = (data?.me?.favorites.length ?? 0) > 0;

    const [toggleFavorite] = useMutation(
        graphql(`
            mutation ToggleFavorite($entryId: Int!) {
                toggleFavorite(favorite: { entry: $entryId }) {
                    id
                }
            }
        `),
        {
            variables: { entryId },
            update: (cache, { data }) => {
                const meData = cache.readQuery({
                    query: graphql(`
                        query FavoriteButtonReadMe {
                            me {
                                id
                            }
                        }
                    `),
                });

                if (!meData?.me) {
                    return;
                }

                cache.updateFragment(
                    {
                        id: cache.identify(meData.me),
                        fragment: graphql(`
                            fragment FavoriteButtonUpdateMe on Me {
                                id
                                favorites(filter: { entryId: $entryId }) {
                                    id
                                }
                            }
                        `),
                        variables: { entryId },
                    },
                    (me) =>
                        me
                            ? {
                                  ...me,
                                  favorites: data?.toggleFavorite ? [data.toggleFavorite] : [],
                              }
                            : undefined,
                );
            },
            optimisticResponse: {
                toggleFavorite: isFavorite
                    ? null
                    : {
                          id: -1,
                      },
            },
            refetchQueries: [FAVORITES_PAGE_QUERY],
        },
    );

    return (
        <IconTextButton
            icon={faHeart}
            isCircle
            variant={isFavorite ? "primary" : "solid"}
            collapsible="socialListMax"
            onClick={() => toggleFavorite()}
        />
    );
}
