import photos from "@/data/photos.json";

export const allItems = photos;

// Alias lama biar kompatibel
export function allPhotos() {
  return allItems;
}

export function allCategories() {
  return [...new Set(allItems.map((i) => i.category))];
}

export function getByCategory(cat) {
  return allItems.filter(
    (item) => item.category.toLowerCase() === cat.toLowerCase()
  );
}

export function searchItems(query) {
  const q = query.toLowerCase();
  return allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(q)))
  );
}
