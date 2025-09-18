import Image from "next/image";
import { bySlug, allPhotos } from "../../../../lib/data";

export async function generateStaticParams() {
  return allPhotos().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = bySlug(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — Iful AI Art`,
    description: p.desc ?? p.title,
    openGraph: {
      images: [{ url: p.src, width: p.w, height: p.h, alt: p.title }],
    },
  };
}

export default function PhotoPage({ params }) {
  const p = bySlug(params.slug);
  if (!p) return <div>Not found</div>;

  return (
    <article className="max-w-3xl mx-auto">
      <Image src={p.src} alt={p.title} width={p.w} height={p.h} className="w-full h-auto rounded-2xl" priority />
      <h1 className="text-2xl font-semibold mt-4">{p.title}</h1>
      {p.desc && <p className="text-zinc-400 mt-2">{p.desc}</p>}
      <div className="mt-3 flex gap-2 text-xs flex-wrap">
        <span className="px-3 py-1 rounded-full bg-zinc-900 text-white/90">{p.category}</span>
        {p.tags.map(t => <span key={t} className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-200 transition">{t}</span>)}
      </div>
    </article>
  );
}
