// src/lib/data.js
import photos from "@/data/photos.json";

export const allItems = photos;

/* === Alias lama biar kompatibel === */
export function allPhotos() {
  return allItems;
}

export function allCategories() {
  return [...new Set(allItems.map((i) => i.category))];
}

/* === Get item by slug === */
export function bySlug(slug) {
  if (!slug) return null;
  return allItems.find((item) => item.slug === slug) || null;
}

/* === Get items by category === */
export function byCategory(cat) {
  if (!cat) return [];
  return allItems.filter(
    (item) => item.category?.toLowerCase() === cat.toLowerCase()
  );
}

/* === Search items === */
export function searchItems(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return allItems.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const desc = item.desc?.toLowerCase() || "";
    const cat = item.category?.toLowerCase() || "";
    const tags = item.tags?.map((t) => t.toLowerCase()) || [];

    return (
      title.includes(q) ||
      desc.includes(q) ||
      cat.includes(q) ||
      tags.some((tag) => tag.includes(q))
    );
  });
}
