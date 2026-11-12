import { connection } from "next/server";
import HomeContent from "./components/home-content";
import { getHomeContent } from "./lib/cms";

// A server component, so the CMS content is in the first HTML response.
export default async function Home() {
  // Read the CMS on every request instead of at build time.
  await connection();
  return <HomeContent content={await getHomeContent()} />;
}
