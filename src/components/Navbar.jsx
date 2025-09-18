// src/components/Navbar.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./SearchBox";
import { X } from "lucide-react";

export default function Navbar({ cats = [] }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]); // data untuk SearchBox

  /* --- Ambil data untuk SearchBox (aman di client, tanpa node:fs) --- */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // relative dari src/components ke /data/photos.json
        const mod = await import("../../data/photos.json");
        const data = (mod && (mod.default ?? mod)) || [];
        if (alive) setItems(Array.isArray(data) ? data : []);
      } catch {
        if (alive) setItems([]);
      }
    })();
    return () => { alive = false; };
  }, []);

  /* --- Blur saat scroll --- */
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const onScroll = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Lock scroll saat menu mobile dibuka --- */
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const header = document.getElementById("site-header");

    if (open) {
      root.classList.add("menu-open", "overflow-hidden");
      body.classList.add("menu-open", "overflow-hidden");
      header?.classList.add("menu-open");
    } else {
      root.classList.remove("menu-open", "overflow-hidden");
      body.classList.remove("menu-open", "overflow-hidden");
      header?.classList.remove("menu-open");
    }

    return () => {
      root.classList.remove("menu-open", "overflow-hidden");
      body.classList.remove("menu-open", "overflow-hidden");
      header?.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <div className="flex items-center gap-5 md:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Home">
          <Image
            src="/logo.png"
            alt="iful.ai.art"
            width={260}
            height={72}
            priority
            className="h-12 md:h-12 w-auto object-contain"
          />
          <span className="sr-only">iful.ai.art</span>
        </Link>

        {/* Search (desktop) */}
        <div className="flex-1 max-w-2xl lg:max-w-3xl hidden sm:block">
          <SearchBox items={items} />
        </div>

        {/* Explore (desktop) */}
        <Link
          href="/category"
          className="hidden sm:flex items-center gap-2 text-[15px] font-semibold no-underline text-zinc-900"
        >
          <Image
            src="/cursor.png"
            alt="cursor icon"
            width={18}
            height={18}
            className="w-4 h-4 object-contain"
          />
          Explore
          <ChevronRight className="h-4 w-4" />
        </Link>

        {/* Socials (desktop only) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.instagram.com/iful.ai.art?igsh=MTkxMmd4NHo4Z2RmZA=="
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="h-9 w-9 rounded-full ring-1 ring-zinc-200 hover:ring-zinc-300 hover:bg-zinc-100 transition flex items-center justify-center"
          >
            <InstagramIcon className="h-4 w-4 text-zinc-700" />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-syaiful-rahman/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="h-9 w-9 rounded-full ring-1 ring-zinc-200 hover:ring-zinc-300 hover:bg-zinc-100 transition flex items-center justify-center"
          >
            <LinkedInIcon className="h-4 w-4 text-zinc-700" />
          </a>
        </div>

        {/* Mobile: tombol search + hamburger */}
        <div className="ml-auto flex items-center gap-2 sm:hidden">
          <button
            aria-label="Search"
            onClick={() => setOpen(true)}
            className="rounded-full p-2 ring-1 ring-zinc-200 bg-zinc-100"
          >
            <SearchIcon className="h-5 w-5 text-zinc-600" />
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 ring-1 ring-zinc-200"
          >
            <MenuIcon className="h-5 w-5 text-zinc-700" />
          </button>
        </div>
      </div>

      {/* Drawer mobile dengan animasi */}
      <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
        {/* backdrop */}
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* drawer */}
        <div
          className={`fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl p-4 overflow-y-auto transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-2 ring-1 ring-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SearchBox di mobile */}
          <div className="mt-4">
            <SearchBox items={items} />
          </div>

          <div className="mt-6 grid gap-3">
            {/* Explore */}
            <Link
              href="/category"
              onClick={() => setOpen(false)}
              className="py-2 no-underline font-medium flex items-center gap-2"
            >
              <Image
                src="/cursor.png"
                alt="cursor icon"
                width={18}
                height={18}
                className="w-4 h-4 object-contain"
              />
              <span className="text-[15px] font-semibold">Explore</span>
              <ChevronRight className="h-4 w-4 text-zinc-700" />
            </Link>

            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Categories
            </div>

            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <Link
                  key={c}
                  href={`/category/${c}`}
                  onClick={() => setOpen(false)}
                  className="no-underline px-3 py-1.5 rounded-full bg-zinc-100 ring-1 ring-zinc-200 text-sm"
                >
                  #{c}
                </Link>
              ))}
            </div>

            <div className="mt-6 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Follow
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/iful.ai.art?igsh=MTkxMmd4NHo4Z2RmZA=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full ring-1 ring-zinc-200 flex items-center justify-center"
              >
                <InstagramIcon className="h-4 w-4 text-zinc-700" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-syaiful-rahman/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-full ring-1 ring-zinc-200 flex items-center justify-center"
              >
                <LinkedInIcon className="h-4 w-4 text-zinc-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== Icons ===== */
function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 4a6 6 0 014.8 9.6l4.8 4.8-1.4 1.4-4.8-4.8A6 6 0 1110 4m0 2a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
function MenuIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 6a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}
function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 107.5 6 2.5 2.5 0 004.98 3.5zM3 8h4v13H3zM10 8h3.8v1.8h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.6 4.6 5.9V21h-4v-5.3c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4z" />
    </svg>
  );
}
function ChevronRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M7.293 14.707 11 11 7.293 7.293 8.707 5.879 13.828 11l-5.121 5.121z" />
    </svg>
  );
}
