import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.shopify.com",
        pathname: "/s/**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "app/scss")],
  },
};

export default nextConfig;
