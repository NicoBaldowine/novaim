# NovaIM

Animated brand presentations for NovaIM.

## Branding 1

Source: `branding-1/`.

Published at https://nicobaldowine.github.io/novaim/branding-1/.

## Branding 2

Source: `branding-2/`.

Published at https://nicobaldowine.github.io/novaim/branding-2/.


### Development

```sh
cd branding-2
npm ci
npm run dev
```

### Publish

Push to `main` to deploy through GitHub Pages. The build exports the presentation under `/branding-1` and `/branding-2`, with assets scoped to that path. To build for a domain root rather than the GitHub project prefix, use `SITE_PREFIX='' node scripts/build-site.mjs`.

## Vercel

Import this repository with the Root Directory left empty and the Other framework preset. The root `vercel.json` builds both presentations into `site/`, exposed at `/branding-1/` and `/branding-2/`. The homepage redirects to `/branding-1/`.
