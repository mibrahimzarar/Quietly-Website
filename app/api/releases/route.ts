import { NextResponse } from "next/server";

const GH_REPO = "mibrahimzarar/Quietly";
const GH_TOKEN = process.env.GH_RELEASES_TOKEN;

interface GithubReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GithubRelease {
  tag_name: string;
  assets: GithubReleaseAsset[];
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    // Token is optional for public repos
    if (GH_TOKEN) {
      headers.Authorization = `Bearer ${GH_TOKEN}`;
    }

    // Prefer GitHub's latest published release first.
    const latestRes = await fetch(
      `https://api.github.com/repos/${GH_REPO}/releases/latest`,
      { headers, cache: "no-store" }
    );

    let release: GithubRelease | undefined;
    if (latestRes.ok) {
      const latest = await latestRes.json();
      if (latest?.assets?.length) {
        release = latest;
      }
    }

    // Fallback: fetch recent releases and pick the newest one with assets.
    if (!release) {
      const res = await fetch(
        `https://api.github.com/repos/${GH_REPO}/releases?per_page=20`,
        { headers, cache: "no-store" }
      );

      if (!res.ok) {
        return NextResponse.json(
          { error: "No releases found" },
          { status: res.status, headers: { "Cache-Control": "no-store" } }
        );
      }

      const releases = (await res.json()) as GithubRelease[];
      release = releases.find(
        (r) => r.assets && r.assets.length > 0
      );
    }

    if (!release) {
      return NextResponse.json(
        { error: "No releases with assets found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Only return what the frontend needs
    const assets = (release.assets || []).map(
      (a) => ({
        name: a.name,
        browser_download_url: a.browser_download_url,
        size: a.size,
      })
    );

    return NextResponse.json({
      tag_name: release.tag_name,
      assets,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
