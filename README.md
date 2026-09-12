# NovaIM

Animated brand presentations for NovaIM.

## Branding 2

Source: `branding-2/`.

Published at https://nicobaldowine.github.io/novaim/branding-2/.
The root is reserved for the other brand direction.

### Development

```sh
cd branding-2
npm ci
npm run dev
```

### Publish

Push to `main` to deploy through GitHub Pages. The build exports the presentation under `/branding-2`, with assets scoped to that path. To build for a domain root rather than the GitHub project prefix, use `SITE_PREFIX='' node scripts/build-site.mjs`.
