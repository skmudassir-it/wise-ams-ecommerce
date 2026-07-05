"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { categories } from "@/data/products";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-base tracking-tight hover:text-orange-400 transition">
              wiseAMS
            </Link>
            <span className="hidden md:flex items-center gap-1 text-gray-400">
              <MapPin className="w-3.5 h-3.5" /> Deliver to you
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/shop" className="hover:text-orange-400 transition hidden md:block">All Products</Link>
            <Link href="/cart" className="relative hover:text-orange-400 transition">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] rounded-full w-4.5 h-4.5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
              <span className="hidden md:inline ml-1">Cart</span>
            </Link>
            <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="bg-gray-800 text-white border-t border-gray-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center gap-1 text-sm overflow-x-auto">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-1 px-3 py-1.5 font-bold hover:bg-gray-700 rounded"
          >
            <Menu className="w-4 h-4" /> All
          </button>
          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
            return (
              <Link
                key={cat}
                href={`/shop/category/${slug}`}
                className="px-3 py-1.5 hover:bg-gray-700 rounded whitespace-nowrap transition"
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900 text-white px-4 pb-4 space-y-2">
          <Link href="/shop" className="block py-2" onClick={() => setOpen(false)}>All Products</Link>
          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
            return (
              <Link
                key={cat}
                href={`/shop/category/${slug}`}
                className="block py-2 text-gray-300"
                onClick={() => setOpen(false)}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
