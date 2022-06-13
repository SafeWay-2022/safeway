/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_REMOTE_HOST}/:path`,
      },
    ]
  },
  images: {
    loader: "imgix",
    path: "/",
  },
};

module.exports = nextConfig;
