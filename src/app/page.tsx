import Link from "next/link";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";

export default function HomePage() {
  const featured = products.filter((p) => [1, 6, 11, 16, 21, 36, 43, 47].includes(p.id));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Everyday Essentials<br />Delivered to Your Door
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            57 must-have products across 8 categories — kitchen, bathroom, office, fitness, auto, and summer fun.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
            >
              Shop All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-600">
          <div className="flex flex-col items-center gap-1"><Truck className="w-5 h-5 text-primary" />Free Shipping $50+</div>
          <div className="flex flex-col items-center gap-1"><RefreshCw className="w-5 h-5 text-primary" />30-Day Returns</div>
          <div className="flex flex-col items-center gap-1"><ShieldCheck className="w-5 h-5 text-primary" />Secure Checkout</div>
          <div className="flex flex-col items-center gap-1"><Headphones className="w-5 h-5 text-primary" />24/7 Support</div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary hover:shadow-md transition group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">{cat}</h3>
                <p className="text-sm text-gray-500 mt-1">{count} products</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link href="/shop" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
