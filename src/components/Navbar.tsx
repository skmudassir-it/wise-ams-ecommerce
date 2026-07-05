"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, MapPin, User, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/components/CartContext";
import { categories } from "@/data/products";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { data: session } = useSession();
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

            {/* Auth section */}
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-1 hover:text-orange-400 transition"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">{session.user.name?.split(" ")[0]}</span>
                  <ChevronDown className="w-3 h-3 hidden md:block" />
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-8 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 py-2 min-w-[160px] z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-sm">{session.user.name}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                    <Link href="/cart" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setUserOpen(false)}>
                      Your Cart ({totalItems})
                    </Link>
                    <button
                      onClick={() => { signOut(); setUserOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hover:text-orange-400 transition text-xs md:text-sm">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium transition hidden md:block"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link href="/cart" className="relative hover:text-orange-400 transition">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] rounded-full w-4.5 h-4.5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
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
          <Link href="/shop" className="flex items-center gap-1 px-3 py-1.5 font-bold hover:bg-gray-700 rounded">
            <Menu className="w-4 h-4" /> All
          </Link>
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
          {!session?.user && (
            <>
              <Link href="/login" className="block py-2" onClick={() => setOpen(false)}>Sign In</Link>
              <Link href="/register" className="block py-2 text-orange-400" onClick={() => setOpen(false)}>Sign Up</Link>
            </>
          )}
          <Link href="/shop" className="block py-2" onClick={() => setOpen(false)}>All Products</Link>
          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
            return (
              <Link key={cat} href={`/shop/category/${slug}`} className="block py-2 text-gray-300" onClick={() => setOpen(false)}>
                {cat}
              </Link>
            );
          })}
          {session?.user && (
            <button onClick={() => signOut()} className="block py-2 text-red-400 w-full text-left">
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
