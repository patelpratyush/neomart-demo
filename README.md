# NeoMart — AI-powered Commerce OS Demo

A premium-quality demo frontend showcasing the "Commerce OS / Super-app" concept with signature 3D Aisle View experiences. Fully responsive from desktop to mobile.

## Features

### Core Experience
- **Category-First Discovery**: Browse by category, not by store
- **Unified Cart & Checkout**: One cart for all sources (NeoMart, Patel Brothers, ShopRite, H-Mart, Local)
- **Smart Fulfillment**: Intelligent order routing and splitting
- **AI Recommendations**: Smart pairings and substitutions

### Signature 3D Aisle Views
- **Fresh & Daily Aisle**: Multi-layer wooden market crates with transparent product displays
  - Realistic wooden textures and grain patterns
  - Stacked crate rows with increasing depth
  - Products sit directly on wooden shelves
  - Warm farmer's market aesthetic
- **Frozen Aisle**: Freezer door with glass reflections and parallax effects
  - Metal frames and vertical handle
  - Cold blue ambient lighting
  - Shelves with real thickness and shadows
- **Produce Aisle**: Angled market bins with basket weave texture
  - 3D bin structure with depth
  - Warm amber/yellow tones
  - Wooden rails and natural materials

### Curated Corners
- Patel Brothers, ShopRite, H-Mart corners
- Curated views WITHIN categories (not separate stores)
- Unified pricing and fulfillment

### Premium UI/UX
- Smooth Framer Motion animations
- Scroll-triggered effects with whileInView
- Elegant hover states and micro-interactions
- Gradient backgrounds with ambient lighting
- Fully responsive: Desktop → iPad → iPhone

## Tech Stack

- **Next.js 15** (App Router) - React framework with server components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality Radix UI components
- **Framer Motion** - Animation library for smooth transitions
- **Zustand** - Lightweight state management for cart
- **Lucide React** - Icon library

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Routes

### Main Pages
- `/` - Landing page with hero, features, and CTA
- `/grocery` - Grocery home with category grid and corner badges
- `/cart` - Unified shopping cart
- `/checkout` - Checkout flow
- `/orders/[id]` - Order tracking

### Category Pages (with Grid/Aisle Toggle)
- `/grocery/category/fresh-daily` - Fresh & Daily (multi-layer wooden crates)
- `/grocery/category/ready-to-cook` - Ready to Cook (freezer aisle)
- `/grocery/category/south-asian` - South Asian Essentials
- `/grocery/category/smart-deals` - Smart Deals
- `/grocery/category/global-grocers` - Global Grocers
- `/grocery/category/pantry-staples` - Pantry Staples
- `/grocery/category/beverages` - Beverages
- `/grocery/category/household` - Household & Wellness

### Corner Views
- `/grocery/category/south-asian/corner/patel-brothers` - Patel Brothers Corner
- Other corners for H-Mart, ShopRite, Local vendors

### Product Pages
- `/product/[id]` - Individual product detail page

## Key Concepts

### Unified Commerce Architecture
- **Single Cart**: All products from different sources in ONE unified cart
- **Single Checkout**: One payment, one delivery window
- **Smart Routing**: Backend handles order splitting and fulfillment
- **Unified Pricing**: All pricing under NeoMart brand

### Corners vs Categories
- **Corners** are curated mini-views WITHIN categories, not separate stores
- They provide cultural expression and curation
- Never separate checkout - everything goes to unified cart
- Example: "Patel Brothers" corner within "South Asian Essentials" category

### Aisle View System
Toggle between **Grid View** and **Aisle View** in category pages:

#### Grid View
- Clean card-based layout
- 2-4 columns responsive grid
- Quick browsing experience

#### Aisle View (3D CSS)
- **Fresh & Daily**: Multi-layer wooden market crates
  - Stacked rows with Z-depth (-60px, -140px, -220px...)
  - Transparent product cards with frosted glass info
  - Natural wood textures and warm lighting
  - 2 products/row on mobile, 4 on desktop

- **Frozen Aisle**: Freezer doors with glass and shelves
  - Glass overlay with parallax scroll effects
  - Metal frames and handle with depth
  - Shelf thickness using CSS 3D transforms
  - Cold blue ambient atmosphere

- **Produce Aisle**: Angled market bins
  - Basket weave texture patterns
  - 3D bin structure (back wall, bottom, front)
  - Wooden rails and warm tones

## Responsive Design

### Breakpoints
- **Mobile**: < 768px (iPhone, Android phones)
- **Tablet**: 768px - 1024px (iPad, tablets)
- **Desktop**: > 1024px (laptops, monitors)

