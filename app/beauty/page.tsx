"use client";

import { TopNav } from "@/components/layout/TopNav";
import { ComingSoon } from "@/components/ComingSoon";

export default function BeautyPage() {
  return (
    <>
      <TopNav />
      <ComingSoon
        title="Beauty & Personal Care"
        icon="💄"
        gradient="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500"
        message="Beauty Store Coming Soon"
        features={[
          "Makeup, skincare & haircare",
          "100% authentic products",
          "Expert recommendations"
        ]}
      />
    </>
  );
}
