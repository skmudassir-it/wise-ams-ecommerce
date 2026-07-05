import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartButton from "./AddToCartButton";
import { Star, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProductContent params={params} />;
}

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-10"
            priority
          />
        </div>

        {/* Details */}
        <div>
          <span className="text-sm font-medium text-primary uppercase tracking-wide">{product.category}</span>
          <h1 className="text-3xl font-bold mt-1 mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm text-gray-500 ml-1">4.5 (128 reviews)</span>
          </div>

          <p className="text-4xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <AddToCartButton product={product} />

          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-500 space-y-1">
            <p>✓ Free shipping on orders over $50</p>
            <p>✓ 30-day easy returns</p>
            <p>✓ Secure checkout</p>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-6">More in {product.category}</h2>
        <RelatedProducts currentId={product.id} category={product.category} />
      </section>
    </div>
  );
}

function RelatedProducts({ currentId, category }: { currentId: number; category: string }) {
  const related = products.filter((p) => p.category === category && p.id !== currentId).slice(0, 4);
  if (related.length === 0) return <p className="text-gray-400">No related products.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {related.map((p) => (
        <Link
          key={p.id}
          href={`/shop/${p.id}`}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary transition text-center"
        >
          <div className="relative aspect-square mb-3">
            <Image src={p.image} alt={p.name} fill className="object-contain" />
          </div>
          <p className="text-sm font-medium text-gray-900 line-clamp-2">{p.name}</p>
          <p className="text-sm font-bold text-primary mt-1">${p.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  );
}
