import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: [
        "src/lib/common/animethemes/type-defs.ts",
        "src/lib/server/animebracket/type-defs.ts",
        "src/lib/client/search.ts",
    ],
    documents: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-operations"],
            config: {
                avoidOptionals: {
                    object: true,
                    field: true,
                    inputValue: false,
                },
                enumsAsTypes: true,
                skipTypename: true,
                useTypeImports: true,
            },
        },
        "src/generated/graphql-resolvers.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                useTypeImports: true,
                // This fixes an issue with the Maybe type, leading to unclear error messages.
                // Taken from here: https://github.com/dotansimha/graphql-code-generator/issues/3174#issuecomment-595398571
                maybeValue: "T extends PromiseLike<infer U> ? Promise<U | null> : T | null",
                mappers: {
                    Anime: "@/lib/common/animethemes/types#ApiAnime",
                    Announcement: "@/lib/common/animethemes/types#ApiAnnouncement",
                    Artist: "@/lib/common/animethemes/types#ApiArtist",
                    Audio: "@/lib/common/animethemes/types#ApiAudio",
                    Dump: "@/lib/common/animethemes/types#ApiDump",
                    Entry: "@/lib/common/animethemes/types#ApiEntry",
                    FeaturedTheme: "@/lib/common/animethemes/types#ApiFeaturedTheme",
                    Group: "@/lib/common/animethemes/types#ApiGroup",
                    Page: "@/lib/common/animethemes/types#ApiPage",
                    Performance: "@/lib/common/animethemes/types#ApiPerformance",
                    Playlist: "@/lib/common/animethemes/types#ApiPlaylist",
                    PlaylistTrack: "@/lib/common/animethemes/types#ApiPlaylistTrack",
                    ExternalProfile: "@/lib/common/animethemes/types#ApiExternalProfile",
                    ExternalProfileEntry: "@/lib/common/animethemes/types#ApiExternalProfileEntry",
                    Season: "@/lib/common/animethemes/types#ApiSeason",
                    Series: "@/lib/common/animethemes/types#ApiSeries",
                    Song: "@/lib/common/animethemes/types#ApiSong",
                    Studio: "@/lib/common/animethemes/types#ApiStudio",
                    Synonym: "@/lib/common/animethemes/types#ApiSynonym",
                    Theme: "@/lib/common/animethemes/types#ApiTheme",
                    UserAuth: "@/lib/common/animethemes/types#ApiUser",
                    UserPublic: "@/lib/common/animethemes/types#ApiUser",
                    UserRole: "@/lib/common/animethemes/types#ApiUserRole",
                    UserScopedQuery: "{}",
                    Video: "@/lib/common/animethemes/types#ApiVideo",
                    VideoOverlap: "string",
                    VideoScript: "@/lib/common/animethemes/types#ApiVideoScript",
                    Year: "@/lib/common/animethemes/types#ApiYear",
                    Bracket: "@/lib/server/animebracket/resolvers#ModelBracket",
                    BracketRound: "@/lib/server/animebracket/resolvers#ModelBracketRound",
                    BracketPairing: "@/lib/server/animebracket/resolvers#ModelBracketPairing",
                    BracketCharacter: "@/lib/server/animebracket/resolvers#ModelBracketCharacter",
                },
            },
        },
    },
    hooks: {
        afterAllFileWrite: ["prettier --write"],
    },
};

export default config;
