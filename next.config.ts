import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["covers.openlibrary.org"],
  },
  async redirects() {
    return [
      // redirect in case of category path being without slug (page number)
      {
        source: "/category",
        destination: "/category/1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
