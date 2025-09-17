// src/app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { allCategories } from "../../lib/data";

export const metadata = {
  title: "Iful AI Art",
  description: "Kurasi visual AI.",
  icons: {
    icon: "/favicon.ico",       // default
    shortcut: "/favicon.ico",   // untuk beberapa browser
    apple: "/apple-touch-icon.png", // kalau kamu punya versi iOS
  },
};

export default function RootLayout({ children }) {
  const cats = allCategories();

  return (
    <html lang="id">
      <body>
        {/* Header selalu fixed */}
        <header
          id="site-header"
          className="fixed top-0 left-0 right-0 z-50 bg-white text-zinc-900 border-b border-zinc-200"
        >
          <div className="max-w-6xl mx-auto px-4 py-3">
            <Navbar cats={cats} />
          </div>
        </header>

        {/* tambahkan padding-top agar konten tidak ketutup navbar */}
        <main className="max-w-6xl mx-auto px-4 pt-24 pb-6">{children}</main>
        <Footer links={[{ label: "Categories", href: "/category" }]} />
      </body>
    </html>
  );
}
