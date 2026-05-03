import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/siteUrl";

export function GET() {
  const base = getSiteUrl();
  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
