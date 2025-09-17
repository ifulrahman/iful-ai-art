import { allItems } from "@/lib/data";
import Feed from "@/components/Feed";

export default function SearchPage({ searchParams }) {
  const q = searchParams.q?.toLowerCase() || "";
  const results = allItems.filter((p) => {
    const text = (p.title + " " + p.category + " " + (p.desc || "") + " " + (p.tags || []).join(" ")).toLowerCase();
    return text.includes(q);
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Results for "{q}"</h1>
      <Feed items={results} />
    </main>
  );
}
