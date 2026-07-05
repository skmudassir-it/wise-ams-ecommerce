"use client";

import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
      <p className="text-gray-500 mb-8">{products.length} products across {categories.length} categories</p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href="/shop"
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            !activeCategory ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </a>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/shop?category=${encodeURIComponent(cat)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
