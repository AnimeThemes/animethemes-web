module.exports = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        interface Entity {
            idRaw: Int
        }
    
        type Anime implements Node & Entity {
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
        }
        
        type Synonym implements Node & Entity {
            text: String!
            anime: Anime! @link(by: "id")
        }
        
        type Theme implements Node & Entity {
            slug: String!
            group: String
            song: Song! @link(by: "id")
            anime: Anime! @link(by: "id")
            entries: [Entry] @link(by: "theme.id", from: "id")
        }

        type Entry implements Node & Entity {
            version: Int
            episodes: String
            nsfw: Boolean!
            spoiler: Boolean!
            theme: Theme! @link(by: "id")            
            videos: [Video]
        }
        
        type Video implements Node & Entity {
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
            slug: String!
            name: String!            
            performances: [Performance] @link(by: "artist.id", from: "id")
            resources: [Resource]
            images: [Image]
        }
        
        type Series implements Node & Entity {
            slug: String!
            name: String!            
            anime: [Anime]
        }
        
        type Resource implements Node & Entity {
            link: String!
            site: String!
        }
        
        type Image implements Node & Entity {
            facet: String!
            link: String
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
        
        type Announcement implements Node & Entity {
            content: String!
        }
    `);
};
