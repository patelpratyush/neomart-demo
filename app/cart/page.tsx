"use client";

import { Header } from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SourceBadge } from "@/components/product/source-badge";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, Sparkles, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const [smartSubstitutions, setSmartSubstitutions] = useState(true);
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");

  // Group items by source
  const itemsBySource = items.reduce((acc, item) => {
    const source = item.product.source;
    if (!acc[source]) {
      acc[source] = [];
    }
    acc[source].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const deliveryFee = deliveryMode === "delivery" ? 4.99 : 0;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
            <p className="mb-6 text-muted-foreground">
              Start adding items to your cart to see them here.
            </p>
            <Link href="/grocery">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Smart Substitutions Toggle */}
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Smart Substitutions</p>
                    <p className="text-xs text-muted-foreground">
                      Allow AI to suggest alternatives if items are unavailable
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSmartSubstitutions(!smartSubstitutions)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    smartSubstitutions ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      smartSubstitutions ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </CardContent>
            </Card>

            {/* Items Grouped by Source */}
            {Object.entries(itemsBySource).map(([source, sourceItems]) => (
              <Card key={source}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <SourceBadge source={source as any} />
                    <span className="text-sm text-muted-foreground">
                      {sourceItems.length} item{sourceItems.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sourceItems.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      className="flex gap-4 rounded-lg border p-4"
                    >
                      {/* Product Image */}
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-muted">
                        <span className="text-2xl opacity-30">📦</span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.product.price)} / {item.product.unit}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Mode */}
                <div>
                  <p className="mb-2 text-sm font-medium">Fulfillment</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={deliveryMode === "delivery" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDeliveryMode("delivery")}
                    >
                      Delivery
                    </Button>
                    <Button
                      variant={deliveryMode === "pickup" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDeliveryMode("pickup")}
                    >
                      Pickup
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Promo Code */}
                <div>
                  <p className="mb-2 text-sm font-medium">Promo Code</p>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="text-sm" />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : "Free"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
