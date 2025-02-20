/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
   
    APPWRITE_ENDPOINT:process.env.APPWRITE_ENDPOINT,
    APPWRITE_API_KEY:process.env.APPWRITE_API_KEY,
    APPWRITE_PROJECT_ID:process.env.APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID :process.env.APPWRITE_DATABASE_ID

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
