"use client";

import { TopNav } from "@/components/layout/TopNav";
import { ComingSoon } from "@/components/ComingSoon";

export default function CafePage() {
  return (
    <>
      <TopNav />
      <ComingSoon
        title="Cafe"
        icon="☕"
        gradient="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"
        message="Cafe is closed for the night"
        availableTime="6 AM"
        features={[
          "Order your favorite coffee & snacks",
          "Get free delivery on orders above ₹99",
          "Everything arriving in minutes"
        ]}
      />
    </>
  );
}
