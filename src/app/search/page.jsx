// src/app/search/page.jsx
import Link from "next/link";
import Image from "next/image";
import { searchItems } from "@/lib/data";
import GalleryWithSeeMore from "@/components/GalleryWithSeeMore";

export const metadata = { title: "Search — iful.ai.art" };

// Pastikan halaman ini tidak diprerender (wajib untuk halaman berbasis query)
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function SearchPage({ searchParams }) {
  const q = (searchParams?.q ?? "").trim();
  const results = q ? searchItems(q) : [];

  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
        Search results{q ? ` for “${q}”` : ""}
      </h1>
      <p className="text-zinc-500 mb-6">
        {q
          ? `${results.length} result${results.length === 1 ? "" : "s"}`
          : "Type something to search."}
      </p>

      {q ? (
        results.length > 0 ? (
          <GalleryWithSeeMore
            items={results}
            initial={18}
            step={18}
            anchorId="results"
          />
        ) : (
          <div className="rounded-xl border border-zinc-200 p-6 flex flex-col items-center gap-4">
            <Image
              src="/no-result-found.png"
              alt="No results illustration"
              width={400}
              height={300}
              className="w-full max-w-sm h-auto"
              priority
            />
            <Link href="/" className="text-sm font-medium underline">
              Back to home
            </Link>
          </div>
        )
      ) : (
        <div className="rounded-xl border border-zinc-200 p-6">
          <p className="text-zinc-700">Try “cat”, “football”, “naruto”, etc.</p>
        </div>
      )}
    </section>
  );
}
