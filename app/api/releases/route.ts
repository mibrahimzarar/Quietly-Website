import { NextResponse } from "next/server";

const GH_REPO = "mibrahimzarar/Quietly";
const GH_TOKEN = process.env.GH_RELEASES_TOKEN;

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    // Token is optional for public repos
    if (GH_TOKEN) {
      headers.Authorization = `Bearer ${GH_TOKEN}`;
    }

    // Fetch all releases and find the latest one that has actual downloadable assets
    const res = await fetch(
      `https://api.github.com/repos/${GH_REPO}/releases?per_page=10`,
      {
        headers,
        next: { revalidate: 300 }, // cache for 5 minutes
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "No releases found" },
        { status: res.status }
      );
    }

    const releases = await res.json();

    // Find the first release that has uploaded assets (skip empty ones)
    const release = releases.find(
      (r: { assets: unknown[] }) => r.assets && r.assets.length > 0
    );

    if (!release) {
      return NextResponse.json(
        { error: "No releases with assets found" },
        { status: 404 }
      );
    }

    // Only return what the frontend needs
    const assets = (release.assets || []).map(
      (a: { name: string; browser_download_url: string; size: number }) => ({
        name: a.name,
        browser_download_url: a.browser_download_url,
        size: a.size,
      })
    );

    return NextResponse.json({
      tag_name: release.tag_name,
      assets,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 502 }
    );
  }
}
