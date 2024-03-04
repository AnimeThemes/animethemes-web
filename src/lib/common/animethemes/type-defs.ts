const typeDefs = `
    #graphql
    
    type Query {
        anime(id: Int, slug: String): Anime
        animeAll(limit: Int, year: Int, season: String): [Anime!]!
        theme(id: Int): Theme
        themeAll(limit: Int, orderBy: String, orderDesc: Boolean, has: String): [Theme!]!
        artist(id: Int, slug: String): Artist
        artistAll(limit: Int): [Artist!]!
        series(id: Int, slug: String): Series
        seriesAll(limit: Int): [Series!]!
        studio(id: Int, slug: String): Studio
        studioAll(limit: Int): [Studio!]!
        videoAll(limit: Int, orderBy: String, orderDesc: Boolean): [Video!]!
        year(value: Int!): Year
        yearAll: [Year!]!
        season(year: Int!, value: String!): Season
        seasonAll(year: Int): [Season!]!
        page(id: Int, slug: String): Page
        pageAll: [Page!]!
        imageAll(facet: String): [Image!]! 
        featuredTheme: FeaturedTheme
        dumpAll: [Dump!]!
        playlist(id: String!): Playlist
        announcementAll: [Announcement!]!
        me: UserScopedQuery!
    }
    
    type UserScopedQuery {
        user: UserAuth
        playlistAll(filterVideoId: Int): [Playlist!]
    }

    interface ResourceWithImages {
        images: [Image!]!
    }
    
    type Year {
        value: Int!
        seasons: [Season!]!
    }
    
    type Season {
        value: String!
        year: Year
        anime: [Anime!]!
    }
    
    type Anime implements ResourceWithImages {
        id: Int!
        name: String!
        slug: String!
        year: Int
        season: String
        synopsis: String
        media_format: String
        synonyms: [Synonym!]!
        themes: [Theme!]!           
        series: [Series!]!
        resources: [Resource!]!
        images: [Image!]!
        studios: [Studio!]!
    }
    
    type Synonym {
        id: Int!
        text: String
        anime: Anime
    }
    
    type Theme {
        id: Int!
        slug: String!
        type: String!
        sequence: Int
        group: String
        song: Song
        anime: Anime!
        entries: [Entry!]!
    }

    type Entry {
        id: Int!
        version: Int
        episodes: String
        nsfw: Boolean!
        spoiler: Boolean!
        theme: Theme!
        videos: [Video!]!
    }
    
    type Video {
        id: Int!
        filename: String!
        basename: String!
        path: String!
        size: Int!
        mimetype: String!
        link: String!
        resolution: Int
        nc: Boolean!
        subbed: Boolean!
        lyrics: Boolean!
        uncen: Boolean!
        source: VideoSource
        overlap: VideoOverlap!
        tags: String!
        audio: Audio!
        script: VideoScript
        entries: [Entry!]!
    }
    
    type VideoScript {
        id: Int!
        path: String!
        link: String!
    }
    
    enum VideoSource {
        WEB
        RAW
        BD
        DVD
        VHS
        LD
    }
    
    enum VideoOverlap {
        NONE
        TRANSITION
        OVER
    }
    
    type Audio {
        id: Int!
        filename: String!
        basename: String!
        path: String!
        size: Int!
        mimetype: String!
        link: String!
        videos: [Video!]!
    }
    
    type Song {
        id: Int
        title: String
        themes: [Theme!]!
        performances: [Performance!]!
    }
    
    type Performance {
        song: Song!
        artist: Artist!
        as: String
    }
    
    type Artist implements ResourceWithImages {
        id: Int!
        slug: String!
        name: String!            
        performances: [Performance!]!
        members: [ArtistMembership!]!
        groups: [ArtistMembership!]!
        resources: [Resource!]!
        images: [Image!]!
    }
    
    type ArtistMembership {
        group: Artist!
        member: Artist!
        as: String
    }
    
    type Series {
        id: Int!
        slug: String!
        name: String!
        anime: [Anime!]!
    }
    
    type Resource {
        id: Int!
        link: String
        external_id: Int
        site: String
        as: String
    }
    
    type Image {
        id: Int!
        path: String!
        size: Int!
        mimetype: String!
        facet: String
        link: String!
    }
    
    type Studio implements ResourceWithImages {
        id: Int!
        slug: String!
        name: String!
        anime: [Anime!]!
        resources: [Resource!]!
        images: [Image!]!
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
        created_at: String!
    }

    type FeaturedTheme {
        id: Int!
        start_at: String!
        end_at: String!
        video: Video
        entry: Entry
    }
    
    type Dump {
        id: Int!
        path: String!
        link: String!
        created_at: String!
    }
    
    type Playlist {
        id: String!
        name: String!
        visibility: PlaylistVisibility!
        tracks_count: Int!
        tracks: [PlaylistTrack!]!
        forward: [PlaylistTrack!]!
        user: UserPublic!
    }
    
    enum PlaylistVisibility {
        Public
        Unlisted
        Private
    }
    
    type PlaylistTrack {
        id: String!
        video: Video!
    }
    
    interface User {
        id: Int!
        name: String!
    }

    type UserPublic implements User {
        id: Int!
        name: String!
    }
    
    type UserAuth implements User {
        id: Int!
        name: String!
        email: String!
        email_verified_at: String
        created_at: String!
        roles: [UserRole!]!
    }
    
    type UserRole {
        name: String!
        color: String
        priority: Int
        default: Boolean!
    }
    
    schema {
      query: Query
    }
`;

export default typeDefs;
