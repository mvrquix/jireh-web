/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"]
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.shopify.com',
            pathname: '/s/**',
          },
        ],
      },
};

export default nextConfig;
