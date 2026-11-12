import { connection } from "next/server";
import PreviewHome from "../components/preview-home";
import { cmsOrigin } from "../lib/cms";

// Renders unsaved home page content sent by the jireh-cms editor, which shows
// this page in a frame. next.config.mjs only lets the CMS frame it, and marks
// it noindex.
export default async function PreviewPage() {
  // Read CMS_URL at request time, not build time.
  await connection();
  return <PreviewHome cmsOrigin={cmsOrigin()} />;
}
