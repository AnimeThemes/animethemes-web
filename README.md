# AnimeThemes Web Client

1. [Configuration](#configuration)
2. [Development](#development)
3. [Deployment](#deployment)
4. [Used technologies](#used-technologies)

## Configuration

To get started you need to define some environment variables. This can be done by creating a `.env.local` file in the 
root directory.

This is a list of all available options:

```ini
; Back-end API configuration
;   These values are required.
ANIMETHEMES_API_URL=http://localhost
ANIMETHEMES_API_KEY=...

; (Optional) The URL to the AnimeThemes API to use on the front-end.
;   For development this is "http://localhost" by default.
;   For production this is "https://staging.animethemes.moe" by default.
NEXT_PUBLIC_API_URL=http://localhost

; (Optional) The URL from which video files should be served.
;   By default this is "https://animethemes.moe". 
NEXT_PUBLIC_VIDEO_URL=https://animethemes.moe

; (Optional) The base path the app should be hosted on.
;   By default the app is hosted on the root path (/).
NEXT_PUBLIC_BASE_PATH=/wiki
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

- [AnimeThemes API](https://staging.animethemes.moe/api/docs/)
