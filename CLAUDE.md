# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NeoMart is a premium AI-powered Commerce OS demo showcasing unified multi-source grocery shopping with signature 3D "Aisle View" experiences. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture Overview

### Core Concept: Unified Commerce
- **Single cart** for products from multiple sources (NeoMart and Local)
- **Corners are NOT separate stores** - they are curated views WITHIN categories
- All pricing and fulfillment unified under NeoMart brand
- Currently one corner: "NeoMart Grocery" (South Asian essentials)

### Key Architectural Patterns

#### 1. Data Layer (`/lib`)
- **`data.ts`**: Mock product catalog with 75+ products across categories
- **`types.ts`**: Central TypeScript definitions for Product, Category, Corner, CartItem
- Products include: `isFrozen`, `isProduce`, `section`, `source`, `dietaryTags`, `image`, `aiPairingText`, `aiSubstituteIds`
- Helper functions: `getCategoryBySlug()`, `getProductsByCategory()`, `getProductsBySection()`, `getProductsByCorner()`
- **Product images**: Stored in `/public/products/` with lowercase, underscore-separated names (e.g., `yellow_banana.png`)
- **Source types**: Only `"neomart"` and `"local"` - removed third-party sources (Patel Brothers, ShopRite, H-Mart)

#### 2. State Management (`/store`)
- **Zustand** for global cart state
- `useCartStore` provides: `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`
- Auto-calculates `totalItems` and `totalPrice` on every mutation
- Usage: `const addItem = useCartStore((state) => state.addItem)`

#### 3. Component Architecture

**shadcn/ui Components (`/components/ui`)**
- Pre-built Radix UI components: Button, Card, Badge, Input, Separator, Toast, Tabs, Sheet
- Use `cn()` utility from `lib/utils.ts` for className merging

**Navigation (`/components/nav`)**
- `Header.tsx`: Sticky header with logo, nav tabs, search bar, cart icon with badge
- Already responsive: hides search/nav on mobile, shows cart always

**Product Components (`/components/product`)**
- `ProductCard.tsx`: Main product card with image support, displays real images or emoji fallbacks
- `ProductCardPremium.tsx`: Minimal grid cards with hover effects and image support
- `SourceBadge.tsx`: Displays product source (NeoMart or Local only)
- **Image Handling**: Products with `image` field show actual product photos; products without images display contextual emojis

**Filter Components (`/components/filters`)**
- `FilterDrawer.tsx`: Radix Sheet drawer for section filters
- Reduces UI clutter by moving filters to drawer

#### 4. Signature Aisle View System (`/components/aisle`)

**CRITICAL 3D IMPLEMENTATION DETAILS:**

**Base Components:**
- `AisleShelfRow.tsx`: Horizontal scroll container with `scroll-snap-type: x mandatory`
- `AisleProductPack.tsx`: 3D product cards with variants (`frozen`, `produce`, `fresh`, `pantry`)
  - Uses `transform: translateZ(18px) rotateX(2deg)` for depth
  - 3D edges via pseudo-elements with `rotateX(-75deg)` and `rotateY(75deg)`
  - Cast shadows using `blur-md` + opacity
  - `fresh` variant: transparent background, larger icons (text-7xl), frosted glass info card

**Freezer Aisle (`FreezerAisle3D.tsx`):**
- Container: `perspective: 1200px`, `perspectiveOrigin: 50% 40%`
- Metal frames (top/bottom rails), vertical handle with `translateZ(30px)`
- Glass overlay with parallax scroll effects (blue/cyan tint, reflection streaks)
- Shelves with real thickness: top surface (`rotateX(-78deg)`), front lip, shadows
- Groups products by section: "Frozen Meals", "Frozen Veggies", "Ice Cream"
- Cold blue ambient background

