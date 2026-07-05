import Link from "next/link";
import { categories } from "@/data/products";

export default function Footer() {
  const catSlugs: Record<string, string> = {
    "Kitchen & Dining": "kitchen-dining",
    "Bathroom & Personal Care": "bathroom-personal-care",
    "Home Office": "home-office",
    "Storage & Organization": "storage-organization",
    "Fitness & Outdoor": "fitness-outdoor",
    "Auto & Tech": "auto-tech",
    "Home & Pet": "home-pet",
    "Summer & Toys": "summer-toys",
  };

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      {/* Back to top */}
      <div className="bg-gray-800 text-center py-3">
        <a href="#" className="text-white text-xs hover:text-orange-400 transition">Back to top</a>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-3">Categories</h3>
          <ul className="space-y-1.5">
            {categories.map((cat) => (
              <li key={cat}>
                <Link href={`/shop/category/${catSlugs[cat]}`} className="hover:text-white transition">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Quick Links</h3>
          <ul className="space-y-1.5">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-white transition">All Products</Link></li>
            <li><Link href="/cart" className="hover:text-white transition">Your Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Customer Service</h3>
          <ul className="space-y-1.5">
            <li><span className="hover:text-white transition cursor-pointer">Shipping Info</span></li>
            <li><span className="hover:text-white transition cursor-pointer">Returns Policy</span></li>
            <li><span className="hover:text-white transition cursor-pointer">Contact Us</span></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">wiseAMS</h3>
          <p>57 must-have products across 8 categories.</p>
          <p className="mt-2">support@amsitservices.com</p>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} AMS IT Services</p>
        </div>
      </div>
    </footer>
  );
}