### Mobile Optimizations
- Reduced 3D perspective and rotation angles
- 2 products per row in aisle views
- Icon-only view toggles
- Touch-friendly tap targets (min 44px)
- Smooth iOS scrolling support
- Responsive text sizing with clamp()
- No horizontal scroll on any screen size

## Project Structure

```
/app                           # Next.js App Router pages
  page.tsx                     # Landing page
  /grocery                     # Grocery section
    page.tsx                   # Category grid home
    /category/[categorySlug]   # Category pages
      page.tsx                 # Category listing with Grid/Aisle toggle
      /corner/[cornerSlug]     # Corner views
        page.tsx
  /product/[id]                # Product detail
  /cart                        # Cart page
  /checkout                    # Checkout flow
  /orders/[id]                 # Order tracking
  globals.css                  # Global styles, responsive utilities

/components
  /ui                          # shadcn/ui components (Button, Card, Input, etc.)
  /nav                         # Header, navigation
  /product                     # ProductCardPremium, SourceBadge
  /aisle                       # 3D Aisle view components
    aisle-shelf-row.tsx        # Horizontal scrolling shelf
    aisle-product-pack.tsx     # 3D product cards (4 variants)
    freezer-aisle-3d.tsx       # Frozen aisle with glass doors
    produce-bins-3d.tsx        # Produce bins with basket weave
    fresh-daily-aisle-3d.tsx   # Multi-layer wooden crates
  /filters                     # FilterDrawer for sections

/lib
  data.ts                      # Mock product catalog (50+ products)
  types.ts                     # TypeScript type definitions
  utils.ts                     # Utility functions (cn, formatPrice)

/store
  cart.ts                      # Zustand cart state management

/public                        # Static assets
```

## Design System

### Colors
- **Primary**: Emerald green (#22c55e) - Brand color
- **Fresh/Produce**: Amber, orange, brown - Warm market tones
- **Frozen**: Blue, cyan - Cold freezer tones
- **Neutral**: Gray scale for cards and text

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Light font-weight for readability
- **Responsive**: clamp() based scaling

### Animations
- **Framer Motion** for all animations
- **whileInView** for scroll-triggered effects
- **AnimatePresence** for view transitions
- Spring physics for natural motion

### 3D Techniques
- **CSS 3D Transforms**: No images, pure CSS depth
- **Perspective**: 1000-2000px for realistic views
- **translateZ**: Positioning along Z-axis
- **rotateX/Y**: Creating angled surfaces
- **preserve-3d**: Nested 3D contexts

## Mock Data

The demo includes realistic mock data:
- **50+ products** across all categories
- **Multiple sources**: NeoMart, Patel Brothers, ShopRite, H-Mart, Local
- **Dietary tags**: Veg, Vegan, Halal, Gluten-free, Organic
- **AI features**: `pairsWith` suggestions, `substitutes` recommendations
- **Metadata**: Section grouping, price, unit, descriptions

### Sample Product Structure
```typescript
{
  id: "p001",
  name: "Organic Bananas",
  price: 0.99,
  unit: "lb",
  categorySlug: "fresh-daily",
  section: "Produce",
  source: "neomart",
  isProduce: true,
  tags: ["Organic", "Vegan"],
  pairsWith: ["p002", "p003"],
  substitutes: ["p004"]
}
```

## Development Notes

### Adding New Aisle Views
1. Create component in `/components/aisle/`
2. Use `preserve-3d` and set `perspective`
3. Add mobile detection with `useState` + `useEffect`
4. Add conditional rendering in category page
5. Test on all screen sizes

### Modifying Products
- Edit `lib/data.ts` products array
- Set `isFrozen`, `isProduce` flags for aisle view routing
- Include `section` for proper grouping
- Add `pairsWith` and `substitutes` for AI features

### Client vs Server Components
- Aisle views require `"use client"` (Framer Motion)
- Use `whileInView` to avoid SSR hydration issues
- Category pages are client components (view toggle state)

### Performance Tips
- 3D transforms are GPU-accelerated
- Use `scroll-snap` for smooth horizontal scrolling
- Keep perspective values reasonable (1000-2000px)
- Optimize with responsive detection (reduce complexity on mobile)

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile Safari iOS 14+
- Chrome Android 90+

3D transforms and backdrop-filter require modern browsers.

## Future Enhancements

- Real product images
- Search functionality
- Filter by dietary tags
- AI recommendations engine
- Actual checkout integration
- Order tracking backend
- User accounts and saved carts
- More category-specific aisle views

## License

Demo project for NeoMart.ai

---

Built with ❤️ showcasing modern web technologies and premium UX design.
