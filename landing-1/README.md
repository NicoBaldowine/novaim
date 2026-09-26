# Novaim · Landing 1

A bilingual Next.js landing page for Novaim's agentic engineering services and products. It uses the current Novaim identity, locally bundled Zalando Sans, procedural canvas backgrounds, accessible navigation and responsive layouts.

The page includes:

- English and Spanish content with a persisted language preference.
- Animated service cards and a continuous product background.
- Product, testimonial, contact and footer sections.
- Desktop and mobile navigation with reduced-motion support.

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

Animation respects reduced motion and pauses when it is not visible. Mobile uses a fullscreen navigation menu and touch-friendly horizontal service cards.