**Produce Bins (`ProduceBins3D.tsx`):**
- Angled view: `perspective: 1100px` + `rotateX(6deg)`
- Basket weave texture: `repeating-linear-gradient` at 45°/-45° angles
- 3D bin: back wall (`translateZ(-50px)`), bottom plane (`rotateX(-88deg)`), wooden rails
- Warm amber/yellow ambient

**Fresh & Daily Aisle (`FreshDailyAisle3D.tsx`):**
- **Multi-layer wooden crate system** stacked with depth
- Mobile responsive: detects screen size, adjusts perspective/rotation/products-per-row
- Products per row: 2 on mobile, 4 on desktop
- Each layer has increasing Z-depth: -60px, -140px, -220px, etc.
- Alternating wood tones for visual variety
- Transparent product cards sit directly on crates
- Warm market stand aesthetic with natural lighting

**3D Transform Techniques:**
```tsx
// Perspective container
style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}

// Shelf thickness
transform: "translateZ(12px) rotateX(-78deg)"
transformOrigin: "top"

// Product depth
transform: "translateZ(18px) rotateX(2deg)"

// 3D edges
transform: "translateZ(-1px) rotateX(-75deg)" // top edge
transform: "translateZ(-1px) rotateY(75deg)"  // right edge
```

#### 5. Route Structure (`/app`)

**Pages:**
- `/` - Landing page with hero, features, stats (fully responsive)
- `/grocery` - Category grid + corner badges
- `/grocery/category/[categorySlug]` - Category page with Grid/Aisle toggle
  - `fresh-daily`: Fresh & Daily Aisle (multi-layer crates)
  - `ready-to-cook`: Freezer Aisle (frozen products)
  - Aisle view shows when `viewMode === "aisle"`
- `/grocery/category/[categorySlug]/corner/[cornerSlug]` - Corner views
- `/product/[id]` - Product detail
- `/cart` - Cart page
- `/checkout` - Checkout flow
- `/orders/[id]` - Order tracking

**Key Page Logic:**
```tsx
// Category page toggle logic
const showFrozenAisle = viewMode === "aisle" && category.slug === "ready-to-cook"
const showFreshDailyAisle = viewMode === "aisle" && category.slug === "fresh-daily" && !selectedSection
const showProduceAisle = viewMode === "aisle" && category.slug === "fresh-daily" && selectedSection === "Produce"
```

### Responsive Design (Desktop → iPad → iPhone)

**Breakpoints:**
- Mobile: < 768px (sm)
- Tablet: 768px - 1024px (md)
- Desktop: > 1024px (lg, xl)

**Mobile Optimizations:**
- Fresh Daily Aisle: `isMobile` state, reduced perspective (1000px vs 2000px), gentler rotation (8° vs 12°)
- Product cards: responsive widths (`w-32 sm:w-40 md:w-44`), scalable icons
- View toggles: icon-only on mobile, text hidden
- Global CSS utilities in `globals.css`:
  - Touch-friendly tap targets (min 44px)
  - Smooth scrolling with `-webkit-overflow-scrolling: touch`
  - Prevents horizontal scroll
  - Responsive text utilities with `clamp()`

### Styling System

**Tailwind + CSS-in-JS Hybrid:**
- Tailwind for layout, spacing, colors
- Inline `style={{}}` for 3D transforms (cannot be done in Tailwind)
- Custom CSS in `globals.css` for scrollbars, textures, glass effects

**Color Tokens:**
- Primary: Emerald green (`--primary: 142 76% 36%`)
- Warm tones for Fresh/Produce: amber, orange, brown
- Cold tones for Frozen: blue, cyan
- Neutral grays for product cards

**Animation:**
- Framer Motion for all animations
- Use `whileInView` instead of `animate` to avoid SSR hydration issues
- `AnimatePresence` for view transitions (Grid ↔ Aisle)

## Important Development Notes

