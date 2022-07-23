const typeDefs = `
    #graphql
    
    type Query {
        bracket(slug: String): Bracket
        bracketAll: [Bracket!]!
    }

    type Bracket {
        slug: String!
        name: String!
        currentRound: BracketRound
        currentGroup: Int
        rounds: [BracketRound!]!
    }

    type BracketRound {
        bracket: Bracket
        tier: Int!
        name: String
        pairings: [BracketPairing!]!
    }

    type BracketPairing {
        round: BracketRound
        order: Int!
        group: Int!
        characterA: BracketCharacter!
        characterB: BracketCharacter!
        votesA: Int
        votesB: Int
    }

    type BracketCharacter {
        pairing: BracketPairing
        id: Int!
        seed: Int!
        name: String!
        source: String!
        image: String!
        theme: Theme
    }
`;

export default typeDefs;
