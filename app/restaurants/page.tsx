"use client";

import { TopNav } from "@/components/layout/TopNav";
import { ComingSoon } from "@/components/ComingSoon";

export default function RestaurantsPage() {
  return (
    <>
      <TopNav />
      <ComingSoon
        title="Restaurants"
        icon="🍽️"
        gradient="bg-gradient-to-br from-red-500 via-rose-500 to-pink-500"
        message="Restaurants Coming Soon"
        features={[
          "Order from your favorite restaurants",
          "Hot meals delivered fresh",
          "Track your order in real-time"
        ]}
      />
    </>
  );
}
