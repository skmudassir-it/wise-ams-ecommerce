"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
          Wise AMS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <Link href="/shop" className="hover:text-primary transition">Shop All</Link>
          <Link href="/cart" className="relative hover:text-primary transition">
            <ShoppingCart className="w-5 h-5 inline" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 space-y-2">
          <Link href="/" className="block py-2 text-gray-700 hover:text-primary" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/shop" className="block py-2 text-gray-700 hover:text-primary" onClick={() => setOpen(false)}>Shop All</Link>
          <Link href="/cart" className="block py-2 text-gray-700 hover:text-primary" onClick={() => setOpen(false)}>
            Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      )}
    </header>
  );
}
