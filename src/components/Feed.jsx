"use client";

import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

/* =========================
   Feed (default export)
   ========================= */
export default function Feed({ items }) {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("photo");

  const selected = useMemo(
    () => (slug ? items.find((p) => p.slug === slug) : null),
    [items, slug]
  );

  const open = useCallback(
    (s) => {
      const url = new URL(window.location.href);
      url.searchParams.set("photo", s);
      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );

  const close = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("photo");
    router.replace(url.pathname + url.search, { scroll: false });
  }, [router]);

  return (
    <div className="w-full">
      <MasonryGrid items={items} onOpen={open} />

      {/* Modal (dibiarkan PERSIS seperti sebelumnya) */}
      {selected && (
        <Modal key={`${selected.slug}-${selected.src}`} open onClose={close}>
          <div className="space-y-5">
            {/* Gambar utama */}
            <img
              src={selected.src}
              alt={selected.title}
              className="w-full max-h-[65vh] object-contain rounded-2xl shadow-lg ring-1 ring-black/5"
            />

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
              {selected.title}
            </h2>

            {/* Description */}
            {selected.desc && (
              <p className="text-[15px] leading-relaxed text-zinc-600">
                {selected.desc}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded-full bg-zinc-900 text-white/90">
                {selected.category}
              </span>
              {selected.tags?.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-200 transition"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Link/Action */}
            <div className="pt-3">
              <a
                href={`/photo/${selected.slug}`}
                className="inline-flex items-center gap-2 text-[15px] font-medium text-zinc-900 no-underline hover:underline underline-offset-4"
              >
                View details
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.293 4.293 17 9l-4.707 4.707-1.414-1.414L12.172 10H4v-2h8.172l-1.293-1.293 1.414-1.414z" />
                </svg>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =========================
   MasonryGrid (internal)
   - Hover zoom-in hanya pada GAMBAR
   - Ukuran kartu tetap stabil
   ========================= */
function MasonryGrid({ items, onOpen }) {
  return (
    <div className="columns-1 xs:columns-2 md:columns-3 2xl:columns-4 gap-4 [column-fill:_balance]">
      {items.map((p) => (
        <button
          key={p.slug}
          onClick={() => onOpen(p.slug)}
          className="group mb-4 break-inside-avoid block text-left focus:outline-none cursor-pointer"
          aria-label={`Buka ${p.title}`}
        >
          {/* Wrapper untuk menjaga ukuran kartu + crop saat zoom */}
          <div className="overflow-hidden rounded-2xl shadow transition-shadow duration-300 hover:shadow-lg">
            <Image
              src={p.src}
              alt={p.title}
              width={p.w}
              height={p.h}
              className="w-full h-auto object-cover transform-gpu duration-500 ease-out will-change-transform group-hover:scale-110"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1536px) 33vw, 25vw"
              priority={false}
            />
          </div>
          <div className="mt-2 text-xs text-zinc-600">{p.title}</div>
        </button>
      ))}
    </div>
  );
}

/* =========================
   Modal (placeholder)
   — gunakan implementasi MODAL-mu sendiri yang sudah ada.
   Kode ini hanya agar file valid jika kamu importnya berbeda.
   ========================= */
// Hapus block berikut kalau kamu sudah mengimpor Modal dari file lain.
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl bg-white text-zinc-900 rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-zinc-300 cursor-pointer transition"
          >
            ✕ Tutup
          </button>
        </div>
        <div className="p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
