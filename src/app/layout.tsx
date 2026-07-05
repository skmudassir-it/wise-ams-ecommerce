import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Wise AMS — Everyday Essentials & More",
  description: "57 must-have products for kitchen, bathroom, office, fitness, auto, and summer fun.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
