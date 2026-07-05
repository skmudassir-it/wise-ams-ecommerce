export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-2">Wise AMS</h3>
          <p>Everyday essentials at great prices. 57 products across 8 categories — quality you can trust.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/shop" className="hover:text-white transition">Shop All</a></li>
            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p>Email: support@amsitservices.com</p>
          <p className="mt-2">© {new Date().getFullYear()} AMS IT Services</p>
        </div>
      </div>
    </footer>
  );
}
