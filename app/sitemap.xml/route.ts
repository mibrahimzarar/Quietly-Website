import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/siteUrl";

function urlEntry(
  loc: string,
  opts: { changefreq: string; priority: string; lastmod: string }
) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${opts.lastmod}</lastmod>
    <changefreq>${opts.changefreq}</changefreq>
    <priority>${opts.priority}</priority>
  </url>`;
}

export function GET() {
  const base = getSiteUrl();
  const lastmod = new Date().toISOString().split("T")[0];

  const paths = [
    { path: "", changefreq: "weekly", priority: "1.0" },
    { path: "/pricing", changefreq: "weekly", priority: "0.9" },
    { path: "/download", changefreq: "weekly", priority: "0.9" },
    { path: "/privacy", changefreq: "yearly", priority: "0.3" },
    { path: "/terms", changefreq: "yearly", priority: "0.3" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) =>
    urlEntry(`${base}${p.path}`, {
      changefreq: p.changefreq,
      priority: p.priority,
      lastmod,
    })
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
