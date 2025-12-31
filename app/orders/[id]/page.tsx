"use client";

import { use } from "react";
import { Header } from "@/components/nav/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Package, Truck, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  // Mock order status (in real app, fetch from API)
  const orderStatus = [
    { status: "Confirmed", completed: true, icon: CheckCircle, time: "2 min ago" },
    { status: "Picking", completed: true, icon: Package, time: "Just now" },
    { status: "Substitutions", completed: false, icon: Sparkles, time: "In progress" },
    { status: "Out for delivery", completed: false, icon: Truck, time: "Pending" },
    { status: "Delivered", completed: false, icon: Home, time: "Pending" },
  ];

  const currentStep = orderStatus.findIndex((s) => !s.completed);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">Order #{orderId}</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Timeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderStatus.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = step.completed;

                    return (
                      <div key={step.status} className="flex gap-4">
                        {/* Icon */}
                        <div className="relative">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                              isCompleted
                                ? "border-primary bg-primary text-white"
                                : isActive
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-muted bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          {index < orderStatus.length - 1 && (
                            <div
                              className={`absolute left-1/2 top-12 h-6 w-0.5 -translate-x-1/2 ${
                                isCompleted ? "bg-primary" : "bg-muted"
                              }`}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <h3
                            className={`font-semibold ${
                              isCompleted || isActive ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {step.status}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* AI Substitution Decisions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Substitution Decisions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="rounded-md bg-muted p-3">
                    <p className="font-medium">All items available</p>
                    <p className="text-muted-foreground">
                      No substitutions needed — all your items are in stock!
                    </p>
                  </div>
                  <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
                    <p className="font-medium text-primary">Smart Monitoring Active</p>
                    <p className="text-muted-foreground">
                      We'll keep you updated if any items become unavailable during picking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p className="text-lg font-bold text-primary">Tomorrow, 10 AM - 12 PM</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">
                    123 Main St
                    <br />
                    New York, NY 10001
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Order Total</p>
                  <p className="text-lg font-bold">$87.42</p>
                </div>

                <div className="pt-4 space-y-2">
                  <Link href="/grocery">
                    <Button variant="default" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    View Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
