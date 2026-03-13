import { NextResponse } from "next/server";

const GH_REPO = "mibrahimzarar/Quietly";
const GH_TOKEN = process.env.GH_RELEASES_TOKEN;

export async function GET() {
  if (!GH_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GH_REPO}/releases/latest`,
      {
        headers: {
          Authorization: `Bearer ${GH_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 300 }, // cache for 5 minutes
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "No releases found" },
        { status: res.status }
      );
    }

    const release = await res.json();

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
