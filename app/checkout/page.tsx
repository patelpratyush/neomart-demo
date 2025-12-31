"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Info, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = 4.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + deliveryFee + tax;

  // Group items by source for order split preview
  const itemsBySource = items.reduce((acc, item) => {
    const source = item.product.source;
    if (!acc[source]) {
      acc[source] = [];
    }
    acc[source].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      const orderId = "ORD" + Date.now();
      clearCart();
      router.push(`/orders/${orderId}`);
    }, 2000);
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="First Name" defaultValue="John" />
                  <Input placeholder="Last Name" defaultValue="Doe" />
                </div>
                <Input placeholder="Street Address" defaultValue="123 Main St" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input placeholder="City" defaultValue="New York" />
                  <Input placeholder="State" defaultValue="NY" />
                  <Input placeholder="ZIP" defaultValue="10001" />
                </div>
                <Input placeholder="Phone" defaultValue="+1 (555) 123-4567" />
              </CardContent>
            </Card>

            {/* Delivery Window */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Window</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button variant="outline" className="justify-start">
                    Today (2-4 PM)
                  </Button>
                  <Button variant="default" className="justify-start">
                    Tomorrow (10 AM - 12 PM)
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Tomorrow (2-4 PM)
                  </Button>
                  <Button variant="outline" className="justify-start">
                    This Weekend
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border-2 border-primary bg-primary/5 p-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <Input placeholder="Card Number" defaultValue="4242 4242 4242 4242" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="MM/YY" defaultValue="12/25" />
                  <Input placeholder="CVV" defaultValue="123" />
                </div>
              </CardContent>
            </Card>

            {/* Order Split Preview */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Info className="h-5 w-5" />
                  Order Split Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Your order will be intelligently split across sources for optimal delivery:
                </p>
                <div className="space-y-2 text-sm">
                  {Object.entries(itemsBySource).map(([source, sourceItems]) => {
                    const sourceType =
                      source === "neomart" ? "In-house" : source === "local" ? "Local On-Demand" : "Partner";
                    const fulfillment =
                      source === "neomart"
                        ? "NeoMart driver"
                        : source === "local"
                        ? "3PL delivery (Uber-like)"
                        : `${source} store + NeoMart/3PL delivery`;

                    return (
                      <div key={source} className="rounded-md bg-muted p-3">
                        <p className="font-medium capitalize">{sourceType}</p>
                        <p className="text-xs text-muted-foreground">
                          {sourceItems.length} item{sourceItems.length > 1 ? "s" : ""} → {fulfillment}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
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

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to NeoMart's terms and conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
