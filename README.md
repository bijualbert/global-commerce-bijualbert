# Shopify Hydrogen + React Router 7 storefront

## Project Overview

This is a **dual-stack e-commerce application**:
- **`global-commerce/`**: Hydrogen + React Router 7 storefront (server-rendered, Shopify Storefront API integration)
- **`src/`**: Vite + React + TypeScript dashboard/admin app (client-side, separate SPA)

Both share styling (Tailwind, shadcn/ui) but are **independently deployable**.

## Critical Architecture Decisions

### 1. **React Router v7 (NOT Remix)**
The `global-commerce/` app was migrated from Remix to React Router 7.9.x. **This is critical.**
- ✅ Import from `react-router` not `@remix-run/react`
- ✅ File-based routing via `@react-router/fs-routes` (see [app/routes.js](global-commerce/app/routes.js))
- ✅ Routes live in [app/routes/](global-commerce/app/routes/) with convention-based naming: `($locale).cart.jsx`, `($locale).products.$id.jsx`
- ❌ Never use Remix-specific APIs (loaders with `json()`, `defer()` from Remix)
- Existing cursor rule: [global-commerce/.cursor/rules/hydrogen-react-router.mdc](global-commerce/.cursor/rules/hydrogen-react-router.mdc)

### 2. **Server-Side Rendering (Hydrogen + Oxygen Workers)**
- [global-commerce/server.js](global-commerce/server.js): Entry point, creates Hydrogen context
- [global-commerce/app/entry.server.jsx](global-commerce/app/entry.server.jsx): SSR handler, renders to stream
- [global-commerce/app/context.js](global-commerce/app/context.js): Creates HydrogenRouterContextProvider with Shopify Storefront client
- Loaders/actions run on the server; use `useLoaderData()` / `useActionData()` to access server data

### 3. **Shopify Integration**
- **Storefront API**: Called from server loaders (e.g., queries in [app/lib/fragments.js](global-commerce/app/lib/fragments.js))
- **GraphQL**: Codegen via `@graphql-codegen/cli` – run `npm run codegen` to regenerate types
- **Cart**: Uses Hydrogen's optimistic cart context (`useOptimisticCart()`) + server mutations
- Authenticated customer API stored in [app/lib/](global-commerce/app/lib/) (customer-account queries)

### 4. **State Management**
- **global-commerce**: React Context (Hydrogen context) for server data; `useRevalidator()` for mutations
- **src/ (dashboard)**: Zustand stores (e.g., [src/stores/cartStore.ts](src/stores/cartStore.ts)) with localStorage persistence
- **Global client queries**: TanStack Query (`@tanstack/react-query`)

### 5. **Styling & UI Components**
- **Framework**: Tailwind CSS v4 + shadcn/ui (Radix UI primitives)
- **Config**: [tailwind.config.ts](tailwind.config.ts) (root) + both apps import Tailwind
- **Components**: Stored in [src/components/ui/](src/components/ui/) (shadcn presets); global-commerce uses custom CSS

## Build & Development Workflows

### Root Project (`package.json`)
```bash
npm run dev       # Starts Vite dev server (src/ app on localhost:5173)
npm run build     # Production build for src/ app
npm run lint      # ESLint check
```

### Hydrogen/Global-Commerce App
```bash
cd global-commerce
npm run dev       # Hydrogen dev server (server-side rendered on :3000)
npm run build     # Build with `shopify hydrogen build --codegen`
npm run codegen   # Regenerate GraphQL types
```

**Key difference**: Hydrogen uses `shopify` CLI (Oxygen runtime), not standard Node.js.

## Common Patterns & Conventions

### File-Based Routing (global-commerce)
- Filenames determine routes: `($locale).products.$id.jsx` → `/[locale]/products/[id]`
- `($locale)` = optional param; `$` = catch-all/splat
- Segments wrap params in `[]` when converted to URLs
- See [routes.js](global-commerce/app/routes.js) for flat route config

### Loader Pattern (React Router, global-commerce)
```jsx
// In route file
export async function loader({ params, context }) {
  const { storefront } = context;
  const { id } = params;
  // Call Shopify API here, return data
  return json({ product: ... });
}

export default function Product() {
  const { product } = useLoaderData();
  return <div>{product.title}</div>;
}
```

### Mutation Pattern (React Router)
```jsx
export async function action({ request, context }) {
  if (request.method === 'POST') {
    // Process form data, call Storefront API
    return json({ success: true });
  }
}

export default function Component() {
  const actionData = useActionData();
  return <Form method="post">...</Form>;
}
```

### Hydrogen Context Pattern
- Access Storefront client: `context.storefront`
- Cart optimistic updates: `useOptimisticCart()`
- Analytics: `useAnalytics()`, `getShopAnalytics()`
- See [Header.jsx](global-commerce/app/components/Header.jsx) for example

### Zustand Store Pattern (src/ dashboard)
```ts
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => { /* ... */ },
    }),
    { name: 'cart-store', storage: createJSONStorage(...) }
  )
);
```

## Key File Locations

| Purpose | Location |
|---------|----------|
| Storefront API fragments (queries) | [global-commerce/app/lib/fragments.js](global-commerce/app/lib/fragments.js) |
| Cart logic | [src/stores/cartStore.ts](src/stores/cartStore.ts), [global-commerce/app/components/CartMain.jsx](global-commerce/app/components/CartMain.jsx) |
| i18n setup | [global-commerce/app/lib/i18n.js](global-commerce/app/lib/i18n.js) |
| Auth/session | [global-commerce/app/lib/session.js](global-commerce/app/lib/session.js) |
| Root layout | [global-commerce/app/root.jsx](global-commerce/app/root.jsx) |
| Type config | [tsconfig.json](tsconfig.json) → paths: `@/*` = src/, `~` = global-commerce/app/ |
| Build config | [global-commerce/vite.config.js](global-commerce/vite.config.js), [vite.config.ts](vite.config.ts) |

## Important Conventions

1. **Path aliases**:
   - `@/` → `src/` (dashboard app)
   - `~/` → `global-commerce/app/` (Hydrogen app)
   
2. **CSS imports**: End with `?url` for Vite (e.g., `import resetStyles from '~/styles/reset.css?url'`)

3. **No revalidation by default** (global-commerce): [root.jsx shouldRevalidate](global-commerce/app/root.jsx#L10-L34) skips refetch on sub-navigation to improve perf

4. **Content Security Policy** handled by Hydrogen in [entry.server.jsx](global-commerce/app/entry.server.jsx)

5. **GraphQL codegen**: Types auto-generated in `.generated.d.ts` files – don't edit manually

## Before Committing Changes

- Run linter: `npm run lint` from each app root
- For Hydrogen: Run `npm run codegen` if you modified GraphQL queries
- Both TypeScript configs strict disabled for flexibility – avoid unsafe any
