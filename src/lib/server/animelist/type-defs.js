module.exports = `
    #graphql
    
    type Query {
        animeList(username: String!, site: AnimeListSite!): [AnimeListEntry]
    }
    
    type AnimeListEntry {
        externalId: Int!
        externalName: String!
        externalImage: String!
        listStatus: AnimeListEntryStatus!
        anime: Anime
    }
    
    type AnimeListEntryStatus {
        status: AnimeListEntryStatusType!
        score: Int!
        updatedAt: String!
    }
    
    enum AnimeListSite {
        MY_ANIME_LIST
        ANI_LIST
    }
    
    enum AnimeListEntryStatusType {
        WATCHING
        COMPLETED
        ON_HOLD
        DROPPED
        PLAN_TO_WATCH
    }
`;
