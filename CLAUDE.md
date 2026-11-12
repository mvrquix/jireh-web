# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Storefront for Jireh Athletics (jirehathletics.com), an apparel brand. Next.js 15 App Router, React 19, plain JavaScript (no TypeScript). Products, cart and checkout all come from Shopify's Storefront GraphQL API; the app has no database or backend of its own.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # the only automated check available
npm start
```

There is no test framework. There is also no ESLint config or ESLint dependency, so `npm run lint` will try to set up ESLint interactively instead of linting.

The README is create-next-app boilerplate. Its note about the Geist font is stale: the app uses `@fontsource/roboto`.

## Environment

Create `.env.local` (all `.env*` files are gitignored) with these variables:

- `SHOPIFY_STORE_DOMAIN`: the full Storefront GraphQL endpoint URL that requests are POSTed to (`https://<store>.myshopify.com/api/<version>/graphql.json`), not a bare domain.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_STORE_ADMIN_DOMAIN`: the Admin GraphQL endpoint. Only `subscribeCustomer` uses it, and it sends `SHOPIFY_STOREFRONT_ACCESS_TOKEN` as the admin token. Nothing calls `subscribeCustomer` any more: the home page's subscribe form now posts to jireh-cms.
- `CMS_URL`: base URL of jireh-cms (`../jireh-cms`), e.g. `http://localhost:3001` locally. Without it, or when the CMS can't be reached, the home page renders `FALLBACK_HOME_CONTENT` and the subscribe form returns an error.

## Architecture

### Data flow

- All Shopify access lives in `app/actions/shopify-actions.js`, a `"use server"` module, so every exported function is a Server Action. GraphQL queries are inline template strings. `_send` returns `{ status, body }` on success and `{ error }` on failure. The exported fetchers read `response.body.…` without checking for an error, so a Shopify failure shows up in the caller as a TypeError.
- Every page and component is a client component except the home page (`app/page.js`), including the root `app/layout.js`. Because the layout is a client component, the `<head>`/OG tags are written by hand there; the app does not use Next's `metadata` export. Pages call server actions from `useEffect` and keep the results in `useState`. Product data is not rendered on the server and is not cached.
- The home page content (carousel, banner, showcase rows, featured product count, subscribe section) comes from jireh-cms, not from code. `app/page.js` is a server component: it calls `await connection()`, then `getHomeContent()` in `app/lib/cms.js`, which fetches `${CMS_URL}/api/public/home` uncached with a 5 s timeout. It passes the result to the client component `app/components/home-content.js`. The content's shape is defined by `normalizeHomeContent` in `jireh-cms/lib/content.js`; `app/lib/cms.js` only guards against a malformed response.
- `FALLBACK_HOME_CONTENT` in `app/lib/cms.js` is the page as it was before the CMS, built from images in `public/assets/images/`. It is used only when the CMS is unavailable, never to fill in sections the CMS left empty; an empty section is hidden.
- The subscribe form calls the `subscribeToEmailList` server action (`app/actions/cms-actions.js`), which posts to `${CMS_URL}/api/public/subscribe` with `source: "home"`.
- Product lists are sorted newest-first on the client by `createdAt`. The home page shows as many as the CMS's featured product count, and `/shop` shows all of them in an MUI Masonry grid. `fetchAllProducts` returns at most 100 products.

### Cart

- `createCart` creates a Shopify cart and stores its ID in a `cart` cookie with a 1-hour `maxAge`. `addProductToCart` creates the cart on the first add and calls `cartLinesAdd` after that. Checkout redirects to Shopify's `checkoutUrl`; this app has no checkout of its own.
- The cart UI is a Chakra Drawer inside `app/components/header.js`. Components talk to each other through a `"cart-update"` event. The product page publishes the event with `useEventEmitter` (`app/hooks/event-emitter-hook.js`, which wraps a module-level `EventTarget` singleton in `app/events/event-emitter.js`). The header listens for it, refetches the cart and opens the drawer.
- Variant selection happens in `app/shop/[handle]/page.js`. The page picks the variant by `JSON.stringify`-comparing the user's `selectedOptions` array with each variant's `selectedOptions`. `validateSelectedOptions` compares the joined option names. Both checks depend on the array order matching Shopify's option order. Single-variant products skip option selection.

### Styling: three systems side by side

- **Bootstrap 5.0.2**: `app/layout.js` loads its CSS and JS from the jsDelivr CDN; it is not an npm dependency. The app uses it for the grid (`container`, `row`, `col-lg-*`), spacing utilities, `btn`, `form-select` and `badge`.
- **Chakra UI v3**: `app/layout.js` sets up `ChakraProvider` with `createSystem(defaultConfig, …)`. Chakra handles the interactive pieces: Drawer, Carousel, NumberInput and Progress, plus layout primitives. v3 uses compound components such as `Drawer.Root` and `Carousel.Item`.
- **SCSS** in `app/scss/`:
  - `app/layout.js` imports it once through `styles.scss`.
  - It is organized as `abstracts/`, `base/`, `layouts/` and `components/`. Each folder has an `_index.scss` that `@forward`s its partials, so a new partial must be forwarded there.
  - `next.config.mjs` adds `app/scss` to Sass `includePaths`.
  - Partials get the breakpoint mixins through `@use '../abstracts' as *`. Only `xs` in `_mixins.scss` is correct: `sm`, `md` and `xl` interpolate variable names without the `$` and emit invalid media queries, and `lg` references an undefined variable, so using it fails to compile.
- **MUI**: only `@mui/lab` Masonry, on `/shop`.

### Unused or inert code

- `components/ui/*` are snippets generated by the Chakra CLI (a Provider, color mode via next-themes, etc.). Nothing imports them, and the app uses its own provider in `app/layout.js`.
- `app/components/shop-product-card.js` is unused. `primereact` and `underscore` are installed but never imported.
- `jsconfig.json` maps `@/*` to `./src/*`, which doesn't exist. Use relative imports, as the existing code does.
- The classes `anim-image-parallax`, `tt-lazy` and `rts-text-anim`, and the `window.rtsJs` call on the product page, are leftovers from a template. No script provides them.

### Images

- Home page images are uploaded through jireh-cms to Vercel Blob and come back as absolute `https://…public.blob.vercel-storage.com/…` URLs. They are rendered with plain `<img>`/Chakra `Image`, not `next/image`.
- Static assets live in `public/assets/images/`. The carousel, logo and showcase files there are only used by `FALLBACK_HOME_CONTENT`.
- `next.config.mjs` only allows remote `next/image` sources that match `**.shopify.com/s/**`.
