module.exports = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        interface Entity {
            idRaw: Int
        }
    
        type Anime implements Node & Entity {
            idRaw: Int
            name: String!
            slug: String!
            year: Int!
            season: String
            synopsis: String
            synonyms: [Synonym] @link(by: "anime.id", from: "id")
            themes: [Theme] @link(by: "anime.id", from: "id")            
            series: [Series]
            resources: [Resource]
            images: [Image]
            studios: [Studio]
        }
        
        type Synonym implements Node & Entity {
            idRaw: Int
            text: String!
            anime: Anime! @link(by: "id")
        }
        
        type Theme implements Node & Entity {
            idRaw: Int
            slug: String!
            type: String!
            group: String
            song: Song! @link(by: "id")
            anime: Anime! @link(by: "id")
            entries: [Entry] @link(by: "theme.id", from: "id")
        }

        type Entry implements Node & Entity {
            idRaw: Int
            version: Int
            episodes: String
            nsfw: Boolean!
            spoiler: Boolean!
            theme: Theme! @link(by: "id")            
            videos: [Video]
        }
        
        type Video implements Node & Entity {
            idRaw: Int
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
        
        type Song implements Node & Entity {
            idRaw: Int
            title: String!
            themes: [Theme] @link(by: "song.id", from: "id")
            performances: [Performance] @link(by: "song.id", from: "id")
        }
        
        type Performance implements Node {
            song: Song! @link(by: "id")
            artist: Artist! @link(by: "id")
            as: String
        }
        
        type Artist implements Node & Entity {
            idRaw: Int
            slug: String!
            name: String!            
            performances: [Performance] @link(by: "artist.id", from: "id")
            members: [ArtistMembership] @link(by: "group.id", from: "id")
            groups: [ArtistMembership] @link(by: "member.id", from: "id")
            resources: [Resource]
            images: [Image]
        }
        
        type ArtistMembership implements Node {
            group: Artist! @link(by: "id")
            member: Artist! @link(by: "id")
            as: String
        }
        
        type Series implements Node & Entity {
            idRaw: Int
            slug: String!
            name: String!
            anime: [Anime]
        }
        
        type Resource implements Node & Entity {
            idRaw: Int
            link: String!
            site: String!
        }
        
        type Image implements Node & Entity {
            idRaw: Int
            facet: String!
            link: String
        }
        
        type Studio implements Node & Entity {
            idRaw: Int
            slug: String!
            name: String!
            anime: [Anime]
        }
        
        type AnimeSeries implements Node {
            anime: Anime! @link(by: "id")
            series: Series! @link(by: "id")
        }
        
        type EntryVideo implements Node {
            entry: Entry! @link(by: "id")
            video: Video! @link(by: "id")
        }
        
        type AnimeResource implements Node {
            anime: Anime! @link(by: "id")
            resource: Resource! @link(by: "id")
        }
        
        type ArtistResource implements Node {
            artist: Artist! @link(by: "id")
            resource: Resource! @link(by: "id")
        }
        
        type AnimeImage implements Node {
            anime: Anime! @link(by: "id")
            image: Image! @link(by: "id")
        }
        
        type ArtistImage implements Node {
            artist: Artist! @link(by: "id")
            image: Image! @link(by: "id")
        }
        
        type AnimeStudio implements Node {
            anime: Anime! @link(by: "id")
            studio: Studio! @link(by: "id")
        }
        
        type Announcement implements Node & Entity {
            idRaw: Int
            content: String!
        }
    `);
};
