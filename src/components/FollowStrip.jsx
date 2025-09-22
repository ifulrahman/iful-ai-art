"use client";

import { Instagram, Linkedin } from "lucide-react";

export default function FollowStrip() {
  return (
    <div className="mt-3 mb-6 flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/70 bg-white/60 px-5 py-3 backdrop-blur">
      <p className="text-sm md:text-[15px] text-zinc-700">
        <span className="font-medium">Follow</span> my{" "}
        <span className="font-semibold">LinkedIn</span> and{" "}
        <span className="font-semibold">Instagram @iful.ai.art</span>.
      </p>

      <div className="flex items-center gap-2">
        <a
          href="https://www.linkedin.com/in/muhammad-syaiful-rahman/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:ring-zinc-300"
        >
          <Linkedin className="h-4 w-4 text-zinc-800" />
        </a>
        <a
          href="https://www.instagram.com/iful.ai.art?igsh=MTkxMmd4NHo4Z2RmZA=="
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          title="Instagram"
          className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:ring-zinc-300"
        >
          <Instagram className="h-4 w-4 text-zinc-800" />
        </a>
      </div>
    </div>
  );
}
