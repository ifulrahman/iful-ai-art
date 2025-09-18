// src/components/Footer.jsx
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { allCategories } from "@/lib/data";

export default function Footer({
  slogan = "iful.ai.art — curated AI visuals",
}) {
  const year = new Date().getFullYear();
  const categories = allCategories().sort(); // tampilkan semua, urutkan biar rapi

  return (
    <footer className="mt-16 bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        {/* Top area: Logo + grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 no-underline"
              aria-label="Home"
            >
              <Image
                src="/logo-footer.png"
                alt="iful.ai.art"
                width={180}
                height={48}
                className="h-20 w-auto object-contain"
              />
            </Link>
            {slogan && (
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                {slogan}
              </p>
            )}
          </div>

          {/* Categories: tampilkan semuanya */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-300">
              Categories
            </h3>

            {/* Pills responsif */}
            <ul className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/category/${encodeURIComponent(c)}`}
                    className="no-underline rounded-full bg-white/5 px-3 py-1.5 text-sm text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white hover:ring-white/20"
                  >
                    #{c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gimmick info singkat */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-300">
              Info
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 no-underline hover:text-white"
                >
                  All Photos
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="text-sm text-zinc-400 no-underline hover:text-white"
                >
                  Browse Categories
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-sm text-zinc-400 no-underline hover:text-white"
                >
                  Sitemap
                </a>
              </li>
              <li>
                <a
                  href="/feed.xml"
                  className="text-sm text-zinc-400 no-underline hover:text-white"
                >
                  RSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/10" />

        {/* Bottom: socials & copyright */}
        <div className="pt-8">
          <div className="flex justify-center gap-3">
            <a
              href="https://www.instagram.com/iful.ai.art?igsh=MTkxMmd4NHo4Z2RmZA=="
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/30"
            >
              <Instagram className="h-4 w-4 text-zinc-200" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-syaiful-rahman/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/30"
            >
              <Linkedin className="h-4 w-4 text-zinc-200" />
            </a>
          </div>
          <p className="mt-4 text-center text-xs text-zinc-500">
            © {year} iful.ai.art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
