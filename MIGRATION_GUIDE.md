# Migration Guide: SKULPT Vision Forge Refactor

## Overview

This project has been refactored from a flat structure with large (600-900 line) page files into a modern, scalable architecture. **All functionality and visual output remain identical** — this is purely a structural improvement.

## What Changed

### New Folder Structure

```
src/
├── app/
│   ├── routes/          # Route configuration with lazy loading
│   │   ├── router.tsx
│   │   └── index.ts
│   ├── providers/       # React Query, Theme, etc.
│   │   ├── QueryProvider.tsx
│   │   └── index.ts
│   └── store/           # (Reserved for future state management)
├── pages/               # Thin page components (shells)
│   ├── Home/
│   │   ├── HomePage.tsx
│   │   └── index.ts
│   ├── Contact/
│   ├── Skulpting/
│   ├── Skulpted/
│   ├── Privacy/
│   └── NotFound/
├── features/            # Domain-specific feature modules
│   ├── contact/
│   │   ├── components/  # ContactForm, FormField, ChallengeSelector
│   │   ├── hooks/       # useContactForm
│   │   └── lib/         # validation, layout-utils
│   ├── skulpting/
│   │   ├── components/  # StrategyCircle, TeamSection
│   │   ├── hooks/       # useStockholmTime, useMobileDetect
│   │   └── lib/         # constants (team, axisCopy)
│   └── home/
│       └── components/  # Hero, HowItWorks, Portfolio
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── three/           # 3D components (SmokeBackground, SShape, NoiseCanvas)
│   ├── ui/              # shadcn/ui components
│   ├── Seo.tsx          # SEO wrapper
│   ├── RouteBlurTransition.tsx
│   └── index.ts         # Barrel export
├── hooks/               # Global reusable hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                 # Cross-cutting utilities
│   ├── utils.ts         # clsx, cn helpers
│   ├── constants.ts     # Form limits, API endpoints, options
│   ├── types.ts         # Shared TypeScript types
│   └── index.ts
├── services/            # (Reserved for API clients)
│   └── api/
├── assets/              # Images, videos, fonts, 3D models
│   ├── images/
│   ├── videos/
│   ├── skulpting/
│   └── *.svg
└── test/                # Test utilities (future)
```

### Path Aliases

New aliases configured in `tsconfig.json`, `tsconfig.app.json`, and `vite.config.ts`:

```typescript
@app/*       → src/app/*
@pages/*     → src/pages/*
@features/*  → src/features/*
@components/* → src/components/*
@hooks/*     → src/hooks/*
@lib/*       → src/lib/*
@services/*  → src/services/*
@assets/*    → src/assets/*
```

**Old imports:**
```typescript
import { Navbar } from "../components/Navbar";
import { SmokeBackground } from "../../components/SmokeBackground";
```

**New imports:**
```typescript
import { Navbar, SmokeBackground } from "@components";
// or specific:
import { Navbar } from "@components/layout";
import { SmokeBackground } from "@components/three";
```

### File Splits

| Original File | Lines | Split Into | Location |
|--------------|-------|-----------|-----------|
| `Contact.tsx` | 905 | ContactForm, FormField, ChallengeSelector, useContactForm, validation, layout-utils | `features/contact/` |
| `Skulpting.tsx` | 770 | StrategyCircle, TeamSection, useStockholmTime, useMobileDetect, constants | `features/skulpting/` |
| `Skulpted.tsx` | 679 | Moved to `pages/Skulpted/` (to be further split if needed) | `pages/Skulpted/` |
| `Index.tsx` | 199 | HomePage | `pages/Home/` |

### Lazy Loading

Heavy routes (especially 3D scenes) are now lazy-loaded to improve initial bundle size:

```typescript
const HomePage = lazy(() => import("@/pages/Home"));
const SkulptingPage = lazy(() => import("@/pages/Skulpting"));
const SkulptedPage = lazy(() => import("@/pages/Skulpted"));
const ContactPage = lazy(() => import("@/pages/Contact"));
```

## How To Use the New Structure

### Adding a New Page

1. Create folder: `src/pages/NewPage/`
2. Create component: `NewPage/NewPageComponent.tsx` (default export)
3. Create barrel: `NewPage/index.ts`
4. Add route to `src/app/routes/router.tsx`:

```typescript
const NewPage = lazy(() => import("@/pages/NewPage"));

// In routes array:
<Route path="/new" element={<NewPage />} />
```

