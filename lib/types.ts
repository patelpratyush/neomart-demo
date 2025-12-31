export type Source = "neomart" | "patel" | "shoprite" | "hmart" | "local";

export type DietaryTag = "veg" | "vegan" | "halal" | "gluten-free" | "organic";

export interface Product {
  id: string;
  name: string;
  categorySlug: string;
  section: string;
  source: Source;
  price: number;
  unit: string;
  rank: number;
  dietaryTags: DietaryTag[];
  isCornerItem: boolean;
  cornerSlug?: string;
  isFrozen?: boolean;
  isProduce?: boolean;
  aiPairingText?: string;
  aiSubstituteIds?: string[];
  description?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  sections: string[];
}

export interface Corner {
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  badge: string;
  sections: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
