import Image from "next/image";
import { byCategory, allCategories } from "../../../../lib/data";
import Feed from "../../../components/Feed";
import { Suspense } from "react";

// pre-generate semua slug category
export async function generateStaticParams() {
  return allCategories().map((c) => ({ slug: c }));
}

export const metadata = { title: "Category — Iful AI Art" };

// helper: ubah slug jadi Title Case (onepiece -> One Piece)
function titleCase(slug) {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CategoryPage({ params }) {
  const items = byCategory(params.slug);
  const hero = items[2] || items[0]; // foto ke-3 (fallback ke pertama bila kurang dari 3)
  const title = titleCase(params.slug);

  return (
    <section className="space-y-8">
      {/* HERO highlight */}
      {hero && (
        <div className="relative rounded-[28px] overflow-hidden ring-1 ring-zinc-200/60">
          {/* gambar */}
          <Image
            src={hero.src}
            alt={hero.title}
            width={hero.w}
            height={hero.h}
            priority
            className="h-[220px] sm:h-[280px] lg:h-[360px] w-full object-cover"
            sizes="100vw"
          />

          {/* overlay gradient agar teks kebaca */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/5" />

          {/* teks tengah (Explore + Title + Subtitle) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-zinc-900 ring-1 ring-white/60 backdrop-blur">
              Explore
            </span>

            {/* Judul besar */}
            <h1
              className="text-white font-extrabold tracking-tight
                         text-3xl sm:text-4xl lg:text-6xl drop-shadow-md"
            >
              Explore {title}
            </h1>

            {/* Subjudul */}
            <p className="mt-3 max-w-2xl text-white/85 text-sm sm:text-base drop-shadow">
              Discover the best collection with the #{params.slug} theme 
            </p>
          </div>
        </div>
      )}

      {/* GRID foto kategori */}
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-6">
          Explore {title}
      </h3>
      <Suspense fallback={null}>
         <Feed items={items} />
      </Suspense>
    </section>
  );
}
