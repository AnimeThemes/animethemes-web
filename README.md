# AnimeThemes Web Client

## Development

1. `npm install`
2. `npm run develop`

## Deployment

### Hosting on root path

1. `npm run build`
2. Upload the contents of `public` to your server.

### Hosting on sub-path

1. Adjust `pathPrefix` in `gatsby-config.js` to your server environment.
2. `npm run build-with-paths`
3. Upload the contents of `public` to your server.

## Configuration

You can configure certain settings by creating a `.env.development` (for development) or `.env.production` (for deployment)
in the client root directory and include the following:

```ini
; The URL to the AnimeThemes API to use.
; If not specified, "https://staging.animethemes.moe" is used as a default.
GATSBY_API_URL = http://localhost
```

### Apache Configuration

`.htaccess` files can be placed in `static` and will be copied to the `public` folder during build.

## Used technologies

- [Gatsby](https://www.gatsbyjs.com/)
- [styled-components](https://styled-components.com/)
- [react-query](https://react-query.tanstack.com/)
- [Font Awesome](https://fontawesome.com/)
- ...some other small packages, see the `package.json`.

### APIs

- [AnimeThemes API](https://staging.animethemes.moe/api/docs/)
