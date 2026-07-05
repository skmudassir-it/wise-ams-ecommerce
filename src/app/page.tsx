import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Star, Truck, ShieldCheck } from "lucide-react";

const categorySlugs: Record<string, string> = {
  "Kitchen & Dining": "kitchen-dining",
  "Bathroom & Personal Care": "bathroom-personal-care",
  "Home Office": "home-office",
  "Storage & Organization": "storage-organization",
  "Fitness & Outdoor": "fitness-outdoor",
  "Auto & Tech": "auto-tech",
  "Home & Pet": "home-pet",
  "Summer & Toys": "summer-toys",
};

export default function HomePage() {
  const bestSellers = products.filter((p) => [1, 6, 11, 36, 43, 47, 16, 21].includes(p.id));
  const deals = products.filter((p) => [3, 8, 20, 32, 33, 39, 41, 52].includes(p.id));

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-orange-500 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Summer Sale
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              57 Must-Have Products<br />
              <span className="text-orange-400">Ship Free Over $50</span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-lg">
              Kitchen, bathroom, office, fitness, auto, summer fun — everything you need, delivered fast.
            </p>
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              <Link href="/shop" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition inline-flex items-center gap-2">
                Shop All <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/shop/category/summer-toys" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition">
                Summer Picks
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-3">
            {bestSellers.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-xl p-3 hover:scale-105 transition">
                <Image src={p.image} alt={p.name} width={120} height={120} className="object-contain w-full h-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-orange-500" /> Free Shipping $50+</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-orange-500" /> 30-Day Returns</span>
          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-orange-500" /> 4.5★ Rated</span>
        </div>
      </section>

      {/* Shop by Category — Amazon tile grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const slug = categorySlugs[cat];
            const count = products.filter((p) => p.category === cat).length;
            const sampleImg = products.find((p) => p.category === cat)?.image || "/images/product-01.png";
            return (
              <Link
                key={cat}
                href={`/shop/category/${slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-300 transition"
              >
                <div className="aspect-square bg-gray-50 p-4 relative overflow-hidden">
                  <Image src={sampleImg} alt={cat} fill className="object-contain p-4 group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-orange-600 transition">{cat}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{count} products</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Best Sellers</h2>
            <Link href="/shop" className="text-orange-500 font-medium text-sm hover:underline">See all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">DEALS</span>
            <h2 className="text-xl font-bold">Limited Time Offers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gray-900 text-white py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to upgrade your everyday?</h2>
          <p className="text-gray-400 mb-6">57 products. 8 categories. Free shipping on orders over $50.</p>
          <Link href="/shop" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition">
            Browse All Products
          </Link>
        </div>
      </section>
    </>
  );
}
