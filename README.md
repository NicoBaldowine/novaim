# NovaIM

NovaIM’s design explorations and production landing page live in this repository as three independent Next.js applications.

## Projects

| App | Source | Production route | Purpose |
| --- | --- | --- | --- |
| Branding 1 | `branding-1/` | `/branding1/` | Primary brand identity presentation |
| Branding 2 | `branding-2/` | `/branding2/` | Alternate brand direction and motion studies |
| Landing 1 | `landing-1/` | `/landing1/` | Bilingual NovaIM marketing site |

Each app owns its dependencies and scripts. Install and run the app you are working on from its directory:

```sh
cd landing-1
npm ci
npm run dev -- --port 3003
```

## Quality checks

Run these commands inside the app you changed:

```sh
npm run lint
npm run build
```

The landing includes English and Spanish content, responsive navigation, animated dotted surfaces, product sections, testimonials and a contact form.

## Production build

The root build script exports all three apps into `site/`:

```sh
node scripts/build-site.mjs
```

`SITE_PREFIX` controls the public path prefix and defaults to `/novaim`. Vercel uses compact routes such as `/landing1/`; GitHub Pages uses routes such as `/novaim/landing-1/`.

## Deployment

Vercel should import the repository with the root directory left empty and use the configuration in `vercel.json`. The public landing is available at [novaim-branding.vercel.app/landing1](https://novaim-branding.vercel.app/landing1/).

Pushing to `main` also triggers the GitHub Pages workflow in `.github/workflows/`.
