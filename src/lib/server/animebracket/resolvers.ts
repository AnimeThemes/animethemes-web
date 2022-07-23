import brackets from "./brackets.json";
import mappings from "./mappings.json";
import { apiResolver } from "lib/common/animethemes/api";
import devLog from "utils/devLog";

interface SourceBracket {
    name: string
    winnerCharacterId: number | null
}

type SourceRound = Array<SourcePairing>;

interface SourcePairing {
    tier: number
    group: number
    filler: boolean
    order: number
    character1: SourceCharacter
    character2: SourceCharacter
}

interface SourceCharacter {
    id: number
    seed: number
    name: string
    source: string
    image: string
    votes: number
}

const resolvers = {
    Query: {
        bracket: async (_: never, { slug }: { slug: keyof typeof brackets }) => {
            const config = brackets[slug] ?? { slug };

            devLog.info(`Fetching bracket: ${config.slug}`);
            const bracket = await fetchJson<SourceBracket>(`https://animebracket.com/api/bracket/${config.slug}`);

            if (!config.name) {
                config.name = bracket.name;
            }

            const rounds = await fetchJson<Array<SourceRound>>(`https://animebracket.com/api/results/${config.slug}`);
            // Some brackets are broken and still in a running state. We can check if the bracket has a winner already and
            // not fetch the current round in that case.
            const currentPairings = bracket.winnerCharacterId
                ? null
                : await fetchJson<SourceRound>(`https://animebracket.com/api/rounds/${config.slug}`);
            devLog.info(`Fetched bracket: ${config.slug} (${rounds.length} rounds)`);

            return {
                slug,
                name: config.name,
                currentRound: currentPairings ? {
                    tier: currentPairings[0].tier,
                    pairings: currentPairings
                } : null,
                currentGroup: currentPairings ? currentPairings[0].group : null,
                rounds: rounds.map((round) => ({
                    tier: round[0].tier,
                    pairings: round
                }))
            };
        },
        bracketAll: async () => {
            return Object.entries(brackets).map(([slug, bracket]) => ({
                slug,
                name: bracket.name,
            }));
        }
    },
    BracketRound: {
        name: (round: { pairings: Array<SourcePairing> }) => {
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
        pairings: (round: { pairings: Array<SourcePairing> }) => {
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
            endpoint: (character) => `/animetheme/${character.themeMapping}`,
            extractor: (result) => result.animetheme,
            field: "theme"
        }),
    }
};

export default resolvers;

function bracketCharacterResolver(field: "characterA" | "characterB") {
    return (pairing: Record<typeof field, SourceCharacter>) => {
        const character = pairing[field];

        return {
            id: character.id,
            seed: character.seed,
            name: character.name,
            source: character.source,
            image: character.image,
            theme: String(character.id) in mappings ? undefined : null,
            themeMapping: mappings[String(character.id) as keyof typeof mappings],
        };
    };
}

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return await response.json() as T;
}
