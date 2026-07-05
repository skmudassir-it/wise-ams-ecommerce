"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { useCart } from "@/components/CartContext";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    addItem(product);
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart — ${product.price.toFixed(2)}
    </button>
  );
}
