// Server-side reads from jireh-cms (../jireh-cms), which manages the home page
// content. Its base URL comes from CMS_URL, e.g. http://localhost:3001.

import {
  FALLBACK_HOME_CONTENT,
  normalizeHomeContent,
} from "./home-content-data";

const TIMEOUT_MS = 5000;

export function cmsUrl(path) {
  const base = process.env.CMS_URL;
  return base ? new URL(path, base) : null;
}

// The CMS's origin (scheme, host and port), the only sender the /preview page
// accepts content from. Null when CMS_URL is missing or invalid.
export function cmsOrigin() {
  try {
    return cmsUrl("/")?.origin ?? null;
  } catch {
    return null;
  }
}

let warnedMissingUrl = false;

export async function getHomeContent() {
  const url = cmsUrl("/api/public/home");
  if (!url) {
    if (!warnedMissingUrl) {
      console.warn("CMS_URL is not set; using the built-in home page content.");
      warnedMissingUrl = true;
    }
    return FALLBACK_HOME_CONTENT;
  }

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return normalizeHomeContent(await response.json());
  } catch (error) {
    console.error(
      `Could not load home page content from ${url}; using the built-in content.`,
      error,
    );
    return FALLBACK_HOME_CONTENT;
  }
}
