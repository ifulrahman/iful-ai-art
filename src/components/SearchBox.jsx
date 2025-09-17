"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchBox({ items }) {
  const [q, setQ] = useState("");

  // ambil suggestions
  const suggestions = q
    ? items.filter((p) => {
        const text = (p.title + " " + p.category + " " + (p.desc || "") + " " + (p.tags || []).join(" ")).toLowerCase();
        return text.includes(q.toLowerCase());
      }).slice(0, 6) // batasi hasil
    : [];

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 ring-1 ring-zinc-200 focus-within:ring-zinc-300">
        <SearchIcon className="h-5 w-5 text-zinc-500" />
        <input
          type="search"
          placeholder="Search inspiration…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
        />
      </div>

      {/* dropdown suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-lg z-50">
          {suggestions.map((p) => (
            <Link
              key={p.slug}
              href={`/?q=${encodeURIComponent(p.title)}`}
              className="block px-4 py-2 text-sm hover:bg-zinc-100"
            >
              {p.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 4a6 6 0 014.8 9.6l4.8 4.8-1.4 1.4-4.8-4.8A6 6 0 1110 4m0 2a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
