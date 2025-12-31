"use client";

import { use, useState } from "react";
import { Header } from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SourceBadge } from "@/components/product/source-badge";
import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";
import { Minus, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div>
            <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50">
              <span className="text-9xl opacity-30">📦</span>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <SourceBadge source={product.source} />
              {product.dietaryTags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <p className="mb-6 text-muted-foreground">{product.description}</p>

            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-muted-foreground">/{product.unit}</span>
            </div>

            {/* Quantity Stepper */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button onClick={handleAddToCart} size="lg" className="w-full mb-4">
              Add to Cart
            </Button>

            <Link href="/cart">
              <Button variant="outline" size="lg" className="w-full">
                View Cart
              </Button>
            </Link>
          </div>
        </div>

        {/* AI Suggestions Panel */}
        {product.aiPairingText && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-semibold">Perfect Pairings</h3>
                <p className="text-sm text-muted-foreground">{product.aiPairingText}</p>
              </div>

              {product.aiSubstituteIds && product.aiSubstituteIds.length > 0 && (
                <div>
                  <h3 className="mb-1 text-sm font-semibold">Smart Substitutes</h3>
                  <p className="text-sm text-muted-foreground">
                    If unavailable, we'll suggest similar items from our inventory.
                  </p>
                </div>
              )}

              <div>
                <h3 className="mb-1 text-sm font-semibold">Recommended Add-on</h3>
                <p className="text-sm text-muted-foreground">
                  Customers who bought this also added cooking oil and spices.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
