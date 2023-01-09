# AnimeThemes Web Client

1. [Configuration](#configuration)
2. [Development](#development)
3. [Deployment](#deployment)
4. [Used technologies](#used-technologies)

## Configuration

To get started you need to define some environment variables. This can be done by creating a `.env.local` file in the
root directory. A minimal setup only requires one variable to be set:

```ini
; Set this to the URL on which your local API is served.
;
; (If you do not have a local instance of animethemes-server set up
; you can also use the production or beta URLs of the AnimeThemes API.
; Keep in mind though that this puts addtional load on our servers.
; That's why it's recommended to set up your own API instance locally.)
ANIMETHEMES_API_URL=http://localhost
```

To get to use all features of the client, you may configure some additional variables.

This is a list of all available options:

```ini
; ===== Server-side =====

; The URL to the AnimeThemes API which will be used on the server.
ANIMETHEMES_API_URL=http://localhost

; If specified, this API key will be used to make requests to the AnimeThemes API.
; This is used to by-pass rate limiting.
ANIMETHEMES_API_KEY=...

; The token to use for manual revalidation.
REVALIDATE_TOKEN=secret

; Set to any truthy value to activate minimal build mode.
; In minimal build mode, only a small subset of pages get prerendered at build time.
MINIMAL_BUILD=true

; Set to any truthy value to activate the bundle analyzer.
ANALYZE=true

; ===== Server-side + Client-side =====

; The base path the app should be hosted on.
NEXT_PUBLIC_BASE_PATH=/wiki

; The URL to the AnimeThemes API which will be used on the browser.
NEXT_PUBLIC_API_URL=https://api.animethemes.moe

; The URL from which video files should be served.
NEXT_PUBLIC_VIDEO_URL=https://v.animethemes.moe

; The URL from which audio files should be served.
NEXT_PUBLIC_AUDIO_URL=https://a.animethemes.moe

; The URL to use for app links.
NEXT_PUBLIC_APP_URL=https://app.animethemes.moe

; Set to any truthy value to activate staging mode.
; In staging mode a warning banner is displayed at the top of the page.
NEXT_PUBLIC_STAGING=true

; To enable verbose logging.
NEXT_PUBLIC_VERBOSE_LOGS=true
```

For more information on environment variables see the [Next.js documentation](https://nextjs.org/docs/basic-features/environment-variables).

## Development

1. `npm install`
2. `npm run dev`

## Deployment

1. `npm install` (If not done already.)
2. `npm run build` generates all static pages and produces a production ready bundle.
3. `npm run start` starts the server.
4. The server is now listening on port 3000 for incoming requests.

## Used technologies

- [Next.js](https://www.nextjs.org/)
- [styled-components](https://styled-components.com/)
- [react-query](https://react-query.tanstack.com/)
- [Font Awesome](https://fontawesome.com/)
- ...some other small packages, see the `package.json`.

### APIs

- [AnimeThemes API](https://api-docs.animethemes.moe/)
