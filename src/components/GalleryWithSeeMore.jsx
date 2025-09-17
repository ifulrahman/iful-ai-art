"use client";
import { useState } from "react";
import Feed from "./Feed";

export default function GalleryWithSeeMore({ items, initial = 18, step = 18, anchorId = "photos" }) {
  const [count, setCount] = useState(initial);
  const visible = items.slice(0, count);
  const hasMore = count < items.length;

  return (
    <section id={anchorId}>
      <Feed items={visible} />
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCount((n) => n + step)}
            className="cursor-pointer rounded-full px-5 py-2.5 bg-zinc-100 ring-1 ring-zinc-300 hover:bg-zinc-200 text-sm font-medium"
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
}
