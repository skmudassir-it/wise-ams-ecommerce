import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const slugToCategory: Record<string, string> = {
  "kitchen-dining": "Kitchen & Dining",
  "bathroom-personal-care": "Bathroom & Personal Care",
  "home-office": "Home Office",
  "storage-organization": "Storage & Organization",
  "fitness-outdoor": "Fitness & Outdoor",
  "auto-tech": "Auto & Tech",
  "home-pet": "Home & Pet",
  "summer-toys": "Summer & Toys",
};

export function generateStaticParams() {
  return Object.keys(slugToCategory).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = slugToCategory[slug];
  if (!category) notFound();

  const catProducts = products.filter((p) => p.category === category);
  const heroImg = catProducts[0]?.image;

  return (
    <div>
      {/* Category hero */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center gap-6">
          {heroImg && (
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl overflow-hidden shrink-0">
              <Image src={heroImg} alt={category} fill className="object-contain p-2" />
            </div>
          )}
          <div>
            <div className="text-xs text-gray-400 mb-1">
              <Link href="/" className="hover:text-orange-400">Home</Link> / {category}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{category}</h1>
            <p className="text-gray-400 mt-1">{catProducts.length} products</p>
          </div>
        </div>
      </div>

      {/* Category nav pills */}
      <div className="bg-white border-b sticky top-[5.5rem] z-40">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto text-sm">
          {categories.map((cat) => {
            const s = cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
            const active = cat === category;
            return (
              <Link
                key={cat}
                href={`/shop/category/${s}`}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap font-medium transition ${
                  active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
