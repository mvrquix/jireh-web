"use server";

import { cmsUrl } from "../lib/cms";

// Adds an email to the subscriber list in jireh-cms.
// Returns { ok: true, alreadySubscribed } or { ok: false, error }.
export async function subscribeToEmailList(email) {
  const url = cmsUrl("/api/public/subscribe");
  if (!url) {
    console.error("CMS_URL is not set; cannot add a subscriber.");
    return { ok: false, error: "Signing up isn't available right now." };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "home" }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (response.status === 400) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.json();
    return { ok: true, alreadySubscribed: Boolean(body.alreadySubscribed) };
  } catch (error) {
    console.error("Error subscribing through the CMS:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
