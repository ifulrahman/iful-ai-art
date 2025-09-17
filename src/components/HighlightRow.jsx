import Link from "next/link";
import Image from "next/image";

export default function HighlightRow({ items = [] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((p, i) => (
        <Link
          key={`${p.slug}-${i}`}
          href={`/?photo=${encodeURIComponent(p.slug)}`}
          scroll={false}
          aria-label={`Open ${p.title}`}
          className="relative block rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 no-underline z-20 pointer-events-auto"
        >
          {/* image */}
          <div className="w-full h-[280px] md:h-[320px] relative">
            <Image
              src={p.src}
              alt={p.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={!!p.featured}
              className="rounded-[24px] object-cover"
            />
          </div>

          {/* overlay (visual only) */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* title */}
          <div className="absolute left-5 right-5 bottom-5 pointer-events-none">
            <h3 className="text-white text-xl md:text-2xl font-semibold drop-shadow">
              {p.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
