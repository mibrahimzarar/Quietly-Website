"use client";

import { useEffect } from "react";

/**
 * After a new deploy, users may still have an old shell in memory. Client-side
 * navigation then requests old `_next` chunks that no longer exist → blank or
 * stuck views until a full reload. Recover by reloading once when we detect that.
 */
function shouldAttemptReload(): boolean {
  try {
    const key = "quietly_stale_reload_ts";
    const prev = sessionStorage.getItem(key);
    const now = Date.now();
    if (prev && now - Number(prev) < 8000) return false;
    sessionStorage.setItem(key, String(now));
    return true;
  } catch {
    return true;
  }
}

function textLooksLikeStaleBundleFailure(msg: string): boolean {
  const m = msg.toLowerCase();
  return (
    m.includes("chunkloaderror") ||
    m.includes("loading chunk") ||
    m.includes("failed to fetch dynamically imported module") ||
    m.includes("importing a module script failed") ||
    m.includes("error loading dynamically imported module") ||
    m.includes("loading css chunk")
  );
}

export default function NavigationRecovery() {
  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const r = event.reason;
      const msg =
        typeof r === "object" && r !== null && "message" in r
          ? String((r as Error).message)
          : String(r);
      if (textLooksLikeStaleBundleFailure(msg)) {
        event.preventDefault();
        if (shouldAttemptReload()) window.location.reload();
      }
    };

    const onError = (event: Event) => {
      const t = event.target;
      if (t instanceof HTMLScriptElement && t.src?.includes("/_next/")) {
        if (shouldAttemptReload()) window.location.reload();
        return;
      }
      if (event instanceof ErrorEvent && event.message) {
        if (textLooksLikeStaleBundleFailure(event.message)) {
          if (shouldAttemptReload()) window.location.reload();
        }
      }
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onError, true);

    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onError, true);
    };
  }, []);

  return null;
}
