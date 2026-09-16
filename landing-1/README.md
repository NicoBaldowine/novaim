# novaim · Landing 1

Standalone Next.js hero exploration, with the Branding 2 vector logo, locally bundled Zalando Sans and the Branding 1 particle sphere. The hero introduces agentic engineering services, followed by three animated capability cards. The header links to Services, Cases, Company and Contact.

## Development

```sh
npm ci
npm run dev -- --port 3003
```

## Validation

```sh
npm run lint
npm run build
```

Static export: `STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/landing1 npm run build`.
The repository build script selects `/landing1/` for compact routes and `/novaim/landing-1/` for GitHub Pages.

Animation respects reduced motion and stops offscreen. Mobile stacks the copy above the sphere and provides an expandable navigation menu.
