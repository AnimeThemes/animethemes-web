const fetch = require("node-fetch");
const fs = require("fs");

const mappings = JSON.parse(fs.readFileSync("./plugins/gatsby-source-animebracket/mappings.json", "utf8"));

exports.onPreInit = ({ reporter }) => reporter.info("Loaded gatsby-source-animebracket");

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        type Bracket implements Node {
            slug: String!
            name: String!
            currentRound: BracketRound @link(by: "id")
            currentGroup: Int
            rounds: [BracketRound] @link(by: "bracket.id", from: "id")
        }
        
        type BracketRound implements Node {
            bracket: Bracket @link(by: "id")
            tier: Int!
            name: String
            pairings: [BracketPairing] @link(by: "round.id", from: "id")
        }
        
        type BracketPairing implements Node {
            round: BracketRound @link(by: "id")
            order: Int!
            group: Int!
            characterA: BracketCharacter @link(by: "id")
            characterB: BracketCharacter @link(by: "id")
            votesA: Int
            votesB: Int
        }
        
        type BracketCharacter implements Node {
            pairing: BracketPairing @link(by: "id")
            idRaw: Int!
            seed: Int!
            name: String!
            source: String!
            theme: Theme @link(by: "idRaw")
        }
    `);
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const helpers = {
        ...actions,
        createNodeId,
        createContentDigest
    };

    const perma = "best-anime-opening-ix-salty-arrow";
    const bracketResponse = await fetch(`https://animebracket.com/api/bracket/${perma}`);
    const bracket = await bracketResponse.json();
    const roundsResponse = await fetch(`https://animebracket.com/api/results/${perma}`)
    const rounds = await roundsResponse.json();
    const currentRoundResponse = await fetch(`https://animebracket.com/api/rounds/${perma}`);
    const currentRound = await currentRoundResponse.json();

    const bracketNode = createNodeFromData({
        id: bracket.id,
        slug: perma,
        name: bracket.name,
        currentRound: currentRound ? createNodeId(`BracketRound-${bracket.id}-${currentRound[0].tier}`) : null,
        currentGroup: currentRound ? currentRound[0].group : null,
        rounds: rounds.map((round) => createNodeId(`BracketRound-${bracket.id}-${round[0].tier}`))
    }, "Bracket", helpers);

    for (const round of rounds) {
        sourceRound(round);
    }

    if (currentRound) {
        sourceRound(currentRound);
    }

    function sourceRound(round) {
        const tier = +round[0].tier;

        const roundNode = createNodeFromData({
            id: `${bracket.id}-${tier}`,
            bracket: bracketNode.id,
            tier: tier,
            pairings: round.map((pairing) => createNodeId(`BracketPairing-${pairing.id}`))
        }, "BracketRound", helpers);

        for (const pairing of round) {
            if (pairing.filler) {
                continue;
            }

            const pairingNode = createNodeFromData({
                id: pairing.id,
                round: roundNode.id,
                order: +pairing.order,
                group: +pairing.group,
                characterA: createNodeId(`BracketCharacter-${pairing.character1.id}`),
                characterB: createNodeId(`BracketCharacter-${pairing.character2.id}`),
                votesA: pairing.character1.votes || null,
                votesB: pairing.character2.votes || null
            }, "BracketPairing", helpers);

            for (const character of [ pairing.character1, pairing.character2 ]) {
                createNodeFromData({
                    id: character.id,
                    idRaw: character.id,
                    pairing: pairingNode.id,
                    seed: character.seed,
                    name: character.name,
                    source: character.source,
                    theme: mappings[character.id]
                }, "BracketCharacter", helpers);
            }
        }
    }
};

exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        BracketRound: {
            name: {
                resolve(source) {
                    switch (source.pairings.length) {
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
            }
        }
    });
};

function createNodeFromData(item, nodeType, helpers) {
    const node = {
        ...item,
        id: helpers.createNodeId(`${nodeType}-${item.id}`),
        parent: null,
        children: [],
        internal: {
            type: nodeType,
            content: JSON.stringify(item),
            contentDigest: helpers.createContentDigest(item)
        }
    };

    helpers.createNode(node)

    return node;
}
