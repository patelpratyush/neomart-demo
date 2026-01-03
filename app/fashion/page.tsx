"use client";

import { TopNav } from "@/components/layout/TopNav";
import { ComingSoon } from "@/components/ComingSoon";

export default function FashionPage() {
  return (
    <>
      <TopNav />
      <ComingSoon
        title="Fashion"
        icon="👗"
        gradient="bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500"
        message="Fashion Store Coming Soon"
        features={[
          "Latest trends & styles",
          "Curated collections",
          "Fast delivery & easy returns"
        ]}
      />
    </>
  );
}
