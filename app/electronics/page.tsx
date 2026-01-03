"use client";

import { TopNav } from "@/components/layout/TopNav";
import { ComingSoon } from "@/components/ComingSoon";

export default function ElectronicsPage() {
  return (
    <>
      <TopNav />
      <ComingSoon
        title="Electronics"
        icon="📱"
        gradient="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500"
        message="Electronics Store Coming Soon"
        features={[
          "Latest gadgets & electronics",
          "Best prices guaranteed",
          "Same-day delivery available"
        ]}
      />
    </>
  );
}
