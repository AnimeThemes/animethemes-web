import brackets from "@/lib/server/animebracket/brackets.json";
import mappings from "@/lib/server/animebracket/mappings.json";
import devLog from "@/utils/devLog";
import fetchJson from "@/utils/fetchJson";

interface ApiBracket {
    name: string;
    winnerCharacterId: number | null;
}

type ApiBracketRound = Array<ApiBracketPairing>;

interface ApiBracketPairing {
    tier: number;
    group: number;
    filler?: boolean;
    order: number;
    character1: ApiBracketCharacter;
    character2: ApiBracketCharacter;
}

interface ApiBracketCharacter {
    id: number;
    seed: number;
    name: string;
    source: string;
    image: string;
    votes: number;
}

export interface Bracket {
    slug: string;
    name: string;
    currentRound: BracketRound | null;
    currentGroup: number | null;
    rounds: Array<BracketRound>;
}

export interface BracketRound {
    name: string | null;
    tier: number;
    pairings: Array<BracketPairing>;
}

export interface BracketPairing {
    order: number;
    group: number;
    characterA: BracketCharacter;
    characterB: BracketCharacter;
    votesA: number | null;
    votesB: number | null;
}

export interface BracketCharacter {
    id: number;
    seed: number;
    name: string;
    source: string;
    image: string;
    votes: number;
    themeId: number | null;
}

export async function fetchBracket(slug: string): Promise<Bracket | null> {
    if (!Object.hasOwn(brackets, slug)) {
        return null;
    }

    const config = brackets[slug as keyof typeof brackets] ?? { slug };

    devLog.info(`Fetching bracket: ${config.slug}`);

    const bracket = await fetchJson<ApiBracket>(`https://animebracket.com/api/bracket/${config.slug}`);

    if (bracket === null) {
        return null;
    }

    if (!config.name) {
        config.name = bracket.name;
    }

    const rounds = await fetchJson<Array<ApiBracketRound>>(`https://animebracket.com/api/results/${config.slug}`);

    if (rounds === null) {
        return null;
    }

    // Some brackets are broken and still in a running state. We can check if the bracket has a winner already and
    // not fetch the current round in that case.
    const currentRound = bracket.winnerCharacterId
        ? null
        : await fetchJson<ApiBracketRound>(`https://animebracket.com/api/rounds/${config.slug}`);

    devLog.info(`Fetched bracket: ${config.slug} (${rounds.length} rounds)`);

    return {
        slug,
        name: config.name,
        currentRound: currentRound
            ? {
                  name: getRoundName(currentRound),
                  tier: currentRound[0].tier,
                  pairings: getPairingsFromRound(currentRound),
              }
            : null,
        currentGroup: currentRound ? currentRound[0].group : null,
        rounds: rounds.map((round) => ({
            name: getRoundName(round),
            tier: round[0].tier,
            pairings: getPairingsFromRound(round),
        })),
    };
}

export function getAvailableBrackets() {
    return Object.entries(brackets).map(([slug, bracket]) => ({
        slug,
        name: bracket.name,
    }));
}

function getRoundName(round: ApiBracketRound) {
    switch (round.length) {
        case 1:
            return "Finals";
        case 2:
            return "Semifinals";
        case 4:
            return "Quarterfinals";
        default:
            return null;
    }
}

function getPairingsFromRound(round: ApiBracketRound): Array<BracketPairing> {
    return round
        .filter((pairing) => !pairing.filler)
        .map((pairing) => {
            const characterAId = String(pairing.character1.id);
            const characterBId = String(pairing.character2.id);

            return {
                order: +pairing.order,
                group: +pairing.group,
                characterA: {
                    ...pairing.character1,
                    themeId: characterAId in mappings ? mappings[characterAId as keyof typeof mappings] : null,
                },
                characterB: {
                    ...pairing.character2,
                    themeId: characterBId in mappings ? mappings[characterBId as keyof typeof mappings] : null,
                },
                votesA: pairing.character1.votes || null,
                votesB: pairing.character2.votes || null,
            };
        });
}
