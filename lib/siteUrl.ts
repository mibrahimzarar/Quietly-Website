const DEFAULT_SITE = "https://quietlycode.org";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return DEFAULT_SITE;
  return raw.replace(/\/$/, "");
}
