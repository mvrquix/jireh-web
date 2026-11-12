import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The CMS's origin, the only other site allowed to frame /preview.
function cmsOrigin() {
  try {
    return process.env.CMS_URL ? new URL(process.env.CMS_URL).origin : null;
  } catch {
    return null;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/preview",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self'${cmsOrigin() ? ` ${cmsOrigin()}` : ""}`,
          },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
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
