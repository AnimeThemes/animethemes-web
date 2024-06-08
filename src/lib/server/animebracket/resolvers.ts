import type { Resolvers } from "@/generated/graphql-resolvers";
import { createApiResolver } from "@/lib/common/animethemes/api";
import type { ApiThemeShow } from "@/lib/common/animethemes/types";
import brackets from "@/lib/server/animebracket/brackets.json";
import mappings from "@/lib/server/animebracket/mappings.json";
import devLog from "@/utils/devLog";

interface SourceBracket {
    name: string;
    winnerCharacterId: number | null;
}

type SourceRound = Array<SourcePairing>;

interface SourcePairing {
    tier: number;
    group: number;
    filler: boolean;
    order: number;
    character1: SourceCharacter;
    character2: SourceCharacter;
}

interface SourceCharacter {
    id: number;
    seed: number;
    name: string;
    source: string;
    image: string;
    votes: number;
}

export interface ModelBracket {
    slug: string;
    name: string;
    currentRound?: ModelBracketRound | null;
    currentGroup?: number | null;
    rounds?: Array<ModelBracketRound>;
}

export interface ModelBracketRound {
    tier: number;
    pairings: Array<SourcePairing>;
}

export interface ModelBracketPairing {
    order: number;
    group: number;
    characterA: ModelBracketCharacter;
    characterB: ModelBracketCharacter;
    votesA: number | null;
    votesB: number | null;
}

export interface ModelBracketCharacter {
    id: number;
    seed: number;
    name: string;
    source: string;
    image: string;
    votes?: number;
    theme?: null;
    themeMapping?: number;
}

const resolvers: Resolvers = {
    Query: {
        bracket: async (_, { slug }) => {
            if (!Object.hasOwn(brackets, slug)) {
                return null;
            }

            const config = brackets[slug as keyof typeof brackets] ?? { slug };

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
                currentRound: currentPairings
                    ? {
                          tier: currentPairings[0].tier,
                          pairings: currentPairings,
                      }
                    : null,
                currentGroup: currentPairings ? currentPairings[0].group : null,
                rounds: rounds.map((round) => ({
                    tier: round[0].tier,
                    pairings: round,
                })),
            };
        },
        bracketAll: async () => {
            return Object.entries(brackets).map(([slug, bracket]) => ({
                slug,
                name: bracket.name,
            }));
        },
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
                    votesB: pairing.character2.votes || null,
                }));
        },
    },
    BracketPairing: {
        characterA: (pairing) => createBracketCharacter(pairing.characterA),
        characterB: (pairing) => createBracketCharacter(pairing.characterB),
    },
    BracketCharacter: {
        theme: createApiResolver<ApiThemeShow>()({
            extractFromParent: (character) => character.theme,
            endpoint: (character) => `/animetheme/${character.themeMapping}`,
            extractFromResponse: (response) => response.animetheme,
        }),
    },
};

export default resolvers;

function createBracketCharacter(modelCharacter: ModelBracketCharacter) {
    return {
        id: modelCharacter.id,
        seed: modelCharacter.seed,
        name: modelCharacter.name,
        source: modelCharacter.source,
        image: modelCharacter.image,
        theme: String(modelCharacter.id) in mappings ? undefined : null,
        themeMapping: mappings[String(modelCharacter.id) as keyof typeof mappings],
    };
}

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return (await response.json()) as T;
}
