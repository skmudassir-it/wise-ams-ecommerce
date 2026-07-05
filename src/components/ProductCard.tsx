"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/components/CartContext";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      <Link href={`/shop/${product.id}`}>
        <div className="relative w-full aspect-square bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-primary uppercase tracking-wide">{product.category}</span>
        <Link href={`/shop/${product.id}`} className="mt-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary transition">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1 mt-2 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
          <span className="text-xs text-gray-400 ml-1">4.5</span>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
