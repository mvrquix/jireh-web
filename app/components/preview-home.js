"use client";

import { useEffect, useState } from "react";
import HomeContent from "./home-content";
import { normalizeHomeContent } from "../lib/home-content-data";

// Message types shared with jireh-cms (components/home-preview.js).
const READY = "jireh-preview:ready";
const CONTENT = "jireh-preview:content";

// Waits for content from the CMS editor that frames this page, and re-renders
// whenever the editor sends a new version.
export default function PreviewHome({ cmsOrigin }) {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState("waiting"); // "waiting" | "standalone"

  useEffect(() => {
    if (!cmsOrigin || window.parent === window) {
      setStatus("standalone");
      return;
    }
    const onMessage = (event) => {
      // Only the CMS that frames this page may supply content.
      if (event.origin !== cmsOrigin || event.source !== window.parent) return;
      if (event.data?.type !== CONTENT) return;
      setContent(normalizeHomeContent(event.data.content));
    };
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: READY }, cmsOrigin);
    return () => window.removeEventListener("message", onMessage);
  }, [cmsOrigin]);

  if (content) return <HomeContent content={content} preview />;

  return (
    <div className="container my-5 text-center text-muted">
      {status === "standalone"
        ? "This page shows previews from the Jireh CMS. Open it with the Preview button in the CMS."
        : "Loading preview…"}
    </div>
  );
}
