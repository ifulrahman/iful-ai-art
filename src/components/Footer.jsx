import Image from "next/image";
import Link from "next/link";

export default function Footer({
  slogan = "iful.ai.art — curated AI visuals",
  columns = [],
  socials = [],
}) {
  const year = new Date().getFullYear();

  // default isi kalau props kosong
  const cols =
    columns.length > 0
      ? columns
      : [
          { title: "Explore", items: [{ label: "All Photos", href: "/" }, { label: "Categories", href: "/category" }] },
          { title: "Resources", items: [{ label: "Sitemap", href: "/sitemap.xml" }, { label: "RSS", href: "/feed.xml" }] },
          { title: "Company", items: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] },
          { title: "Support", items: [{ label: "FAQ", href: "/faq" }, { label: "Submit a ticket", href: "/support" }] },
        ];

  const nets =
    socials.length > 0
      ? socials
      : [
          { name: "Instagram", href: "#" },
          { name: "X", href: "#" },
          { name: "YouTube", href: "#" },
          { name: "Dribbble", href: "#" },
        ];

  return (
<footer className="mt-16 bg-[#0b0b0b] text-white">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        {/* Top: logo + 4 kolom */}
        <div className="grid gap-10 md:grid-cols-5">
          {/* Logo + slogan */}
          <div>
            <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Home">
              <Image
                src="/logo-footer.png"
                alt="iful.ai.art"
                width={180}
                height={48}
                className="h-20 w-auto object-contain"
                // kalau logomu gelap, aktifkan baris berikut:
                // className="h-10 w-auto object-contain invert"
              />
            </Link>
            {slogan && <p className="mt-2 text-xs text-zinc-400">{slogan}</p>}
          </div>

          {/* Kolom link */}
          {cols.map((col) => (
            <nav key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-zinc-300">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.items.map((it) => (
                  <li key={it.label}>
                    {it.href?.startsWith("/") ? (
                      <Link href={it.href} className="text-sm text-zinc-400 hover:text-white no-underline">
                        {it.label}
                      </Link>
                    ) : (
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-zinc-400 hover:text-white no-underline"
                      >
                        {it.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10"></div>

        {/* Sosmed + copyright */}
        <div className="pt-8">
          <div className="flex justify-center gap-3">
            {nets.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="h-9 w-9 rounded-full ring-1 ring-white/20 hover:ring-white/40 hover:bg-white/10 transition flex items-center justify-center"
              >
                {icon(s.name)}
              </a>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-zinc-500">
            © {year} iful.ai.art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Ikon sosmed (SVG inline, tanpa lib eksternal) */
function icon(name) {
  const n = name.toLowerCase();
  const cls = "h-4 w-4";
  if (n === "x" || n === "twitter")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.53 3H20l-8.5 9.9L20.5 21h-3l-6.8-7.6L5 21H2.5l8.3-9.7L3 3h3l6.2 7 5.33-7z" />
      </svg>
    );
  if (n === "instagram")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 6a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    );
  if (n === "youtube")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 12a49 49 0 00-.6-6.9A3.2 3.2 0 0019.3 2.7C17.5 2.5 12 2.5 12 2.5s-5.5 0-7.3.2A3.2 3.2 0 001.6 5.1 49 49 0 001 12a49 49 0 00.6 6.9 3.2 3.2 0 002.9 2.4c1.8.2 7.3.2 7.3.2s5.5 0 7.3-.2a3.2 3.2 0 002.9-2.4A49 49 0 0023 12zM10 8.5l6 3.5-6 3.5v-7z" />
      </svg>
    );
  if (n === "dribbble")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm6.92 8a8.035 8.035 0 00-3.37-5.64 34.8 34.8 0 013.37 5.64zM12 4a8 8 0 015.06 1.78A33.3 33.3 0 0012 9.1a33.4 33.4 0 00-2.7-4.32A7.97 7.97 0 0112 4zM8.5 5a31.7 31.7 0 013 4.6A32.2 32.2 0 015.3 12.1 8.04 8.04 0 018.5 5zM4.1 13a7.9 7.9 0 01.18-1.7 30.9 30.9 0 008.72-2.08 29.6 29.6 0 011.7 3.8A23.7 23.7 0 004.1 13zM12 20a8 8 0 01-6.6-3.5 21.6 21.6 0 017.9-1.9 19.2 19.2 0 011.7 4.7A7.9 7.9 0 0112 20zm6.4-2.7a21 21 0 00-1.7-4.3 22.4 22.4 0 013.1.4A8 8 0 0118.4 17.3z" />
      </svg>
    );
  // fallback: titik
  return <span className={cls} />;
}
