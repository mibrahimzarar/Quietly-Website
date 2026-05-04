"use client";

import { useEffect, useState } from "react";

export interface ReleaseAssets {
  winX64: string;
  macUniversal: string;
  linuxAppImage: string;
  linuxDeb: string;
  linuxRpm: string;
}

export const EMPTY_RELEASE_ASSETS: ReleaseAssets = {
  winX64: "",
  macUniversal: "",
  linuxAppImage: "",
  linuxDeb: "",
  linuxRpm: "",
};

/** `https://github.com/.../releases/download/<tag>/file` → tag */
export function extractGitHubReleaseTag(url: string): string | null {
  if (!url) return null;
  const m = url.match(/\/releases\/download\/([^/]+)\//);
  return m ? decodeURIComponent(m[1]) : null;
}

/** Label matches the files users download. */
export function inferVersionFromAssets(assets: ReleaseAssets, apiTag: string): string {
  const counts = new Map<string, number>();
  for (const url of Object.values(assets)) {
    const t = extractGitHubReleaseTag(url);
    if (t) counts.set(t, (counts.get(t) || 0) + 1);
  }
  if (counts.size === 0) return apiTag;
  const sorted = [...counts.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    if (apiTag && a[0] === apiTag) return -1;
    if (apiTag && b[0] === apiTag) return 1;
    return a[0].localeCompare(b[0]);
  });
  return sorted[0][0];
}

export function useGitHubRelease() {
  const [assets, setAssets] = useState<ReleaseAssets | null>(null);
  const [version, setVersion] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [hasRelease, setHasRelease] = useState(false);

  useEffect(() => {
    fetch("/api/releases")
      .then((res) => {
        if (!res.ok) throw new Error("No release");
        return res.json();
      })
      .then((release) => {
        const tag = release.tag_name || "";

        const urls: Record<string, string> = {};
        for (const asset of release.assets || []) {
          const name: string = asset.name;
          const id: number = asset.id;
          const proxyUrl = `/api/download?id=${id}&name=${encodeURIComponent(name)}`;

          if (name.endsWith(".exe")) {
            urls.winX64 = proxyUrl;
          } else if (name.endsWith(".dmg")) {
            urls.macUniversal = proxyUrl;
          } else if (name.endsWith(".AppImage")) {
            urls.linuxAppImage = proxyUrl;
          } else if (name.endsWith(".deb")) {
            urls.linuxDeb = proxyUrl;
          } else if (name.endsWith(".rpm")) {
            urls.linuxRpm = proxyUrl;
          }
        }

        const merged: ReleaseAssets = {
          winX64: urls.winX64 || "",
          macUniversal: urls.macUniversal || "",
          linuxAppImage: urls.linuxAppImage || "",
          linuxDeb: urls.linuxDeb || "",
          linuxRpm: urls.linuxRpm || "",
        };

        const hasAnyAsset = Object.values(merged).some(Boolean);
        setHasRelease(hasAnyAsset);
        setAssets(merged);
        setVersion(inferVersionFromAssets(merged, tag));
      })
      .catch(() => {
        setHasRelease(false);
        setAssets(EMPTY_RELEASE_ASSETS);
        setVersion("");
      })
      .finally(() => setLoading(false));
  }, []);

  return { assets, version, loading, hasRelease };
}
