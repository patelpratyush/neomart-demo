"use client";

import { TopNav } from "@/components/layout/TopNav";
import { ComingSoon } from "@/components/ComingSoon";

export default function HomeGoodsPage() {
  return (
    <>
      <TopNav />
      <ComingSoon
        title="Home & Living"
        icon="🏠"
        gradient="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500"
        message="Home Store Coming Soon"
        features={[
          "Furniture & home decor",
          "Quality products at great prices",
          "Free installation on select items"
        ]}
      />
    </>
  );
}
