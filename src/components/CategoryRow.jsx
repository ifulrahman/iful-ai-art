import Link from "next/link";
import Image from "next/image";

export default function CategoryRow({ categories, items }) {
  // ambil 1 cover per kategori (foto pertama yg ketemu)
  const covers = {};
  for (const p of items) {
    if (!covers[p.category]) covers[p.category] = p;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((c) => {
        const cover = covers[c];
        return (
          <Link
            key={c}
            href={`/category/${c}`}
            className="group relative block rounded-[18px] overflow-hidden ring-1 ring-zinc-200 hover:ring-zinc-300 transition no-underline"
          >
            {cover ? (
              <Image
                src={cover.src}
                alt={c}
                width={cover.w}
                height={cover.h}
                className="w-full h-[140px] object-cover transition-transform duration-500 transform group-hover:scale-110"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            ) : (
              <div className="h-[140px] bg-zinc-100" />
            )}
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute left-4 bottom-3 text-white font-semibold">
              {titleCase(c)}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function titleCase(s) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