### When Adding New Aisle Views:
1. Create new component in `/components/aisle/`
2. Use `preserve-3d` on parent containers
3. Set `perspective` and `perspectiveOrigin` appropriately
4. Group products using helper functions from `lib/data.ts`
5. Add conditional rendering in category page based on `viewMode` and `category.slug`
6. Test on mobile: add responsive detection with `useState` + `useEffect`

### When Modifying Product Data:
- Edit `lib/data.ts` products array
- Ensure `isFrozen`, `isProduce` flags are set correctly
- Add `section` for proper grouping in aisle views
- Include `aiPairingText` and `aiSubstituteIds` for AI features
- **Adding product images**:
  - Place images in `/public/products/` directory
  - Use lowercase names with underscores (e.g., `mango_kulfi.png`, `basmati_rice.png`)
  - Reference in product as `image: "/products/filename.png"`
  - Images display automatically in `ProductCard` and `ProductCardPremium`
  - Products without images fall back to emoji placeholders

### When Adding shadcn/ui Components:
- Components are in `/components/ui`
- Use `cn()` utility for conditional className merging
- Import from `@/components/ui/[component-name]`

### Client vs Server Components:
- Aisle views MUST be client components (`"use client"`) due to Framer Motion
- Add `"use client"` directive at top of file if using hooks, animations, or interactivity
- Category pages are client components to support `useState` for view toggle

### Performance:
- 3D transforms are GPU-accelerated (performant)
- Use `scroll-snap` for smooth horizontal scrolling
- Product images load directly (no lazy loading currently implemented)
- Keep perspective values reasonable (1000-2000px range)
- ~50 products have real images; rest use emoji placeholders

## Testing Checklist

When making changes, verify:
- [ ] Desktop view looks correct (1200px+ width)
- [ ] Tablet view (768-1024px) adapts properly
- [ ] Mobile view (< 768px) is usable with touch
- [ ] Grid ↔ Aisle toggle works smoothly
- [ ] Cart functionality persists across pages
- [ ] 3D effects render properly (check for z-fighting)
- [ ] Horizontal scroll with scroll-snap works
- [ ] No horizontal page overflow on any screen size

## Code Conventions

- Use TypeScript strictly - no `any` types
- Component file names: PascalCase (e.g., `FreezerAisle3D.tsx`)
- Utility file names: kebab-case (e.g., `use-toast.ts`)
- Import paths: Use `@/` alias for absolute imports
- CSS: Prefer Tailwind, use inline styles only for 3D transforms
- Animations: Use Framer Motion with `whileInView` for scroll-triggered effects
- State: Zustand for global, `useState` for local component state

## Common Gotchas

1. **Framer Motion SSR**: Always use `whileInView` instead of `initial` + `animate` for server-rendered components to avoid hydration mismatches
2. **3D Transform Stacking**: Order matters - apply `translateZ` before `rotateX/Y` for expected results
3. **Scroll Snap**: Ensure parent has `scroll-snap-type`, children have `scroll-snap-align`
4. **Perspective Origin**: Position of vanishing point - typically `50% 40%` for shelf views
5. **Mobile Detection**: Use `useState` + `useEffect` to avoid SSR mismatches, don't use `window` directly in render
6. **Corners vs Stores**: Corners are curated views, NOT separate checkout flows - maintain unified cart
7. **Product Image Paths**: Image filenames in `/public/products/` must be lowercase with underscores, no spaces (e.g., `swad_ghee.png` not `SWAD GHEE.png`)
8. **Source Types**: Only use `"neomart"` or `"local"` as source values - no third-party sources

## File References

Key files to understand the architecture:
- `/lib/types.ts` - Core TypeScript definitions
- `/lib/data.ts` - Product catalog and helper functions
- `/store/cart.ts` - Zustand cart state management
- `/components/aisle/fresh-daily-aisle-3d.tsx` - Multi-layer 3D implementation example
- `/app/grocery/category/[categorySlug]/page.tsx` - Category page with Grid/Aisle toggle logic
- `/AISLE_VIEW_REFACTOR.md` - Detailed 3D implementation documentation