### Adding a New Feature

1. Create feature folder: `src/features/my-feature/`
2. Add subdirectories as needed:
   - `components/` - React components
   - `hooks/` - Custom hooks
   - `lib/` - Utilities, constants, types
3. Create barrel exports: `index.ts` in each subdirectory
4. Import in pages: `import { MyComponent } from "@features/my-feature";`

### Adding a 3D Primitive

1. Create file: `src/components/three/MyPrimitive.tsx`
2. Add export to `src/components/three/index.ts`
3. Use: `import { MyPrimitive } from "@components/three";`

### Adding API Calls

1. Create fetcher: `src/services/api/myService.ts`
2. Create hook in feature: `src/features/my-feature/hooks/useMyData.ts`
3. Use TanStack Query:

```typescript
import { useQuery } from "@tanstack/react-query";

export function useMyData() {
  return useQuery({
    queryKey: ["myData"],
    queryFn: () => fetch("/api/my-data").then(res => res.json()),
  });
}
```

### Shared Types

Define shared types in `src/lib/types.ts`:

```typescript
export interface MySharedType {
  id: string;
  name: string;
}
```

### Constants

Add constants to `src/lib/constants.ts`:

```typescript
export const MY_CONSTANT = "value" as const;

export const MY_OPTIONS = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
] as const;
```

## Scripts

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build

# Code Quality
npm run typecheck        # TypeScript type checking
npm run lint             # ESLint
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier formatting

# Testing
npm run test             # Run tests (not yet configured)
npm run test:watch       # Watch mode
```

## Breaking Changes

**None.** All imports have been updated. The application behavior is identical.

## Migration Checklist for Future Contributors

When adding new code:

- ✅ Use path aliases (`@components/*`, `@features/*`, etc.)
- ✅ Keep page components thin (< 150 lines ideally)
- ✅ Extract reusable logic into hooks
- ✅ Move domain-specific code to `features/`
- ✅ Move generic reusable components to `components/`
- ✅ Add types to `lib/types.ts` when shared
- ✅ Add constants to `lib/constants.ts` when shared
- ✅ Create barrel exports (`index.ts`) for cleaner imports
- ✅ Lazy load heavy routes
- ✅ Colocate related code (components, hooks, utils in same feature)

## Testing Strategy

Basic smoke tests can be added in `src/test/` for critical components:

```typescript
// Example: src/test/components/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import { Navbar } from '@components/layout';

test('renders navbar', () => {
  render(<Navbar />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
```

## Performance Improvements

- **Lazy loading**: Heavy routes load on-demand
- **Code splitting**: React.lazy at route boundaries
- **Tree shaking**: Barrel exports enable better tree shaking
- **Bundle analysis**: Run `npm run build` and check `dist/` size

## Rationale

### Why Features?

The `features/` directory groups **domain-specific** code together:
- Easier to find related code
- Clear ownership boundaries
- Can be extracted into packages later
- Encourages cohesion

### Why Components/Layout/Three?

Organizes components by **type** and **purpose**:
- `layout/`: Navigation, structure
- `three/`: 3D/R3F primitives
- `ui/`: Generic shadcn components

### Why Barrel Exports?

- Cleaner imports: `import { X, Y } from "@components"`
- Easier refactoring (move files without breaking imports)
- Better tree-shaking support

## Troubleshooting

### Import Errors

If you see import errors:
1. Check tsconfig path aliases match vite.config aliases
2. Restart TypeScript server in VS Code: `Cmd+Shift+P` → "Restart TS Server"
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Build Errors

```bash
npm run typecheck  # Check for TS errors
npm run lint       # Check for lint errors
npm run build      # Full production build
```

### Path Alias Not Working

Ensure **both** `tsconfig.json` and `vite.config.ts` have the alias defined.

## Next Steps

Future improvements:
- Add vitest + @testing-library/react
- Create Storybook for component development
- Add e2e tests with Playwright
- Set up bundle analysis in CI
- Extract `features/*` into npm packages if needed

## Questions?

For questions about this refactor, see:
- File structure: This guide
- Component patterns: `src/features/contact/` (example)
- Routing: `src/app/routes/router.tsx`
- State management: `src/app/providers/QueryProvider.tsx`

---

**Last Updated:** 2025-11-11  
**Author:** Refactoring Assistant

