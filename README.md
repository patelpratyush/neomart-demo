# NeoMart — AI-powered Commerce OS Demo

A premium-quality demo frontend showcasing the "Commerce OS / Super-app" concept with signature Aisle View experiences.

## Features

- **Category-First Discovery**: Browse by category, not by store
- **Unified Cart & Checkout**: One cart for all sources
- **Smart Fulfillment**: Intelligent order routing and splitting
- **AI Recommendations**: Smart pairings and substitutions
- **Signature Aisle Views**:
  - Frozen Aisle with freezer door illusions
  - Produce Aisle with market bin aesthetics
- **Curated Corners**: Patel Brothers, ShopRite, H-Mart corners
- **Premium UI**: Smooth animations, elegant design, micro-interactions

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Zustand (state management)
- Lucide React icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Routes

- `/` - Landing page
- `/grocery` - Grocery home with categories
- `/grocery/category/[slug]` - Category listing (with Grid/Aisle toggle)
  - `/grocery/category/fresh-daily` - Fresh & Daily
  - `/grocery/category/ready-to-cook` - Ready to Cook (Frozen Aisle View)
  - `/grocery/category/south-asian` - South Asian Essentials
- `/grocery/category/south-asian/corner/patel-brothers` - Patel Brothers Corner
- `/product/[id]` - Product detail page
- `/cart` - Unified cart
- `/checkout` - Checkout flow
- `/orders/[id]` - Order tracking

## Key Concepts

### Unified Commerce
- All products from different sources (NeoMart, Patel Brothers, ShopRite, H-Mart, Local) are in ONE unified cart
- Single checkout experience
- Smart fulfillment routing

### Corners vs Categories
- Corners are curated mini-views WITHIN categories (not separate stores)
- They provide expression and curation, never separate checkout
- All pricing and fulfillment is unified under NeoMart

### Aisle View
- **Frozen Aisle**: CSS-based freezer doors with glass reflections, shelves, and 3D product cards
- **Produce Aisle**: Market bins with basket weave patterns and price tags
- Toggle between Grid and Aisle views in category pages

## Project Structure

```
/app                    # Next.js app router pages
  /grocery             # Grocery section
  /cart                # Cart page
  /checkout            # Checkout flow
  /orders              # Order tracking
/components
  /ui                  # shadcn/ui components
  /nav                 # Navigation components
  /product             # Product-related components
  /aisle               # Signature aisle view components
  /filters             # Category filters
/lib
  data.ts              # Mock product data
  types.ts             # TypeScript types
  utils.ts             # Utility functions
/store
  cart.ts              # Zustand cart store
```

## Design Tokens

- Primary color: Emerald green (#22c55e)
- Premium shadows and hover effects
- Smooth transitions and micro-interactions
- Desktop-first (min 1200px width), responsive down to tablet

## Mock Data

The demo includes realistic mock data for:
- 30+ products across categories
- Multiple sources (NeoMart, Patel Brothers, ShopRite, H-Mart, Local)
- Dietary tags (Veg, Vegan, Halal, Gluten-free, Organic)
- AI pairing suggestions and substitutes

## License

Demo project for NeoMart.ai
