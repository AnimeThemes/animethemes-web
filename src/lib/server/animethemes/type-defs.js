module.exports = `
    #graphql
    
    type Query {
        anime(id: Int, slug: String): Anime
        animeAll(limit: Int, year: Int, season: String): [Anime]
        theme(id: Int): Theme
        themeAll(limit: Int, orderBy: String, orderDesc: Boolean): [Theme]
        artist(id: Int, slug: String): Artist
        artistAll(limit: Int): [Artist]
        series(id: Int, slug: String): Series
        seriesAll(limit: Int): [Series]
        studio(id: Int, slug: String): Studio
        studioAll(limit: Int): [Studio]
        year(value: Int!): Year
        yearAll: [Year]
        season(year: Int!, value: String!): Season
        seasonAll(year: Int): [Season]
        page(id: Int, slug: String): Page
        pageAll: [Page]
        counter: Counter
    }

    interface ResourceWithImages {
        images: [Image]
    }
    
    type Year {
        value: Int!
        seasons: [Season]
    }
    
    type Season {
        value: String!
        year: Year
        anime: [Anime]
    }
    
    type Counter {
        anime: Int!
        artist: Int!
        series: Int!
        studio: Int!
        video: Int!
        year: Int!
        season: Int!
    }
    
    type Anime implements ResourceWithImages {
        id: Int
        name: String!
        slug: String!
        year: Int!
        season: String!
        synopsis: String
        synonyms: [Synonym]
        themes: [Theme]            
        series: [Series]
        resources: [Resource]
        images: [Image]
        studios: [Studio]
    }
    
    type Synonym {
        id: Int
        text: String!
        anime: Anime!
    }
    
    type Theme {
        id: Int
        slug: String!
        type: String!
        sequence: Int!
        group: String
        song: Song
        anime: Anime!
        entries: [Entry]
    }

    type Entry {
        id: Int
        version: Int
        episodes: String
        nsfw: Boolean!
        spoiler: Boolean!
        theme: Theme!        
        videos: [Video]
    }
    
    type Video {
        id: Int
        filename: String!
        basename: String!
        link: String
        resolution: Int
        nc: Boolean!
        subbed: Boolean!
        lyrics: Boolean!
        uncen: Boolean!
        source: String
        overlap: String
        tags: String
        entries: [Entry]
    }
    
    type Song {
        id: Int
        title: String
        themes: [Theme]
        performances: [Performance]
    }
    
    type Performance {
        song: Song!
        artist: Artist!
        as: String
    }
    
    type Artist implements ResourceWithImages {
        id: Int
        slug: String!
        name: String!            
        performances: [Performance]
        members: [ArtistMembership]
        groups: [ArtistMembership]
        resources: [Resource]
        images: [Image]
    }
    
    type ArtistMembership {
        group: Artist!
        member: Artist!
        as: String
    }
    
    type Series {
        id: Int
        slug: String!
        name: String!
        anime: [Anime]
    }
    
    type Resource {
        id: Int
        link: String!
        site: String!
    }
    
    type Image {
        id: Int
        facet: String!
        link: String
    }
    
    type Studio {
        id: Int
        slug: String!
        name: String!
        anime: [Anime]
        resources: [Resource]
    }
    
    type Announcement {
        id: Int
        content: String!
    }

    type Page {
        id: Int
        slug: String!
        name: String!
        body: String!
    }
    
    schema {
      query: Query
    }
`;
