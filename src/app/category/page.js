import Image from "next/image";
import Link from "next/link";
import { allCategories, allPhotos } from "../../../lib/data";

export const metadata = { title: "Categories — Iful AI Art" };

export default function Categories() {
  const cats = allCategories();
  const photos = allPhotos();
  const hero = photos[7]; // foto ke-3 (index 2), aman kalau koleksinya >= 3

  return (
    <>
      {/* Hero foto ke-3 */}
      {hero && (
        <div className="mb-10">
          <Image
            src={hero.src}
            alt={hero.title}
            width={hero.w}
            height={hero.h}
            priority
            className="w-full h-[220px] md:h-[300px] object-cover rounded-2xl ring-1 ring-zinc-200"
            sizes="100vw"
          />
        </div>
      )}

      {/* GRID foto kategori */}
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-6">
          Explore your favorite categories
      </h3>

      {/* Hashtag kategori */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map((c) => (
          <Link
            key={c}
            href={`/category/${c}`}
            className="no-underline text-center px-4 py-2 rounded-full bg-zinc-100 ring-1 ring-zinc-200 hover:bg-zinc-200 text-zinc-900 font-medium"
          >
            #{c}
          </Link>
        ))}
      </section>
    </>
  );
}
