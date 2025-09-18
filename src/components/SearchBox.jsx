// src/components/SearchBox.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * items: array foto (punya title, desc, tags, category, dll)
 * className: opsional untuk membungkus input
 * onDone: callback opsional (contoh: tutup drawer mobile)
 */
export default function SearchBox({ items = [], className = "", onDone }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // bikin daftar suggestion sederhana dari title/desc/category/tags
  const suggestions = useMemo(() => {
    const text = q.trim().toLowerCase();
    if (!text) return [];
    // cari yang mengandung query
    const found = items.filter((p) => {
      const hay = (
        `${p.title} ${p.category} ${p.desc || ""} ${(p.tags || []).join(" ")}`
      ).toLowerCase();
      return hay.includes(text);
    });

    // ambil judul unik saja biar nggak dobel
    const uniq = [];
    for (const p of found) {
      if (!uniq.includes(p.title)) uniq.push(p.title);
      if (uniq.length >= 8) break; // batasi
    }
    return uniq;
  }, [items, q]);

  // klik di luar -> tutup dropdown
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function goSearch(text) {
    const query = (text ?? q).trim();
    if (!query) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onDone?.(); // <-- panggil supaya navbar mobile tertutup
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      goSearch();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {/* input */}
      <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 ring-1 ring-zinc-200 shadow-sm focus-within:ring-zinc-300">
        <SearchIcon className="h-5 w-5 text-zinc-500" />
        <input
          type="search"
          placeholder="Search inspiration…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => q && setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
        />
        {q && (
          <button
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              setOpen(false);
            }}
            className="rounded-full p-1 hover:bg-white/60"
          >
            <CloseSmall className="h-4 w-4 text-zinc-500" />
          </button>
        )}
      </div>

      {/* dropdown suggestion */}
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 max-h-[60vh] overflow-auto rounded-xl bg-white ring-1 ring-zinc-200 shadow-lg">
          <ul className="py-2">
            {suggestions.map((text) => (
              <li key={text}>
                <button
                  onClick={() => goSearch(text)}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-50 text-[15px]"
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* icons */
function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 4a6 6 0 014.8 9.6l4.8 4.8-1.4 1.4-4.8-4.8A6 6 0 1110 4m0 2a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
function CloseSmall({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6.7 6.7 10 10l3.3-3.3 1.4 1.4L11.4 11.4l3.3 3.3-1.4 1.4L10 12.8l-3.3 3.3-1.4-1.4 3.3-3.3-3.3-3.3 1.4-1.4z" />
    </svg>
  );
}
