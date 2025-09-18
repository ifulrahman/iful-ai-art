// src/app/page.js
import { Suspense } from "react";
import { allPhotos, allCategories } from "../../lib/data";
import HighlightRow from "../components/HighlightRow";
import CategoryRow from "../components/CategoryRow";
import GalleryWithSeeMore from "../components/GalleryWithSeeMore";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Page() {
  // ini tetap Server Component (SSG)
  const items = allPhotos();
  const categories = allCategories();

  const featured = items.filter((p) => p.featured).slice(0, 5);
  const top = featured.length ? featured : items.slice(0, 5);

  return (
    <Suspense fallback={<div className="px-4 py-8 text-zinc-500">Loading…</div>}>
      {/* Highlight */}
      <section className="pt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
          Explore the best of iful.ai.art
        </h1>

        <HighlightRow items={top} />

        <div className="flex justify-center mt-6">
          <a
            href="#photos"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-zinc-100 ring-1 ring-zinc-300 hover:bg-zinc-200 text-sm font-medium no-underline transition-colors"
          >
            See more
            <ChevronDown size={16} className="opacity-70" />
          </a>
        </div>
      </section>

      {/* Browse by category */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Browse by category</h2>
        <CategoryRow categories={categories} items={items} />
        <div className="flex justify-center mt-6">
          <Link
            href="/category"
            className="rounded-full px-5 py-2.5 bg-zinc-100 ring-1 ring-zinc-300 hover:bg-zinc-200 text-sm font-medium no-underline"
          >
            See more
          </Link>
        </div>
      </section>

      {/* Semua foto + See more */}
      <section className="mt-12" id="photos">
        <h2 className="text-2xl font-semibold mb-4">All photos</h2>
        <GalleryWithSeeMore items={items} initial={18} step={18} anchorId="photos" />
      </section>
    </Suspense>
  );
}
