import Link from "next/link";
import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/nav/header";
import { categories, corners } from "@/lib/data";

export default function GroceryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-blue-50/20">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero */}
        <section className="relative mb-20 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-12 md:p-16 text-white shadow-2xl">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10 text-center">
            <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight">
              Grocery
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 font-light">
              Browse by category. Find what you need.
            </p>
          </div>
        </section>

        {/* Category Cards Grid */}
        <section className="mb-24">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
              <p className="text-gray-600 mt-1">Shop by what you're looking for</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const IconComponent = Icons[category.icon as keyof typeof Icons] as any;
              return (
                <Link key={category.slug} href={`/grocery/category/${category.slug}`}>
                  <Card className="group relative overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300" />

                    <CardContent className="relative p-8">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 transition-all duration-300 group-hover:from-emerald-100 group-hover:to-teal-100 group-hover:scale-110 shadow-md">
                        {IconComponent && <IconComponent className="h-8 w-8 text-emerald-600" />}
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">
                        {category.sections.length} sections
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Corners */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Curated Corners</h2>
            <p className="text-gray-600 mt-1">Specialty selections from trusted sources</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {corners.map((corner, idx) => {
              const gradients = [
                "from-amber-400 to-orange-500",
                "from-red-400 to-rose-500",
                "from-orange-400 to-amber-500",
              ];
              return (
                <Link
                  key={corner.slug}
                  href={`/grocery/category/${corner.categorySlug}/corner/${corner.slug}`}
                >
                  <Card className="group relative overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <CardContent className="p-8">
                      {/* Icon/Badge Display */}
                      <div className={`mb-6 flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br ${gradients[idx]} shadow-lg transform transition-transform duration-300 group-hover:scale-105`}>
                        <span className="text-3xl font-black text-white drop-shadow-lg">
                          {corner.badge}
                        </span>
                      </div>

                      <h3 className="mb-3 text-2xl font-bold text-gray-900">{corner.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{corner.description}</p>

                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                        Explore
                        <Icons.ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
