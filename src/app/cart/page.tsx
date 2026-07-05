"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your Cart ({totalItems} items)</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition">
          Clear All
        </button>
      </div>

      {/* Cart items */}
      <div className="space-y-4 mb-8">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center">
            <Link href={`/shop/${product.id}`} className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
              <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/shop/${product.id}`} className="font-semibold text-gray-900 hover:text-primary transition line-clamp-1">
                {product.name}
              </Link>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-lg font-bold text-gray-900 mt-1">${(product.price * quantity).toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => removeItem(product.id)}
              className="text-gray-400 hover:text-red-500 transition p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between text-lg mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>Shipping</span>
          <span>{totalPrice >= 50 ? "Free" : "$5.99"}</span>
        </div>
        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${(totalPrice >= 50 ? totalPrice : totalPrice + 5.99).toFixed(2)}</span>
        </div>
        <button className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition">
          Proceed to Checkout
        </button>
        <Link href="/shop" className="block text-center text-primary mt-4 hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
