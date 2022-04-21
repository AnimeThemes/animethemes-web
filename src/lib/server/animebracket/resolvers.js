import mappings from "./mappings.json";
import { apiResolver } from "lib/common/animethemes/api";

const resolvers = {
    Query: {
        bracket: async (_, { slug }) => {
            const bracket = await fetchJson(`https://animebracket.com/api/bracket/${slug}`);
            const rounds = await fetchJson(`https://animebracket.com/api/results/${slug}`);
            const currentRound = await fetchJson(`https://animebracket.com/api/rounds/${slug}`);

            return {
                slug,
                name: bracket.name,
                currentRound,
                currentGroup: currentRound,
                rounds
            };
        }
    },
    Bracket: {
        currentRound: (bracket) => {
            if (bracket.currentRound) {
                return {
                    tier: +bracket.currentRound[0].tier,
                    pairings: bracket.currentRound
                };
            }
            return null;
        },
        currentGroup: (bracket) => {
            if (bracket.currentRound) {
                return bracket.currentRound[0].group;
            }
            return null;
        },
        rounds: (bracket) => {
            return bracket.rounds.map((round) => ({
                tier: round[0].tier,
                pairings: round
            }));
        }
    },
    BracketRound: {
        name: (round) => {
            switch (round.pairings.length) {
                case 1:
                    return "Finals";
                case 2:
                    return "Semifinals";
                case 4:
                    return "Quarterfinals";
                default:
                    return null;
            }
        },
        pairings: (round) => {
            return round.pairings
                .filter((pairing) => !pairing.filler)
                .map((pairing) => ({
                    order: +pairing.order,
                    group: +pairing.group,
                    characterA: pairing.character1,
                    characterB: pairing.character2,
                    votesA: pairing.character1.votes || null,
                    votesB: pairing.character2.votes || null
                }));
        }
    },
    BracketPairing: {
        characterA: bracketCharacterResolver("characterA"),
        characterB: bracketCharacterResolver("characterB")
    },
    BracketCharacter: {
        theme: apiResolver({
            endpoint: (character) => `/animetheme/${character.theme}`,
            extractor: (result) => result.animetheme
        }),
    }
};

export default resolvers;

function bracketCharacterResolver(field) {
    return (pairing) => {
        const character = pairing[field];

        return {
            id: character.id,
            seed: character.seed,
            name: character.name,
            source: character.source,
            theme: mappings[character.id]
        };
    };
}

async function fetchJson(url) {
    const response = await fetch(url);
    return await response.json();
}
