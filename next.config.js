/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "https://afruna-backend-cmsxg.ondigitalocean.app/api/v1",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://afruna-backend-cmsxg.ondigitalocean.app/api/v1/:path*",
      },
    ];
  },
  images: {
    domains: [
      "afruna-bucket.nyc3.digitaloceanspaces.com",
      "nyc3.digitaloceanspaces.com",
      "cloud.appwrite.io"
    ],
  },
};

module.exports = nextConfig;
