// src/app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { allCategories } from "../../lib/data";

export const metadata = {
  title: "Iful AI Art",
  description: "Kurasi visual AI.",
};

export default function RootLayout({ children }) {
  const cats = allCategories();

  return (
    <html lang="id">
      {/* Jadikan body kolom penuh-tinggi */}
      <body className="min-h-screen min-h-dvh flex flex-col bg-white text-zinc-900">
        {/* Header selalu menempel */}
        <header
          id="site-header"
          className="sticky top-0 z-50 bg-white text-zinc-900 border-b border-zinc-200"
        >
          <div className="max-w-6xl mx-auto px-4 py-3">
            <Navbar cats={cats} />
          </div>
        </header>

        {/* Main di-set flex-1 agar mendorong footer ke bawah */}
        <main className="flex-1 w-full">
          <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
        </main>

        <Footer links={[{ label: "Categories", href: "/category" }]} />
      </body>
    </html>
  );
}
